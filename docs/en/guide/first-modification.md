# First modification (Port)

In this guide, we will add an animatronic from a third-party Pill Pack from the Steam Workshop to Fazbear's Hunt as a full-fledged gamemode animatronic.

## Step 1. Find a Pill Pack

Go to Steam Workshop, find a Pill Pack with the animatronic you want to use. You can unpack the addon files in advance to know the path to the animatronic's model and the names of its animations.

::: warning Attention
The Pill Pack must be installed on both the server and the client, otherwise the game won't be able to use its model.
:::

## Step 2. Create a Lua script

Create the file `lua/autorun/my_animatronic.lua`:

```lua
hook.Add("OnGamemodeLoaded", "fh_mycustom_anim", function()
	-- make sure the server gamemode is Fazbear's Hunt
	if engine.ActiveGamemode() ~= "fazbearshunt" then return end
    
	-- We will write the code for adding the animatronic here
end)
```

::: warning Attention
For your modification to work, the gamemode itself needs to load first, and only then our code (example above). Unfortunately, using this method you will have to restart the map every time to test changes.
:::

As an example, we will use the Pill Pack [Bon The Rabbit](https://steamcommunity.com/sharedfiles/filedetails/?id=950845673)

## Step 3. Create Bon The Rabbit as an animatronic

To register an animatronic in the Pills database, use the `GetPillTemplate()` method.

```lua
-- Table with data that is common to most animatronics
local BON = GetPillTemplate() 

BON.printName="Bon The Rabbit" -- Full name of the animatronic
BON.model="models/gentoi/walterfiles/bon.mdl" -- Path to the model
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
		-- The screamer animation must be named exactly "scare" if you use performJumpscare()
		scare="kill",	
		-- Animation for when the animatronic is hit by the Taser.
		stun="stun",
	},
	gestures={
		-- Attack animation that can be seen, for example, when hitting a prop.
		melee="melee",	
	},
	-- If the animatronic runs faster than these speeds, the animations will speed up
	speedCap={
		walk = 60,
		run = 400,
		ducked = 40,
	},
}
-- Movement speed
BON.moveSpeed={
	walk=140,
	run=400,
	ducked=70,
}

-- Animatronic hitbox (third value is height)
BON.hull=Vector(32,32,90),

BON.camera={
	-- First-person camera offset for the animatronic
	offset = Vector(0, 0, 88),
	dist = 120 -- Third-person camera distance from the player
},

-- If your camera offset is 90 and duckBy is 70, then
-- while crouching the camera will be 20 units from the ground (90 - 70 = 20)
BON.duckBy=70,

-- Animatronic "hands" model. This specifies the SWEP name,
-- which you must prepare yourself.
BON.viewmodel={ weapon="v_bon" }

-- Triggers as soon as the animatronic is given to the player.
BON.startFunction=function(ply,ent) 
	-- This function enables built-in chase voicelines.
	chaseVoicelineChecker(ply, ent, "freddy") 
end

-- Tells the client when to show the kill icon on the cursor.
BON.killCondition=function(ply,ent) 
	local target = FindNearestPlayer(ply:EyePos(), 125, ply, 36)
	
	if IsValid(target) and not target:IsInvisible() and not target:IsJumpscared() then
		return true
	end
	return false
end

-- Animatronic LMB.
BON.attack={ 
	mode="trigger",
	func=function(ply,ent)
		-- If the animatronic is holding a prop, do nothing.
		if IsValid(ply:GetEntityInUse()) then return end 
		-- Find the nearest survivor from the eyes, at distance 125, with FOV 36
		local target = FindNearestPlayer(ply:EyePos(), 125, ply, 36)
		
		local success = performJumpscare(ply, ent, target, 1.6, "bon", 50, "v_bon")
		
		-- If no target was found, or the screamer didn't happen, try to break something in front of the player
		if !IsValid(target) or not success then
			AnimatronicBreakProp(ply, ent)
		end
	end
}

-- Animatronic +RELOAD bind
BON.reload=function(ply,ent) 
	-- Distance-based highlight, with built-in cooldown counter.
	highlight.ByDistance(ply, ent)
end

-- Animatronic landing
BON.land=function(ply,ent)
	if ply:WaterLevel() < 2 then
		-- Smart check taken from vanilla animatronic code.
		if ply._wereJumpingPill or not ply._wereJumpingPill and ply:GetVelocity().z < -270 then
			if not ply._jumpPosPill or ply._jumpPosPill and ply:GetPos():Distance(ply._jumpPosPill) > 150 then
				ent:PillAnim("land",true)
			end
		end
	end
end

-- Register the animatronic in the pills database
pills.register("custom_bon", BON) 

-- Register the animatronic in the FH database
-- after this it can be found in the Admin Panel and made playable
killers.Register("custom_bon", "bon", "fh.custom.animatronics.bon", Color(93, 135, 135), "Walten Files") 

-- Add abilities to the animatronic that will be displayed in the UI
killers.SetAbilities("bon", {
	{ name = 'highlight', key = 'R', duration = 0 },
	{ name = 'kill', key = 'LMB', duration = 0, hidden = true },
})
```

See [Full explanation of Pill structure →](/en/guide/animatronics/pill-structure-registration.md)

*(opt.)* Since we entered `fh.custom.animatronics.bon` as the third argument in `killers.Register(...)`, we need to create a translation file with this key (e.g., `resource/localization/en/fhbon.properties`):

```properties
fh.custom.animatronics.bon=Bon
```

See [FH Functions →](/en/reference/functions.md)

## Step 4. Give the animatronic via code

Now, if you want to give the animatronic to a specific player, you can use:

```lua
local target = player.GetAll()[1]  -- first player
if IsValid(target) then
	giveKiller(target, "custom_bon", true)
end
```

## What's next

Now that you have an animatronic, explore:

- **[PillCostumeMeta](/en/reference/pillcostume-meta.md)** — learn how animations, sounds play on the Pill
- **[FH Functions](/en/reference/functions.md)** — built-in screamer functions, etc.
- **[Animatronic Hooks](/en/hooks/animatronics.md)** — for intercepting screamers, etc.
- **[Animatronic Abilities](/en/hooks/abilities.md)** — hooks for specific abilities

::: tip Tip
Always check player validity (`IsValid(ply)`) before calling methods — the player might disconnect from the server.
:::