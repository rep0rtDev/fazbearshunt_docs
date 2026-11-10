> <span class="fh-badge shared">shared</span> @boolean@ **AreLandConditionsGood(@Player@ ply, @Entity@ ent, @number@ waterlevel = 2, @number@ velocity = 350, @number@ posdistance = 150)**

# Описание

Даёт знать, нужно ли сейчас включить анимацию приземления. Используется всеми аниматрониками 

::: warning Учтите
Не смотря на то что функция помечена как <span class="fh-badge shared">shared</span>, вам не стоит использовать её на клиенте.
:::

# Аргументы

> `1` @Player@ **ply**

- Игрок, которого проверям.

> `2` @Entity@ **ent**

- Пилл-Энтити игрока.

> `3` @number@ **waterlevel** = 2

- Уровень погружения в воду игроком, чтобы выдало `true`.

> `4` @number@ **velocity** = 350

- Скорость игрока по координате `Z`, чтобы выдало `true`.

> `5` @number@ **posdistance** = 150

- Расстояние, которое должен был пролететь игрок от прошлой точки прыжка, чтобы выдало `true`.

# Возвращает

> `1` @boolean@

- Стоит ли включать анимацию приземления.