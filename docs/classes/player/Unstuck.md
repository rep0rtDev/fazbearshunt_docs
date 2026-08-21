> <span class="fh-badge server">server</span> @Player@:Unstuck()

# Описание

Пытается телепортировать игрока в место, где он не застревает. Используйте вместе с `IsStuck()`.

## Пример

Вытаскиваем игрока если тот застрял после выхода из транспорта.

```lua
hook.Add("PlayerLeaveVehicle", "CheckStuck", function(ply, veh)
    timer.Simple(0.5, function()
        if IsValid(ply) and ply:IsStuck() then
            ply:Unstuck()
        end
    end)
end)
```