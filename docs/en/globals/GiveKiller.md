> <span class="fh-badge server">server</span> @Player@ **GiveKiller(@Player@ ply, @string@ name, @boolean@ force)**

# Description

Gives a Pill to the selected player. After a successful grant, it announces the player's name and the animatronic to everyone in chat.

If you want to give a Pill without a chat announcement, use [GiveKillerSilent()](/en/globals/GiveKillerSilent)

# Arguments

> `1` @Player@ **ply**

- The player to give it to.

> `2` @string@ **name**

- The animatronic's name, for example `pill_wfreddy2`.

> `3` @boolean@ **force**

- Force the grant? If not, the animatronic won't be given if one already exists on the map.