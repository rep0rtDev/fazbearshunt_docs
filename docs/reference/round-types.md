# Типы раундов

Справочник встроенных типов раундов и инструкция по созданию своих.

## Встроенные типы

| ID | Имя | Описание |
|---|---|---|
| `0` | `normal` | Обычный раунд |
| `1` | `springtrap` | Один игрок получает Спрингтрапа |

Получить тип текущего раунда:

```lua
if fh.GetRoundType() == 1 then
    print("Идёт Спрингтрап раунд!")
end
```

## Создание своего типа раунда

См. полную документацию: [Раунды →](/gameplay/rounds)

Быстрый пример:

```lua
fh.RegisterRoundType("golden_madness", "gold_mad", function()
    -- Выдаём всем по Золотому Фредди
    for _, ply in ipairs(player.GetAll()) do
        giveKiller(ply, "pill_wgfreddy2", true)
    end
end, 3, 6, 32)
```

Параметры:
- `weight = 3` — 3% шанс
- `minPlayers = 6` — минимум 6 игроков
- `maxPlayers = 32` — максимум 32

[Пример: Загранное Измерение для всех](https://github.com/s3rgeant/fazbearshunt_docs/blob/main/examples/gfreddy_custom_round.lua)

## Музыка для своего раунда

```lua
fh.AddRoundMusic(
    fh.GetRoundTypeByName("golden_madness"),
    "music/my_addon/golden_theme.mp3"
)
```

## Хуки раунда

Все хуки, связанные с этапами раунда: [Хуки раунда →](/hooks/round)