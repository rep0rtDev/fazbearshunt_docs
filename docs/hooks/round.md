# Хуки раунда

Хуки, вызываемые на разных этапах жизни раунда.

## `fh_prestartgame` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span> {#fh_prestartgame}

Вызывается **перед** выбором типа раунда.

```lua
hook.Run("fh_prestartgame")
```

**Возврат `false`** — отменить выбор раунда.

**Пример:** замена Спрингтрапа на Золотого Фредди в обычном раунде. См. [готовый пример →](https://github.com/s3rgeant/fazbearshunt_docs/blob/main/examples/gfreddy_custom_round.lua)

```lua
hook.Add("fh_prestartgame", "CustomLogic", function()
    if math.random(1, 100) <= 5 then
        -- Раз в 20 раундов делаем спецсобытие
        for _, ply in ipairs(player.GetAll()) do
            giveKiller(ply, "pill_wgfreddy2", true)
        end
        return false  -- отменяем стандартный выбор
    end
end)
```

---

## `fh_startgame` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span> {#fh_startgame}

Вызывается **после** выбора типа раунда и выполнения базовых функций раунда (раздача ролей, заморозка, выдача Шокера).

```lua
hook.Run("fh_startgame", roundType)
```

| Аргумент | Тип | Описание |
|---|---|---|
| `roundType` | `int` | ID типа раунда |

**Возврат `false`** — отменить запуск таймера, музыки и т.д.

```lua
hook.Add("fh_startgame", "AnnounceRound", function(roundType)
    local name = fh.GetRoundTypeNameByNumber(roundType)
    PrintMessage(HUD_PRINTTALK, "Раунд: " .. name)
end)
```

---

## `fh_poststartgame` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span> {#fh_poststartgame}

Вызывается **после** разморозки аниматроников. Самый частый хук для пользовательской логики.

```lua
hook.Run("fh_poststartgame", roundType, animatronics)
```

| Аргумент | Тип | Описание |
|---|---|---|
| `roundType` | `int` | ID типа раунда |
| `animatronics` | `table[Player]` | Игроки-аниматроники в этом раунде |

```lua
hook.Add("fh_poststartgame", "BuffAnims", function(roundType, anims)
    for _, ply in ipairs(anims) do
        ply:SetMaxHealth(150)
        ply:SetHealth(150)
    end
end)
```

---

## `fh_postendgame` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span> {#fh_postendgame}

Вызывается **после** конца раунда, **перед** 10-секундным таймером возврата в лобби.

```lua
hook.Run("fh_postendgame", killerVictory, animatronics)
```

| Аргумент | Тип | Описание |
|---|---|---|
| `killerVictory` | `bool` | Победили ли аниматроники? |
| `animatronics` | `table[Player]` | Аниматроники этого раунда |

```lua
hook.Add("fh_postendgame", "GiveRewards", function(victory, anims)
    if victory then
        -- Аниматроники победили — даём им бонус
        for _, ply in ipairs(anims) do
            ply:AddFrags(5)
        end
    else
        -- Выжившие победили — награждаем выживших
        for _, ply in ipairs(player.GetAll()) do
            if ply:IsSurvivor() and ply:Alive() then
                ply:ChatPrint("Вы выжили!")
            end
        end
    end
end)
```