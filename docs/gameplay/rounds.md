# Раунды

Система раундов — ядро Fazbear's Hunt. С обновлением **3.0.0** создание собственных типов раундов стало значительно проще.

## Регистрация типа раунда

### `fh.RegisterRoundType(name, id, func, [weight], [minPlayers], [maxPlayers])` <span class="fh-badge server">SERVER</span>

Регистрирует новый тип раунда. Возвращает ID и Техническое имя раунда.

**Параметры:**

| Имя | Тип | Описание |
|---|---|---|
| `name` | `string` | Техническое имя раунда на английском |
| `id` | `int` / `string` | ID раунда. Если строка — автоматически конвертируется в число |
| `func` | `function` | Функция, выполняемая при начале раунда |
| `weight` | `int` *(опц.)* | Шанс выпадения (0–100) |
| `minPlayers` | `int` *(опц.)* | Минимальное число игроков |
| `maxPlayers` | `int` *(опц.)* | Максимальное число игроков |

**Пример:**

```lua
local id, name = fh.RegisterRoundType("springtrap_madness", "spring_mad", function()
    -- Раздаём всем по Спрингтрапу!
    for _, ply in player.Iterator() do
        giveKiller(ply, "pill_springtrap", true)
    end
end, 5, 4, 16)  -- 5% шанс, 4–16 игроков

print(id, name) -- 43700	springtrap_madness
```

## Управление раундами

### `fh.SetRoundTypeBlocked(id, block)` <span class="fh-badge server">SERVER</span>

Блокирует раунд по ID, и не даёт игре его выбрать.

```lua
-- Блокируем раунд со Спрингтрапом
fh.SetRoundTypeBlocked(1, true)
```

## Получение информации о раундах

### `fh.GetRoundTypes()` <span class="fh-badge server">SERVER</span>

Возвращает таблицу со всеми ID зарегистрированных раундов.

```lua
local all = fh.GetRoundTypes()
PrintTable(all)
```

### `fh.GetRoundTypeByName(name)` <span class="fh-badge server">SERVER</span>

Возвращает ID раунда по его техническому имени.

```lua
local id = fh.GetRoundTypeByName("springtrap_madness")
print(id)  -- 12345 (например)
```

### `fh.GetRoundTypeNameByNumber(id)` <span class="fh-badge server">SERVER</span>

Обратная функция — возвращает имя по ID.

```lua
local name = fh.GetRoundTypeNameByNumber(1)
print(name)  -- "springtrap"
```

## Музыка раунда

### `fh.AddRoundMusic(num, music)` <span class="fh-badge server">SERVER</span>

Добавляет музыкальную тему для конкретного типа раунда.

::: warning Замена недоступна
Заменить уже зарегистрированную музыку нельзя.
:::

```lua
fh.AddRoundMusic(
    fh.GetRoundTypeByName("springtrap_madness"),
    "music/my_addon/madness_theme.mp3"
)
```

### `fh.GetRoundMusic(num)` <span class="fh-badge server">SERVER</span>

Возвращает путь к музыке раунда. Если для указанного типа музыка не найдена — возвращается музыка обычного раунда.

## Связанные хуки

- [`fh_prestartgame`](/hooks/round.md#fh_prestartgame) — перед выбором раунда
- [`fh_startgame`](/hooks/round.md#fh_startgame) — после выбора раунда
- [`fh_poststartgame`](/hooks/round.md#fh_poststartgame) — после разморозки аниматроников
- [`fh_postendgame`](/hooks/round.md#fh_postendgame) — после окончания раунда

См. также: [Хуки раунда →](/hooks/round.md)