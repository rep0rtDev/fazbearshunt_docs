# Chase Music

All animatronics have their own chase theme. In this section, we will show how to give your animatronic a chase theme.

## Preparing files

Fazbear's Hunt provides four chase layers:

| Code name | File name | Description |
|---|---|---|
| `first_layer` | `far.wav` | Very far |
| `second_layer` | `approaching.wav` | Approaching |
| `third_layer` | `near.wav` | Very close |
| `chase` | `chase.wav` | Chase |

The gamemode automatically loads all files from the following path, where `THEME_NAME` is the name of your theme.

```
garrysmod/addons/my_fh_addon/
└── sound/
	└── music/chase/
		└── THEME_NAME/
			├── far.wav
			├── approaching.wav
			├── near.wav
			└── chase.wav
```

The next step is looping the music, which you can do with programs like **Wavosaur** or **FL Studio**.

See [Looping Sounds](https://wiki.facepunch.com/gmod/Creating_Looping_Sounds)

---

### Adding a theme to an animatronic

There are two ways to add a chase theme to an animatronic. The first method is adding the `chaseTheme` value to the Pill structure.

```lua
local FREDDY = GetPillTemplate()

FREDDY.printName = "Withered Freddy"

FREDDY.chaseTheme = "freddy"
```

See [Pill Structure and Registration →](/en/guide/animatronics/pill-structure-registration.md)

The second method is adding the theme immediately after registering the Pill.

```lua
killers.Register("my_pill", ...)

if CLIENT then
	-- Your Pill name, your theme name
	terror_radius.addTheme("my_pill", "THEME_NAME")
end
```

---

### Standard gamemode themes

If you don't have your own custom theme, you can assign one of the built-in themes to your Pill:

| Theme name | Description |
|---|---|
| `default` | General theme |
| `freddy` | Freddy's theme |
| `bonnie` | Bonnie's theme |
| `foxy` | Foxy's theme |
| `endo` | Endoskeleton's theme |
| `sfreddy` | Shadow Freddy's theme |
| `mask` | Maniac Mask theme |
| `bear5` | BEAR5 theme |

```lua
terror_radius.addTheme("my_pill", "default")
```