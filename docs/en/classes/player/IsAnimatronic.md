> <span class="fh-badge shared">shared</span> @boolean@ @Player@:IsAnimatronic()

# Description

Returns `true` if the player is an animatronic.

::: tip Important
If you put a survivor into the `TEAM_PILLS` team *(or 2701)*, this function will return `true` for them.
:::

# Returns

> `1` @boolean@

- Returns true if the player is an animatronic, and false if not.

## Example

If player 1 is an animatronic, send them a chat message.

```lua
local ply = Entity( 1 )

if ply:IsAnimatronic() then
    ply:ChatPrint("Happy hunting!")
end
```