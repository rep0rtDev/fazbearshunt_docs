# Hooks

Hooks are the primary way to react to Fazbear's Hunt events and modify the mode's behavior.

## Hook categories

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-top: 32px;">

<a href="/en/hooks/round" style="border: 1px solid var(--vp-c-divider); border-radius: 12px; padding: 20px; text-decoration: none; color: inherit; display: block;">
<strong style="color: var(--fh-red);">🎯 Round</strong>
<p style="margin: 8px 0 0; color: var(--vp-c-text-2); font-size: 14px;">Start, type selection, round end.</p>
</a>

<a href="/en/hooks/animatronics" style="border: 1px solid var(--vp-c-divider); border-radius: 12px; padding: 20px; text-decoration: none; color: inherit; display: block;">
<strong style="color: var(--fh-red);">🤖 Animatronics</strong>
<p style="margin: 8px 0 0; color: var(--vp-c-text-2); font-size: 14px;">Screamers, Taser, voice lines.</p>
</a>

<a href="/en/hooks/abilities" style="border: 1px solid var(--vp-c-divider); border-radius: 12px; padding: 20px; text-decoration: none; color: inherit; display: block;">
<strong style="color: var(--fh-red);">⚡ Abilities</strong>
<p style="margin: 8px 0 0; color: var(--vp-c-text-2); font-size: 14px;">Unique hooks for each animatronic.</p>
</a>

<a href="/en/hooks/events" style="border: 1px solid var(--vp-c-divider); border-radius: 12px; padding: 20px; text-decoration: none; color: inherit; display: block;">
<strong style="color: var(--fh-red);">🎭 Events</strong>
<p style="margin: 8px 0 0; color: var(--vp-c-text-2); font-size: 14px;">Maniac Mask and more.</p>
</a>

</div>

## How to use hooks

Hooks in GMod are registered via [`hook.Add`](https://wiki.facepunch.com/gmod/hook.Add):

```lua
hook.Add("FH_PlayerShouldJumpscare", "MyUniqueName", function(ply, ent, target)
    -- Prevent players named "Bob" from being screamed
    if target:Nick() == "Bob" then
        return false
    end
end)
```

::: tip Unique names
The second argument of `hook.Add` is the **unique name** of your handler. If you register multiple hooks with the same name, the last one will overwrite the previous ones.
:::

## Return values

Many FH hooks allow you to **cancel an action** by returning `false`:

```lua
hook.Add("FH_HandleTaserHit", "BlockTaser", function(ply)
    if ply:IsAdmin() then
        return false  -- Taser does not hit admins
    end
end)
```
