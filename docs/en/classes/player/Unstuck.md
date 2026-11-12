> <span class="fh-badge server">server</span> @Player@:Unstuck()

# Description

Tries to teleport the player to a place where they won't be stuck. Use together with `IsStuck()`.

## Example

Free the player if they get stuck after leaving a vehicle.

```lua
hook.Add("PlayerLeaveVehicle", "CheckStuck", function(ply, veh)
    timer.Simple(0.5, function()
        if IsValid(ply) and ply:IsStuck() then
            ply:Unstuck()
        end
    end)
end)
```