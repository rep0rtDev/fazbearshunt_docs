> <span class="fh-badge server">server</span> **gifts.AddNegativeEffect(@string@ name, @string@ description, @number@ num, @function@ func)**

# Description

Registers a **negative** gift effect.

# Arguments

> `1` @string@ **name**

- The effect's name in English.

> `2` @string@ **description**

- The effect's description. Translatable strings are also accepted.

> `3` @number@ **num**

- A number to substitute for `%i` inside **description** (if ≥ 0)

> `4` @function@ **func**

- The function that grants the effect.

## Example

Add a slowdown to the list of negative effects.

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