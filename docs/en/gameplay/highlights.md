# Highlights

With update **3.0.0**, highlighting (seeing players through walls) has been moved to its own library — `highlight`.

## Core functions

### `highlight.ByDistance(ply, ent)` <span class="fh-badge server">SERVER</span>

Automatically highlights all survivors within the radius set by the console command `halo_radius` for player `ply`. Used by animatronics on the `+RELOAD` bind by default.

| Parameter | Type | Description |
|---|---|---|
| `ply` | `Player` | The player doing the highlighting |
| `ent` | `Entity` | The animatronic's entity/model for `ply` (needed for sounds) |

```lua
hook.Add("KeyPress", "MyHighlight", function(ply, key)
    if key == IN_RELOAD and ply:IsAnimatronic() then
        local ent = pk_pills.getMappedEnt(ply)
        highlight.ByDistance(ply, ent)
    end
end)
```

### `highlight.Add(ply, players, duration)` <span class="fh-badge server">SERVER</span>

Highlights specified players for `ply` for a given duration.

| Parameter | Type | Description |
|---|---|---|
| `ply` | `Player` | Who sees the highlight |
| `players` | `Player` or `table[Player]` | Who gets highlighted |
| `duration` | `float` | Duration in seconds |

::: warning Note
This function **does not play** highlight notification sounds. Use `highlight.NotifyTarget()` for notifications.
:::

## Cooldowns

### `highlight.Cooldown(ply, duration)` <span class="fh-badge server">SERVER</span>

Sets a cooldown on highlighting for the player and updates the UI value.

```lua
highlight.Cooldown(ply, 15)  -- 15 second cooldown
```

::: info
If the animatronic didn't originally have the "Highlight" ability in the UI, it won't appear there.
:::

### `highlight.GetCooldown(ply)` <span class="fh-badge server">SERVER</span>

Returns the number of seconds until the next highlight can be used.

```lua
if highlight.GetCooldown(ply) > 0 then
    ply:ChatPrint("Highlight is not ready yet!")
end
```

## Highlight sounds

### `highlight.AddVisionSounds(name, snd_affected, snd_unaffected)` <span class="fh-badge shared">SHARED</span>

Registers highlight sounds for a specific animatronic.

```lua
highlight.AddVisionSounds(
    "pill_wgfreddy2",
    "sounds/my_anim/highlight_success.wav",
    "sounds/my_anim/highlight_fail.wav"
)
```

::: tip
Always specify the full file name including the extension in sound paths.
:::

### `highlight.GetVisionSound(ent)` <span class="fh-badge shared">SHARED</span>

Returns a table with sounds: `{ affected = "...", unaffected = "..." }`.

### `highlight.NotifyTarget(target, ent, isAffected)` <span class="fh-badge server">SERVER</span>

Plays the highlight sound and applies a visual effect to the player.

| Parameter | Type | Description |
|---|---|---|
| `target` | `Player` | Who to notify |
| `ent` | `Entity` | The animatronic's model doing the highlighting |
| `isAffected` | `bool` | `true` — success sound, `false` — fail sound |

```lua
highlight.NotifyTarget(survivor, animEnt, true)
```
