> <span class="fh-badge shared">shared</span> @boolean@ **AreLandConditionsGood(@Player@ ply, @Entity@ ent, @number@ waterlevel = 2, @number@ velocity = 350, @number@ posdistance = 150)**

# Description

Tells whether the landing animation should be played right now. Used by all animatronics.

::: warning Keep in mind
Even though the function is marked as <span class="fh-badge shared">shared</span>, you shouldn't use it on the client.
:::

# Arguments

> `1` @Player@ **ply**

- The player being checked.

> `2` @Entity@ **ent**

- The player's Pill entity.

> `3` @number@ **waterlevel** = 2

- The water immersion level the player must have for the function to return `true`.

> `4` @number@ **velocity** = 350

- The player's speed along the `Z` axis required for the function to return `true`.

> `5` @number@ **posdistance** = 150

- The distance the player must have traveled from the previous jump point for the function to return `true`.

# Returns

> `1` @boolean@

- Whether the landing animation should be played.