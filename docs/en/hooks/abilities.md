# Animatronic Abilities

Unique hooks for each animatronic with their own mechanics.

## General {#general}

### `fh_animatronic_break_prop(ply, ent, tr)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Triggers inside `AnimatronicBreakProp(ply,ent)`, for animatronics with a screamer. `tr` has the [`TraceResult`](https://wiki.facepunch.com/gmod/Structures/TraceResult) structure.
Return `false` — the animatronic cannot break props.

### `fh_animatronic_post_break_prop(ply, ent, tr)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Triggers after `AnimatronicBreakProp(ply,ent)`.

## Freddy {#freddy}

### `FH_BlindRageStart(ply, ent, victim)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Freddy has started searching for a target using Blind Rage.

### `FH_BlindRageFailed(ply, ent, victim)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

The target avoided Blind Rage, the ability has been canceled.

### `FH_BlindRageSuccess(ply, ent, victim)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

The Blind Rage target has been successfully selected.

### `FH_HandleBlindRageTarget(ply, victim)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Determines whether `victim` can become a potential target for Blind Rage. Return `false` — the player is immune to Blind Rage target searching.

```lua
hook.Add("FH_BlindRageSuccess", "RageChatPrint", function(freddy, ent, victim)
    victim:ChatPrint("Freddy has aggroed on you!")
end)
```

---

## Bonnie {#bonnie}

### `FH_YoursMineStart(ply, ent, target)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Bonnie has activated the **"Through Your Mind"** ability.

### `FH_YoursMineSpectating(ply, ent, target)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Bonnie has started controlling the target.

### `FH_YoursMineEnd(ply, ent, target)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Bonnie has stopped controlling the target.

---

## Chica {#chica}

### `FH_MinePlanted(ply, ent, cupcake)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Chica has successfully planted a cupcake mine.

| Argument | Type | Description |
|---|---|---|
| `ply` | `Player` | Chica |
| `ent` | `Entity` | Chica's model |
| `cupcake` | `Entity` | The planted cupcake |

```lua
hook.Add("FH_MinePlanted", "BigCupcake", function(ply, ent, cupcake)
    -- Make cupcakes 2 times bigger
    cupcake:SetModelScale(2, 0.01)
end)
```

---

## Shadow Freddy {#shadow-freddy}

### `FH_SFreddySubmergeIn(ply, ent)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Shadow Freddy **started** fading into invisibility.

### `FH_SFreddySubmergePostIn(ply, ent)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Shadow Freddy has **fully** faded into invisibility.

### `FH_SFreddySubmergeOut(ply, ent)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Shadow Freddy has emerged from invisibility.

---

## Endoskeleton {#endo02}

### `FH_HandlePlayerGrab(ply, target)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

The Endoskeleton is trying to grab a player. Return `false` — the player cannot be grabbed.

### `fh_endo_release(ply, target)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

The Endoskeleton has released `target`.

---

## Golden Freddy {#golden-freddy}

### `FH_OutworldStart(wgfreddy, victim)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Golden Freddy has selected a target for the Outworld Dimension.

### `FH_OutworldEnd(wgfreddy, victim)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

The Outworld Dimension has been disabled.

---

## Toy Chica {#toy-chica}

### `FH_HandlePlayerHold(ply, target)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Toy Chica is trying to grab a player. Return `false` — the player cannot be grabbed.

---

::: danger Always check validity
Animatronic abilities may be disabled because one of the players left the server. Always use `IsValid()`:

```lua
hook.Add("FH_OutworldEnd", "OutworldEndWelcome", function(gfreddy, victim)
    if IsValid(victim) then
        victim:ChatPrint("You have returned to the real world.")
    end
end)
```