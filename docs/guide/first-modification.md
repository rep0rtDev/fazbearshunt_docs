# Первая модификация (Порт)

В этом гайде мы добавим в Fazbear's Hunt аниматроника из чужого Пилл-Пака из Мастерской Steam в качестве полноценного аниматроника режима.

## Шаг 1. Найдите Пилл-Пак

Зайдите в Steam Workshop, найдите Пилл-Пак с аниматроником, который хотите использовать. Можно заранее распаковать файлы аддона, чтобы знать путь до модели аниматроника, и названия его анимаций.

::: warning Внимание
Пилл-Пак должен быть установлен на сервере и клиенте, иначе игра не сможет использовать его модель.
:::

## Шаг 2. Создайте Lua-скрипт

Создайте файл `lua/autorun/my_animatronic.lua`:

```lua
hook.Add("OnGamemodeLoaded", "fh_mycustom_anim", function()
	-- надо убедиться что режим сервера - Fazbear's Hunt
	if engine.ActiveGamemode() ~= "fazbearshunt" then return end
    
	-- Здесь мы будем писать код по добавлению аниматроника
end)
```

::: warning Внимание
Для работы вашей модификации, нужно чтобы сначала подгрузился сам режим, а только затем наш код (пример выше). К сожалению используя этот метод придётся перезапускать карту каждый раз, для проверки изменений.
:::

В качестве примера будем использовать Пилл-Пак [Bon The Rabbit](https://steamcommunity.com/sharedfiles/filedetails/?id=950845673)

## Шаг 3. Создаём Кролика Бона как аниматроника

Для регистрации аниматроника в базу Pills будем использовать метод `GetPillTemplate()`

```lua
-- Таблица с данными, которые одинаковы у большинства аниматроников
local BON = GetPillTemplate() 

BON.printName="Bon The Rabbit" -- Полное имя аниматроника
BON.model="models/gentoi/walterfiles/bon.mdl" -- Путь к модели
BON.anims={
	default={
		idle="idle",
		walk="walk",
		run="run",
		crouch="Crouch",
		crouch_walk="CrawlMovement",
		jump="jump",
		glide="fall",
		land="land",
		-- Анимация скримера должна называться именно scare, если вы используете performJumpscare()
		scare="kill",	
		-- Анимация удара по аниматронику Шокером.
		stun="stun",
	},
	gestures={
		-- Анимация удара которую можно увидеть, например, при ударе пропа.
		melee="melee",	
	},
	-- Если аниматроник бегает быстрее этих скоростей, то анимации ускоряются
	speedCap={
		walk = 60,
		run = 400,
		ducked = 40,
	},
}
-- Скорость передвижения
BON.moveSpeed={
	walk=140,
	run=400,
	ducked=70,
}

-- Хитбокс аниматроника (третье значение - высота)
BON.hull=Vector(32,32,90),

BON.camera={
	-- Оффсет камеры аниматроника от первого лица
	offset = Vector(0, 0, 88),
	dist = 120 -- Дистанция камеры от игрока от третьего лица
},

-- Если offset вашей камеры 90, а duckBy стоит 70, то
-- вприсяди камера будет находится в 20 юнитах от пола (90 - 70 = 20)
BON.duckBy=70,

-- "Модель" рук аниматроников. Здесь указывается имя SWEP'а,
-- который вы должны подготовить сами.
BON.viewmodel={ weapon="v_bon" }

-- Срабатывает как только аниматроник выдаётся игроку.
BON.startFunction=function(ply,ent) 
	-- Эта функция включает встроенные войслайны погони.
	chaseVoicelineChecker(ply, ent, "freddy") 
end

-- Даёт знать когда игроку на клиенте показывать значок убийства у курсора.
BON.killCondition=function(ply,ent) 
	local target = FindNearestPlayer(ply:EyePos(), 125, ply, 36)
	
	if IsValid(target) and not target:IsInvisible() and not target:IsJumpscared() then
		return true
	end
	return false
end

-- ЛКМ аниматроника.
BON.attack={ 
	mode="trigger",
	func=function(ply,ent)
		-- Если аниматроник держал проп, ничего не делаем.
		if IsValid(ply:GetEntityInUse()) then return end 
		-- Ищем ближайшего выжившего от глаз, на расстоянии 125, с FOV 36
		local target = FindNearestPlayer(ply:EyePos(), 125, ply, 36)
		
		local success = performJumpscare(ply, ent, target, 1.6, "bon", 50, "v_bon")
		
		-- Если не нашли цель, или скример не произошёл, пытаемся сломать что-нибудь перед игроком
		if !IsValid(target) or not success then
			AnimatronicBreakProp(ply, ent)
		end
	end
}

-- Бинд +RELOAD аниматроника
BON.reload=function(ply,ent) 
	-- Просвет по дистанции, со встроенным счётчиком КД.
	highlight.ByDistance(ply, ent)
end

-- Приземление аниматроника
BON.land=function(ply,ent)
	if ply:WaterLevel() < 2 then
		-- Умная проверка, взятая из кода ванильных аниматроников.
		if ply._wereJumpingPill or not ply._wereJumpingPill and ply:GetVelocity().z < -270 then
			if not ply._jumpPosPill or ply._jumpPosPill and ply:GetPos():Distance(ply._jumpPosPill) > 150 then
				ent:PillAnim("land",true)
			end
		end
	end
end

-- Регистрируем аниматроника в базу pills
pills.register("custom_bon", BON) 

-- Регистрация аниматроника в базу FH
-- после этого его можно найти в Админ-Панели и сделать играбельным
killers.Register("custom_bon", "bon", "fh.custom.animatronics.bon", Color(93, 135, 135), "Walten Files") 

-- Добавляем способности аниматронику, которые будут отображаться в интерфейсе
killers.SetAbilities("bon", {
	{ name = 'highlight', key = 'R', duration = 0 },
	{ name = 'kill', key = 'LMB', duration = 0, hidden = true },
})
```

См. [Полное обьяснение структуры Пилла →](/guide/animatronics/pill-structure-registration.md)

*(опц.)* Так как третьим аргументом в `killers.Register(...)` мы ввели `fh.custom.animatronics.bon`, нужно создать файл перевода с этим ключём (например `resource/localization/ru/fhbon.properties`):

```properties
fh.custom.animatronics.bon=Бон
```

См. [Функции FH →](/reference/functions.md)

## Шаг 4. Выдача аниматроника через код

Теперь, если вы хотите выдать аниматроника конкретному игроку, можно использовать:

```lua
local target = player.GetAll()[1]  -- первый игрок
if IsValid(target) then
	giveKiller(target, "custom_bon", true)
end
```

## Что дальше

Теперь, когда у вас есть аниматроник, изучите:

- **[PillCostumeMeta](/reference/pillcostume-meta.md)** — узнать как проигрываются анимации, звуки на Пилле
- **[Функции FH](/reference/functions.md)** — встроенные функции скримера и т.д.
- **[Хуки аниматроников](/hooks/animatronics.md)** — для перехвата скримеров и т.д.
- **[Способности аниматроников](/hooks/abilities.md)** — хуки конкретных способностей

::: tip Совет
Не забывайте проверять валидность игроков (`IsValid(ply)`) перед вызовом методов — на них игрок может успеть отключиться от сервера.
:::