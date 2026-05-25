# Статистика

Статистика выводится всем игрокам в конце раунда в виде сообщений вида:
> **Игрок** прыгнул **42** раза.

Чтобы добавить свою статистику, нужно сначала зарегистрировать строку перевода.

## Подготовка: файл перевода

Создайте файл локализации (например, `resource/localization/ru/fh_custom_stats.properties`).

::: warning Важно
Все ключи должны начинаться с `fazhunt.stats.` и **не повторять** уже существующие.
:::

Пример строки:

```properties
fazhunt.stats.letters=написал %i букв(у).
```

- Перед текстом подставляется ник игрока.
- На месте `%i` подставляется значение статистики.

[Пример полного файла перевода →](https://github.com/s3rgeant/fazbearshunt_docs/blob/main/localization/fh_stats.properties)

## Функции

### `stats.SetMin(statName, minValue)` <span class="fh-badge server">SERVER</span>

Устанавливает минимальное значение интереса. Если игрок не наберёт этого числа — статистика не покажется в чате.

```lua
stats.SetMin("letters", 10)  -- меньше 10 прыжков — не выводим
```

### `stats.Add(ply, statName, value)` <span class="fh-badge server">SERVER</span>

Прибавляет значение к статистике игрока.

```lua
hook.Add("PlayerSay", "CountLetters", function(ply, text )
    if ply:Alive() and text:len() > 0 then
        stats.Add(ply, "letters", text:len())
    end
end)
```

### `stats.GetTop(statName)` <span class="fh-badge server">SERVER</span>

Возвращает лидера по статистике и его значение.

```lua
local topPly, topValue = stats.GetTop("letters")
print(topPly:Nick() .. " написал вот стока буковок: " .. topValue)
```

## Пример: Считаем количество приземлений

```lua
hook.Add("OnGamemodeLoaded", "FhCustomStats", function()
	if engine.ActiveGamemode() ~= "fazbearshunt" then return end -- надо убедиться что режим сервера - Fazbear's Hunt
	
	-- 1. Установить минимум
    stats.SetMin("landed", 200)
	
	-- 2. Считать действия
	hook.Add("OnPlayerHitGround", "CountLands", function(ply, inWater, onFloater, speed)
		if not inWater then
			stats.Add(ply, "landed", 1)
		end
	end)
end)

```

Не забудьте добавить в файл перевода:

```properties
fazhunt.stats.landed=приземлился %i раз(а).
```