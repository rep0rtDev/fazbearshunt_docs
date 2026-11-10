> <span class="fh-badge server">server</span> **stats.Add(@Player@ ply, @string@ statName, @number@ value)**

# Описание

Прибавляет значение к статистике игрока.

# Аргументы

> `1` @Player@ **ply**

- Игрок которому выдаётся.

> `2` @string@ **statName**

- Название статистики.

> `3` @number@ **value**

- Число которое будет прибавлено.

## Пример

Добавляем игроку статистику за каждую написанную букву.

```lua
hook.Add("PlayerSay", "CountLetters", function(ply, text )
    if ply:Alive() and text:len() > 0 then
        stats.Add(ply, "letters", text:len())
    end
end)
```