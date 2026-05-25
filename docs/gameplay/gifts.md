# Подарки

Система подарков FH позволяет игрокам подбирать коробки с положительными или отрицательными эффектами. Вы можете регистрировать собственные.

## Свои эффекты

### `gifts.AddPositiveEffect(name, desc, num, func, [req])` <span class="fh-badge server">SERVER</span>

Регистрирует **положительный** эффект подарка.

| Параметр | Тип | Описание |
|---|---|---|
| `name` | `string` | Техническое имя эффекта |
| `desc` | `string` | Описание для игрока (можно переводимая строка или пусто) |
| `num` | `int` | Число для подстановки в `%i` описания (если ≥ 0) |
| `func` | `function` | Функция, выполняемая при получении эффекта |
| `req` | `function` *(опц.)* | Условие выдачи эффекта |

**Пример: выдать монтировку игроку, если у него её нет.**

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

### `gifts.AddNegativeEffect(name, desc, num, func)` <span class="fh-badge server">SERVER</span>

Регистрирует **отрицательный** эффект подарка. Параметры — те же, кроме `req`.

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

## Хуки

### `FH_ShouldPlayerReceiveGifts` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span>

Вызывается перед тем, как заспавнить подарок игроку. Возврат `false` — игрок не получит подарок.

```lua
hook.Add("FH_ShouldPlayerReceiveGifts", "NoGiftsForAdmins", function(ply)
    if ply:IsAdmin() then return false end
end)
```

## См. также

- [`doGiftSpawning()`](/reference/functions.md#dogiftspawning) — включить появление подарков
- [`disableGiftSpawning()`](/reference/functions.md#disablegiftspawning) — отключить появление подарков
- [`PLAYER:SetGiftOwnership(bool)`](/reference/player-meta.md#setgiftownership) — установить флаг владения подарком