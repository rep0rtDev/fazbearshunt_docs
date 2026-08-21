> <span class="fh-badge shared">shared</span> Player:IsSurvivor()

# Описание

Возвращает `true`, если игрок - выживший.

## Пример

Если игрок 1 выживший, то пишем это в консоль.

```lua
local ply = Entity( 1 )

if ply:IsSurvivor() then
    print(ply:Nick() .. " - выживший")
end
```