> <span class="fh-badge shared">shared</span> @boolean@ @Player@:IsStuck()

# Description

Checks whether the player's hitbox is stuck in geometry or other entities. Unlike [`ENTITY:IsInWorld()`](https://wiki.facepunch.com/gmod/Entity:IsInWorld), it takes the hitbox into account.

# Returns

> `1` @boolean@

- Returns true if the player is stuck, and false if not.

## Example

If player 1 is stuck, kill them.

```lua
local ply = Entity( 1 )

if ply:IsStuck() then
	ply:Kill()
end
```