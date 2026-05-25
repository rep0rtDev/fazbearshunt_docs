# Способности аниматроников

Уникальные хуки для каждого аниматроника со своими механиками.

## Фредди {#freddy}

### `FH_BlindRageStart` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Фредди начал поиск цели через Слепую Ярость.

```lua
hook.Run("FH_BlindRageStart", ply, ent, victim)
```

### `FH_BlindRageFailed` <span class="fh-badge hook">HOOK</span>

Слепая Ярость не нашла цель.

```lua
hook.Run("FH_BlindRageFailed", ply, ent, victim)
```

### `FH_BlindRageSuccess` <span class="fh-badge hook">HOOK</span>

Цель Слепой Ярости успешно выбрана.

```lua
hook.Run("FH_BlindRageSuccess", ply, ent, victim)
```

```lua
hook.Add("FH_BlindRageSuccess", "RageBonus", function(freddy, ent, victim)
    victim:ChatPrint("Тебя заметил Фредди!")
end)
```

---

## Бонни {#bonnie}

### `FH_YoursMineStart` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Бонни активировал способность **«Чужим Взглядом»**.

```lua
hook.Run("FH_YoursMineStart", ply, ent, target)
```

### `FH_YoursMineSpectating` <span class="fh-badge hook">HOOK</span>

Бонни начал следить за целью.

```lua
hook.Run("FH_YoursMineSpectating", ply, ent, target)
```

### `FH_YoursMineEnd` <span class="fh-badge hook">HOOK</span>

Бонни закончил слежку.

```lua
hook.Run("FH_YoursMineEnd", ply, ent, target)
```

---

## Чика {#chica}

### `FH_MinePlanted` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Чика успешно установила кекс-мину.

```lua
hook.Run("FH_MinePlanted", ply, ent, cupcake)
```

| Аргумент | Тип | Описание |
|---|---|---|
| `ply` | `Player` | Чика |
| `ent` | `Entity` | Модель Чики |
| `cupcake` | `Entity` | Установленный кекс |

```lua
hook.Add("FH_MinePlanted", "BigCupcake", function(ply, ent, cupcake)
    -- Делаем кексы в 2 раза больше
    cupcake:SetModelScale(2, 0.5)
end)
```

---

## Шедоу Фредди {#shadow-freddy}

### `FH_SFreddySubmergeIn` <span class="fh-badge hook">HOOK</span>

Шедоу Фредди **начал** уходить в невидимость.

```lua
hook.Run("FH_SFreddySubmergeIn", ply, ent)
```

### `FH_SFreddySubmergePostIn` <span class="fh-badge hook">HOOK</span>

Шедоу Фредди **полностью** ушёл в невидимость.

```lua
hook.Run("FH_SFreddySubmergePostIn", ply, ent)
```

### `FH_SFreddySubmergeOut` <span class="fh-badge hook">HOOK</span>

Шедоу Фредди вышел из невидимости.

```lua
hook.Run("FH_SFreddySubmergeOut", ply, ent)
```

---

## Золотой Фредди {#golden-freddy}

### `FH_OutworldStart` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Золотой Фредди выбрал цель для Загранного Измерения.

```lua
hook.Run("FH_OutworldStart", wgfreddy, victim)
```

### `FH_OutworldEnd` <span class="fh-badge hook">HOOK</span>

Загранное Измерение отключилось.

```lua
hook.Run("FH_OutworldEnd", wgfreddy, victim)
```

::: danger Всегда проверяйте валидность
Загранное Измерение может отключиться из-за того, что один из игроков отключился от сервера. Обязательно проверяйте `IsValid()`:

```lua
hook.Add("FH_OutworldEnd", "Cleanup", function(gfreddy, victim)
    if IsValid(victim) then
        victim:ChatPrint("Ты вернулся в реальный мир.")
    end
end)
```
:::