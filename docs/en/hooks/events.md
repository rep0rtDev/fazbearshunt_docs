# Event Hooks

Hooks related to special items and game events.

## Maniac Mask <span class="fh-badge client">CLIENT</span>

The Killer's Mask is a special item. When a survivor puts it on, after a short time they gain **obsession** — after this, animatronics cannot jumpscare them.

### `FH_KillerObsessed(ply)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge client">CLIENT</span>

Called after gaining the obsessed status.

```lua
hook.Add("FH_KillerObsessed", "ObsessedMsg", function(ply)
	if ply == LocalPlayer() then
		chat.AddText(Color(255, 0, 0), "You have become obsessed. Kill everyone and everything.")
	end
end)
```

### `FH_KillerLostObsession(ply)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge client">CLIENT</span>

Called after **losing** the obsessed status (e.g., after death).

```lua
hook.Add("FH_KillerLostObsession", "ObsessionLostMsg", function()
	if ply == LocalPlayer() then
		chat.AddText(Color(255, 200, 200), "Obsession is gone.")
	end
end)
```
