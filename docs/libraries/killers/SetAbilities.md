> <span class="fh-badge shared">shared</span> **killers.SetAbilities(@string@ pill, @table@ abilities)**

# Описание

Позволяет установить аниматронику список способностей, которые будут отображаться в его интерфейсе.

# Аргументы

> `1` @string@ **pill**

- Техническое имя Пилла, например `freddy`.

> `2` @table@ **abilities**

- Список способностей Пилла.

## Пример

```lua
killers.SetAbilities("scrapbaby", {
	[1] = { name = 'snatch', key = 'RMB' },
	[2] = { name = 'highlight', key = 'R' },
	[3] = { name = 'kill', key = 'LMB', hidden = true },
})
```