> <span class="fh-badge server">server</span> **highlight.AddVisionSounds(@string@ name, @string@ snd_affected, @string@ snd_unaffected)**

# Описание

Добавляет уникальный звук просвета для определённого Пилла.

# Аргументы

> `1` @string@ **name**

- Имя Пилла, например `pill_wchica2`.

> `2` @string@ **snd_affected**

- Игрок, у которого проверяем кулдаун.

> `3` @string@ **snd_unaffected**

- Игрок, у которого проверяем кулдаун.

## Пример

Добавляем уникальный звук просвета для Фредди.

```
highlight.AddVisionSounds(
    "pill_wgfreddy2",
    "my_anim/highlight_success.wav",
    "my_anim/highlight_fail.wav"
)
```