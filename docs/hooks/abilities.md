# Способности аниматроников

Уникальные хуки для каждого аниматроника со своими механиками.

## Фредди {#freddy} <span class="fh-badge server">SERVER</span>

### `FH_BlindRageStart(ply, ent, victim)` <span class="fh-badge hook">HOOK</span>

Фредди начал поиск цели используя Слепую Ярость.

### `FH_BlindRageFailed(ply, ent, victim)` <span class="fh-badge hook">HOOK</span>

Цель избежала Слепую Ярость, способность отменена.

### `FH_BlindRageSuccess(ply, ent, victim)` <span class="fh-badge hook">HOOK</span>

Цель Слепой Ярости успешно выбрана.

```lua
hook.Add("FH_BlindRageSuccess", "RageChatPrint", function(freddy, ent, victim)
    victim:ChatPrint("Тебя заметил Фредди!")
end)
```

---

## Бонни {#bonnie} <span class="fh-badge server">SERVER</span>

### `FH_YoursMineStart(ply, ent, target)` <span class="fh-badge hook">HOOK</span>

Бонни активировал способность **«Чужим Взглядом»**.

### `FH_YoursMineSpectating(ply, ent, target)` <span class="fh-badge hook">HOOK</span>

Бонни начал следить за целью.

### `FH_YoursMineEnd(ply, ent, target)` <span class="fh-badge hook">HOOK</span>

Бонни закончил слежку.

---

## Чика {#chica} <span class="fh-badge server">SERVER</span>

### `FH_MinePlanted(ply, ent, cupcake)` <span class="fh-badge hook">HOOK</span>

Чика успешно установила кекс-мину.

| Аргумент | Тип | Описание |
|---|---|---|
| `ply` | `Player` | Чика |
| `ent` | `Entity` | Модель Чики |
| `cupcake` | `Entity` | Установленный кекс |

```lua
hook.Add("FH_MinePlanted", "BigCupcake", function(ply, ent, cupcake)
    -- Делаем кексы в 2 раза больше
    cupcake:SetModelScale(2, 0.01)
end)
```

---

## Шедоу Фредди {#shadow-freddy} <span class="fh-badge server">SERVER</span>

### `FH_SFreddySubmergeIn(ply, ent)` <span class="fh-badge hook">HOOK</span>

Шедоу Фредди **начал** уходить в невидимость.

### `FH_SFreddySubmergePostIn(ply, ent)` <span class="fh-badge hook">HOOK</span>

Шедоу Фредди **полностью** ушёл в невидимость.

### `FH_SFreddySubmergeOut(ply, ent)` <span class="fh-badge hook">HOOK</span>

Шедоу Фредди вышел из невидимости.

---

## Золотой Фредди {#golden-freddy} <span class="fh-badge server">SERVER</span>

### `FH_OutworldStart(wgfreddy, victim)` <span class="fh-badge hook">HOOK</span>

Золотой Фредди выбрал цель для Загранного Измерения.

### `FH_OutworldEnd(wgfreddy, victim)` <span class="fh-badge hook">HOOK</span>

Загранное Измерение отключилось.

::: danger Всегда проверяйте валидность
Способности аниматроников могут отключиться из-за того, что один из игроков покинул сервер. Обязательно используйте `IsValid()`:

```lua
hook.Add("FH_OutworldEnd", "OutworldEndWelcome", function(gfreddy, victim)
    if IsValid(victim) then
        victim:ChatPrint("Ты вернулся в реальный мир.")
    end
end)
```
:::