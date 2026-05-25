# Round Types

Reference for built-in round types and instructions for creating your own.

## Built-in types

| ID | Name | Description |
|---|---|---|
| `0` | `normal` | Normal round |
| `1` | `springtrap` | One player gets Springtrap |

Get the current round type:

```lua
if fh.GetRoundType() == 1 then
    print("Springtrap round is underway!")
end
```

## Creating your own round type

See full documentation: [Rounds →](/en/gameplay/rounds.md)

Quick example:

```lua
fh.RegisterRoundType("golden_madness", "gold_mad", function()
    -- Give everyone Golden Freddy
    for _, ply in ipairs(player.GetAll()) do
        giveKiller(ply, "pill_wgfreddy2", true)
    end
end, 3, 6, 32)
```

Parameters:
- `weight = 3` — 3% chance
- `minPlayers = 6` — minimum 6 players
- `maxPlayers = 32` — maximum 32

[Example: Outworld Dimension for everyone](https://github.com/s3rgeant/fazbearshunt_docs/blob/main/examples/gfreddy_custom_round.lua)

## Music for your round

```lua
fh.AddRoundMusic(
    fh.GetRoundTypeByName("golden_madness"),
    "music/my_addon/golden_theme.mp3"
)
```

## Round hooks

All hooks related to round stages: [Round hooks →](/en/hooks/round.md)
