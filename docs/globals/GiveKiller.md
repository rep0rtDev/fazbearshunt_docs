> <span class="fh-badge server">server</span> @Player@ **GiveKiller(@Player@ ply, @string@ name, @boolean@ force)**

# Описание

Выдача Пилла выбранному игроку. После удачной выдачи оповестит всем игрокам в чате имя игрока и аниматроника.

Если хотите выдать Пилл без оповещения в чате воспользуйтесь [GiveKillerSilent()](/globals/GiveKillerSilent)

# Аргументы

> `1` @Player@ **ply**

- Игрок которому выдаём.

> `2` @string@ **name**

- Имя аниматроника, например `pill_wfreddy2`.

> `3` @boolean@ **force**

- Принудить выдачу? Если нет, то аниматроника не выдаст если такой уже присутствует на карте.