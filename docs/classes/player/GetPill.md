> <span class="fh-badge shared">shared</span> @Entity@ @Player@:GetPill()

# Описание

Возвращает Пилл-Энтити игрока.

# Возвращает

> `1` @Entity@

- Если игрок имеет Пилл-Энтити, возвращает его, в противном случае - NULL.

## Пример

Если игрок 1 имеет Пилл, пишем сообщение в консоль.

```lua
local ply = Entity( 1 )

if IsValid( ply:GetPill() ) then
	print("Пилл присутствует!")
end
```