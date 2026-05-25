# Хуки ивентов

Хуки, связанные с особыми предметами и игровыми событиями.

## Маска Маньяка <span class="fh-badge client">CLIENT</span>

Маска Маньяка — особый предмет. Когда выживший её надевает, через некоторое время он получает **одержимость** — после этого аниматроники не могут его заскримерить.

### `FH_KillerObsessed(ply)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge client">CLIENT</span>

Вызывается после получения статуса одержимости.

```lua
hook.Add("FH_KillerObsessed", "ObsessedMsg", function(ply)
	if ply == LocalPlayer() then
		chat.AddText(Color(255, 0, 0), "Ты стал одержимым. Убивай всех и вся.")
	end
end)
```

### `FH_KillerLostObsession(ply)` <span class="fh-badge hook">HOOK</span> <span class="fh-badge client">CLIENT</span>

Вызывается после **потери** статуса одержимости (например, после смерти).

```lua
hook.Add("FH_KillerLostObsession", "ObsessionLostMsg", function(ply)
	if ply == LocalPlayer() then
		chat.AddText(Color(255, 200, 200), "Одержимость пропала.")
	end
end)
```