# Хуки ивентов

Хуки, связанные с особыми предметами и игровыми событиями.

## Маска Маньяка <span class="fh-badge client">CLIENT</span>

Маска Маньяка — особый предмет. Когда выживший её надевает, через некоторое время он получает **одержимость** — после этого аниматроники не могут его заскримерить.

### `FH_KillerObsessed` <span class="fh-badge hook">HOOK</span> <span class="fh-badge client">CLIENT</span>

Вызывается после получения статуса одержимости.

```lua
hook.Run("FH_KillerObsessed")
```

```lua
hook.Add("FH_KillerObsessed", "ObsessedFX", function()
    chat.AddText(Color(255, 0, 0), "Ты стал одержимым. Аниматроники тебя не видят.")
    -- можно запустить визуальный эффект
end)
```

### `FH_KillerLostObsession` <span class="fh-badge hook">HOOK</span> <span class="fh-badge client">CLIENT</span>

Вызывается после **потери** статуса одержимости (например, после смерти).

```lua
hook.Run("FH_KillerLostObsession")
```

```lua
hook.Add("FH_KillerLostObsession", "ObsessionLost", function()
    chat.AddText(Color(255, 200, 200), "Одержимость пропала.")
end)
```