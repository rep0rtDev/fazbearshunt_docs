# Animatronic Abilities

Unique hooks for each animatronic with their own mechanics.

## Freddy {#freddy}

### `FH_BlindRageStart` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Freddy has started searching for a target through Blind Rage.

```lua
hook.Run("FH_BlindRageStart", ply, ent, victim)
```

### `FH_BlindRageFailed` <span class="fh-badge hook">HOOK</span>

Blind Rage failed to find a target.

```lua
hook.Run("FH_BlindRageFailed", ply, ent, victim)
```

### `FH_BlindRageSuccess` <span class="fh-badge hook">HOOK</span>

The Blind Rage target has been successfully selected.

```lua
hook.Run("FH_BlindRageSuccess", ply, ent, victim)
```

```lua
hook.Add("FH_BlindRageSuccess", "RageBonus", function(freddy, ent, victim)
    victim:ChatPrint("Freddy has spotted you!")
end)
```

---

## Bonnie {#bonnie}

### `FH_YoursMineStart` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Bonnie has activated the **"Through Your Eyes"** ability.

```lua
hook.Run("FH_YoursMineStart", ply, ent, target)
```

### `FH_YoursMineSpectating` <span class="fh-badge hook">HOOK</span>

Bonnie has started spectating the target.

```lua
hook.Run("FH_YoursMineSpectating", ply, ent, target)
```

### `FH_YoursMineEnd` <span class="fh-badge hook">HOOK</span>

Bonnie has stopped spectating.

```lua
hook.Run("FH_YoursMineEnd", ply, ent, target)
```

---

## Chica {#chica}

### `FH_MinePlanted` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Chica has successfully planted a cupcake mine.

```lua
hook.Run("FH_MinePlanted", ply, ent, cupcake)
```

| Argument | Type | Description |
|---|---|---|
| `ply` | `Player` | Chica |
| `ent` | `Entity` | Chica's model |
| `cupcake` | `Entity` | The planted cupcake |

```lua
hook.Add("FH_MinePlanted", "BigCupcake", function(ply, ent, cupcake)
    -- Make cupcakes 2 times bigger
    cupcake:SetModelScale(2, 0.5)
end)
```

---

## Shadow Freddy {#shadow-freddy}

### `FH_SFreddySubmergeIn` <span class="fh-badge hook">HOOK</span>

Shadow Freddy **started** fading into invisibility.

```lua
hook.Run("FH_SFreddySubmergeIn", ply, ent)
```

### `FH_SFreddySubmergePostIn` <span class="fh-badge hook">HOOK</span>

Shadow Freddy has **fully** faded into invisibility.

```lua
hook.Run("FH_SFreddySubmergePostIn", ply, ent)
```

### `FH_SFreddySubmergeOut` <span class="fh-badge hook">HOOK</span>

Shadow Freddy has emerged from invisibility.

```lua
hook.Run("FH_SFreddySubmergeOut", ply, ent)
```

---

## Golden Freddy {#golden-freddy}

### `FH_OutworldStart` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Golden Freddy has selected a target for the Outworld Dimension.

```lua
hook.Run("FH_OutworldStart", wgfreddy, victim)
```

### `FH_OutworldEnd` <span class="fh-badge hook">HOOK</span>

The Outworld Dimension has been disabled.

```lua
hook.Run("FH_OutworldEnd", wgfreddy, victim)
```

::: danger Always check validity
The Outworld Dimension may be disabled because one of the players disconnected from the server. Always check `IsValid()`:

```lua
hook.Add("FH_OutworldEnd", "Cleanup", function(gfreddy, victim)
    if IsValid(victim) then
        victim:ChatPrint("You have returned to the real world.")
    end
end)
)
```
