# Первая модификация

В этом гайде мы добавим в Fazbear's Hunt аниматроника из чужого Пилл-Пака из Мастерской Steam в качестве полноценного аниматроника режима.

## Шаг 1. Найдите Пилл-Пак

Зайдите в Steam Workshop, найдите Пилл-Пак с аниматроником, которую хотите использовать. Можно заранее распаковать файлы аддона, чтобы знать путь до модели аниматроника, и названия его анимаций.

::: warning Внимание
Пилл-Пак должен быть установлен на сервере и клиенте, иначе игра не сможет использовать его модель.
:::

## Шаг 2. Создайте луа скрипт

Создайте файл `lua/autorun/my_animatronic.lua`:

```lua
--[[ 
	Если вы собираетесь публиковать ваш аддон в Мастерскую, убедитесь что функционал аддона работает
	только в рамках режима. После того как закончили аддон, зайдите в другие режимы, например, в Sandbox
	и убедитесь что ничего не конфликтует и не создаёт Луа ошибок.
--]]
hook.Add("OnGamemodeLoaded", "fh_mycustom_anim", function()
	if engine.ActiveGamemode() ~= "fazbearshunt" then return end -- надо убедиться что режим сервера - Fazbear's Hunt
    
	-- Здесь мы будем писать код по добавлению аниматроника
end)
```

## Шаг 3. Создаём кастомного Фредди без Слепой Ярости

Рекомендуется особый метод создания аниматроника с использованием шаблона Пилла:

```lua
local FREDDY = GetPillTemplate() -- таблица-образец, с данными, которые одинаковы у большинства аниматроников

FREDDY.printName="Withered Freddy"
FREDDY.model="models/speps/pill/oldfreddy.mdl"
FREDDY.anims={
	default={
		idle="idle",
		crouch="crouch",
		crouch_walk="crouchmove",
		walk="walk",
		run="run",
		scare="scare",	-- Анимация скримера должна называться именно так, если вы используете метод performJumpscare
		jump="jump",
		glide="air",
		land="land",
		stun="stun",	-- Анимация после удара по аниматронику Шокером.
	},
	gestures={
		melee="melee",	-- Анимация удара которую можно увидеть при ударе пропа, или при ударе носителя Маски Маньяка.
	},
}
FREDDY.moveSpeed={
	walk=150,
	run=490,
	ducked=70,	-- Вприсяди чуть-чуть быстрее выживших!
}
FREDDY.viewmodel={ -- "Модель" рук аниматроников. Здесь указывается имя SWEP'а
	weapon="v_freddy"
}
FREDDY.startFunction=function(ply,ent) -- startFunction срабатывает как только аниматроник выдаётся игроку.
	chaseVoicelineChecker(ply, ent, "freddy") -- Эта функция включает встроенные войслайны погони.
end
FREDDY.killCondition=function(ply,ent) -- Условие скримера: даёт знать когда игроку на клиенте показывать значок убийства у курсора.
	local target = FindNearestPlayer(ply:EyePos(), 125, ply, 36)
	
	if IsValid(target) and not target:IsInvisible() and not target:IsJumpscared() then
		return true
	end
	return false
end
FREDDY.attack={ -- ЛКМ аниматроника.
	mode="trigger",
	func=function(ply,ent)
		if IsValid(ply:GetEntityInUse()) then return end -- Если аниматроник держал проп, ничего не делаем.
		local target = FindNearestPlayer(ply:EyePos(), 125, ply, 36) -- Ищем ближайшего выжившего от глаз, на расстоянии 125, с FOV 36
		
		local jumpscare = performJumpscare(ply, ent, target, 1.6, "freddy", 50, "v_freddy")
		
		if !IsValid(target) or not jumpscare then -- Если не нашли цель, или скример не произошёл
			AnimatronicBreakProp(ply, ent)
		end
	end
}
FREDDY.reload=function(ply,ent) -- Бинд +RELOAD аниматроника
	highlight.ByDistance(ply, ent) -- Просвет по дистанции, со встроенным счётчиком КД.
end
FREDDY.land=function(ply,ent)
	if ply:WaterLevel() < 2 then
		if ply._wereJumpingPill or not ply._wereJumpingPill and ply:GetVelocity().z < -270 then
			if not ply._jumpPosPill or ply._jumpPosPill and ply:GetPos():Distance(ply._jumpPosPill) > 150 then
				ent:PillAnim("land",true)
			end
		end
	end
	landTripCheck(ply, ent, "freddy") -- Эта функция включает встроенные войслайны спотыкания.
end

pills.register("custom_wfreddy2", FREDDY) -- Регистрируем аниматроника в базу pills

killers.Register("custom_wfreddy2", "freddy", "fazhunt.animatronics.freddy", Color(50, 40, 255), "Custom") -- Регистрация аниматроника в базу FH, после этого его можно найти в Админ-Панели и сделать играбельным!
```

См. [Функции FH →](/reference/functions.md)

## Шаг 4. Выдача игроку вручную

Если вы хотите выдать аниматроника конкретному игроку (например, при особом событии):

```lua
hook.Add("fh_startgame", "GiveCustomKiller", function(roundType)
    local target = player.GetAll()[1]  -- первый игрок
    if IsValid(target) then
        giveKiller(target, "pill_wfreddy2", true)
    end
end)
```

## Что дальше

Теперь, когда у вас есть аниматроник, изучите:

- **[Функции FH](/reference/functions.md)** — для глубокого изменения поведения
- **[Хуки аниматроников](/hooks/animatronics.md)** — для перехвата скримеров и т.д.
- **[Способности аниматроников](/hooks/abilities.md)** — хуки конкретных способностей

::: tip Совет
Не забывайте проверять валидность игроков (`IsValid(ply)`) перед вызовом методов — на них игрок может успеть отключиться от сервера.
:::