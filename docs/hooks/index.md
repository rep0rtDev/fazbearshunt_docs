# Хуки

Хуки — основной способ реагировать на события Fazbear's Hunt и изменять поведение режима.

## Категории хуков

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-top: 32px;">

<a href="/hooks/round" style="border: 1px solid var(--vp-c-divider); border-radius: 12px; padding: 20px; text-decoration: none; color: inherit; display: block;">
<strong style="color: var(--fh-red);">🎯 Раунд</strong>
<p style="margin: 8px 0 0; color: var(--vp-c-text-2); font-size: 14px;">Старт, выбор типа, окончание раунда.</p>
</a>

<a href="/hooks/animatronics" style="border: 1px solid var(--vp-c-divider); border-radius: 12px; padding: 20px; text-decoration: none; color: inherit; display: block;">
<strong style="color: var(--fh-red);">🤖 Аниматроники</strong>
<p style="margin: 8px 0 0; color: var(--vp-c-text-2); font-size: 14px;">Скримеры, Шокер, реплики.</p>
</a>

<a href="/hooks/abilities" style="border: 1px solid var(--vp-c-divider); border-radius: 12px; padding: 20px; text-decoration: none; color: inherit; display: block;">
<strong style="color: var(--fh-red);">⚡ Способности</strong>
<p style="margin: 8px 0 0; color: var(--vp-c-text-2); font-size: 14px;">Уникальные хуки каждого аниматроника.</p>
</a>

<a href="/hooks/events" style="border: 1px solid var(--vp-c-divider); border-radius: 12px; padding: 20px; text-decoration: none; color: inherit; display: block;">
<strong style="color: var(--fh-red);">🎭 Ивенты</strong>
<p style="margin: 8px 0 0; color: var(--vp-c-text-2); font-size: 14px;">Маска Маньяка и прочее.</p>
</a>

</div>

## Как использовать хуки

Хуки в GMod подключаются через [`hook.Add`](https://wiki.facepunch.com/gmod/hook.Add):

```lua
hook.Add("FH_PlayerShouldJumpscare", "MyUniqueName", function(ply, ent, target)
    -- Запретить скример игроков с именем "Bob"
    if target:Nick() == "Bob" then
        return false
    end
end)
```

::: tip Уникальные имена
Второй аргумент `hook.Add` — это **уникальное имя** вашего обработчика. Если вы зарегистрируете несколько хуков с одинаковым именем — последний перезапишет предыдущие.
:::

## Возврат значений

Многие хуки FH позволяют **отменить действие**, вернув `false`:

```lua
hook.Add("FH_HandleTaserHit", "BlockTaser", function(ply)
    if ply:IsAdmin() then
        return false -- админов Шокер не бьёт
    end
end)
```