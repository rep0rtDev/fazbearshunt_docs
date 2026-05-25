# Функции FH

Глобальные функции гейммода. Используйте для модификации поведения раундов, аниматроников и подарков.

## Управление аниматрониками

### `giveKiller(ply, killer, [force])` <span class="fh-badge server">SERVER</span>

Назначает игрока аниматроником.

| Параметр | Тип | Описание |
|---|---|---|
| `ply` | `Player` | Кому выдать |
| `killer` | `string` | Техническое имя (например, `"pill_wfreddy2"`) |
| `force` | `bool` *(опц.)* | Если `true` — выдаст даже если такой же уже есть |

```lua
giveKiller(ply, "pill_wspringtrap2", true)
```

[Пример использования →](https://github.com/s3rgeant/fazbearshunt_docs/blob/main/examples/plushtrap_half_players.lua)

### `TaseAnimatronic(ply)` <span class="fh-badge server">SERVER</span>

Если игрок — аниматроник, бьёт его током (как Шокер).

```lua
TaseAnimatronic(ply)
```

### `restoreAnimatronics()` <span class="fh-badge server">SERVER</span>

Снимает роль аниматроника со всех текущих аниматроников.

---

## Подарки

### `doGiftSpawning()` <span class="fh-badge server">SERVER</span> {#dogiftspawning}

Включает появление подарков на карте.

### `disableGiftSpawning()` <span class="fh-badge server">SERVER</span> {#disablegiftspawning}

Отключает появление подарков.

---

## Информация о раунде

### `fh.GetRoundCount()` <span class="fh-badge shared">SHARED</span>

Возвращает номер текущего раунда (целое число).

### `fh.GetEarnedKillers(players)` <span class="fh-badge server">SERVER</span>

Возвращает таблицу игроков, "заслуживших" быть аниматроником в этом раунде. Также **запоминает** их на несколько раундов.

::: danger Внимание
Если вы вызвали эту функцию — **ОБЯЗАТЕЛЬНО выдайте** этим игрокам аниматроника. Иначе они «застрянут» в запоминании, и в следующие раунды их не выберут.
:::

```lua
local candidates = fh.GetEarnedKillers(player.GetAll())
for _, ply in ipairs(candidates) do
    giveKiller(ply, "pill_wfreddy2")
end
```

### `fh.SetRoundType(number)` <span class="fh-badge server">SERVER</span>

Устанавливает тип раунда. Режим вызывает это сам в начале раунда.

::: warning Аккуратно
Используйте только если точно знаете, что делаете.
:::

### `fh.GetRoundType()` <span class="fh-badge shared">SHARED</span>

Возвращает текущий тип раунда.

| Значение | Тип раунда |
|---|---|
| `0` | Обычный |
| `1` | Со Спрингтрапом |

### `fh.GetActiveUsedKiller(killer)` <span class="fh-badge shared">SHARED</span>

Возвращает `true`, если указанный аниматроник присутствует на карте сейчас.

```lua
if fh.GetActiveUsedKiller("pill_wbonnie2") then
    print("Бонни уже в игре!")
end
```

---

## Способности аниматроников

::: info Где использовать
Эти функции предназначены для использования внутри **пилл-паков** аниматроников или своих хуков, расширяющих их.
:::

### `jumpscareEvent(ply, ent, target, [dist])` <span class="fh-badge server">SERVER</span>

Замораживает игрока-жертву в скримере. Вызывайте **после** проигрывания анимации.

| Параметр | Тип | Описание |
|---|---|---|
| `ply` | `Player` | Аниматроник |
| `ent` | `Entity` | Модель аниматроника (см. `pk_pills.getMappedEnt(ply)`) |
| `target` | `Player` | Жертва |
| `dist` | `float` *(опц.)* | Дистанция между аниматроником и жертвой |

### `HighlightPlayers(ply, ent)` <span class="fh-badge server">SERVER</span>

Используется всеми аниматрониками (кроме Плюштрапа) на бинд `+reload`. Просвечивает игроков в радиусе `halo_radius`.

### `takePlayer(ply, ent)` <span class="fh-badge server">SERVER</span>

Используется Эндоскелетом для захвата игрока. Автоматически ищет цель поблизости.

### `endoRelease(ply)` <span class="fh-badge server">SERVER</span>

Заставляет аниматроника отпустить ранее схваченного игрока.

---

## Поиск целей

### `FindNearestPlayer(origin, radius, ignorePlayer, fov)` <span class="fh-badge server">SERVER</span>

Ищет ближайшего игрока в радиусе.

| Параметр | Тип | Описание |
|---|---|---|
| `origin` | `Vector` | Точка поиска |
| `radius` | `number` | Радиус |
| `ignorePlayer` | `Player` | Кого игнорировать |
| `fov` | `number` | Если указано вместе с `ignorePlayer` — поиск только в конусе обзора |

Идеально подходит для выбора цели атаки.

### `fh_get_nearest_players(origin, radius, ignorePlayer)` <span class="fh-badge server">SERVER</span>

Возвращает **таблицу** игроков в радиусе. Используется Клоуном при ударе молотом.

### `fh_get_nearest_props(origin, radius)` <span class="fh-badge server">SERVER</span>

Возвращает таблицу пропов в радиусе.

---

## Управление списками аниматроников

### `killers.getAllSolos()` <span class="fh-badge shared">SHARED</span>

Аниматроники без вторичности. ⚠ Не проверяет играбельность.

### `killers.getAllPreferables(secondaries)` <span class="fh-badge shared">SHARED</span>

Все играбельные аниматроники. Если `secondaries = true` — включает и вторичных.

### `killers.getAllNonPreferables()` <span class="fh-badge shared">SHARED</span>

Все **не**играбельные аниматроники.

### `killers.getAllSecondaries()` <span class="fh-badge shared">SHARED</span>

Все вторичные аниматроники.

### `killers.getAll()` <span class="fh-badge shared">SHARED</span>

Все зарегистрированные аниматроники.

### `pill_makePreferable(anim, bool)` <span class="fh-badge shared">SHARED</span>

Делает аниматроника играбельным или убирает из списка играбельных.

```lua
pill_makePreferable("pill_wfreddy2", true)
```

### `pill_makeSecondary(anim, bool)` <span class="fh-badge shared">SHARED</span>

Добавляет/убирает аниматроника из списка вторичных.

```lua
pill_makeSecondary("pill_wbonnie2", true)
```