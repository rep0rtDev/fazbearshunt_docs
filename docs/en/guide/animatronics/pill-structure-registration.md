# What is Pill Structure

**Pill Structure** is what we call the table, the second argument in registration via `pills.register(name, {...})`, which contains all the information about our Pill: model, abilities, animations, speed, sounds, etc.

## All main structure parameters

The following parameters are most commonly needed in a Pill:

| Parameter | Type | Description |
|---|---|---|
| `printName` | `string` | Full name **REQUIRED** |
| `model` | `string` | Path to the model (must start with `"models/"`) |
| `type` | `string` | **REQUIRED AND MUST ALWAYS BE `ply`** |
| `hull` | [Vector](https://wiki.facepunch.com/gmod/Global.Vector) | Hitbox (third argument is height) |
| `duckBy` | `float` | How many units the Pill crouches |
| `health` | `float` | Maximum health (If not specified — immortality is enabled) |
| `jumpPower` | `float` | Jump power |
| `anims` | `table[...]` | Model animations |
| `sounds` | `table[...]` | Sounds |
| `moveSpeed` | `table[...]` | Movement speed |
| `attack` | `table[...]` | Pill LMB |
| `attack2` | `table[...]` | Pill RMB |
| `reload` | `function(ply, ent)` | Pill +reload bind |
| `jump` | `function(ply, ent)` | Jump |
| `land` | `function(ply, ent)` | Landing |

There are also additional parameters:

| Parameter | Type | Description |
|---|---|---|
| `camera` | `table[...]` | First-person and third-person camera settings |
| `viewmodel` | `table[...]` | SWEP class and settings that will serve as the Pill's first-person hands |
| `modelScale` | `string` | Model scale |
| `bloodType` | `int` | Blood type *(See Enum [BLOOD_COLOR](https://wiki.facepunch.com/gmod/Enums/BLOOD_COLOR))* |
| `muteSteps` | `bool` | Mute player footsteps? |
| `noFallDamage` | `bool` | Disable fall damage? |
| `chaseTheme` | `string` | Chase theme (e.g., `default`) |
| `movePoseMode` | `string` | If the model supports `move_x` and `move_y` pose parameters, enter `xy`. *The `move_yaw` parameter has not been tested for functionality yet* |
| `aim` | `table[...]` | Specifies which pose parameters to use for rotating the Pill's body along with the player's camera |
| `collisionGroup` | `int` | Collision group *(See Enum [COLLISION_GROUP](https://wiki.facepunch.com/gmod/Enums/COLLISION_GROUP))* |
| `killCondition` | `function(ply, ent)` | If present and returns `true`, draws a kill icon on the player's cursor |
| `startFunction` | `function(ply, ent)` | Triggers after the player becomes the Pill |
| `onRemove` | `function(ent, formTable, ply)` | Triggers after the Pill is removed (i.e., the player changed Pill, or became a survivor) |
| `onRemovePost` | `function(ent, formTable, ply)` | Same as above |
| `restore` | `function(ent, formTable, ply)` | Same as above, but **NOT CALLED** if the player **CHANGED PILL** |
| `taunt` | `function(ply, ent, act)` | Triggers when the player uses the `act` command |
| `moveMod` | `function(ply, ent, mv, cmd)` | Allows handling Pill movement inside `SetupMove` |
| `animStopped` | `function(ply, ent, anim)` | Called after an animation ends (Not called if a layered animation ends) |
| `animEvent` | `function(ply, ent, eventName, time, cycle, type, options)` | Called in `ENT:HandleAnimEvent(...)` |
| `boneMorphs` | `table[...]` | Used to change bone position, rotation, and scale |

:::warning
`onRemove` and `onRemovePost` are called on both the server and the client. Also note that the arguments in the function are not what you might be used to starting with the player; here we have `(ent, formTable, ply)`

`killCondition` is called only on the client.
:::

Parameters that are not used anywhere in the gamemode, but exist:

| Parameter | Type | Description |
|---|---|---|
| `flashlight` | `function(ply, ent)` | Called when the flashlight is **turned on** (If the player **turns off** the flashlight — not called) |
| `glideThink` | `function(ply, ent)` | Called while the player is not on the ground |
| `die` | `function(ply, ent)` | After the player controlling the Pill dies |
| `visColor` | [Color](https://wiki.facepunch.com/gmod/Global.Color) | Colors the Pill model with the given color |
| `visColorRandom` | `bool` | Colors the Pill model with a random color |
| `flies` | `bool` | Should the Pill fly instead of walk? |
| `cloak` | `table[...]` | Built-in invisibility system in the database, most likely **DOES NOT WORK** |
| `loadout` | `table[Weapon]` | Gives weapons from the table `(MAY BE REMOVED IN FUTURE UPDATES)` |
| `ammo` | `table[...]` | Gives ammo from the table `(MAY BE REMOVED IN FUTURE UPDATES)` |

Alternative <span class="fh-badge shared">SHARED</span> versions of `attack`, `attack2`, and `reload`:

| Parameter | Type | Description |
|---|---|---|
| `attack_sh` | `function(ply, ent)` | Same as `attack` |
| `attack2_sh` | `function(ply, ent)` | Same as `attack2` |
| `reload_sh` | `function(ply, ent)` | Same as `reload` |
| `attack_sh_nolc` | `function(ply, ent)` | Same as `attack`, but without Lag Compensation |
| `attack2_sh_nolc` | `function(ply, ent)` | Same as `attack2`, but without Lag Compensation |
| `reload_sh_nolc` | `function(ply, ent)` | Same as `reload`, but without Lag Compensation |

:::tip Note
Instead of versions without Lag Compensation, you can simply use the <span class="fh-badge shared">SHARED</span> versions and disable it yourself using [Player:LagCompensation(false)](https://wiki.facepunch.com/gmod/Player:LagCompensation)
:::

# More about parameters

You may have noticed that many parameters require a `table[...]`, but what is that? - These are tables with dynamic keys and values. Next, we'll take a closer look at how these tables are structured.

### anims

```lua
anims={
	-- Inside default are all the Pill's animations
	-- except layered ones, those will be below
	default={
		-- The following animations switch automatically
		-- On the right must be the names of the model's animations,
		-- On the left are strictly specified names
		idle = "Idle_01",
		walk = "Walking",
		run = "Running",
		jump = "Jump_1",
		glide = "Air_01", -- In air
		swim = "Swim_01", -- In water
		crouch = "Crawl",
		crouch_walk = "CrawlMovement",
		noclip = "Air_02", -- In noclip
		
		-- You can also add your own animations,
		-- which can be played using
		-- ent:PillAnim(name, freeze)
		stun = "TaserStun",
		land = "LandHard",
	},
	-- Layered animations that can be
	-- played using
	-- ent:PillGesture(name, priority, rate, blendin, blendout, startFrame)
	gestures={
		melee = "Melee_01",
		land = "LandSoft",
		taken_damage = "body_Flinch01",
	},
	-- The following values cause animations
	-- to speed up if the Pill's speed exceeds them.
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
	-- Left side is the sound name, right side is the path to the sound
	scream = "fnaf2/bonniescream.wav",
	melee = "fnaf2/xscream2.wav",
}
-- Can be played using
-- ent:PillSound("melee", false)
```

### moveSpeed

```lua
moveSpeed={
	walk = 160, -- Walking
	run = 500, -- Running
	ducked = 90, -- Crouching
}
```

### attack, attack2

```lua
attack={
	-- "trigger" mode means the function below triggers on a single press
	-- however there are no other modes for this parameter.
	mode="trigger",
	-- Function that triggers when the parameter activates
	-- First argument is the player wearing the Pill, second is the Pill itself
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
	-- First-person camera offset
	offset = Vector(0, 0, 90), -- (third argument is height)
	-- Third-person camera distance from the Pill
	dist = 150
}
```

### viewmodel

```lua
viewmodel={
	weapon = "v_bear", -- SWEP class
	skin = 5, -- Skin
	bodyGroup = "Microphone", -- Bodygroup (changes its value to 1)
	func = function(wep) -- Function when given
		print("[TEST] We gave the player " .. wep:GetClass())
	end
},
```

### aim

```lua
aim={
	xPose = "aim_yaw", -- Pose parameter if the Pill rotates the camera left-right
	yPose = "aim_pitch", -- Pose parameter if the Pill rotates the camera up-down
	
	xInvert = true, -- Invert left-right
	yInvert = true -- Invert up-down
},
```

### boneMorphs

```lua
boneMorphs={
	-- Left side is bone name, right side is parameters in a table
	-- Parameters can be scale, pos, and ang
	["bip_eye_R"] = {scale = Vector(0.5,0.5,0.5)},
	["bip_eye_L"] = {scale = Vector(0.5,0.5,0.5)},
	["bip_EyeLid_0_R"] = {scale = Vector(0,0,0)},
	["bip_EyeLid_1_R"] = {scale = Vector(0,0,0)},
	["bip_EyeLid_0_L"] = {scale = Vector(0,0,0)},
	["bip_EyeLid_1_L"] = {scale = Vector(0,0,0)},
},
```

# Pill Template + Registration

Since writing out all these parameters manually can seem tedious (and it is), FH provides you with a template that contains all the main parameters!

Function:

```lua
local MY_PILL = GetPillTemplate()

PrintTable(MY_PILL)
```

Output:

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

After using the template, you can add or modify parameters:

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

And as the final step, we can now register our Pill at the end of our code:

```lua
pills.register("super_jump_freddy", MY_PILL)
```

:::warning Attention
Make sure our code loads after the gamemode loads. The easiest way to do this is:

```lua
hook.Add("OnGamemodeLoaded", "fh_mycustom_anim", function()
	-- make sure the server gamemode is Fazbear's Hunt
	if engine.ActiveGamemode() ~= "fazbearshunt" then return end
    
	-- Put your code here
end)
```
:::

If there are no errors, then calmly join any map, then open the Admin Panel *(press Q)* and go to the **Animatronics** section. Your Pill should be in the "Unknown" category.

::: tip Next step
Go to the [Registration into FH database →](/en/guide/animatronics/fh-registration.md) section to learn how to register an animatronic into the FH database.
:::