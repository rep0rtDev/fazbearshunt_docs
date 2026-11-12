> <span class="fh-badge server">server</span> **highlight.NotifyTarget(@Player@ target, @Entity@ pill, @bool@ isAffected)**

# Description

Notifies `target` with the highlight sound.

::: warning Keep in mind
If the "Silent Highlight" setting is enabled on the server, the game will treat `isAffected` as `false` regardless of the value you set.
:::

# Arguments

> `1` @Player@ **target**

- The Pill's name, for example `pill_wchica2`.

> `2` @Entity@ **pill**

- The highlighting player's Pill entity. Needed so the game can use the unique highlight sound. Optional.

> `3` @bool@ **isAffected**

- Whether to play the successful highlight sound or not.