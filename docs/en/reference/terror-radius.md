# Музыка погони

Все аниматроники имеют свою тему погони, в этом разделе мы покажем как дать своему аниматронику тему погони.

## Подготовка файлов

Fazbear's Hunt предусматривает всего четыре слоя погони:

| Название в коде | Имя файла | Описание |
|---|---|---|
| `first_layer` 	| `far.wav` 		| Очень далеко |
| `second_layer` 	| `approaching.wav` | Приближается |
| `third_layer` 	| `near.wav` 		| Совсем близко |
| `chase` 			| `chase.wav` 		| Погоня |

Режим автоматически подгружает все файлы из следующего пути, где `THEME_NAME` является названием вашей темы.

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

Следующим этапом будет зацикливание музыки, это вы можете сделать через программы **Wavosaur** или **FL Studio**.

См. [Зацикливание Звуков](https://wiki.facepunch.com/gmod/Creating_Looping_Sounds)

---

### Добавление темы аниматронику

Есть два способа добавить аниматронику тему погони. Первый способ это добавление значения `chaseTheme` в структуре Пилла

```lua
local FREDDY = GetPillTemplate()

FREDDY.printName = "Withered Freddy"

FREDDY.chaseTheme = "freddy"
```

См. [Структура и Регистрация Пилла →](/guide/animatronics/pill-structure-registration.md)

Второй способ это добавление темы сразу после регистрации Пилла

```lua
killers.Register("my_pill", ...)

if CLIENT then
	-- Имя вашего Пилла, название вашей темы
	terror_radius.addTheme("my_pill", "THEME_NAME")
end
```

---

### Стандартные темы режима

Если у вас нет своей кастомной темы, можете задать Пиллу одну из встроенных тем:

| Название темы | Описание |
|---|---|
| `default` 		| Общая тема |
| `freddy` 			| Тема Фредди |
| `bonnie` 			| Тема Бонни |
| `foxy` 			| Тема Фокси |
| `endo` 			| Тема Эндоскелета |
| `sfreddy` 		| Тема Шедоу Фредди |
| `mask` 			| Тема Маски Маньяка |
| `bear5` 			| Тема BEAR5 |

```lua
terror_radius.addTheme("my_pill", "default")
```