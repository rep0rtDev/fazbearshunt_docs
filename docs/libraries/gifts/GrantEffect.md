> <span class="fh-badge server">server</span> **gifts.GrantEffect(@Player@ ply, @string@ name)**

# Описание

Выдаёт игроку позитивный эффект с подарков.

# Аргументы

> `1` @Player@ **ply**

- Название эффекта на английском.

> `2` @string@ **name**

- Описание эффекта. Также принимаются переводимые строки.

## Пример

Выдача эффектов через команду в чате.

```lua
hook.Add( "PlayerSay", "ChatGift", function( ply, text )
	if ply:IsAdmin() and string.StartWith( string.lower( text ), "/gift " ) then
		gifts.GrantEffect(ply, string.sub( text, 7 )) 
		-- Мы написали 7 в string.sub потому что это длина "/gift " + 1
		return ""
	end
end )
```