# Round Types

Reference for built-in round types and instructions for creating your own.

## Built-in types

| ID | Name | Description |
|---|---|---|
| `0` | `normal` | Normal round |
| `1` | `springtrap` | One player gets Springtrap |
| `2` | `bonnie_tag` | Half of the players become Bonnie. After a screamer, players swap roles |
| `3` | `bear5` | Infection round with Bear5 |

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
fh.RegisterRoundType("golden_madness", "GFmadness", function()
	local players = player.GetAll()
		
	players = fh.GetEarnedKillers(players)
	
	if players then
		local chosenPlayer = players[1]
		
		-- Spawn Golden Freddy Head
		giveKiller(chosenPlayer, "pill_wgfreddyhead2", true)
		
		chosenPlayer.lobbyFreeze = true
		chosenPlayer:ReturnToSpawn()
	end
	
	RandomTaser()
	
	freezeAnimatronics()
end, 3, 6, 18)

```

Parameters:
- `weight = 3` — 3% chance
- `minPlayers = 6` — minimum 6 players
- `maxPlayers = 18` — maximum 18

## Round start music

```lua
fh.AddRoundMusic(
    fh.GetRoundTypeByName("golden_madness"),
    "music/my_addon/golden_theme.mp3"
)
```

## Round hooks

All hooks related to round stages: [Round hooks →](/en/hooks/round.md)