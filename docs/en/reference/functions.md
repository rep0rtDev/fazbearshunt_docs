# FH Functions

Global gamemode functions. Use them to modify the behavior of rounds, animatronics, and gifts.

## Animatronic management

### `giveKiller(ply, killer, [force])` <span class="fh-badge server">SERVER</span>

Assigns a player as an animatronic.

| Parameter | Type | Description |
|---|---|---|
| `ply` | `Player` | Who to assign |
| `killer` | `string` | Technical name (e.g., `"pill_wfreddy2"`) |
| `force` | `bool` *(opt.)* | If `true` — assigns even if the same one is already present |

```lua
giveKiller(ply, "pill_wspringtrap2", true)
```

[Usage example →](https://github.com/s3rgeant/fazbearshunt_docs/blob/main/examples/plushtrap_half_players.lua)

### `TaseAnimatronic(ply)` <span class="fh-badge server">SERVER</span>

If the player is an animatronic, tases them (like the Taser).

```lua
TaseAnimatronic(ply)
```

### `restoreAnimatronics()` <span class="fh-badge server">SERVER</span>

Removes the animatronic role from all current animatronics.

---

## Gifts

### `doGiftSpawning()` <span class="fh-badge server">SERVER</span> {#dogiftspawning}

Enables gift spawning on the map.

### `disableGiftSpawning()` <span class="fh-badge server">SERVER</span> {#disablegiftspawning}

Disables gift spawning.

---

## Round information

### `fh.GetRoundCount()` <span class="fh-badge shared">SHARED</span>

Returns the current round number (integer).

### `fh.GetEarnedKillers(players)` <span class="fh-badge server">SERVER</span>

Returns a table of players who "earned" being an animatronic in this round. Also **remembers** them for several rounds.

::: danger Attention
If you call this function — you **MUST** assign these players as animatronics. Otherwise, they will remain "stuck" in memory and won't be selected in future rounds.
:::

```lua
local candidates = fh.GetEarnedKillers(player.GetAll())
for _, ply in ipairs(candidates) do
    giveKiller(ply, "pill_wfreddy2")
end
```

### `fh.SetRoundType(number)` <span class="fh-badge server">SERVER</span>

Sets the round type. The mode calls this itself at the start of a round.

::: warning Be careful
Use only if you know exactly what you're doing.
:::

### `fh.GetRoundType()` <span class="fh-badge shared">SHARED</span>

Returns the current round type.

| Value | Round type |
|---|---|
| `0` | Normal |
| `1` | Springtrap |

### `fh.GetActiveUsedKiller(killer)` <span class="fh-badge shared">SHARED</span>

Returns `true` if the specified animatronic is currently present on the map.

```lua
if fh.GetActiveUsedKiller("pill_wbonnie2") then
    print("Bonnie is already in the game!")
end
```

---

## Animatronic abilities

::: info Where to use
These functions are intended for use inside animatronic **Pill Packs** or your own hooks that extend them.
:::

### `jumpscareEvent(ply, ent, target, [dist])` <span class="fh-badge server">SERVER</span>

Freezes the victim player in a screamer. Call **after** playing the animation.

| Parameter | Type | Description |
|---|---|---|
| `ply` | `Player` | The animatronic |
| `ent` | `Entity` | The animatronic's model (see `pk_pills.getMappedEnt(ply)`) |
| `target` | `Player` | The victim |
| `dist` | `float` *(opt.)* | Distance between the animatronic and victim |

### `HighlightPlayers(ply, ent)` <span class="fh-badge server">SERVER</span>

Used by all animatronics (except Plushtrap) on the `+reload` bind. Highlights players within `halo_radius`.

### `takePlayer(ply, ent)` <span class="fh-badge server">SERVER</span>

Used by the Endoskeleton to capture a player. Automatically finds a nearby target.

### `endoRelease(ply)` <span class="fh-badge server">SERVER</span>

Forces the animatronic to release a previously captured player.

---

## Target finding

### `FindNearestPlayer(origin, radius, ignorePlayer, fov)` <span class="fh-badge server">SERVER</span>

Finds the nearest player within a radius.

| Parameter | Type | Description |
|---|---|---|
| `origin` | `Vector` | Search point |
| `radius` | `number` | Radius |
| `ignorePlayer` | `Player` | Who to ignore |
| `fov` | `number` | If specified together with `ignorePlayer` — search only within the field of view cone |

Perfect for choosing an attack target.

### `fh_get_nearest_players(origin, radius, ignorePlayer)` <span class="fh-badge server">SERVER</span>

Returns a **table** of players within a radius. Used by the Clown when striking with a hammer.

### `fh_get_nearest_props(origin, radius)` <span class="fh-badge server">SERVER</span>

Returns a table of props within a radius.

---

## Animatronic list management

### `killers.getAllSolos()` <span class="fh-badge shared">SHARED</span>

Animatronics without secondary status. ⚠ Does not check playability.

### `killers.getAllPreferables(secondaries)` <span class="fh-badge shared">SHARED</span>

All playable animatronics. If `secondaries = true` — includes secondary ones as well.

### `killers.getAllNonPreferables()` <span class="fh-badge shared">SHARED</span>

All **non**-playable animatronics.

### `killers.getAllSecondaries()` <span class="fh-badge shared">SHARED</span>

All secondary animatronics.

### `killers.getAll()` <span class="fh-badge shared">SHARED</span>

All registered animatronics.

### `pill_makePreferable(anim, bool)` <span class="fh-badge shared">SHARED</span>

Makes an animatronic playable or removes it from the playable list.

```lua
pill_makePreferable("pill_wfreddy2", true)
```

### `pill_makeSecondary(anim, bool)` <span class="fh-badge shared">SHARED</span>

Adds/removes an animatronic from the secondary list.

```lua
pill_makeSecondary("pill_wbonnie2", true)
```
