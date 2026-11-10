> <span class="fh-badge server">server</span> @boolean@ **FH_HandleTaserHit(@Player@ ply, @Entity@ ent, @Player@ taserer)**

# Описание

Вызывается перед попаданием Шокером по `ply`.

# Аргументы

> `1` @Player@ **ply**

- Игрок которого ударили током.

> `2` @Entity@ **ent**

- Пилл-Энтити игрока `ply`.

> `3` @Player@ **taserer**

- Игрок который сделал выстрел из Шокера.

# Возвраты

> `1` @boolean@

- Верните `false` чтобы игрока нельзя было ударить Шокером.