> <span class="fh-badge client">client</span> @boolean@ **ForceDrawPill(@Player@ ply, @Entity@ ent)**

# Описание

Хук для ручной прорисовки Пилла, вызывается внутри `ENT:Draw()`

# Аргументы

> `1` @Player@ **ply**

- Игрок владеющий Пиллом.

> `2` @Entity@ **ent**

- Пилл-Энтити игрока `ply`.

# Возвраты

> `1` @bool@

- Верните `true` чтобы моделька отрисовалась, и `false` чтобы нет.