> <span class="fh-badge server">server</span> **gifts.AddPositiveEffect(string name, string description, number num, function func, function or nil req = nil)**

# Описание

Регистрирует **положительный** эффект эффекта.

# Аргументы

> `1` [string](https://wiki.facepunch.com/gmod/string) **name**

- Название эффекта на английском.

> `2` [string](https://wiki.facepunch.com/gmod/string) **description**

- Описание эффекта. Также принимаются переводимые строки.

> `3` [function](https://wiki.facepunch.com/gmod/function) **func**

- Функция выдачи эффекта.

> `4` [function](https://wiki.facepunch.com/gmod/function) **req** or [nil](https://wiki.facepunch.com/gmod/nil)

- Функция с условием выдачи эффекта, должно возвращать `true` или `false`. *Не обязательный аргумент.*

## Пример

Добавляем в список позитивных эффектов монтировку.

```lua
gifts.AddPositiveEffect(
    "give_crowbar",
    "fazhunt.gifts.crowbar_received",
    -1,
    function(ply)
        ply:Give("weapon_crowbar")
    end,
    function(ply)
        -- Выдавать только если монтировки ещё нет
        return not ply:HasWeapon("weapon_crowbar")
    end
)
```