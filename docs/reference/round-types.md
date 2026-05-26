# Типы раундов

Справочник встроенных типов раундов и инструкция по созданию своих.

## Встроенные типы

| ID | Имя | Описание |
|---|---|---|
| `0` | `normal` | Обычный раунд |
| `1` | `springtrap` | Один игрок получает Спрингтрапа |
| `2` | `bonnie_tag` | Половина игроков становятся Бонни. После скримера игроки меняются местами |
| `3` | `bear5` | Раунд-Заражение с Bear5 |

Получить тип текущего раунда:

```lua
if fh.GetRoundType() == 1 then
    print("Идёт раунд со Спрингтрапом!")
end
```

## Создание своего типа раунда

См. полную документацию: [Раунды →](/gameplay/rounds.md)

Быстрый пример:

```lua
fh.RegisterRoundType("golden_madness", "GFmadness", function()
	local players = player.GetAll()
		
	players = fh.GetEarnedKillers(players)
	
	if players then
		local chosenPlayer = players[1]
		
		-- Спавним Голову Золотого Фредди
		giveKiller(chosenPlayer, "pill_wgfreddyhead2", true)
		
		chosenPlayer.lobbyFreeze = true
		chosenPlayer:ReturnToSpawn()
	end
	
	RandomTaser()
	
	freezeAnimatronics()
end, 3, 6, 18)

```

Параметры:
- `weight = 3` — 3% шанс
- `minPlayers = 6` — минимум 6 игроков
- `maxPlayers = 18` — максимум 18

## Музыка для своего раунда

```lua
fh.AddRoundMusic(
    fh.GetRoundTypeByName("golden_madness"),
    "music/my_addon/golden_theme.mp3"
)
```

## Хуки раунда

Все хуки, связанные с этапами раунда: [Хуки раунда →](/hooks/round.md)