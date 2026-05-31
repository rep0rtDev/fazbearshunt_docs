# Hammer Reference for Mappers

**Fazbear's Hunt** can be played on almost any map, however users can make their own maps specifically for our gamemode.

For a good map formula, you should follow these rules:

- `Sufficiently high doorways` - Animatronics have an increased hitbox and must be able to run through doorways without issue.
- `Avoid dead ends` - The map should not have many dead ends. If a player runs into a room, that room should generally have a second exit, whether a doorway or ventilation.
- `Memorable layout` - Map rooms should be unique, with different interiors, lighting, and gameplay elements so both teams can strategize. If the map is monotonous and repetitive, players can easily get lost.
- `Interactive elements` - Maps are often attractive to players due to their interactivity. Add mechanical doors that can only be closed from one side, ventilation, trash compactors where survivors can be lured into a trap, generators that turn off lights throughout the building, etc.
- `Gameplay refinement` - Some animatronics play well only on open maps, or conversely, only on closed maps. Balance should be maintained: create both open and closed areas on the map so everyone has their place.
- `Animatronic spawns and events` - More on this below!

---

## Fazbear's Hunt FGD

For your map, you can use custom entities from our [FGD](https://github.com/s3rgeant/fazbearshunt_docs/blob/main/fh.fgd)

Here is the full list:

### `info_player_killer`

Animatronics will spawn at this location. You can specify an `Animatronic Name`, e.g., `pill_wchica2`, and then a specific animatronic will spawn here, and no other.

### `info_killer_win`

This location is used as the victory position for animatronics upon winning. Springtrap and BEAR5 play their victory dances here.

### `fh_win_camera`

Serves as the camera for `info_killer_win`, which should be located inside `info_killer_win` at the animatronic's head height from the ground, facing the same direction as `info_killer_win`.

:::warning Attention
This entity can be omitted, as the game automatically spawns it when missing.
:::

### `filter_activator_team`

Works as a filter for triggers. The trigger will only activate for the team specified in the filter.

In `Filter Team Number`, specify one of:
- `Survivor`
- `Animatronic`

### `func_dissolve`

Used for brush surfaces. Any prop passing through this brush will be dissolved.

:::tip Important
The trigger will not dissolve a prop if it is being held by an animatronic.
:::

### `round_director`

Allows intercepting round events, such as round start, animatronic unfreeze, a team's victory, and timer reduction.

| Events | Description |
|---|---|
| `OnStartRound` | Called at round start |
| `OnPostStartRound` | Called after animatronics are unfrozen |
| `OnEndGameKillers` | Called towards the end of the round when animatronics win |
| `OnEndGameSurvivors` | Called towards the end of the round when survivors win |
| `OnTimerCutback` | Called when the timer is reduced when the last survivor remains |