# Просветы

С обновлением **3.0.0** просвет (подсветка игроков сквозь стены) выделен в отдельную библиотеку — `highlight`.

## Основные функции

### `highlight.ByDistance(ply, ent)` <span class="fh-badge server">SERVER</span>

Автоматически просвечивает игроку `ply` всех выживших в радиусе, заданном консольной командой `halo_radius`. По умолчанию используется аниматрониками на бинд `+RELOAD`.

| Параметр | Тип | Описание |
|---|---|---|
| `ply` | `Player` | Игрок, который просвечивает |
| `ent` | `Entity` | Энтити-модель аниматроника `ply` (нужно для звуков) |

```lua
hook.Add("KeyPress", "MyHighlight", function(ply, key)
    if key == IN_RELOAD and ply:IsAnimatronic() then
        local ent = pk_pills.getMappedEnt(ply)
        highlight.ByDistance(ply, ent)
    end
end)
```

### `highlight.Add(ply, players, duration)` <span class="fh-badge server">SERVER</span>

Просвечивает указанных игроков для `ply` на заданное время.

| Параметр | Тип | Описание |
|---|---|---|
| `ply` | `Player` | Кто видит просвет |
| `players` | `Player` или `table[Player]` | Кого просвечивает |
| `duration` | `float` | Длительность в секундах |

::: warning Учтите
Эта функция **не включает звуки** оповещения о просвете. Используйте `highlight.NotifyTarget()` для оповещения.
:::

## Кулдауны

### `highlight.Cooldown(ply, duration)` <span class="fh-badge server">SERVER</span>

Устанавливает игроку кулдаун на просвет и обновляет значение в интерфейсе.

```lua
highlight.Cooldown(ply, 15)  -- 15 секунд КД
```

::: info
Если у аниматроника изначально не было способности «Просвет» в интерфейсе, она там не появится.
:::

### `highlight.GetCooldown(ply)` <span class="fh-badge server">SERVER</span>

Возвращает количество секунд до следующего использования просвета.

```lua
if highlight.GetCooldown(ply) > 0 then
    ply:ChatPrint("Просвет ещё не готов!")
end
```

## Звуки просвета

### `highlight.AddVisionSounds(name, snd_affected, snd_unaffected)` <span class="fh-badge shared">SHARED</span>

Регистрирует звуки просвета для конкретного аниматроника.

```lua
highlight.AddVisionSounds(
    "pill_wgfreddy2",
    "sounds/my_anim/highlight_success.wav",
    "sounds/my_anim/highlight_fail.wav"
)
```

::: tip
В путях звуков обязательно указывайте полное имя файла, включая расширение.
:::

### `highlight.GetVisionSound(ent)` <span class="fh-badge shared">SHARED</span>

Возвращает таблицу со звуками: `{ affected = "...", unaffected = "..." }`.

### `highlight.NotifyTarget(target, ent, isAffected)` <span class="fh-badge server">SERVER</span>

Включает звук просвета и накладывает визуальный эффект на игрока.

| Параметр | Тип | Описание |
|---|---|---|
| `target` | `Player` | Кого оповестить |
| `ent` | `Entity` | Модель аниматроника, который просвечивает |
| `isAffected` | `bool` | `true` — звук успеха, `false` — звук провала |

```lua
highlight.NotifyTarget(survivor, animEnt, true)
```