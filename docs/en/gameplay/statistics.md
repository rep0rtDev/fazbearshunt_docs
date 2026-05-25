# Statistics

Statistics are displayed to all players at the end of the round as messages like:
> **Player** jumped **42** times.

To add your own statistics, you must first register a translation string.

## Preparation: translation file

Create a localization file (e.g., `resource/localization/en/fh_stats.properties`).

::: warning Important
All keys must start with `fazhunt.stats.` and **not duplicate** existing ones.
:::

Example string:

```properties
fazhunt.stats.jumped=jumped %i time(s).
```

- The player's name is prepended to the text.
- The `%i` is replaced with the statistic value.

[Full translation file example →](https://github.com/s3rgeant/fazbearshunt_docs/blob/main/localization/fh_stats.properties)

## Functions

### `stats.SetMin(statName, minValue)` <span class="fh-badge server">SERVER</span>

Sets the minimum value of interest. If a player doesn't reach this number, the statistic won't be shown in chat.

```lua
stats.SetMin("jumped", 10)  -- fewer than 10 jumps — don't display
```

### `stats.Add(ply, statName, value)` <span class="fh-badge server">SERVER</span>

Adds a value to the player's statistic.

```lua
hook.Add("KeyPress", "CountJumps", function(ply, key)
    if key == IN_JUMP then
        stats.Add(ply, "jumped", 1)
    end
end)
```

### `stats.GetTop(statName)` <span class="fh-badge server">SERVER</span>

Returns the leader for a statistic and their value.

```lua
local topPly, topValue = stats.GetTop("jumped")
print(topPly:Nick() .. " jumped " .. topValue .. " times")
```

## Example: full cycle

```lua
-- 1. Set the minimum
hook.Add("Initialize", "MyStatsInit", function()
    stats.SetMin("destroyed_props", 5)
end)

-- 2. Count actions
hook.Add("EntityRemoved", "CountDestroyed", function(ent)
    local attacker = ent.LastAttacker
    if IsValid(attacker) and attacker:IsPlayer() then
        stats.Add(attacker, "destroyed_props", 1)
    end
end)
```

Don't forget to add to the translation file:

```properties
fazhunt.stats.destroyed_props=destroyed %i prop(s).
```
