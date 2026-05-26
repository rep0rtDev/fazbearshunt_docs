# Хуки раунда

Хуки, вызываемые на разных этапах жизни раунда.

## `fh_prestartgame()` <span class="fh-badge hook">HOOK</span> <span class="fh-badge shared">SHARED</span> {#fh_prestartgame}

Вызывается **перед** выбором типа раунда.

**Возврат `false`** — отменить выбор раунда.

**Пример:** уникальный раунд с отменой ванильного таймера. См. [Бонни-Тег →](https://github.com/s3rgeant/fazbearshunt_docs/blob/main/examples/bonnie_tag.lua)

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

## `fh_startgame(roundType)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span> {#fh_startgame}

Вызывается **после** выбора типа раунда и выполнения базовых функций раунда (раздача ролей, заморозка, выдача Шокера).

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

## `fh_poststartgame(roundType, animatronics)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge shared">SHARED</span> {#fh_poststartgame}

Вызывается **после** разморозки аниматроников.

| Аргумент | Тип | Описание |
|---|---|---|
| `roundType` | `int` | ID типа раунда |
| `animatronics` | `table[Player]` | Игроки-аниматроники в этом раунде |

```lua
hook.Add("fh_poststartgame", "BuffAnims", function(roundType, anims)
    for ply, _ in ipairs(anims) do
        ply:SetMaxHealth(150)
        ply:SetHealth(150)
    end
end)
```

---

## `fh_postendgame(killerVictory, animatronics)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge shared">SHARED</span> {#fh_postendgame}

Вызывается **после** конца раунда, **перед** таймером возврата в лобби.

| Аргумент | Тип | Описание |
|---|---|---|
| `killerVictory` | `bool` | Победили ли аниматроники? |
| `animatronics` | `table[Player]` | Аниматроники этого раунда |

```lua
hook.Add("fh_postendgame", "RewardAnims", function(victory, anims)
    if not victory then
        -- Аниматроники проиграли - взрываем их.
        for ply, _ in ipairs(anims) do
			local effectdata = EffectData()
			effectdata:SetOrigin(ply:GetPos())
			effectdata:SetScale(1)
			util.Effect("Explosion", effectdata)
			ply:Kill()
        end
    end
end)
```