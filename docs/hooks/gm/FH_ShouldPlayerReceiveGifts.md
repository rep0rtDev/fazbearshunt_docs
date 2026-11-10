> <span class="fh-badge server">server</span> @boolean@ **FH_ShouldPlayerReceiveGifts(@Entity@ gift, @Player@ ply)**

# Описание

Позволяет отменить спавн подарка определённому игроку.

# Аргументы

> `1` @Entity@ **gift**

- Подарок.

> `2` @Player@ **ply**

- Игрок пытающийся подобрать подарок.

# Возвраты

> `1` @boolean@

- Верните `false` чтобы игрок не смог подобрать подарок.

## Пример

Отключить спавн подарков во время скримера.

```lua
hook.Add("FH_ShouldPlayerReceiveGifts", "NoJumpscareGifts", function(ply)
    if ply:IsJumpscared() then
        return false
    end
end)
```