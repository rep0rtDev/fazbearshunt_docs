# What is Viewmodel

**Viewmodel** is the weapon model that the player holds in first-person view. You could say that animatronics receive a weapon upon spawning, but with their own hand model and logic for playing animations during movement, screaming, etc.

In this section, we will **NOT** explain what a **SWEP** is or how to create a hand model. We will only explain how to prepare your own **Viewmodel** for an animatronic.

---

# v_base

**v_base** is a base for SWEPs that contains convenient functions for adding and managing animations. Using it, the game will automatically play walking, running, jumping, landing animations, etc. But before sitting down to code, a few details need to be clarified.

---

## Preparing the .qc file

For **v_base** to be able to add animations for future playback, you need to add a unique `activity "ACTIVITY_NAME" 1` for each animation (See [ACT](https://wiki.facepunch.com/gmod/Enums/ACT)).

The activity name can be anything, as long as it is unique for each animation.

Example:

```c++
// Hand appearance animation
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

// Second walk option
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

After this, compile the model.

---

### Preparing the script

We want the **Viewmodel** to register after the gamemode loads, otherwise it will not be able to inherit the **v_base**.

Create a file at:

```
garrysmod/addons/my_fh_addon/
└── gamemodes/
    └── fazbearshunt/
        └── entities/weapons/
			└── v_NAME.lua
```

:::tip Note
The **Viewmodel** file name should start with `v_` to distinguish them from weapons, which have the prefix `weapon_`.
:::

Then, our file should look something like this:

```lua
-- swep name
SWEP.PrintName = "Bon SWEP"
-- Base mentioned earlier
SWEP.Base = "v_base"

if CLIENT then
	-- Optional, but create a ConVar for each animatronic
	-- to change the swep FOV	
	local vfov = CreateClientConVar('cl_fov_bon', 104, true, false, 'Fov of Bon')
	SWEP.ViewModelFOV = vfov:GetFloat() or 104
    
    cvars.AddChangeCallback("cl_fov_bon", function(name, old_value, new_value)
		local wep = LocalPlayer():GetActiveWeapon()
		if IsValid(wep) and string.StartWith(wep:GetClass(), "v_") then
			wep.ViewModelFOV = tonumber(new_value) or 104
		end
    end)
end

-- Path to the swep model
SWEP.ViewModel = "models/gentoi/walterfiles/vm/bon.mdl"

-- Function where you need to add your animations
function SWEP:SetupAnimations()
	-- Add "draw" and "scare" animations
	self:AddAnimation("draw")
	self:AddAnimation("scare")
end

function SWEP:Think()
	-- If writing custom logic, please keep this return!
    return self.BaseClass.Think and self.BaseClass.Think(self)
end
```

Now you can enter the gamemode, and if there are no errors, you can give the **Viewmodel** to the animatronic. Simply add the `viewmodel` parameter to the Pill structure:

```lua
viewmodel = {
	weapon="v_bonbon",
	skin=1, -- Optional, if you want to change the skin
	func=function(wep)
		-- Code here executes when the hands are given
	end
}
```

See [Pill Structure and Registration →](/en/guide/animatronics/pill-structure-registration.md)

---

## Controlling the Viewmodel

As mentioned earlier, animations can be controlled using the following functions:

### `SWEP:AddAnimation(anim, act, name, noForce)`

Adds or replaces an animation.

If only the first argument is specified, it will search for the animation by that name.
If the second or third argument is specified, it will search for the animation in the model by them.

| Parameter | Type | Description |
|---|---|---|
| `anim` | `string` | Name of our Viewmodel animation |
| `act` | `number` | Activity name of the model's animation |
| `name` | `string` | Name of the model's animation |
| `noForce` | `bool` | If `true`, does not replace the animation if it already exists |

```lua
-- Freddy has a second walk animation option "slowwalk"
-- Replace his normal walking when given:
viewmodel={
	weapon="v_freddy",
	func=function(wep)
		wep:AddAnimation("walk", nil, "slowwalk")
	end
},
```

### `SWEP:HandleGroundAnim()`

Should movement animations play even if the player is not on the ground?

Returns `false` by default.

### `SWEP:AlwaysRunning()`

Is the player ALWAYS running? Useful for animatronics like Plushtrap who have the same running and walking speed.

Returns `false` by default.