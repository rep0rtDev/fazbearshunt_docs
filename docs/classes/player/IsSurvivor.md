> <span class="fh-badge shared">shared</span> @boolean@ @Player@:IsSurvivor()

# Описание

Возвращает `true`, если игрок - выживший.

# Возвращает

> `1` @boolean@

- Если игрок выживший, возвращает true, и false если нет.

## Пример

Если игрок 1 выживший, то пишем это в консоль.

```lua
local ply = Entity( 1 )

if ply:IsSurvivor() then
    print(ply:Nick() .. " - выживший")
end
```