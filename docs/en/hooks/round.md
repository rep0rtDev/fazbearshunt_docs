# Round Hooks

Hooks called at different stages of a round's life.

## `fh_prestartgame()` <span class="fh-badge hook">HOOK</span> <span class="fh-badge shared">SHARED</span> {#fh_prestartgame}

Called **before** the round type is selected.

**Return `false`** — cancel round selection.

---

## `fh_startgame(roundType)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge server">SERVER</span> {#fh_startgame}

Called **after** the round type is selected and basic round functions are executed (role distribution, freeze, Taser giving).

| Argument | Type | Description |
|---|---|---|
| `roundType` | `int` | Round type ID |

**Return `false`** — cancel timer start, music, etc.

**Example:** unique round with timer replacement. See [Bonnie-Tag →](https://github.com/s3rgeant/fazbearshunt_docs/blob/main/examples/bonnie_tag.lua)

```lua
hook.Add("fh_startgame", "AnnounceRound", function(roundType)
    local name = fh.GetRoundTypeNameByNumber(roundType)
    PrintMessage(HUD_PRINTTALK, "Round: " .. name)
end)
```

---

## `fh_poststartgame(roundType, animatronics)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge shared">SHARED</span> {#fh_poststartgame}

Called **after** animatronics are unfrozen.

| Argument | Type | Description |
|---|---|---|
| `roundType` | `int` | Round type ID |
| `animatronics` | `table[Player]` | Players who are animatronics in this round |

```lua
hook.Add("fh_poststartgame", "BuffAnims", function(roundType, anims)
    for ply, _ in ipairs(anims) do
        ply:SetMaxHealth(150000)
        ply:SetHealth(150000)
    end
end)
```

---

## `fh_postendgame(killerVictory, animatronics)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge shared">SHARED</span> {#fh_postendgame}

Called **after** the round ends, **before** the timer to return to the lobby.

| Argument | Type | Description |
|---|---|---|
| `killerVictory` | `bool` | Did the animatronics win? |
| `animatronics` | `table[Player]` | Animatronics from this round |

```lua
hook.Add("fh_postendgame", "RewardAnims", function(victory, anims)
    if not victory then
        -- Animatronics lost - explode them.
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