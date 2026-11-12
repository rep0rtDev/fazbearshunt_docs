> <span class="fh-badge shared">shared</span> @boolean@ @Player@:IsSurvivor()

# Description

Returns `true` if the player is a survivor.

# Returns

> `1` @boolean@

- Returns true if the player is a survivor, and false if not.

## Example

If player 1 is a survivor, print it to the console.

```lua
local ply = Entity( 1 )

if ply:IsSurvivor() then
    print(ply:Nick() .. " is a survivor")
end
```