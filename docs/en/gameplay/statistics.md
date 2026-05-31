# Statistics

Statistics are displayed to all players at the end of the round as messages like:
> **Player** jumped **42** times.

To add your own statistics, you must first register a translation string.

## Preparation: translation file

Create a localization file (e.g., `resource/localization/en/fh_custom_stats.properties`).

::: warning Important
All keys must start with `fazhunt.stats.` and **not duplicate** existing ones.
:::

Example string:

```properties
fazhunt.stats.letters=wrote %i letter(s).
```

- The player's name is prepended to the text.
- The `%i` is replaced with the statistic value.

[Full translation file example →](https://github.com/s3rgeant/fazbearshunt_docs/blob/main/localization/fh_stats.properties)

## Functions

### `stats.SetMin(statName, minValue)` <span class="fh-badge server">SERVER</span>

Sets the minimum value of interest. If a player doesn't reach this number, the statistic won't be shown in chat.

```lua
stats.SetMin("letters", 10)  -- fewer than 10 letters — don't display
```

### `stats.Add(ply, statName, value)` <span class="fh-badge server">SERVER</span>

Adds a value to the player's statistic.

```lua
hook.Add("PlayerSay", "CountLetters", function(ply, text )
    if ply:Alive() and text:len() > 0 then
        stats.Add(ply, "letters", text:len())
    end
end)
```

### `stats.GetTop(statName)` <span class="fh-badge server">SERVER</span>

Returns the leader for a statistic and their value.

```lua
local topPly, topValue = stats.GetTop("letters")
print(topPly:Nick() .. " wrote this many letters: " .. topValue)
```

## Example: Counting landings

```lua
hook.Add("OnGamemodeLoaded", "FhCustomStats", function()
	-- make sure the server gamemode is Fazbear's Hunt
	if engine.ActiveGamemode() ~= "fazbearshunt" then return end 
	
	-- 1. Set the minimum
    stats.SetMin("landed", 200)
	
	-- 2. Count actions
	hook.Add("OnPlayerHitGround", "CountLands", function(ply, inWater, onFloater, speed)
		if not inWater then
			stats.Add(ply, "landed", 1)
		end
	end)
end)
```

Don't forget to add to the translation file:

```properties
fazhunt.stats.landed=landed %i time(s).
```