> <span class="fh-badge shared">shared</span> @boolean@ @Player@:IsAnimatronic()

# Описание

Возвращает `true`, если игрок - аниматроник.

::: tip Важно
Если засунуть выжившего в команду `TEAM_PILLS` *(или 2701)*, то игра здесь будет выдавать `true`.
:::

# Возвращает

> `1` @boolean@

- Если игрок аниматроник, возвращает true, и false если нет.

## Пример

Если игрок 1 аниматроник, пишем ему в чат сообщение.

```lua
local ply = Entity( 1 )

if ply:IsAnimatronic() then
    ply:ChatPrint("Удачной охоты!")
end
```