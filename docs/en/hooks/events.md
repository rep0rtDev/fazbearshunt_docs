# Event Hooks

Hooks related to special items and game events.

## Maniac Mask <span class="fh-badge client">CLIENT</span>

The Maniac Mask is a special item. When a survivor wears it, after some time they gain **obsession** — after which animatronics cannot screamer them.

### `FH_KillerObsessed` <span class="fh-badge hook">HOOK</span> <span class="fh-badge client">CLIENT</span>

Called after gaining the obsessed status.

```lua
hook.Run("FH_KillerObsessed")
```

```lua
hook.Add("FH_KillerObsessed", "ObsessedFX", function()
    chat.AddText(Color(255, 0, 0), "You have become obsessed. Animatronics cannot see you.")
    -- can trigger a visual effect
end)
```

### `FH_KillerLostObsession` <span class="fh-badge hook">HOOK</span> <span class="fh-badge client">CLIENT</span>

Called after **losing** the obsessed status (e.g., after death).

```lua
hook.Run("FH_KillerLostObsession")
```

```lua
hook.Add("FH_KillerLostObsession", "ObsessionLost", function()
    chat.AddText(Color(255, 200, 200), "Obsession is gone.")
end)
```
