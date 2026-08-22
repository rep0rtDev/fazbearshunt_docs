> <span class="fh-badge server">server</span> @boolean@ **FH_PlayerShouldJumpscare(@Player@ ply, @Entity@ ent, @Player@ target)**

# Описание

Вызывается перед скримером, решает можно ли заскримерить игроку другого игрока.

# Аргументы

> `1` @Player@ **ply**

- Игрок который пытается заскримерить.

> `2` @Entity@ **ent**

- Пилл-Энтити игрока `ply`.

> `3` @Player@ **target**

- Игрок которого пытаются заскримерить.

# Возвраты

> `1` @boolean@

- Верните `false` чтобы игрока нельзя было заскримерить.

## Пример

Скримерить админов в ноуклипе нельзя.

```
hook.Add("FH_PlayerShouldJumpscare", "NoclipAdminsProtect", function(ply, ent, target)
    if target:IsAdmin() and target:GetMoveType() == MOVETYPE_NOCLIP then
        return false
    end
end)
```