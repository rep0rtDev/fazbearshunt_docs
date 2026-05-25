# First modification

In this guide, we will add a third-party animatronic (Pill-Pak from the Steam Workshop) to Fazbear's Hunt as a full-fledged mode animatronic.

## Step 1. Find Pill-Pak

Go to Steam Workshop, find Pill-Pak with the model you want to use. Remember its **technical ID** (e.g., `pill_wfreddy2`).

::: warning Attention
Pill-Pak must be subscribed to and installed on the server, otherwise the game won't be able to use it.
:::

## Step 2. Make it playable

Create the file `lua/autorun/server/my_animatronic.lua`:

```lua
hook.Add("Initialize", "RegisterMyAnimatronic", function()
    -- Make the animatronic playable
    pill_makePreferable("pill_wfreddy2", true)
end)
```

After this, the mode will start choosing it in rounds.

## Step 3. (Optional) Make it secondary

If you want this animatronic to appear as an additional one (alongside the main one):

```lua
pill_makeSecondary("pill_wfreddy2", true)
```

## Step 4. Manually assign to a player

If you want to give the animatronic to a specific player (e.g., during a special event):

```lua
hook.Add("fh_startgame", "GiveCustomKiller", function(roundType)
    local target = player.GetAll()[1]  -- first player
    if IsValid(target) then
        giveKiller(target, "pill_wfreddy2", true)
    end
end)
```

## What's next

Now that you have an animatronic, explore:

- **[FH Functions](/en/reference/functions.md)** — for deep behavior changes
- **[Animatronic Hooks](/en/hooks/animatronics.md)** — for intercepting screamers, etc.
- **[Animatronic Abilities](/en/hooks/abilities.md)** — hooks for specific abilities

::: tip Tip
Always check player validity (`IsValid(ply)`) before calling methods — they might leave, disconnect, or return to the lobby.
:::
