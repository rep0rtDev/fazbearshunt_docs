> <span class="fh-badge server">server</span> **gifts.SetBlockPositiveEffect(@string@ gift, @bool@ isBlocked)**

# Description

Grants the player a positive gift effect.

# Arguments

> `1` @string@ **gift**

- The effect's name.

> `2` @boolean@ **isBlocked**

- Will the effect be blocked?

## Example

Disable the shotgun and the gravity gun from dropping.

```lua
gifts.SetBlockPositiveEffect("oldshotgun", true)
gifts.SetBlockPositiveEffect("gravity_gun", true)
```