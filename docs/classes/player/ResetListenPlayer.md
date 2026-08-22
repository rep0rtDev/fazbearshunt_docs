> <span class="fh-badge server">server</span> @Player@:ResetListenPlayer()

# Описание

Сбрасывает принудительное прослушивание игрока, установленным ранее через [Player:ForceListenPlayer()](/classes/player/ForceListenPlayer).

## Пример

```lua
-- Заставить жертву слышать только аниматроника
victim:ForceListenPlayer(killer)

-- Через 10 секунд вернуть нормальное состояние
timer.Simple(10, function()
    if IsValid(victim) then victim:ResetListenPlayer() end
end)
```