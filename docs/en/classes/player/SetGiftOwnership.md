> <span class="fh-badge shared">shared</span> @Player@:SetGiftOwnership(@boolean@ ownsGift)

# Description

Sets whether the player has an uncollected gift.

::: warning Already used by the gamemode
This function is used by the gamemode by default, so that the game doesn't give a player a second gift until the first one is picked up. Don't use it unless you know what you're doing.
:::

# Arguments

> `1` @boolean@ **ownsGift**

- Pass true if the player has received a gift, and false if not.