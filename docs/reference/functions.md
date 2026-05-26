# Функции FH

Глобальные функции гейммода. Используйте для модификации поведения раундов, аниматроников и подарков.

## Управление аниматрониками

### `giveKiller(ply, killer, [force])` <span class="fh-badge server">SERVER</span>

Назначает игрока аниматроником.

| Параметр | Тип | Описание |
|---|---|---|
| `ply` | `Player` | Кому выдать |
| `killer` | `string` | Имя (например, `"pill_wfreddy2"`) |
| `force` | `bool` *(опц.)* | Если `true` — выдаст даже если такой же уже есть |

```lua
giveKiller(ply, "pill_springtrap", true)
```

### `giveKillerSilent(ply, killer, [force])` <span class="fh-badge server">SERVER</span>

Тоже самое что и сверху, но без оповещения в чат.

[Пример использования →](https://github.com/s3rgeant/fazbearshunt_docs/blob/main/examples/plushtrap_half_players.lua)

### `TaseAnimatronic(ply)` <span class="fh-badge server">SERVER</span>

Если игрок — аниматроник, бьёт его током (как Шокер).

```lua
TaseAnimatronic(ply)
```

### `restoreAnimatronics()` <span class="fh-badge server">SERVER</span>

Снимает роль аниматроника со всех текущих аниматроников.

### `restoreAnimatronic(ply)` <span class="fh-badge server">SERVER</span>

Снимает роль аниматроника с конкретного игрока.

---

## Подарки

### `doGiftSpawning()` <span class="fh-badge server">SERVER</span> {#dogiftspawning}

Включает появление подарков на карте.

### `disableGiftSpawning()` <span class="fh-badge server">SERVER</span> {#disablegiftspawning}

Отключает появление подарков.

---

## Информация о раунде

### `fh.GetRoundCount()` <span class="fh-badge server">SERVER</span>

Возвращает номер текущего раунда (целое число).

### `fh.GetEarnedKillers(players)` <span class="fh-badge server">SERVER</span>

Возвращает таблицу игроков, сортируя их сначала по "заслужившим" быть аниматроником в этом раунде.

```lua
local candidates = fh.GetEarnedKillers(player.GetAll())

-- первый игрок в таблице зачастую дольше всех не был аниматроником.
giveKiller(candidates[1], "pill_wfreddy2")
```

### `fh.GetActiveUsedKiller(killer)` <span class="fh-badge server">SERVER</span>

Возвращает игрока, которому был выдан указанный аниматроник.

```lua
if fh.GetActiveUsedKiller("pill_wbonnie2") then
    print("Бонни уже в игре!")
end
```

::: info Внимание
Если аниматроников с именем `killer` больше одного, то функция выдаст того, которого выдали последним.
:::

---

## Способности аниматроников

::: info Где использовать
Эти функции предназначены для использования внутри **пилл-паков** аниматроников или своих хуков, расширяющих их.
:::

### `performJumpscare(ply, ent, target, killDelay, [voiceCharacter], [jumpscareDistance], [wepClass])` <span class="fh-badge server">SERVER</span>

Насильно скримерит `target` для `ply`.

| Параметр | Тип | Описание |
|---|---|---|
| `ply` | `Player` | Аниматроник |
| `ent` | `Entity` | Модель аниматроника (`pills.getMappedEnt(ply)`) |
| `target` | `Player` | Жертва |
| `killDelay` | `float` | Время убийства |
| `voiceCharacter` | `string` *(опц.)* | Тех. Имя аниматроника (используется для проигрывания войслайнов) |
| `jumpscareDistance` | `float` *(опц.)* | Дистанция между аниматроником и жертвой |
| `wepClass` | `string` *(опц.)* | Класс оружия рук аниматроника, для которой включится анимация **scare** |

### `jumpscareEvent(ply, ent, target, [dist])` <span class="fh-badge server">SERVER</span>

Замораживает игрока-жертву в скримере. Вызывайте **после** проигрывания анимации.

| Параметр | Тип | Описание |
|---|---|---|
| `ply` | `Player` | Аниматроник |
| `ent` | `Entity` | Модель аниматроника (`pills.getMappedEnt(ply)`) |
| `target` | `Player` | Жертва |
| `dist` | `float` *(опц.)* | Дистанция между аниматроником и жертвой |

### `endo.grabNeareastPlayer(ply, ent)` <span class="fh-badge server">SERVER</span>

Используется Эндоскелетом для захвата игрока. Автоматически ищет цель поблизости.

### `endo.endoRelease(ply)` <span class="fh-badge server">SERVER</span>

Заставляет аниматроника отпустить ранее схваченного игрока.

### `endo.releaseExactPlayer(target)` <span class="fh-badge server">SERVER</span>

Пытается отпустить `target`, если его держит аниматроник с помощью одной из функций выше.

### `endo.isGrabbed(target)` <span class="fh-badge server">SERVER</span>

Возвращает, держит ли кто-то игрока `target`.

---

## Поиск целей

### `FindNearestPlayer(origin, radius, ignorePlayer, fov)` <span class="fh-badge shared">SHARED</span>

Ищет ближайшего выжившего в радиусе.

| Параметр | Тип | Описание |
|---|---|---|
| `origin` | `Vector` | Точка поиска |
| `radius` | `number` | Радиус |
| `ignorePlayer` | `Player` | Кого игнорировать |
| `fov` | `number` | Если указано вместе с `ignorePlayer` — поиск только в конусе обзора |

Идеально подходит для выбора цели атаки.

### `fh_get_nearest_players(origin, radius, ignorePlayer)` <span class="fh-badge shared">SHARED</span>

Возвращает **таблицу** выживших в радиусе. Используется Клоуном при ударе молотом.

### `fh_get_nearest_props(origin, radius)` <span class="fh-badge shared">SHARED</span>

Возвращает таблицу пропов в радиусе.

---

## Регистрация аниматроников

### `killers.Register(pill, name, fullname, color, category)` <span class="fh-badge shared">SHARED</span>

Регистрирует аниматроника в базу режима. После успешной регистрации аниматроник будет доступен в Админ-Панели.

| Параметр | Тип | Описание |
|---|---|---|
| `pill` | `string` | Название пилла |
| `name` | `string` | Техническое имя |
| `fullname` | `string` | Полное имя |
| `color` | `color` | Цвет интерфейса аниматроника |
| `category` | `string` | Категория аниматроника (Используется для сортировки в Админ-Панели) |

::: info Важно
Именно здесь режим сохраняет иконки аниматроника (для Tab-меню, или выборки аниматроников), а также портрет аниматроника, который используется в интерфейсе игрока в левом нижнем углу.
:::

```lua
-- Код из animatronics/bear5.lua
killers.Register("bear5_main", "bear5", "Bear 5", Color(0,120,255), "Freaks")
killers.Register("bear5_clone", "bearling5", "Bearling 5", Color(0,120,255), "Freaks")
killers.Register("fox4", "fox4", "Fox 4", Color(0,255,20), "Freaks")
```

### `killers.SetAbilities(name, abilities)` <span class="fh-badge shared">SHARED</span>

Устанавливает способности аниматроника, которые будут отображаться в интерфейсе игрока.

Каждая способность в таблице должна содержать следующие данные:

| Параметр | Тип | Описание |
|---|---|---|
| `name` | `string` | Название способности |
| `key` | `string` | Кнопка спобности |
| `hidden` | `bool` | Спрятать пока нет КД? |
| `tokens` | `int` *(опц.)* | Количество токенов способности |
| `condition` | `function` *(опц.)* | Функция должна возвращать цвет, в который будет красится кнопка. |

::: info Важно
Ванильный FH нигде не использует таблицу способностей на сервере, но всё равно советуется устанавливать способности с обеих сторон.
:::

```lua
-- Код из animatronics/bear5.lua
killers.SetAbilities("bear5", {
	{ name = 'highlight', key = 'R' },
	{ name = 'death', key = 'RMB' },
})
```

---

## Управление списками аниматроников

### `killers.getAll()` <span class="fh-badge shared">SHARED</span>

Все зарегистрированные аниматроники.

### `killers.getAllSolos()` <span class="fh-badge shared">SHARED</span>

Все **не вторичные** аниматроники. 

::: warning Важно
Не проверяет играбельность
:::

### `killers.getAllPreferables(secondaries)` <span class="fh-badge shared">SHARED</span>

Все играбельные аниматроники. Если `secondaries = true` — включает и вторичных.

### `killers.getAllNonPreferables()` <span class="fh-badge shared">SHARED</span>

Все **не**играбельные аниматроники.

### `killers.getAllSecondaries()` <span class="fh-badge shared">SHARED</span>

Все вторичные аниматроники.

### `killers.GetName(pill)` <span class="fh-badge shared">SHARED</span>

Возвращает имя аниматроника.

```lua
print(killers.GetName("pill_wfreddy2")) -- freddy
```

### `killers.GetFullName(pill)` <span class="fh-badge shared">SHARED</span>

Возвращает полное имя аниматроника.

::: info Важно
Полное имя аниматроника чаще всего хранит ключ к переводу, который можно преобразовать в нормальную строку только на клиенте.
На сервере советуется получать полное имя аниматроника у модель-энтити (`pills.getMappedEnt(ply)`) через значение `printName`.
:::

```lua
print(killers.GetFullName("pill_sfreddy2")) -- fazhunt.animatronics.sfreddy
```

### `pill_makePreferable(anim, bool)` <span class="fh-badge shared">SHARED</span>

Делает аниматроника играбельным или убирает из списка играбельных.

```lua
pill_makePreferable("pill_wfreddy2", true)
```
::: info Важно
Эту функцию напрямую использует Админ-Панель, когда снимается или устанавливается играбельность.
:::

### `pill_makeSecondary(anim, bool)` <span class="fh-badge shared">SHARED</span>

Добавляет/убирает аниматроника из списка вторичных. Чаще всего используется сразу же после регистрации аниматроника.

```lua
pill_makeSecondary("pill_wbonnie2", true)
```