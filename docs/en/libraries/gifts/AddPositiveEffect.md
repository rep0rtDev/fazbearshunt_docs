> <span class="fh-badge server">server</span> **gifts.AddPositiveEffect(@string@ name, @string@ description, @number@ num, @function@ func, @function@ or @nil@ req = nil)**

# Description

Registers a **positive** gift effect.

# Arguments

> `1` @string@ **name**

- The effect's name in English.

> `2` @string@ **description**

- The effect's description. Translatable strings are also accepted.

> `3` @number@ **num**

- A number to substitute for `%i` inside **description** (if ≥ 0)

> `4` @function@ **func**

- The function that grants the effect.

> `5` @function@ or @nil@ **req** *= nil*

- A function with the condition for granting the effect; it must return `true` or `false`. *Optional argument.*

## Example

Add a crowbar to the list of positive effects.

```lua
gifts.AddPositiveEffect(
    "give_crowbar",
    "fazhunt.gifts.crowbar_received",
    -1,
    function(ply)
        ply:Give("weapon_crowbar")
    end,
    function(ply)
        -- Only grant it if the player doesn't have a crowbar yet
        return not ply:HasWeapon("weapon_crowbar")
    end
)
```