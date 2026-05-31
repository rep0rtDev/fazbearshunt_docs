# Animatronics

A quick reference for working with animatronics in Fazbear's Hunt.

## How animatronics work

All animatronics in FH are registered using the same method as in [Parakeets Pill Pack](https://steamcommunity.com/sharedfiles/filedetails/?id=950845943), but with small adjustments and new features for Pills that give developers more capabilities.

The gamemode defines:
- **Playable** — can appear in the selection at the start of a normal round
- **Secondary** — can appear in the selection only if there are more than two animatronics

## Basic operations

### Add an animatronic to the selection

```lua
pill_makePreferable("pill_springtrap", true)
```

:::tip Avoid
Avoid dynamically changing an animatronic's playability, as playability can be changed at any time in the Admin Panel.
:::

### Make secondary

```lua
-- Shadow Freddy now appears in the selection even if there aren't enough animatronics
pill_makeSecondary("pill_sfreddy2", false)
```

### Get a player's animatronic model

```lua
local ent = pills.getMappedEnt(ply)
if IsValid(ent) then
    print("Model:", ent:GetModel())
end
```

You can also get the Pill structure

```lua
local ent = pills.getMappedEnt(ply)
if IsValid(ent) then
    if ent.formTable.reload then
		print("Pill has a +reload bind ability!")
	else
		print("Pill does not have a +reload ability")
	end
end
```

:::tip Difference
The gamemode adds a `ply:GetPill()` function to [`PlayerMeta`](/en/reference/player-meta.md), but it directly calls `pills.getMappedEnt(ply)`, so it is recommended to use the latter for optimization.
:::

## Reacting to abilities

Use hooks to react to animatronic actions:

| Animatronic | Hook | Description |
|---|---|---|
| Freddy | [`FH_BlindRageStart`](/en/hooks/abilities.md#freddy) | Blind Rage started |
| Bonnie | [`FH_YoursMineStart`](/en/hooks/abilities.md#bonnie) | Through Your Mind started |
| Chica | [`FH_MinePlanted`](/en/hooks/abilities.md#chica) | Cupcake planted |
| Shadow Freddy | [`FH_SFreddySubmergeIn`](/en/hooks/abilities.md#shadow-freddy) | Fading into invisibility |
| Golden Freddy | [`FH_OutworldStart`](/en/hooks/abilities.md#golden-freddy) | Outworld Dimension |

See full list: [Animatronic abilities →](/en/hooks/abilities.md)

## Jumpscares

A jumpscare is the animatronic's climax action. Intercepting jumpscares is done via:

- [`FH_PlayerShouldJumpscare`](/en/hooks/animatronics.md#fh_playershouldjumpscare) — can be canceled
- [`FH_AnimatronicJumpscare`](/en/hooks/animatronics.md#fh_animatronicjumpscare) — after a successful jumpscare
- [`FH_JumpscareEvent`](/en/hooks/animatronics.md#fh_jumpscareevent) — before freezing the victim

## Creating a custom jumpscare

```lua
function simpleJumpscare(ply, ent)
	local target = FindNearestPlayer(ply:EyePos(), 120, ply, 36)
				
	local success = performJumpscare(ply, ent, target, 1.6)

	if success then
		print( "[TEST] Animatronic " .. ply:Nick() .. " jumpscared " .. target:Nick() )
	end
end
```