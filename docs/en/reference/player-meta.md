# PlayerMeta

Extensions to the [Player](https://wiki.facepunch.com/gmod/Player) meta-table added by the Fazbear's Hunt gamemode.

## Player role <span class="fh-badge shared">SHARED</span>

### `PLAYER:IsSurvivor()`

Returns `true` if the player is a survivor.

```lua
if ply:IsSurvivor() then
    print(ply:Nick() .. " is a survivor")
end
```

### `PLAYER:IsAnimatronic()`

Returns `true` if the player is playing as an animatronic.

```lua
if ply:IsAnimatronic() then
    ply:ChatPrint("Happy hunting!")
end
```

---

## Spawn and position <span class="fh-badge server">SERVER</span>

### `PLAYER:ReturnToSpawn()`

Changes the player's position to the spawn point. Unlike [`ENTITY:Spawn()`](https://wiki.facepunch.com/gmod/Entity:Spawn), does not recreate the player — weapons, health, etc. are preserved.

```lua
ply:ReturnToSpawn()
```

### `PLAYER:SuppressRagdollSpawn(bool)`

Allows canceling the spawn of a death ragdoll. Automatically resets to `false` after one spawn attempt.

```lua
hook.Add("DoPlayerDeath", "NoRagdoll", function(ply)
    ply:SuppressRagdollSpawn(true)
end)
```

---

## Getting stuck <span class="fh-badge server">SERVER</span>

### `PLAYER:IsStuck()`

Checks the player's hitbox for getting stuck in geometry or other entities. Unlike [`ENTITY:IsInWorld()`](https://wiki.facepunch.com/gmod/Entity:IsInWorld), accounts for the hitbox.

### `PLAYER:Unstuck()`

Attempts to teleport the player to a place where they are not stuck. Use together with `IsStuck()`:

```lua
hook.Add("PlayerSpawn", "CheckStuck", function(ply)
    timer.Simple(0.5, function()
        if IsValid(ply) and ply:IsStuck() then
            ply:Unstuck()
        end
    end)
end)
```

---

## Pushing <span class="fh-badge server">SERVER</span>

### `PLAYER:SetPushImmune(bool)`

Sets immunity to being pushed by other players.

### `PLAYER:IsPushImmune()`

Does the player have immunity to being pushed?

### `PLAYER:SetPushBlocked(bool)`

Can the player push others?

### `PLAYER:IsPushBlocked()`

Is the player forbidden from pushing others?

```lua
-- Make the animatronic an immovable wall
ply:SetPushImmune(true)
ply:SetPushBlocked(true)
```

---

## Voice chat <span class="fh-badge server">SERVER</span>

### `PLAYER:SetAudible(bool)`

Is the player audible to other players in voice chat?

### `PLAYER:GetAudible()`

Returns the current audibility status.

### `PLAYER:ForceListenPlayer(Player)`

Forces the player to hear only the specified player (disable all others).

### `PLAYER:ResetListenPlayer()`

Resets forced listening.

```lua
-- Force the victim to hear only the animatronic
victim:ForceListenPlayer(killer)

-- After 10 seconds, return to normal state
timer.Simple(10, function()
    if IsValid(victim) then victim:ResetListenPlayer() end
end)
```

---

## Golden Freddy <span class="fh-badge server">SERVER</span>

### `PLAYER:SetGFreddyImmune(bool)`

Immunity to Golden Freddy's ability (Outworld Dimension).

### `PLAYER:GetGFreddyImmune()`

Returns the current immunity status.

```lua
-- All admins are immune to Golden Freddy
hook.Add("PlayerInitialSpawn", "AdminGFImmune", function(ply)
    if ply:IsAdmin() then
        ply:SetGFreddyImmune(true)
    end
end)
```

---

## Gifts <span class="fh-badge server">SERVER</span>

::: info Already used by the mode
These functions are used by default — the game does not give out a second gift until the first one is picked up.
:::

### `PLAYER:SetGiftOwnership(bool)` {#setgiftownership}

Sets the gift ownership flag.

### `PLAYER:GetGiftOwnership()`

Does the player have an uncollected gift?

```lua
if not ply:GetGiftOwnership() then
    -- spawn a new gift
end
```
