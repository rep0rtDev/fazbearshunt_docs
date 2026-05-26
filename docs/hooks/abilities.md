# Способности аниматроников

Уникальные хуки для каждого аниматроника со своими механиками.

## Общее {#general}

### `fh_animatronic_break_prop(ply, ent, tr)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Срабатывает внутри `AnimatronicBreakProp(ply,ent)`, для аниматроников со скримером. `tr` имеет структуру [`TraceResult`](https://wiki.facepunch.com/gmod/Structures/TraceResult)
Возврат `false` — аниматроник не может бить.

### `fh_animatronic_post_break_prop(ply, ent, tr)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Срабатывает после `AnimatronicBreakProp(ply,ent)`. 

## Фредди {#freddy}

### `FH_BlindRageStart(ply, ent, victim)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Фредди начал поиск цели используя Слепую Ярость.

### `FH_BlindRageFailed(ply, ent, victim)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Цель избежала Слепую Ярость, способность отменена.

### `FH_BlindRageSuccess(ply, ent, victim)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Цель Слепой Ярости успешно выбрана.

### `FH_HandleBlindRageTarget(ply, victim)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Определяет, может ли `victim` стать потенциальной целью для Слепой Ярости. Возврат `false` — игрок иммунен к поиску цели Слепой Ярости.

```lua
hook.Add("FH_BlindRageSuccess", "RageChatPrint", function(freddy, ent, victim)
    victim:ChatPrint("На тебя заагрился Фредди!")
end)
```

---

## Бонни {#bonnie}

### `FH_YoursMineStart(ply, ent, target)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Бонни активировал способность **«Чужим Разумом»**.

### `FH_YoursMineSpectating(ply, ent, target)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Бонни начал управлять целью.

### `FH_YoursMineEnd(ply, ent, target)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Бонни закончил управлять целью.

---

## Чика {#chica}

### `FH_MinePlanted(ply, ent, cupcake)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

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

## Шедоу Фредди {#shadow-freddy}

### `FH_SFreddySubmergeIn(ply, ent)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Шедоу Фредди **начал** уходить в невидимость.

### `FH_SFreddySubmergePostIn(ply, ent)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Шедоу Фредди **полностью** ушёл в невидимость.

### `FH_SFreddySubmergeOut(ply, ent)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Шедоу Фредди вышел из невидимости.

---

## Эндоскелет {#endo02}

### `FH_HandlePlayerGrab(ply, target)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Эндоскелет пытается схватить игрока. Возврат `false` — игрока нельзя схватить.

### `fh_endo_release(ply, target)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Эндоскелет отпустил `target`.

---

## Золотой Фредди {#golden-freddy}

### `FH_OutworldStart(wgfreddy, victim)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Золотой Фредди выбрал цель для Загранного Измерения.

### `FH_OutworldEnd(wgfreddy, victim)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Загранное Измерение отключилось.

---

## Той Чика {#toy-chica}

### `FH_HandlePlayerHold(ply, target)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Той чика пытается схватить игрока. Возврат `false` — игрока нельзя схватить.

---

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