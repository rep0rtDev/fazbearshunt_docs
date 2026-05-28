# PillCostumeMeta

Обьяснение функций энтити Пилла `pill_costume`, такие как воспроизведение анимаций и т.д.

## Основные <span class="fh-badge shared">SHARED</span> {#main}

### `ENTITY:GetPillForm()`

Возвращает имя Пилла, например `pill_wfoxy2`.

### `ENTITY:GetPillUser()`

Возвращает владельца Пилла.

:::warning Осторожно
Во время способности Бонни, пока он управляет игроком, Пилл отделяется от него, и этот метод будет выдавать `NULL`. Используйте метод ниже чтобы узнать предыдущего владельца.
:::

### `ENTITY:GetPrevPillUser()`

Возвращает предыдущего владельца Пилла.

### `ENTITY:SetUseForceAngles(bool)`

Использовать для поворота Пилла принуждённые углы?

### `ENTITY:SetForceAngles(Angle)`

Устанавливает принуждённые углы. Если `GetUseForceAngles()` == `true`, то Пилл будет направлен соответсвующе этим углам.

### `ENTITY:GetForceAngles()`

Возвращает принуждённые углы.

---

## Вспомогательные функции <span class="fh-badge shared">SHARED</span> {#helpies}

### `ENTITY:Get(name, default)`

Возвращает значение `name` из структуры Пилла, а если его нет, возвращает `default`.

```lua
-- Способ 1
if ent:Get("noFallDamage", false) == true then
	print("Этому Пиллу отключён урон от падения")
end

-- Способ 2
if ent.formTable and ent.formTable.noFallDamage then
	print("Этому Пиллу отключён урон от падения")
end
```

### `ENTITY:GetPillName()`

Возвращает имя Пилла из значения `name`.

:::tip Тоже самое
Тоже самое можно получить с помощью `ent:Get("name", "")`
:::

---

## Анимации <span class="fh-badge server">SERVER</span> {#animations}

### `ENTITY:PillAnim(name, freeze)`

Включает анимацию из таблицы `anims.default`.

| Параметр | Тип | Описание |
|---|---|---|
| `name` | `string` | Название анимации |
| `freeze` | `bool` | Отключить передвижение Пилла во время проигрывания анимации? |

### `ENTITY:PillGesture(name, priority, rate, blendin, blendout, start, loop)`

Проигрывает слоёную анимацию из таблицы `anims.gestures`.

| Параметр | Тип | Описание |
|---|---|---|
| `name` | `string` | Название |
| `priority` | `float` | Приоритет |
| `rate` | `float` | Скорость проигрывания |
| `blendin` | `float` | Интервал, в течение которого слой будет полностью проявиться с момента запуска |
| `blendout` | `float` | Интервал, в течение которого слой полностью исчезнет |
| `start` | `int` | Момент с которого должен начаться слой `(0-1)` |
| `loop` | `bool` | Зациклить слой? |

### `ENTITY:PillGesture(name)`

Останавливает слоёную анимацию.

### `ENTITY:ReplaceAnimation(old, new)`

Меняет анимацию с названием `old`, из таблицы `anims.default`, на `new`.

---

## Звуки <span class="fh-badge server">SERVER</span> {#sounds}

### `ENTITY:PillSound(name, bulk)`

Проигрывает звук из таблицы `sounds`.

| Параметр | Тип | Описание |
|---|---|---|
| `name` | `string` | Название звука |
| `bulk` | `bool` | Если `true`, позволяет включать много звуков без их обрывания, однако звук не будет следовать за Пиллом |

### `ENTITY:PillLoopSound(name, volume, pitch)`

Проигрывает циклящийся звук из таблицы `sounds`.

:::tip
Название звука должно начинаться с `loop_` чтобы звук включился!
:::

| Параметр | Тип | Описание |
|---|---|---|
| `name` | `string` | Название звука |
| `volume` | `float` | Громкость |
| `pitch` | `float` | Высота |

### `ENTITY:PillLoopStop(name)`

Останавливает циклящийся звук.

### `ENTITY:PillLoopStopAll(name)`

Останавливает все циклящиеся звуки.

---

## Скорость <span class="fh-badge server">SERVER</span> {#speed}

### `ENTITY:SetSpeed(walk, run, duck, jump)`

Меняет скорость Пилла в таблице `moveSpeed`, и скорость владельца Пилла.

| Параметр | Тип | Описание |
|---|---|---|
| `walk` | `float` | Ходьба |
| `run` | `float` | Бег |
| `duck` | `float` | Вприсяди |
| `jump` | `float` | Сила прыжка |

### `ENTITY:ResetSpeed()`

Меняет скорость владельца Пилла на скорость из таблицы `moveSpeed`.

### `ENTITY:SetDefaultSpeed()`

Меняет скорость Пилла и его владельца на изначальную скорость, когда Пилл был только выдан.

---

## Отсоединение от игрока <span class="fh-badge server">SERVER</span> {#detaching}

### `ENTITY:DetachPlayer()`

Отцепляет Пилл от владельца. Используется способностью "Чужим Разумом"

:::tip На заметку
На этом моменте можно получить предыдущего владельца через `GetPrevPillUser()`
:::
:::warning Осторожно
`pills.getMappedEnt(ply)` и `ply:GetPill()` после отцепления будут выдавать NULL.
:::

### `ENTITY:AttachPlayer(ply)`

Цепляет Пилл к игроку. Если не указать `ply`, цепляет к предыдущему владельцу.