# Статистика

Статистика выводится всем игрокам в конце раунда в виде сообщений вида:
> **Игрок** прыгнул **42** раза.

Чтобы добавить свою статистику, нужно сначала зарегистрировать строку перевода.

## Подготовка: файл перевода

Создайте файл локализации (например, `resource/localization/en/fh_stats.properties`).

::: warning Важно
Все ключи должны начинаться с `fazhunt.stats.` и **не повторять** уже существующие.
:::

Пример строки:

```properties
fazhunt.stats.jumped=прыгнул %i раз(а).
```

- Перед текстом подставляется ник игрока.
- На месте `%i` подставляется значение статистики.

[Пример полного файла перевода →](https://github.com/s3rgeant/fazbearshunt_docs/blob/main/localization/fh_stats.properties)

## Функции

### `stats.SetMin(statName, minValue)` <span class="fh-badge server">SERVER</span>

Устанавливает минимальное значение интереса. Если игрок не наберёт этого числа — статистика не покажется в чате.

```lua
stats.SetMin("jumped", 10)  -- меньше 10 прыжков — не выводим
```

### `stats.Add(ply, statName, value)` <span class="fh-badge server">SERVER</span>

Прибавляет значение к статистике игрока.

```lua
hook.Add("KeyPress", "CountJumps", function(ply, key)
    if key == IN_JUMP then
        stats.Add(ply, "jumped", 1)
    end
end)
```

### `stats.GetTop(statName)` <span class="fh-badge server">SERVER</span>

Возвращает лидера по статистике и его значение.

```lua
local topPly, topValue = stats.GetTop("jumped")
print(topPly:Nick() .. " прыгнул " .. topValue .. " раз")
```

## Пример: полный цикл

```lua
-- 1. Установить минимум
hook.Add("Initialize", "MyStatsInit", function()
    stats.SetMin("destroyed_props", 5)
end)

-- 2. Считать действия
hook.Add("EntityRemoved", "CountDestroyed", function(ent)
    local attacker = ent.LastAttacker
    if IsValid(attacker) and attacker:IsPlayer() then
        stats.Add(attacker, "destroyed_props", 1)
    end
end)
```

Не забудьте добавить в файл перевода:

```properties
fazhunt.stats.destroyed_props=уничтожил %i пропов.
```