# Что такое Viewmodel

**Viewmodel** - это модель оружия, которую держит игрок, но от первого лица. То есть, можно сказать что аниматроники при спавне получают оружие, но с моделью своих рук и логикой произведения анимаций при передвижении, скримере и т.д.

В этом разделе мы **НЕ расскажем** что такое **SWEP** или как создать модель рук, мы лишь расскажем как подготовить свою **Viewmodel** для аниматроника.

---

# v_base

**v_base** - Это база для SWEP, которая хранит в себе удобные функции для добавления и управления анимациями. Используя её, игра сама будет включать анимации ходьбы, бега, прыжков, приземлений и т.д. Но перед тем как сесть за программирование нужно уточнить пару деталей.

---

## Подготовка .qc файла

Чтобы **v_base** смог добавить анимации для будущего проигрывания, для каждой анимации нужно добавить уникальный `activity "ИМЯ_АКТИВНОСТИ" 1` (См. [ACT](https://wiki.facepunch.com/gmod/Enums/ACT)).

Имя активности может быть вообще любым, главное чтобы для каждой анимации оно было уникальным.

Пример:

```c++
// Анимация появления рук
$sequence "draw" {
	"oldfreddy_anims\draw"
	activity "ACT_VM_DRAW" 1
	fadein 0.2
	fadeout 0.2
	fps 24
}

$sequence "idle" {
	"oldfreddy_anims\idle"
	activity "ACT_IDLE" 1
	fadein 0.3
	fadeout 0.4
	fps 24
	loop
}

$sequence "walk" {
	"oldfreddy_anims\walk"
	activity "ACT_WALK" 1
	fadein 0.3
	fadeout 0.4
	fps 24
	loop
}

// Второй вариант ходьбы
$sequence "slowwalk" {
	"oldfreddy_anims\slowwalk"
	activity "ACT_WALK_STEALTH" 1
	fadein 0.3
	fadeout 0.4
	fps 22
	loop
}

$sequence "run" {
	"oldfreddy_anims\run"
	activity "ACT_VM_SPRINT_IDLE" 1
	fadein 0.3
	fadeout 0.4
	fps 24
	loop
}
```

После этого смело компилируйте модель.

---

### Подготовка скрипта

В наших интересах сделать так, чтобы **Viewmodel** зарегистрировалась позже загрузки режима, иначе она не сможет унаследовать базу **v_base**.

Создадим файл по пути:

```
garrysmod/addons/my_fh_addon/
└── lua/
    └── autorun/
        └── v_ИМЯ.lua
```

:::tip На заметку
Название файла **Viewmodel** стоит начинать с `v_`, чтобы различать их от оружия, у которого приставка `weapon_`
:::

Затем, наш файл должен выглядеть примерно так:

```lua
local SWEP = {}

-- Название рук
SWEP.PrintName = "Bon SWEP"
-- База, про которую говорили ранее
SWEP.Base = "v_base"

if CLIENT then
	-- Необязательно, но для каждого аниматроника создаём
	-- ConVar для изменения FOVа рук	
	local vfov = CreateClientConVar('cl_fov_bon', 104, true, false, 'Fov of Bon')
	SWEP.ViewModelFOV = vfov:GetFloat() or 104
    
    cvars.AddChangeCallback("cl_fov_bon", function(name, old_value, new_value)
		local wep = LocalPlayer():GetActiveWeapon()
		if IsValid(wep) and string.StartWith(wep:GetClass(), "v_") then
			wep.ViewModelFOV = tonumber(new_value) or 104
		end
    end)
end

-- Путь до модели рук
SWEP.ViewModel = "models/gentoi/walterfiles/vm/bon.mdl"

-- Функция где нужно добавлять свои анимации
function SWEP:SetupAnimations()
	-- Добавляем анимации "draw" и "scare"
	self:AddAnimation("draw")
	self:AddAnimation("scare")
end

function SWEP:Think()
	-- Если пишите кастомную логику, пожалуйста оставляйте такой return!
    return self.BaseClass.Think and self.BaseClass.Think(self)
end

-- Регистрируем наш Viewmodel только после того, как загрузился режим.
hook.Add("PostGamemodeLoaded", "fh_bon_register", function()
	if engine.ActiveGamemode() ~= "fazbearshunt" then return end
	
	weapons.Register( SWEP, "v_bonbon" )
end)
```

Теперь можно заходить в режим, и если нет никаких ошибок, можно выдавать **Viewmodel** аниматронику. Надо всего лишь добавить в структуру Пилла параметр `viewmodel`

```lua
viewmodel = {
	weapon="v_bonbon",
	skin=1, -- Необязательно, но если хотите поменять скин
	func=function(wep)
		-- Код здесь выполняется при выдаче рук
	end
}
```

См. [Структура и Регистрация Пилла →](/guide/animatronics/pill-structure-registration.md)

---

## Управление Viewmodel

Как говорилось ранее, анимациями можно управлять, с этим нам помогут следующие функции:

### SWEP:AddAnimation(anim, act, name, noForce)

Добавляет или заменяет анимацию. 

Если указать только первый аргумент - будет искать анимацию именно по нему.
Если указать второй или третий аргумент - будет искать анимацию в модели по ним.

| Параметр | Тип | Описание |
|---|---|---|
| `anim` 		| `string`	| Имя анимации нашего Viewmodel |
| `act` 		| `number` 	| Имя активности анимации модели. |
| `name` 		| `string` 	| Название анимации модели |
| `noForce` 	| `bool` 	| Если `true`, не заменяет анимацию если такая уже есть |

```lua
-- У фредди есть второй вариант анимации ходьбы "slowwalk"
-- Заменим его обычную ходьбу при выдаче:
viewmodel={
	weapon="v_freddy",
	func=function(wep)
		wep:AddAnimation("walk", nil, "slowwalk")
	end
},
```

### SWEP:HandleGroundAnim()

Стоит ли проигрывать анимации передвижения, даже если не на земле?

По умолчанию возвращает `false`

### SWEP:AlwaysRunning()

Игрок ВСЕГДА бегает? Полезно для таких аниматроников как Плюштрап, который имеет одинаковую скорость бега и ходьбы.

По умолчанию возвращает `false`