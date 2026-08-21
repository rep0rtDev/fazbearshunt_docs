> <span class="fh-badge shared">shared</span> [Player](https://wiki.facepunch.com/gmod/Player) **FindNearestPlayer([Vector](https://wiki.facepunch.com/gmod/Global.Vector) origin, [number](https://wiki.facepunch.com/gmod/number) radius, [Player](https://wiki.facepunch.com/gmod/Player) attacker, [number](https://wiki.facepunch.com/gmod/number) fov)**

# Описание

Ищет ближайшего выжившего в радиусе. Если указать `fov`, то выживший будет искаться в конусе перед игроком, всё ещё с учётом радиуса. 

Все аниматроники со скримером используют именно эту функцию для скримера.

# Аргументы

> `1` [Vector](https://wiki.facepunch.com/gmod/Global.Vector) **origin**

- Позиция из которой идёт поиск.

> `2` [number](https://wiki.facepunch.com/gmod/number) **radius**

- Радиус поиска.

> `3` [Player](https://wiki.facepunch.com/gmod/Player) **attacker**

- "Атакующий" игрок. Он исключается из кандидатов поиска.

> `4` [number](https://wiki.facepunch.com/gmod/number) **fov**

- Поле зрения, в котором происходит поиск. Если указан `attacker` и `fov`, то рассчёты производятся из глаз `attacker`.

# Возвращает

> `1` [Player](https://wiki.facepunch.com/gmod/Player)

- Возвращает игрока, если найден. В противном случае выдаст nil.

### Аргументы

> `1` [Vector](https://wiki.facepunch.com/gmod/Global.Vector) **origin**

- Позиция из которой идёт поиск.

# `Аргументы`

> `1` [Vector](https://wiki.facepunch.com/gmod/Global.Vector) **origin**

- Позиция из которой идёт поиск.