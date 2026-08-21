> <span class="fh-badge shared">shared</span> [boolean](https://wiki.facepunch.com/gmod/boolean) [Player](https://wiki.facepunch.com/gmod/Player):IsAnimatronic()

# Описание

Возвращает `true`, если игрок - аниматроник.

## Пример

Если игрок 1 аниматроник, пишем ему в чат сообщение.

```lua
local ply = Entity( 1 )

if ply:IsAnimatronic() then
    ply:ChatPrint("Удачной охоты!")
end
```

::: tip Важно
Если засунуть выжившего в команду `TEAM_PILLS` *(или 2701)*, то игра здесь будет выдавать `true`.
:::