> <span class="fh-badge server">server</span> @boolean@ **FH_HandleGiftPickup(@Entity@ gift, @Player@ ply)**

# Описание

Позволяет отменить подбор подарка определённому игроку.

:::tip На заметку
Не вызывается для ботов или аниматроников.
:::

# Аргументы

> `1` @Entity@ **gift**

- Подарок.

> `2` @Player@ **ply**

- Игрок пытающийся подобрать подарок.

# Возвраты

> `1` @boolean@

- Верните `false` чтобы игрок не смог подобрать подарок.

## Пример

Подарки только для админов!

```lua
hook.Add("FH_HandleGiftPickup", "OnlyAdminGifts", function(gift, ply)
    if not ply:IsAdmin() then
        return false
    end
end)
```