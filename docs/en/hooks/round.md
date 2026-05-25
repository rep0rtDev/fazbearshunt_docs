# Round Hooks

Hooks called at different stages of a round's life.

## `fh_prestartgame` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span> {#fh_prestartgame}

Called **before** the round type is selected.

```lua
hook.Run("fh_prestartgame")
```

**Return `false`** — cancel round selection.

**Example:** replacing Springtrap with Golden Freddy in a normal round. See [complete example →](https://github.com/s3rgeant/fazbearshunt_docs/blob/main/examples/gfreddy_custom_round.lua)

```lua
hook.Add("fh_prestartgame", "CustomLogic", function()
    if math.random(1, 100) <= 5 then
        -- Once every 20 rounds, do a special event
        for _, ply in ipairs(player.GetAll()) do
            giveKiller(ply, "pill_wgfreddy2", true)
        end
        return false  -- cancel standard selection
    end
end)
```

---

## `fh_startgame` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span> {#fh_startgame}

Called **after** the round type is selected and basic round functions are executed (role distribution, freeze, Taser giving).

```lua
hook.Run("fh_startgame", roundType)
```

| Argument | Type | Description |
|---|---|---|
| `roundType` | `int` | Round type ID |

**Return `false`** — cancel timer start, music, etc.

```lua
hook.Add("fh_startgame", "AnnounceRound", function(roundType)
    local name = fh.GetRoundTypeNameByNumber(roundType)
    PrintMessage(HUD_PRINTTALK, "Round: " .. name)
end)
```

---

## `fh_poststartgame` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span> {#fh_poststartgame}

Called **after** animatronics are unfrozen. The most common hook for custom logic.

```lua
hook.Run("fh_poststartgame", roundType, animatronics)
```

| Argument | Type | Description |
|---|---|---|
| `roundType` | `int` | Round type ID |
| `animatronics` | `table[Player]` | Players who are animatronics in this round |

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

Called **after** the round ends, **before** the 10-second timer to return to the lobby.

```lua
hook.Run("fh_postendgame", killerVictory, animatronics)
```

| Argument | Type | Description |
|---|---|---|
| `killerVictory` | `bool` | Did the animatronics win? |
| `animatronics` | `table[Player]` | Animatronics from this round |

```lua
hook.Add("fh_postendgame", "GiveRewards", function(victory, anims)
    if victory then
        -- Animatronics won — give them a bonus
        for _, ply in ipairs(anims) do
            ply:AddFrags(5)
        end
    else
        -- Survivors won — reward survivors
        for _, ply in ipairs(player.GetAll()) do
            if ply:IsSurvivor() and ply:Alive() then
                ply:ChatPrint("You survived!")
            end
        end
    end
end)
```
