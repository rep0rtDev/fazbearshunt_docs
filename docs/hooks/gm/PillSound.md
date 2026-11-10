> <span class="fh-badge server">server</span> @boolean@ **PillSound(@Player@ ply, @Entity@ ent, @string@ name)**

# Описание

Вызывается перед проигрыванием звука на Пилле через `PillSound`.

# Аргументы

> `1` @Player@ **ply**

- Игрок получивший Пилл.

> `2` @Entity@ **ent**

- Пилл-Энтити игрока `ply`.

> `3` @string@ **name**

- Название звука.

# Возвраты

> `1` @table@<@Player@>

- Этим игрокам не будет отправлен данный звук.