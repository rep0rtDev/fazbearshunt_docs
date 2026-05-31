# FH Functions

Global gamemode functions. Use them to modify the behavior of rounds, animatronics, and gifts.

## Animatronic management

### `giveKiller(ply, killer, [force])` <span class="fh-badge server">SERVER</span>

Assigns a player as an animatronic.

| Parameter | Type | Description |
|---|---|---|
| `ply` | `Player` | Who to assign |
| `killer` | `string` | Name (e.g., `"pill_wfreddy2"`) |
| `force` | `bool` *(opt.)* | If `true` — assigns even if the same one is already present |

```lua
giveKiller(ply, "pill_springtrap", true)
```

### `giveKillerSilent(ply, killer, [force])` <span class="fh-badge server">SERVER</span>

Same as above, but without a chat notification.

[Usage example →](https://github.com/s3rgeant/fazbearshunt_docs/blob/main/examples/plushtrap_half_players.lua)

### `TaseAnimatronic(ply)` <span class="fh-badge server">SERVER</span>

If the player is an animatronic, tases them (like the Taser).

```lua
TaseAnimatronic(ply)
```

### `restoreAnimatronics()` <span class="fh-badge server">SERVER</span>

Removes the animatronic role from all current animatronics.

### `restoreAnimatronic(ply)` <span class="fh-badge server">SERVER</span>

Removes the animatronic role from a specific player.

---

## Gifts

### `doGiftSpawning()` <span class="fh-badge server">SERVER</span> {#dogiftspawning}

Enables gift spawning on the map.

### `disableGiftSpawning()` <span class="fh-badge server">SERVER</span> {#disablegiftspawning}

Disables gift spawning.

---

## Round information

### `fh.GetRoundCount()` <span class="fh-badge server">SERVER</span>

Returns the current round number (integer).

### `fh.GetEarnedKillers(players)` <span class="fh-badge server">SERVER</span>

Returns a table of players, sorted first by those who "earned" being an animatronic in this round.

```lua
local candidates = fh.GetEarnedKillers(player.GetAll())

-- the first player in the table is often the one who hasn't been an animatronic the longest
giveKiller(candidates[1], "pill_wfreddy2")
```

### `fh.GetActiveUsedKiller(killer)` <span class="fh-badge server">SERVER</span>

Returns the player who was given the specified animatronic.

```lua
if fh.GetActiveUsedKiller("pill_wbonnie2") then
    print("Bonnie is already in the game!")
end
```

::: info Note
If there is more than one animatronic with the name `killer`, the function will return the one that was assigned last.
:::

---

## Animatronic abilities

::: info Where to use
These functions are intended for use inside animatronic **Pill Packs** or your own hooks that extend them.
:::

### `performJumpscare(ply, ent, target, killDelay, [voiceCharacter], [jumpscareDistance], [wepClass])` <span class="fh-badge server">SERVER</span> {#performjumpscare}

Forcefully screamers `target` for `ply`. Returns `true` if the screamer occurred, and `false` if not.

| Parameter | Type | Description |
|---|---|---|
| `ply` | `Player` | The animatronic |
| `ent` | `Entity` | The animatronic's model (`pills.getMappedEnt(ply)`) |
| `target` | `Player` | The victim |
| `killDelay` | `float` | Kill time |
| `voiceCharacter` | `string` *(opt.)* | Technical name of the animatronic (used for playing voicelines) |
| `jumpscareDistance` | `float` *(opt.)* | Distance between the animatronic and victim |
| `wepClass` | `string` *(opt.)* | Weapon class of the animatronic's hands, for which the **scare** animation will play |

### `jumpscareEvent(ply, ent, target, [dist])` <span class="fh-badge server">SERVER</span> {#jumpscareevent}

Freezes the player and victim in a screamer. Call **after** playing the animation.

| Parameter | Type | Description |
|---|---|---|
| `ply` | `Player` | The animatronic |
| `ent` | `Entity` | The animatronic's model (`pills.getMappedEnt(ply)`) |
| `target` | `Player` | The victim |
| `dist` | `float` *(opt.)* | Distance between the animatronic and victim |

### `endo.grabNeareastPlayer(ply, ent)` <span class="fh-badge server">SERVER</span>

Used by the Endoskeleton to capture a player. Automatically finds a nearby target.

### `endo.endoRelease(ply)` <span class="fh-badge server">SERVER</span>

Forces the animatronic to release a previously captured player.

### `endo.releaseExactPlayer(target)` <span class="fh-badge server">SERVER</span>

Attempts to release `target` if they are being held by an animatronic using one of the above functions.

### `endo.isGrabbed(target)` <span class="fh-badge server">SERVER</span>

Returns whether anyone is holding player `target`.

---

## Target finding

### `FindNearestPlayer(origin, radius, ignorePlayer, fov)` <span class="fh-badge shared">SHARED</span> {#findnearestplayer}

Finds the nearest survivor within a radius.

| Parameter | Type | Description |
|---|---|---|
| `origin` | `Vector` | Search point |
| `radius` | `number` | Radius |
| `ignorePlayer` | `Player` | Who to ignore |
| `fov` | `number` | If specified together with `ignorePlayer` — search only within the field of view cone |

Perfect for choosing an attack target.

### `fh_get_nearest_players(origin, radius, ignorePlayer)` <span class="fh-badge shared">SHARED</span>

Returns a **table** of survivors within a radius. Used by the Clown when striking with a hammer.

### `fh_get_nearest_props(origin, radius)` <span class="fh-badge shared">SHARED</span>

Returns a table of props within a radius.

---

## Animatronic registration

### `killers.Register(pill, name, fullname, color, category)` <span class="fh-badge shared">SHARED</span> {#killersregister}

Registers an animatronic into the gamemode's database. After successful registration, the animatronic will be available in the Admin Panel.

| Parameter | Type | Description |
|---|---|---|
| `pill` | `string` | Pill name |
| `name` | `string` | Technical name |
| `fullname` | `string` | Full name |
| `color` | `color` | Animatronic's interface color |
| `category` | `string` | Animatronic category (Used for sorting in the Admin Panel) |

::: info Important
This is where the gamemode stores the animatronic's icons (for the Tab menu or animatronic selection), as well as the animatronic's portrait used in the player's interface in the bottom left corner.
:::

```lua
-- Code from animatronics/bear5.lua
killers.Register("bear5_main", "bear5", "Bear 5", Color(0,120,255), "Freaks")
killers.Register("bear5_clone", "bearling5", "Bearling 5", Color(0,120,255), "Freaks")
killers.Register("fox4", "fox4", "Fox 4", Color(0,255,20), "Freaks")
```

### `killers.SetAbilities(name, abilities)` <span class="fh-badge shared">SHARED</span>

Sets the animatronic's abilities to be displayed in the player's interface.

Each ability in the table must contain the following data:

| Parameter | Type | Description |
|---|---|---|
| `name` | `string` | Ability name |
| `key` | `string` | Ability keybind |
| `hidden` | `bool` | Hide while there is no cooldown? |
| `tokens` | `int` *(opt.)* | Number of ability tokens |
| `condition` | `function` *(opt.)* | Function must return a color to paint the button. |

::: info Important
Vanilla FH does not use the abilities table on the server anywhere, but it is still recommended to set abilities on both sides.
:::

```lua
-- Code from animatronics/bear5.lua
killers.SetAbilities("bear5", {
	{ name = 'highlight', key = 'R' },
	{ name = 'death', key = 'RMB' },
})
```

---

## Animatronic list management

### `killers.getAll()` <span class="fh-badge shared">SHARED</span>

All registered animatronics.

### `killers.getAllSolos()` <span class="fh-badge shared">SHARED</span>

All **non-secondary** animatronics.

::: warning Important
Does not check playability
:::

### `killers.getAllPreferables(secondaries)` <span class="fh-badge shared">SHARED</span>

All playable animatronics. If `secondaries = true` — includes secondary ones as well.

### `killers.getAllNonPreferables()` <span class="fh-badge shared">SHARED</span>

All **non**-playable animatronics.

### `killers.getAllSecondaries()` <span class="fh-badge shared">SHARED</span>

All secondary animatronics.

### `killers.GetName(pill)` <span class="fh-badge shared">SHARED</span>

Returns the animatronic's name.

```lua
print(killers.GetName("pill_wfreddy2")) -- freddy
```

### `killers.GetFullName(pill)` <span class="fh-badge shared">SHARED</span>

Returns the animatronic's full name.

::: info Important
The animatronic's full name often stores a translation key, which can only be converted to a normal string on the client.
On the server, it is recommended to get the animatronic's full name from the model entity (`pills.getMappedEnt(ply)`) via the `printName` value.
:::

```lua
print(killers.GetFullName("pill_sfreddy2")) -- fazhunt.animatronics.sfreddy
```

### `pill_makePreferable(anim, bool)` <span class="fh-badge shared">SHARED</span>

Makes an animatronic playable or removes it from the playable list.

```lua
pill_makePreferable("pill_wfreddy2", true)
```
::: info Important
This function is used directly by the Admin Panel when playability is enabled or disabled.
:::

### `pill_makeSecondary(anim, bool)` <span class="fh-badge shared">SHARED</span>

Adds/removes an animatronic from the secondary list. Most often used immediately after registering the animatronic.

```lua
pill_makeSecondary("pill_wbonnie2", true)
```