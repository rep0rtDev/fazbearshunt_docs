> <span class="fh-badge server">server</span> **highlight.AddVisionSounds(@string@ name, @string@ snd_affected, @string@ snd_unaffected)**

# Description

Adds a unique highlight sound for a specific Pill.

# Arguments

> `1` @string@ **name**

- The Pill's name, for example `pill_wchica2`.

> `2` @string@ **snd_affected**

- Success highlight sound.

> `3` @string@ **snd_unaffected**

- Unsuccess highlight sound.

## Example

Add a unique highlight sound for Freddy.

```lua
highlight.AddVisionSounds(
    "pill_wgfreddy2",
    "my_anim/highlight_success.wav",
    "my_anim/highlight_fail.wav"
)
```