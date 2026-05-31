# PillCostumeMeta

Explanation of the Pill entity `pill_costume` functions, such as playing animations, etc.

## Main <span class="fh-badge shared">SHARED</span> {#main}

### `ENTITY:GetPillForm()`

Returns the Pill's name, e.g., `pill_wfoxy2`.

### `ENTITY:GetPillUser()`

Returns the Pill's owner.

:::warning Caution
During Bonnie's ability, while he is controlling a player, the Pill detaches from them, and this method will return `NULL`. Use the method below to get the previous owner.
:::

### `ENTITY:GetPrevPillUser()`

Returns the Pill's previous owner.

### `ENTITY:SetUseForceAngles(bool)`

Should forced angles be used to rotate the Pill?

### `ENTITY:SetForceAngles(Angle)`

Sets forced angles. If `GetUseForceAngles()` == `true`, the Pill will be oriented according to these angles.

### `ENTITY:GetForceAngles()`

Returns the forced angles.

---

## Helper functions <span class="fh-badge shared">SHARED</span> {#helpers}

### `ENTITY:Get(name, default)`

Returns the value of `name` from the Pill's structure, and if it doesn't exist, returns `default`.

```lua
-- Method 1
if ent:Get("noFallDamage", false) == true then
	print("This Pill has fall damage disabled")
end

-- Method 2
if ent.formTable and ent.formTable.noFallDamage then
	print("This Pill has fall damage disabled")
end
```

### `ENTITY:GetPillName()`

Returns the Pill's name from the `name` value.

:::tip Same thing
The same thing can be obtained using `ent:Get("name", "")`
:::

---

## Animations <span class="fh-badge server">SERVER</span> {#animations}

### `ENTITY:PillAnim(name, freeze)`

Plays an animation from the `anims.default` table.

| Parameter | Type | Description |
|---|---|---|
| `name` | `string` | Animation name |
| `freeze` | `bool` | Disable Pill movement while playing the animation? |

### `ENTITY:PillGesture(name, priority, rate, blendin, blendout, start, loop)`

Plays a layered animation from the `anims.gestures` table.

| Parameter | Type | Description |
|---|---|---|
| `name` | `string` | Name |
| `priority` | `float` | Priority |
| `rate` | `float` | Playback speed |
| `blendin` | `float` | Interval during which the layer will fully appear from the start |
| `blendout` | `float` | Interval during which the layer will fully disappear |
| `start` | `int` | Point at which the layer should start `(0-1)` |
| `loop` | `bool` | Loop the layer? |

### `ENTITY:PillGesture(name)`

Stops a layered animation.

### `ENTITY:ReplaceAnimation(old, new)`

Replaces an animation named `old` from the `anims.default` table with `new`.

---

## Sounds <span class="fh-badge server">SERVER</span> {#sounds}

### `ENTITY:PillSound(name, bulk)`

Plays a sound from the `sounds` table.

| Parameter | Type | Description |
|---|---|---|
| `name` | `string` | Sound name |
| `bulk` | `bool` | If `true`, allows playing many sounds without interrupting them, but the sound will not follow the Pill |

### `ENTITY:PillLoopSound(name, volume, pitch)`

Plays a looping sound from the `sounds` table.

:::tip
The sound name must start with `loop_` for the sound to play!
:::

| Parameter | Type | Description |
|---|---|---|
| `name` | `string` | Sound name |
| `volume` | `float` | Volume |
| `pitch` | `float` | Pitch |

### `ENTITY:PillLoopStop(name)`

Stops a looping sound.

### `ENTITY:PillLoopStopAll(name)`

Stops all looping sounds.

---

## Speed <span class="fh-badge server">SERVER</span> {#speed}

### `ENTITY:SetSpeed(walk, run, duck, jump)`

Changes the Pill's speed in the `moveSpeed` table, and the Pill owner's speed.

| Parameter | Type | Description |
|---|---|---|
| `walk` | `float` | Walking |
| `run` | `float` | Running |
| `duck` | `float` | Crouching |
| `jump` | `float` | Jump power |

### `ENTITY:ResetSpeed()`

Changes the Pill owner's speed to the speed from the `moveSpeed` table.

### `ENTITY:SetDefaultSpeed()`

Changes the Pill's speed and its owner's speed to the original speed from when the Pill was first given.

---

## Detaching from player <span class="fh-badge server">SERVER</span> {#detaching}

### `ENTITY:DetachPlayer()`

Detaches the Pill from its owner. Used by the "Through Your Mind" ability.

:::tip Note
At this point, you can get the previous owner via `GetPrevPillUser()`
:::
:::warning Caution
`pills.getMappedEnt(ply)` and `ply:GetPill()` will return NULL after detachment.
:::

### `ENTITY:AttachPlayer(ply)`

Attaches the Pill to a player. If `ply` is not specified, attaches to the previous owner.