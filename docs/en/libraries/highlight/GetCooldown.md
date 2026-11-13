> <span class="fh-badge server">server</span> @number@ **highlight.GetCooldown(@Player@ ply)**

# Description

Lets you find out the highlight cooldown.

The cooldown can be set through [highlight.Cooldown](/en/libraries/highlight/Cooldown)

# Arguments

> `1` @Player@ **ply**

- The player whose cooldown is being checked.

# Returns

> `1` @number@

- Returns the time until the cooldown ends. If the cooldown is over, returns `0`.