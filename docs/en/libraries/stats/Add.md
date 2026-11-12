> <span class="fh-badge server">server</span> **stats.Add(@Player@ ply, @string@ statName, @number@ value)**

# Description

Adds a value to a player's statistic.

# Arguments

> `1` @Player@ **ply**

- The player it is given to.

> `2` @string@ **statName**

- The statistic's name.

> `3` @number@ **value**

- The number to be added.

## Example

Give the player statistics for every letter they write.

```lua
hook.Add("PlayerSay", "CountLetters", function(ply, text )
    if ply:Alive() and text:len() > 0 then
        stats.Add(ply, "letters", text:len())
    end
end)
```