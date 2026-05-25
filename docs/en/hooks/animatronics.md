# Animatronic Hooks

Hooks related to general animatronic behavior: screamers, the Taser, voice lines.

## `FH_PlayerShouldJumpscare` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span> {#fh_playershouldjumpscare}

Called **before** a screamer.

```lua
hook.Run("FH_PlayerShouldJumpscare", ply, ent, target)
```

| Argument | Type | Description |
|---|---|---|
| `ply` | `Player` | The animatronic |
| `ent` | `Entity` | The animatronic's model |
| `target` | `Player` | The victim |

**Return `false`** — cancel the screamer.

```lua
-- Protect players with the maniac mask (example logic)
hook.Add("FH_PlayerShouldJumpscare", "MaskProtect", function(ply, ent, target)
    if target:GetNWBool("HasMaskObsession") then
        return false
    end
end)
```

---

## `FH_HandleTaserHit` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Called **before** a Taser hits a player.

```lua
hook.Run("FH_HandleTaserHit", ply)
```

**Return `false`** — cancel the Taser's effect.

```lua
hook.Add("FH_HandleTaserHit", "AdminTaserImmune", function(ply)
    if ply:IsAdmin() then return false end
end)
```

---

## `FH_AnimatronicJumpscare` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span> {#fh_animatronicjumpscare}

Called **after a successful** screamer.

```lua
hook.Run("FH_AnimatronicJumpscare", ply, ent, target, data)
```

**`data` structure:**

```lua
{
    delay = 0.5,           -- time until target dies
    char  = "sfreddy",     -- animatronic name
    dist  = 64.2,          -- distance at screamer moment
    wep   = "fh_freddy_h"  -- first-person weapon class
}
```

```lua
hook.Add("FH_AnimatronicJumpscare", "LogScares", function(ply, ent, target, data)
    print(string.format("[FH] %s screamed at %s (dist=%.1f, char=%s)",
        ply:Nick(), target:Nick(), data.dist, data.char))
end)
```

---

## `FH_JumpscareEvent` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span> {#fh_jumpscareevent}

Called **before** freezing players during a screamer.

```lua
hook.Run("FH_JumpscareEvent", ply, ent, target, dist)
```

| Argument | Type | Description |
|---|---|---|
| `ply` | `Player` | The animatronic |
| `ent` | `Entity` | The animatronic's model |
| `target` | `Entity` | The victim |
| `dist` | `float` | Distance |

---

## `FH_OverrideVoiceline` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Called **before** playing an animatronic's voice line. Allows overriding the line.

```lua
hook.Run("FH_OverrideVoiceline", ply, anim, line)
```

| Argument | Type | Description |
|---|---|---|
| `ply` | `Player` | The animatronic |
| `anim` | `string` | The animatronic's name |
| `line` | `string` | The current voice line |

**Return** a new string to override the voice line.

```lua
hook.Add("FH_OverrideVoiceline", "FunnyLines", function(ply, anim, line)
    if anim == "freddy" and math.random(1, 10) == 1 then
        return "sound/my_addon/freddy_meme.wav"
    end
end)
```
