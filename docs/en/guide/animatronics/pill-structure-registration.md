# Что такое Структура Пилла

**Структурой Пилла** мы называем таблицу, второй аргумент в регистрации через `pills.register(name, {...})`, которая имеет все сведения о нашем Пилле: модель, способности, анимации, скорость, звуки и т.д.

## Все основные параметры структуры

Чаще всего в Пилле необходимы именно следующие параметры:

| Параметр | Тип | Описание |
|---|---|---|
| `printName` 		| `string` 					| Полное имя `ОБЯЗАТЕЛЕН` |
| `model` 			| `string` 					| Путь до модели (должен начинаться с `"models/"`) |
| `type` 			| `string` 	 				| `ОБЯЗАТЕЛЕН И ВСЕГДА ДОЛЖЕН УКАЗЫВАТЬ ply` |
| `hull` 			| [Vector](https://wiki.facepunch.com/gmod/Global.Vector) 				| Хитбокс (третий аргумент - высота) |
| `duckBy` 			| `float` 					| На сколько юнитов Пилл присаживается |
| `health` 			| `float` 					| Максимальное здоровье (Если не указать - включается бессмертие) |
| `jumpPower` 		| `float` 					| Сила прыжка |
| `anims` 			| `table[...]` 				| Анимации модели |
| `sounds` 			| `table[...]` 				| Звуки |
| `moveSpeed` 		| `table[...]` 				| Скорость передвижения |
| `attack` 			| `table[...]`				| ЛКМ Пилла |
| `attack2` 		| `table[...]`				| ПКМ Пилла |
| `reload` 			| `function(ply, ent)`		| Бинд +reload Пилла |
| `jump` 			| `function(ply, ent)`		| Прыжок |
| `land` 			| `function(ply, ent)`		| Приземление |

Также есть дополнительные параметры:

| Параметр | Тип | Описание |
|---|---|---|
| `camera` 				| `table[...]` 		| Настройки камера от первого и третьего лица |
| `viewmodel` 			| `table[...]` 		| Класс и настройки SWEP'а который будет служить Пиллу руками от первого лица |
| `modelScale` 			| `string`  	 	| Размер модели |
| `bloodType` 			| `int`  	 		| Тип крови *(См. Enum [BLOOD_COLOR](https://wiki.facepunch.com/gmod/Enums/BLOOD_COLOR))* |
| `muteSteps` 			| `bool`  	 		| Приглушить ходьбу игрока? |
| `noFallDamage` 		| `bool`  	 		| Отключить урон от падения? |
| `chaseTheme` 			| `string`  	 	| Тема погони (Например, `default`) |
| `movePoseMode` 		| `string`  	 	| Если модель поддерживает параметры поз `move_x` и `move_y`, то впишите `xy`. *Параметр `move_yaw` пока не проверен на работоспособность* |
| `aim` 		 		| `table[...]`  	| Указывает какие параметры поз использовать для поворота тела Пилла вместе с камерой игрока | 
| `collisionGroup`  	| `int`  			| Группа коллизии *(См. Enum [COLLISION_GROUP](https://wiki.facepunch.com/gmod/Enums/COLLISION_GROUP))* |
| `killCondition` 		| `function(ply, ent)`  			| Если есть, и возвращает `true`, то рисует значок убийства у курсора игрока |
| `startFunction`  		| `function(ply, ent)`  			| Срабатывает после того как игрок стал Пиллом |
| `onRemove`   			| `function(ent, formTable, ply)`  	| Срабатывает после удаления Пилла (т.е. игрок сменил Пилл, или стал выжившим) |
| `onRemovePost` 		| `function(ent, formTable, ply)`  	| Тоже самое что и сверху |
| `restore`  			| `function(ent, formTable, ply)`  	| Тоже самое что и сверху, но не вызывается если игрока **СМЕНИЛ ПИЛЛ** |
| `taunt`  				| `function(ply, ent, act)`  		| Срабатывает, при использовании игроком команды `act` |
| `moveMod`  			| `function(ply, ent, mv, cmd)`  	| Позволяет обработать передвижение Пилла внутри `SetupMove` |
| `animStopped`  		| `function(ply, ent, anim)`  		| Вызывается после того как закончилась анимация (Не вызывается если закончился слоёная анимация) |
| `animEvent`  			| `function(ply, ent, eventName, time, cycle, type, options)`  		| Вызывается в `ENT:HandleAnimEvent(...)` |
| `boneMorphs` 			| `table[...]` 		| Используется для изменения позиции, поворота и размера костей |

:::warning
`onRemove` и `onRemovePost` вызываются как на сервере, так и на клиенте. Также учтите что аргументы в функции не начинаются как можно привыкнуть с игрока, тут у нас `(ent, formTable, ply)`

`killCondition` вызывается только на клиенте.
:::

Параметры, которые не используются нигде в режиме, но они есть:

| Параметр | Тип | Описание |
|---|---|---|
| `flashlight` 			| `function(ply, ent)` 		| Вызывается когда фонарик **включается** (Если игрок **выключает** фонарик - не вызывается) |
| `glideThink` 			| `function(ply, ent)` 		| Вызывается пока игрок не на земле |
| `die` 				| `function(ply, ent)` 		| После смерти игрока, владеющим Пиллом |
| `visColor` 			| [Color](https://wiki.facepunch.com/gmod/Global.Color) 		| Красит модель Пилла в данный цвет |
| `visColorRandom` 		| `bool` 					| Красит модель Пилла в случайный цвет |
| `flies` 				| `bool` 					| Пилл должен летать, а не ходить? |
| `cloak` 				| `table[...]` 				| Встроенная в базу система невидимости, скорее всего **НЕ РАБОТАЕТ** |
| `loadout` 			| `table[Weapon]` 			| Выдаёт оружие из таблицы `(МОЖЕТ БЫТЬ УДАЛЕНО В СЛЕДУЮЩИХ ОБНОВЛЕНИЯХ)` |
| `ammo` 				| `table[...]` 				| Выдаёт патроны из таблицы `(МОЖЕТ БЫТЬ УДАЛЕНО В СЛЕДУЮЩИХ ОБНОВЛЕНИЯХ)` |

Альтернативные <span class="fh-badge shared">SHARED</span> варианты `attack`, `attack2` и `reload`:

| Параметр | Тип | Описание |
|---|---|---|
| `attack_sh` 			| `function(ply, ent)` 		| Тоже самое, что и `attack` |
| `attack2_sh` 			| `function(ply, ent)` 		| Тоже самое, что и `attack2` |
| `reload_sh` 			| `function(ply, ent)` 		| Тоже самое, что и `reload` |
| `attack_sh_nolc` 		| `function(ply, ent)` 		| Тоже самое, что и `attack`, но без Лаг-Компенсации |
| `attack2_sh_nolc` 	| `function(ply, ent)` 		| Тоже самое, что и `attack2`, но без Лаг-Компенсации |
| `reload_sh_nolc` 		| `function(ply, ent)` 		| Тоже самое, что и `reload`, но без Лаг-Компенсации |

:::tip На заметку
Вместо версий без Лаг-Компенсации можно просто использовать версии <span class="fh-badge shared">SHARED</span> и самостоятельно выключать её с помощью [Player:LagCompensation(false)](https://wiki.facepunch.com/gmod/Player:LagCompensation)
:::

# Подробнее о параметрах

Скорее всего вы заметили, многие параметры требуют таблицу `table[...]`, но что это такое? - Это таблицы с динамичными ключами и значениями. Далее мы разберём поподробнее как устроены эти таблицы.

### anims

```lua
anims={
	-- Внутри default хранятся все анимации Пилла
	-- кроме слоёных, они будут ниже
	default={
		-- Следующие анимации переключаются автоматически
		-- Справа должны быть названия анимаций самой модели,
		-- А слева строго указанные названия
		idle = "Idle_01",
		walk = "Walking",
		run = "Running",
		jump = "Jump_1",
		glide = "Air_01", -- В воздухе
		swim = "Swim_01", -- В воде
		crouch = "Crawl",
		crouch_walk = "CrawlMovement",
		noclip = "Air_02", -- В ноуклипе
		
		-- Также можно добавить свои анимации,
		-- Которые можно будет включить с помощью
		-- ent:PillAnim(name, freeze)
		stun = "TaserStun",
		land = "LandHard",
	},
	-- Слоёные анимации, которые можно будет
	-- включить с помощью
	-- ent:PillGesture(name, priority, rate, blendin, blendout, startFrame)
	gestures={
		melee = "Melee_01",
		land = "LandSoft",
		taken_damage = "body_Flinch01",
	},
	-- Следующие значения заставляют анимации
	-- Ускоряться, если скорость Пилла их превышает.
	speedCap={
		walk = 160,
		run = 500,
		ducked = 90,
	},
}
```

### sounds

```lua
sounds={
	-- Слева название звука, а справа - путь к звуку
	scream = "fnaf2/bonniescream.wav",
	melee = "fnaf2/xscream2.wav",
}
-- Можно воспроизвести с помощью
-- ent:PillSound("melee", false)
```

### moveSpeed

```lua
moveSpeed={
	walk = 160, -- Ходьба
	run = 500, -- Бег
	ducked = 90, -- Вприсяди
}
```

### attack, attack2

```lua
attack={
	-- режим "trigger" Обозначает что функция ниже сработает при единичном нажатии
	-- однако других режимов у параметра нет.
	mode="trigger",
	-- Функция при срабатывании параметра
	-- Первый аргумент это игрок носящий Пилл, второй это сам Пилл
	func=function(ply,ent)
		local target = FindNearestPlayer(ent:GetPos(), 130, ply, 32)
		if not IsValid(target) then return end
		target:TakeDamage(target:Health() + 500, ply)
		
		ent:PillSound("melee",false)
	end
}
```

### camera

```lua
camera = {
	-- Оффсет камеры от первого лица
	offset = Vector(0, 0, 90), -- (третий аргумент - высота)
	-- Дистанция камеры от Пилла от третьего лица
	dist = 150
}
```

### viewmodel

```lua
viewmodel={
	weapon = "v_bear", -- класс SWEP'а
	skin = 5, -- Скин
	bodyGroup = "Microphone", -- Бодигруп (меняет его значение на 1)
	func = function(wep) -- Функция при выдаче
		print("[TEST] Мы выдали игроку " .. wep:GetClass())
	end
},
```

### aim

```lua
aim={
	xPose = "aim_yaw", -- Параметр позы если Пилл крутит камерой влево-вправо
	yPose = "aim_pitch", -- Параметр позы если Пилл крутит камерой вверх-вниз
	
	xInvert = true, -- Инвертировать лево-право
	yInvert = true -- Инвертировать вверх-вниз
},
```

### boneMorphs`

```lua
boneMorphs={
	-- Слева название кости, справа параметры в таблице
	-- Параметрами могут быть scale, pos и ang
	["bip_eye_R"] = {scale = Vector(0.5,0.5,0.5)},
	["bip_eye_L"] = {scale = Vector(0.5,0.5,0.5)},
	["bip_EyeLid_0_R"] = {scale = Vector(0,0,0)},
	["bip_EyeLid_1_R"] = {scale = Vector(0,0,0)},
	["bip_EyeLid_0_L"] = {scale = Vector(0,0,0)},
	["bip_EyeLid_1_L"] = {scale = Vector(0,0,0)},
},
```

# Шаблон Пилла + Регистрация

Так как прописывание всех этих параметров вручную может показаться муторным (оно так и есть), FH предлагает вам шаблон, в котором есть все основные параметры!

Функция:

```lua
local MY_PILL = GetPillTemplate()

PrintTable(MY_PILL)
```

Вывод:

```
["aim"]:
		["xPose"]	=	aim_yaw
		["yPose"]	=	aim_pitch
["bloodType"]	=	3
["camera"]:
		["dist"]	=	150
		["offset"]	=	0.000000 0.000000 90.000000
["duckBy"]	=	60
["health"]	=	10000
["hull"]	=	32.000000 32.000000 86.000000
["jump"]	=	function: 0x8088097784fcdbb2
["jumpPower"]	=	250
["movePoseMode"]	=	xy
["muteSteps"]	=	true
["noFallDamage"]	=	true
["sounds"]:
		["jump"]	=	jump.mp3
		["land"]	=	land.mp3
		["melee"]	=	fnaf2/xscream2.wav
["type"]	=	ply
```

После того как использовали шаблон, можно добавлять, или изменять параметры:

```lua
local MY_PILL = GetPillTemplate()

MY_PILL.printName = "Super Jump Freddy"
MY_PILL.model="models/speps/pill/oldfreddy.mdl"
MY_PILL.jumpPower = 500
MY_PILL.anims={
	default={
		idle = "idle",
		crouch = "crouch",
		crouch_walk = "crouchmove",
		walk = "walk",
		run = "run",
		jump = "jump",
		glide = "air",
		land = "land",
	}
}
MY_PILL.moveSpeed={
	walk = 150,
	run = 490,
	ducked = 70,
}
MY_PILL.viewmodel={	weapon="v_freddy" }
```

И как финальный этап, теперь мы можем зарегистрировать наш Пилл, в конце нашего кода:

```lua
pills.register("super_jump_freddy", MY_PILL)
```

:::warning Внимание
Убедитесь, что наш код загружается после того как загружается режим. Проще всего это сделать так:

```lua
hook.Add("OnGamemodeLoaded", "fh_mycustom_anim", function()
	-- надо убедиться что режим сервера - Fazbear's Hunt
	if engine.ActiveGamemode() ~= "fazbearshunt" then return end
    
	-- Сюда пишем код
end)
```
:::

Если никаких ошибок нет, то теперь спокойно заходите на любую карту, затем открывайте Админ-Панель *(на Q)* и заходите в раздел **Аниматроники**. В категории "Неизвестные" должен лежать ваш Пилл.


::: tip Следующий шаг
Перейдите к разделу [Регистрация в базу FH →](/guide/animatronics/fh-registration.md), чтобы узнать, как зарегистрировать аниматроника в базу FH.
:::