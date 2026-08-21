> <span class="fh-badge server">server</span> **gifts.AddPositiveEffect(@string@ name, @string@ description, @number@ num, @function@ func, @function@ or nil req = nil)**

# Описание

Регистрирует **положительный** эффект эффекта.

# Аргументы

> `1` @string@ **name**

- Название эффекта на английском.

> `2` @string@ **description**

- Описание эффекта. Также принимаются переводимые строки.

> `3` @number@ **num**

- Число для подстановки в `%i` внутри **description** (если ≥ 0)

> `4` @function@ **func**

- Функция выдачи эффекта.

> `5` @function@ **req** or @nil@

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