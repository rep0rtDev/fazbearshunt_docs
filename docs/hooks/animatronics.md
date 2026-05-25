# Хуки аниматроников

Хуки, связанные с общим поведением аниматроников: скримеры, Шокер, реплики.

## `FH_PlayerShouldJumpscare` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span> {#fh_playershouldjumpscare}

Вызывается **перед** скримером.

```lua
hook.Run("FH_PlayerShouldJumpscare", ply, ent, target)
```

| Аргумент | Тип | Описание |
|---|---|---|
| `ply` | `Player` | Аниматроник |
| `ent` | `Entity` | Модель аниматроника |
| `target` | `Player` | Жертва |

**Возврат `false`** — отменить скример.

```lua
-- Защитить игроков с маской маньяка (примерная логика)
hook.Add("FH_PlayerShouldJumpscare", "MaskProtect", function(ply, ent, target)
    if target:GetNWBool("HasMaskObsession") then
        return false
    end
end)
```

---

## `FH_HandleTaserHit` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Вызывается **перед** ударом Шокера по игроку.

```lua
hook.Run("FH_HandleTaserHit", ply)
```

**Возврат `false`** — отменить действие Шокера.

```lua
hook.Add("FH_HandleTaserHit", "AdminTaserImmune", function(ply)
    if ply:IsAdmin() then return false end
end)
```

---

## `FH_AnimatronicJumpscare` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span> {#fh_animatronicjumpscare}

Вызывается **после успешного** скримера.

```lua
hook.Run("FH_AnimatronicJumpscare", ply, ent, target, data)
```

**Структура `data`:**

```lua
{
    delay = 0.5,           -- через сколько умрёт target
    char  = "sfreddy",     -- имя аниматроника
    dist  = 64.2,          -- дистанция в момент скримера
    wep   = "fh_freddy_h"  -- класс оружия от 1-го лица
}
```

```lua
hook.Add("FH_AnimatronicJumpscare", "LogScares", function(ply, ent, target, data)
    print(string.format("[FH] %s заскримерил %s (дист=%.1f, char=%s)",
        ply:Nick(), target:Nick(), data.dist, data.char))
end)
```

---

## `FH_JumpscareEvent` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span> {#fh_jumpscareevent}

Вызывается **перед** заморозкой игроков в скримере.

```lua
hook.Run("FH_JumpscareEvent", ply, ent, target, dist)
```

| Аргумент | Тип | Описание |
|---|---|---|
| `ply` | `Player` | Аниматроник |
| `ent` | `Entity` | Модель аниматроника |
| `target` | `Entity` | Жертва |
| `dist` | `float` | Дистанция |

---

## `FH_OverrideVoiceline` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Вызывается **перед** проигрыванием реплики аниматроника. Позволяет заменить реплику.

```lua
hook.Run("FH_OverrideVoiceline", ply, anim, line)
```

| Аргумент | Тип | Описание |
|---|---|---|
| `ply` | `Player` | Аниматроник |
| `anim` | `string` | Имя аниматроника |
| `line` | `string` | Текущая реплика |

**Возврат** новой строки заменит реплику.

```lua
hook.Add("FH_OverrideVoiceline", "FunnyLines", function(ply, anim, line)
    if anim == "freddy" and math.random(1, 10) == 1 then
        return "sound/my_addon/freddy_meme.wav"
    end
end)
```