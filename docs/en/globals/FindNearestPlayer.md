> <span class="fh-badge shared">shared</span> @Player@ **FindNearestPlayer(@Vector@ origin, @number@ radius, @Player@ attacker, @number@ fov)**

# Description

Looks for the nearest survivor within a radius. If you specify `fov`, the survivor is searched for in a cone in front of the player, still taking the radius into account.

All animatronics with a jumpscare use this exact function for it.

# Arguments

> `1` @Vector@ **origin**

- The position the search starts from.

> `2` @number@ **radius**

- The search radius.

> `3` @Player@ **attacker**

- The "attacking" player. They are excluded from the search candidates.

> `4` @number@ **fov**

- The field of view in which the search is performed. If both `attacker` and `fov` are specified, the calculations are made from the `attacker`'s eyes.

# Returns

> `1` @Player@ **ply**

- Returns the player if one is found. Otherwise returns nil.