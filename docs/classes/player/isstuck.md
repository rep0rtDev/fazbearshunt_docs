> <span class="fh-badge shared">shared</span> [boolean](https://wiki.facepunch.com/gmod/boolean) [Player](https://wiki.facepunch.com/gmod/Player):IsStuck()

# Описание

Проверяет хитбокс игрока на застревание в геометрии или других сущностях. В отличие от [`ENTITY:IsInWorld()`](https://wiki.facepunch.com/gmod/Entity:IsInWorld), учитывает хитбокс.

## Пример

Если игрок 1 застрял, убиваем его.

```lua
local ply = Entity( 1 )

if ply:IsStuck() then
	ply:Kill()
end
```