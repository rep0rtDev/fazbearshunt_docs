# Animatronics

A quick reference for working with animatronics in Fazbear's Hunt.

## How animatronics work

Each animatronic in FH is a **Pill Pack** ([Pill Pack](https://steamcommunity.com/sharedfiles/filedetails/?id=104604943)) with a specific technical name (e.g., `pill_wfreddy2`).

The gamemode defines:
- **Playable** — can be selected as the main animatronic of the round
- **Secondary** — can appear as additional ones

## Basic operations

### Add an animatronic to the mode

```lua
pill_makePreferable("pill_wfreddy2", true)
```

### Make secondary

```lua
pill_makeSecondary("pill_wbonnie2", true)
```

### Get a player's animatronic model

```lua
local ent = pk_pills.getMappedEnt(ply)
if IsValid(ent) then
    print("Model:", ent:GetModel())
end
```

## Reacting to abilities

Use hooks to react to animatronic actions:

| Animatronic | Hook | Description |
|---|---|---|
| Freddy | [`FH_BlindRageStart`](/en/hooks/abilities.md#freddy) | Blind Rage started |
| Bonnie | [`FH_YoursMineStart`](/en/hooks/abilities.md#bonnie) | Through Your Eyes started |
| Chica | [`FH_MinePlanted`](/en/hooks/abilities.md#chica) | Cupcake planted |
| Shadow Freddy | [`FH_SFreddySubmergeIn`](/en/hooks/abilities.md#shadow-freddy) | Fading into invisibility |
| Golden Freddy | [`FH_OutworldStart`](/en/hooks/abilities.md#golden-freddy) | Outworld Dimension |

See full list: [Animatronic abilities →](/en/hooks/abilities.md)

## Screamers

A screamer is the animatronic's climax action. Intercepting screamers is done via:

- [`FH_PlayerShouldJumpscare`](/en/hooks/animatronics.md#fh_playershouldjumpscare) — can be canceled
- [`FH_AnimatronicJumpscare`](/en/hooks/animatronics.md#fh_animatronicjumpscare) — after a successful screamer
- [`FH_JumpscareEvent`](/en/hooks/animatronics.md#fh_jumpscareevent) — before freezing the victim

## Creating a custom screamer

```lua
hook.Add("KeyPress", "MyJumpscare", function(ply, key)
    if not ply:IsAnimatronic() then return end
    if key ~= IN_ATTACK then return end

    local ent = pk_pills.getMappedEnt(ply)
    if not IsValid(ent) then return end

    local target = FindNearestPlayer(ply:GetPos(), 80, ply, 90)
    if not IsValid(target) or not target:IsSurvivor() then return end

    -- 1. Play your own animation...
    -- 2. Trigger FH screamer
    jumpscareEvent(ply, ent, target, ply:GetPos():Distance(target:GetPos()))
end)
```
