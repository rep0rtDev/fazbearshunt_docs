> <span class="fh-badge shared">shared</span> **AreLandConditionsGood(@Player@ ply, @Entity@ ent, @number@ waterlevel, @number@ velocity, @number@ posdistance)**

# Описание

Если игрок - аниматроник, бьёт его током (так, как это делает Шокер).

::: warning Учтите
Не смотря на то что функция помечена как <span class="fh-badge shared">shared</span>, вам не стоит использовать её на клиенте.
:::

# Аргументы

> `1` @Player@ **ply**

- Игрок которого надо ударить током

# Возвращает

> `1` @Player@

- Возвращает игрока, если найден. В противном случае выдаст nil.