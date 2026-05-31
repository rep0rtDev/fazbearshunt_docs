# Animatronic Hooks

Hooks related to general animatronic behavior: jumpscares, the Taser, voice lines.

## `FH_PlayerShouldJumpscare(ply, ent, target)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span> {#fh_playershouldjumpscare}

Called **before** a jumpscare.

| Argument | Type | Description |
|---|---|---|
| `ply` | `Player` | The animatronic |
| `ent` | `Entity` | The animatronic's model |
| `target` | `Player` | The victim |

**Return `false`** — cancel the jumpscare.

```lua
-- Prevent screaming at admins in noclip
hook.Add("FH_PlayerShouldJumpscare", "MaskProtect", function(ply, ent, target)
    if target:IsAdmin() and target:GetMoveType() == MOVETYPE_NOCLIP then
        return false
    end
end)
```

---

## `FH_HandleTaserHit(ply)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Called **before** a Taser hits a player.

**Return `false`** — cancel the Taser's effect.

```lua
hook.Add("FH_HandleTaserHit", "AdminTaserImmune", function(ply)
    if ply:IsAdmin() then return false end -- Admins do not get hit by the Taser
end)
```

---

## `FH_AnimatronicJumpscare(ply, ent, target, data)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span> {#fh_animatronicjumpscare}

Called **after a successful** jumpscare.

**`data` structure:**

```lua
{
    delay = 0.5,		-- time until target dies
    char  = "sfreddy",	-- animatronic name
    dist  = 64.2,		-- distance at jumpscare moment
    wep   = "v_freddy"	-- first-person weapon class
}
```

```lua
hook.Add("FH_AnimatronicJumpscare", "LogScares", function(ply, ent, target, data)
    print(string.format("[FH] %s screamed at %s (dist=%.1f, char=%s)",
        ply:Nick(), target:Nick(), data.dist, data.char))
end)
```

---

## `FH_JumpscareEvent(ply, ent, target, dist)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span> {#fh_jumpscareevent}

Called **before** freezing players during a jumpscare.

| Argument | Type | Description |
|---|---|---|
| `ply` | `Player` | The animatronic |
| `ent` | `Entity` | The animatronic's model |
| `target` | `Entity` | The victim |
| `dist` | `float` | Distance |

---

## `FH_OverrideVoiceline(ply, anim, line)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Called **before** playing an animatronic's voice line. Allows overriding the line.

| Argument | Type | Description |
|---|---|---|
| `ply` | `Player` | The animatronic |
| `anim` | `string` | The animatronic's name |
| `line` | `string` | The current voice line |

**Return** a new string to override the voice line.

```lua
hook.Add("FH_OverrideVoiceline", "PositiveOnly", function(ply, anim, line)
    if line:match("negative") then
		-- Animatronics no longer say negative voicelines
        return "positive"
    end
end)
```