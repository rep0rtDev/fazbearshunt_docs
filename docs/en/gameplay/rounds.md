# Rounds

The round system is the core of Fazbear's Hunt. With update **3.0.0**, creating custom round types has become significantly easier.

## Registering a round type

### `fh.RegisterRoundType(name, id, func, [weight], [minPlayers], [maxPlayers])` <span class="fh-badge shared">SHARED</span>

Registers a new round type.

**Parameters:**

| Name | Type | Description |
|---|---|---|
| `name` | `string` | Technical name of the round in English |
| `id` | `int` / `string` | Round ID. If string, automatically converted to a number |
| `func` | `function` | Function executed when the round starts |
| `weight` | `int` *(opt.)* | Chance of occurring (0–100) |
| `minPlayers` | `int` *(opt.)* | Minimum number of players |
| `maxPlayers` | `int` *(opt.)* | Maximum number of players |

**Example:**

```lua
fh.RegisterRoundType("springtrap_madness", "spring_mad", function()
    -- Give everyone Springtrap!
    for _, ply in ipairs(player.GetAll()) do
        giveKiller(ply, "pill_wspringtrap2", true)
    end
end, 5, 4, 16)  -- 5% chance, 4–16 players
```

## Getting round information

### `fh.GetRoundTypes()` <span class="fh-badge shared">SHARED</span>

Returns a table with all registered round IDs.

```lua
local all = fh.GetRoundTypes()
PrintTable(all)
```

### `fh.GetRoundTypeByName(name)` <span class="fh-badge shared">SHARED</span>

Returns the round ID by its technical name.

```lua
local id = fh.GetRoundTypeByName("springtrap_madness")
print(id)  -- 12345 (for example)
```

### `fh.GetRoundTypeNameByNumber(id)` <span class="fh-badge shared">SHARED</span>

Inverse function — returns the name by ID.

```lua
local name = fh.GetRoundTypeNameByNumber(1)
print(name)  -- "springtrap"
```

## Round music

### `fh.AddRoundMusic(num, music)` <span class="fh-badge shared">SHARED</span>

Adds a music theme for a specific round type.

::: warning Override not possible
Already registered music cannot be overridden.
:::

```lua
fh.AddRoundMusic(
    fh.GetRoundTypeByName("springtrap_madness"),
    "music/my_addon/madness_theme.mp3"
)
```

### `fh.GetRoundMusic(num)` <span class="fh-badge shared">SHARED</span>

Returns the path to the round music. If no music is found for the specified type, returns the normal round music.

## Related hooks

- [`fh_prestartgame`](/en/hooks/round.md#fh_prestartgame) — before round selection
- [`fh_startgame`](/en/hooks/round.md#fh_startgame) — after round selection
- [`fh_poststartgame`](/en/hooks/round.md#fh_poststartgame) — after animatronic unfreeze
- [`fh_postendgame`](/en/hooks/round.md#fh_postendgame) — after round ends

See also: [Round hooks →](/en/hooks/round.md)
