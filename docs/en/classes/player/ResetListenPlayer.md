> <span class="fh-badge server">server</span> @Player@:ResetListenPlayer()

# Description

Resets the forced listening restriction previously set through [Player:ForceListenPlayer()](/en/classes/player/ForceListenPlayer).

## Example

```lua
-- Make the victim hear only the animatronic
victim:ForceListenPlayer(killer)

-- After 10 seconds, restore normal hearing
timer.Simple(10, function()
    if IsValid(victim) then victim:ResetListenPlayer() end
end)
```