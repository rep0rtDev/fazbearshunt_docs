> <span class="fh-badge shared">shared</span> @table@ **killers.GetAll()**

# Описание

Возвращает таблица всех зарегистрированных Пиллов.

# Возвращает

> `1` @table@

- Таблица всех пиллов.

## Пример

```lua
PrintTable( killers.GetAll() )
```

**Вывод**:

```lua
["pill_mangle"]:
		["color"]:
				["a"]	=	255
				["b"]	=	184
				["g"]	=	154
				["r"]	=	226
		["fullname"]	=	fazhunt.animatronics.mangle
		["name"]	=	mangle
		["preferable"]	=	true
["pill_plushtrap"]:
		["color"]:
				["a"]	=	255
				["b"]	=	48
				["g"]	=	119
				["r"]	=	130
		["damageAttack"]	=	true
		["fullname"]	=	fazhunt.animatronics.plushtrap
		["name"]	=	plushtrap
		["preferable"]	=	false
["pill_sfreddy2"]:
		["color"]:
				["a"]	=	255
				["b"]	=	255
				["g"]	=	0
				["r"]	=	105
		["fullname"]	=	fazhunt.animatronics.sfreddy
		["name"]	=	sfreddy
		["preferable"]	=	true
		["secondary"]	=	true
...
```