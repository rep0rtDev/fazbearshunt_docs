> <span class="fh-badge shared">shared</span> @Entity@ @Player@:GetPill()

# Description

Returns the player's Pill entity.

# Returns

> `1` @Entity@

- If the player has a Pill entity, returns it; otherwise returns NULL.

## Example

If player 1 has a Pill, print a message to the console.

```lua
local ply = Entity( 1 )

if IsValid( ply:GetPill() ) then
	print("Pill is present!")
end
```