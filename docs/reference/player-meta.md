# PlayerMeta

Расширения мета-таблицы [Player](https://wiki.facepunch.com/gmod/Player), добавляемые режимом Fazbear's Hunt.

## Роль игрока <span class="fh-badge shared">SHARED</span>

### `PLAYER:IsSurvivor()`

Возвращает `true`, если игрок - выживший.

```lua
if ply:IsSurvivor() then
    print(ply:Nick() .. " - выживший")
end
```

### `PLAYER:IsAnimatronic()`

Возвращает `true`, если игрок - аниматроник.

```lua
if ply:IsAnimatronic() then
    ply:ChatPrint("Удачной охоты!")
end
```

::: tip Важно
Если засунуть выжившего в команду `TEAM_PILLS` *(или 2701)*, то игра здесь будет выдавать `true`.
:::

### `PLAYER:GetPill()`

Возвращает Пилл-Энтити игрока.

```lua
local ent = ply:GetPill()
if IsValid(ent) then
	print("Пилл присутствует!")
end
```

:::tip Важно
Этот метод напрямую вызывает `pills.getMappedEnt(ply)`, поэтому рекомендуется использовать именно второй вариант, ради оптимизации.
:::

---

## События <span class="fh-badge shared">SHARED</span>

### `PLAYER:IsJumpscared()`

Скримерят ли прямо сейчас игрока?

### `PLAYER:SetJumpscared()`

Устанавливает скримерят ли сейчас игрока.

:::tip На заметку
Эта функция уже автоматически используется внутри (performJumpscare)[/reference/functions#performjumpscare]
:::

---

## Спавн и позиция <span class="fh-badge server">SERVER</span>

### `PLAYER:ReturnToSpawn()`

Меняет позицию игрока на точку спавна. В отличие от [`ENTITY:Spawn()`](https://wiki.facepunch.com/gmod/Entity:Spawn), не пересоздаёт самого игрока — оружие, здоровье и т.д. сохраняются.

```lua
ply:ReturnToSpawn()
```

### `PLAYER:SuppressRagdollSpawn(bool)`

Позволяет отменить спавн посмертного регдолла. После одной попытки спавна автоматически сбрасывается в `false`.

```lua
hook.Add("DoPlayerDeath", "NoRagdoll", function(ply)
    ply:SuppressRagdollSpawn(true)
end)
```

---

## Застревания <span class="fh-badge server">SERVER</span>

### `PLAYER:IsStuck()`

Проверяет хитбокс игрока на застревание в геометрии или других сущностях. В отличие от [`ENTITY:IsInWorld()`](https://wiki.facepunch.com/gmod/Entity:IsInWorld), учитывает хитбокс.

### `PLAYER:Unstuck()`

Пытается телепортировать игрока в место, где он не застревает. Используйте вместе с `IsStuck()`:

```lua
hook.Add("PlayerLeaveVehicle", "CheckStuck", function(ply, ply)
    timer.Simple(0.5, function()
        if IsValid(ply) and ply:IsStuck() then
            ply:Unstuck()
        end
    end)
end)
```

---

## Толкания <span class="fh-badge server">SERVER</span>

### `PLAYER:SetPushImmune(bool)`

Установка иммунитета к отталкиванию другими игроками.

### `PLAYER:IsPushImmune()`

Имеет ли игрок иммунитет к отталкиваниям?

### `PLAYER:SetPushBlocked(bool)`

Может ли игрок толкать других?

### `PLAYER:IsPushBlocked()`

Запрещено ли игроку толкать других?

```lua
-- Я его не пну, и он меня не пнёт.
ply:SetPushImmune(true)
ply:SetPushBlocked(true)
```

---

## Голосовой чат <span class="fh-badge server">SERVER</span>

### `PLAYER:SetAudible(bool)`

Слышен ли игрок другими игроками в голосовом чате?

### `PLAYER:GetAudible()`

Возвращает текущий статус слышимости.

### `PLAYER:ForceListenPlayer(Player)`

Принудительно заставить игрока слышать только указанного игрока (всех остальных — выключить).

### `PLAYER:ResetListenPlayer()`

Сбросить принудительное прослушивание.

```lua
-- Заставить жертву слышать только аниматроника
victim:ForceListenPlayer(killer)

-- Через 10 секунд вернуть нормальное состояние
timer.Simple(10, function()
    if IsValid(victim) then victim:ResetListenPlayer() end
end)
```

---

## Золотой Фредди <span class="fh-badge server">SERVER</span>

### `PLAYER:SetGFreddyImmune(bool)`

Иммунитет к способности Золотого Фредди (Загранное Измерение).

### `PLAYER:GetGFreddyImmune()`

Возвращает текущий статус иммунитета.

```lua
-- Все админы иммунны к Золотому Фредди
hook.Add("PlayerSpawn", "AdminGFImmune", function(ply)
    if ply:IsAdmin() then
        ply:SetGFreddyImmune(true)
    end
end)
```

---

## Подарки <span class="fh-badge server">SERVER</span>

::: info Уже используется режимом
Эти функции применяются режимом по умолчанию — они не выдают второй подарок, пока не подобран первый. Используйте, если знаете что делаете.
:::

### `PLAYER:SetGiftOwnership(bool)` {#setgiftownership}

Установить флаг владения подарком.

### `PLAYER:GetGiftOwnership()`

Имеет ли игрок несобранный подарок?

```lua
if not ply:GetGiftOwnership() then
    -- спавним новый подарок
end
```