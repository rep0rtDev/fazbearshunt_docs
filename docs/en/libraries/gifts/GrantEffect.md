> <span class="fh-badge server">server</span> **gifts.GrantEffect(@Player@ ply, @string@ name)**

# Description

Grants the player a positive gift effect.

# Arguments

> `1` @Player@ **ply**

- The player, who will get the effect.

> `2` @string@ **name**

- The effect's name.

## Example

Granting effects through a chat command.

```lua
hook.Add( "PlayerSay", "ChatGift", function( ply, text )
	if ply:IsAdmin() and string.StartWith( string.lower( text ), "/gift " ) then
		gifts.GrantEffect(ply, string.sub( text, 7 )) 
		-- We used 7 in string.sub because that is the length of "/gift " + 1
		return ""
	end
end )
```