# Хуки аниматроников

Хуки, связанные с общим поведением аниматроников: скримеры, Шокер, реплики.

## `FH_PlayerShouldJumpscare(ply, ent, target)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span> {#fh_playershouldjumpscare}

Вызывается **перед** скримером.

| Аргумент | Тип | Описание |
|---|---|---|
| `ply` | `Player` | Аниматроник |
| `ent` | `Entity` | Модель аниматроника |
| `target` | `Player` | Жертва |

**Возврат `false`** — отменить скример.

```lua
-- Запретить скримерить админов в ноуклипе
hook.Add("FH_PlayerShouldJumpscare", "MaskProtect", function(ply, ent, target)
    if target:IsAdmin() and target:GetMoveType() == MOVETYPE_NOCLIP then
        return false
    end
end)
```

---

## `FH_HandleTaserHit(ply)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Вызывается **перед** ударом Шокера по игроку.

**Возврат `false`** — отменить действие Шокера.

```lua
hook.Add("FH_HandleTaserHit", "AdminTaserImmune", function(ply)
    if ply:IsAdmin() then return false end -- Админы не получают удары Шокером
end)
```

---

## `FH_AnimatronicJumpscare(ply, ent, target, data)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span> {#fh_animatronicjumpscare}

Вызывается **после успешного** скримера.

**Структура `data`:**

```lua
{
    delay = 0.5,		-- через сколько умрёт target
    char  = "sfreddy",	-- имя аниматроника
    dist  = 64.2,		-- дистанция в момент скримера
    wep   = "v_freddy"	-- класс оружия от 1-го лица
}
```

```lua
hook.Add("FH_AnimatronicJumpscare", "LogScares", function(ply, ent, target, data)
    print(string.format("[FH] %s заскримерил %s (дист=%.1f, char=%s)",
        ply:Nick(), target:Nick(), data.dist, data.char))
end)
```

---

## `FH_JumpscareEvent(ply, ent, target, dist)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span> {#fh_jumpscareevent}

Вызывается **перед** заморозкой игроков в скримере.

| Аргумент | Тип | Описание |
|---|---|---|
| `ply` | `Player` | Аниматроник |
| `ent` | `Entity` | Модель аниматроника |
| `target` | `Entity` | Жертва |
| `dist` | `float` | Дистанция |

---

## `FH_OverrideVoiceline(ply, anim, line)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Вызывается **перед** проигрыванием реплики аниматроника. Позволяет заменить реплику.

| Аргумент | Тип | Описание |
|---|---|---|
| `ply` | `Player` | Аниматроник |
| `anim` | `string` | Имя аниматроника |
| `line` | `string` | Текущая реплика |

**Возврат** новой строки заменит реплику.

```lua
hook.Add("FH_OverrideVoiceline", "PositiveOnly", function(ply, anim, line)
    if line:match("negative") then
		-- Больше аниматроники не говорят негативные войслайны
        return "positive"
    end
end)
```