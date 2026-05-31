# Gifts

FH's gift system allows players to pick up boxes with positive or negative effects. You can register your own.

## Custom effects

### `gifts.AddPositiveEffect(name, desc, num, func, [req])` <span class="fh-badge server">SERVER</span>

Registers a **positive** gift effect.

| Parameter | Type | Description |
|---|---|---|
| `name` | `string` | Technical name of the effect |
| `desc` | `string` | Description for the player (can be a translatable string or left empty) |
| `num` | `int` | Number to substitute into `%i` in the description (if ≥ 0) |
| `func` | `function` | Function executed when the effect is received |
| `req` | `function` *(opt.)* | Condition for granting the effect |

**Example: give a crowbar to the player if they don't have one.**

```lua
gifts.AddPositiveEffect(
    "give_crowbar",
    "fazhunt.gifts.crowbar_received",
    -1,
    function(ply)
        ply:Give("weapon_crowbar")
    end,
    function(ply)
        -- Grant only if the player doesn't already have a crowbar
        return not ply:HasWeapon("weapon_crowbar")
    end
)
```

### `gifts.AddNegativeEffect(name, desc, num, func)` <span class="fh-badge server">SERVER</span>

Registers a **negative** gift effect. Parameters are the same, except `req`.

```lua
gifts.AddNegativeEffect(
    "slow_player",
    "fazhunt.gifts.slowed",
    -1,
    function(ply)
        ply:SetWalkSpeed(100)
        ply:SetRunSpeed(150)
    end
)
```

### `gifts.GrantEffect(ply, name)` <span class="fh-badge server">SERVER</span>

Grants a positive gift effect to a player.

```lua
hook.Add( "PlayerSay", "ChatGift", function( ply, text )
	if ply:IsAdmin() and string.StartWith( string.lower( text ), "/gift " ) then
		gifts.GrantEffect(ply, string.sub( text, 7 )) 
		-- We wrote 7 in string.sub because that's the length of "/gift " + 1
		return ""
	end
end )
```

## Hooks

### `FH_ShouldPlayerReceiveGifts` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Called before spawning a gift for a player. Returning `false` means the player will not receive a gift.

```lua
hook.Add("FH_ShouldPlayerReceiveGifts", "NoGiftsForAdmins", function(ply)
	-- Admins do not receive gifts.
    if ply:IsAdmin() then return false end
end)
```

## See also

- [`doGiftSpawning()`](/en/reference/functions.md#dogiftspawning) — enable gift spawning
- [`disableGiftSpawning()`](/en/reference/functions.md#disablegiftspawning) — disable gift spawning
- [`PLAYER:SetGiftOwnership(bool)`](/en/reference/player-meta.md#setgiftownership) — set gift ownership flag