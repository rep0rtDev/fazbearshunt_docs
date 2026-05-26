# Animatronic Abilities

Unique hooks for each animatronic with their own mechanics.

## General {#general}

### `fh_animatronic_break_prop(ply, ent, tr)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Called inside `AnimatronicBreakProp(ply,ent)` for animatronics with a jumpscare. `tr` uses the [`TraceResult`](https://wiki.facepunch.com/gmod/Structures/TraceResult) structure.
Return `false` — the animatronic cannot attack.

### `fh_animatronic_post_break_prop(ply, ent, tr)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Called after `AnimatronicBreakProp(ply,ent)`.

## Freddy {#freddy}

### `FH_BlindRageStart(ply, ent, victim)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Freddy started searching for a target using Blind Rage.

### `FH_BlindRageFailed(ply, ent, victim)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

The target avoided Blind Rage, the ability was canceled.

### `FH_BlindRageSuccess(ply, ent, victim)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

A Blind Rage target was successfully selected.

### `FH_HandleBlindRageTarget(ply, victim)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Determines whether `victim` can become a potential target for Blind Rage. Return `false` — the player is immune to Blind Rage target selection.

```lua
hook.Add("FH_BlindRageSuccess", "RageChatPrint", function(freddy, ent, victim)
    victim:ChatPrint("Freddy is targeting you!")
end)
```

---

## Bonnie {#bonnie}

### `FH_YoursMineStart(ply, ent, target)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Bonnie activated the **"Your Mind Is Mine"** ability.

### `FH_YoursMineSpectating(ply, ent, target)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Bonnie started controlling the target.

### `FH_YoursMineEnd(ply, ent, target)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Bonnie stopped controlling the target.

---

## Chica {#chica}

### `FH_MinePlanted(ply, ent, cupcake)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Chica successfully planted a cupcake mine.

| Argument  | Type     | Description         |
| --------- | -------- | ------------------- |
| `ply`     | `Player` | Chica               |
| `ent`     | `Entity` | Chica's model       |
| `cupcake` | `Entity` | The planted cupcake |

```lua
hook.Add("FH_MinePlanted", "BigCupcake", function(ply, ent, cupcake)
    -- Make cupcakes 2 times larger
    cupcake:SetModelScale(2, 0.01)
end)
```

---

## Shadow Freddy {#shadow-freddy}

### `FH_SFreddySubmergeIn(ply, ent)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Shadow Freddy **started** becoming invisible.

### `FH_SFreddySubmergePostIn(ply, ent)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Shadow Freddy has **fully** become invisible.

### `FH_SFreddySubmergeOut(ply, ent)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Shadow Freddy emerged from invisibility.

---

## Endoskeleton {#endo02}

### `FH_HandlePlayerGrab(ply, target)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

The Endoskeleton is attempting to grab a player. Return `false` — the player cannot be grabbed.

### `fh_endo_release(ply, target)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

The Endoskeleton released `target`.

---

## Golden Freddy {#golden-freddy}

### `FH_OutworldStart(wgfreddy, victim)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Golden Freddy selected a target for the Outworld.

### `FH_OutworldEnd(wgfreddy, victim)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

The Outworld has ended.

## Toy Chica {#toy-chica}

### `FH_HandlePlayerHold(ply, target)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Toy Chica is attempting to grab a player. Return `false` — the player cannot be grabbed.

::: danger Always check validity
Animatronic abilities may end because one of the players left the server. Always use `IsValid()`:

```lua
hook.Add("FH_OutworldEnd", "OutworldEndWelcome", function(gfreddy, victim)
    if IsValid(victim) then
        victim:ChatPrint("You have returned to the real world.")
    end
end)
```
:::