> <span class="fh-badge server">server</span> **gifts.AddNegativeEffect(string name, string description, number num, function func)**

# Описание

Регистрирует **отрицательный** эффект эффекта.

# Аргументы

> `1` [string](https://wiki.facepunch.com/gmod/string) **name**

- Название эффекта на английском.

> `2` [string](https://wiki.facepunch.com/gmod/string) **description**

- Описание эффекта. Также принимаются переводимые строки.

> `3` [function](https://wiki.facepunch.com/gmod/function) **func**

- Функция выдачи эффекта.

## Пример

Добавляем в список негативных эффектов замеление.

```lua
gifts.AddNegativeEffect(
    "slow_player",
    "fazhunt.gifts.slowed",
    -1,
    function(ply)
        ply:SetWalkSpeed(100)
        ply:SetRunSpeed(150)
    end
)
```