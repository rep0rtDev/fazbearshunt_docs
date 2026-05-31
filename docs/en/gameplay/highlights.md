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
        local ent = pills.getMappedEnt(ply)
        if IsValid(ent) then
            highlight.ByDistance(ply, ent)
        end
    end
end)
```

### `highlight.Add(ply, players, duration, color)` <span class="fh-badge server">SERVER</span>

Highlights specified players for `ply` for a given duration, with the specified color.

| Parameter | Type | Description |
|---|---|---|
| `ply` | `Player` | Who sees the highlight |
| `players` | `Player` or `table[Player]` | Who gets highlighted |
| `duration` | `float` | Duration in seconds |
| `color` | `Color` *(opt.)* | Highlight color |

::: warning Note
This function **does not play** highlight notification sounds. Use `highlight.NotifyTarget()` for notifications.
:::

### `addAffected(ply, duration, color)` <span class="fh-badge client">CLIENT</span>

Highlights `ply` for the local player for a given duration, with the specified color.

| Parameter | Type | Description | Default |
|---|---|---|---|
| `ply` | `Player` | Who is highlighted | |
| `duration` | `float` *(opt.)* | Duration in seconds | `ConVar halo_time` |
| `color` | `Color` *(opt.)* | Highlight color | `Color(255,0,0)` |
| `force` | `bool` *(opt.)* | Force highlight even if the player is already highlighted | `false` |

### `removeAffected(ply, force)` <span class="fh-badge client">CLIENT</span>

Removes the highlight for the local player on `ply`.

| Parameter | Type | Description | Default |
|---|---|---|---|
| `ply` | `Player` | Who is highlighted | |
| `force` | `bool` *(opt.)* | Force disable highlight if the player was force highlighted | `false` |

## Cooldowns

### `highlight.Cooldown(ply, duration)` <span class="fh-badge server">SERVER</span>

Sets a cooldown on highlighting for the player and updates the UI value.

```lua
highlight.Cooldown(ply, 15)  -- 15 second cooldown
```

::: info
If the animatronic doesn't have the "Highlight" ability in the UI, they won't know about the cooldown.
:::

### `highlight.GetCooldown(ply)` <span class="fh-badge server">SERVER</span>

Returns the number of seconds until the next highlight can be used.

```lua
if highlight.GetCooldown(ply) > 0 then
    ply:ChatPrint("Highlight is not ready yet!")
end
```

## Highlight sounds

### `highlight.AddVisionSounds(name, snd_affected, snd_unaffected)` <span class="fh-badge server">SERVER</span>

Registers highlight sounds for a specific animatronic.

```lua
highlight.AddVisionSounds(
    "pill_wgfreddy2",
    "my_anim/highlight_success.wav",
    "my_anim/highlight_fail.wav"
)
```

::: tip Important
Always specify the full path to the file including the extension in sound paths.
:::

### `highlight.GetVisionSound(ent)` <span class="fh-badge server">SERVER</span>

Returns a table with sounds: `{ affected = "...", unaffected = "..." }`.

### `highlight.NotifyTarget(target, ent, isAffected)` <span class="fh-badge server">SERVER</span>

Plays the highlight sound and applies a visual effect on the player's screen.

| Parameter | Type | Description |
|---|---|---|
| `target` | `Player` | Who to notify |
| `ent` | `Entity` | The animatronic's model doing the highlighting |
| `isAffected` | `bool` | `true` — success sound, `false` — fail sound |

```lua
highlight.NotifyTarget(survivor, pillEnt, true)
```