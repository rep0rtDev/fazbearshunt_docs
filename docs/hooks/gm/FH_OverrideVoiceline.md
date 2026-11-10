> <span class="fh-badge server">server</span> **FH_OverrideVoiceline(@Player@ ply, @string@ character, @string@ line)**

# Описание

Позволяет заменить текущую проигрываемую реплику другой.

# Аргументы

> `1` @Player@ **ply**

- Игрок, от которого играет реплика.

> `2` @string@ **character**

- Имя персонажа который проигрывает реплику. Например, `foxy`.

> `3` @string@ **line**

- Текущая реплика. Может быть: `kill`, `chase`, `trip`, `tasered` и т.д.

# Возвраты

> `1` @string@

- Верните `false` чтобы игрока нельзя было ударить Шокером.