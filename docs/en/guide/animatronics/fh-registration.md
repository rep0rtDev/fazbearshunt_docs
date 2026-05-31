# Registration

Now we will show how to quickly register a Pill into the FH database. We will use the `super_jump_freddy` Pill we registered earlier (See [Pill Structure and Registration →](/en/guide/animatronics/pill-structure-registration.md)).

```lua
-- Register the Pill into the gamemode, specifying:
-- Pill name, Tech name, Full name, Interface color, and category.
killers.Register("super_jump_freddy", "superjumpfreddy", "Super Jump Freddy", Color(114, 51, 5), "FNaF 2 Supers")
```

Now we can go to the Admin Panel *(press Q)* and check whether our animatronic appears in the "Players" tab. If it appears, congratulations — you've done everything correctly!

## Managing the animatronic

Before we explain the following functions, we need to clarify how animatronics can be designated:

- **Playable** — can appear in the selection at the start of a normal round
- **Secondary** — can appear in the selection **ONLY** if there are **>= two** animatronics

If we believe that our animatronic can only perform well paired with an allied animatronic, then we should make it secondary.

```lua
pill_makeSecondary("super_jump_freddy", true) -- Now it's secondary!
```

:::danger Remember once and for all
You can also control the playability of an animatronic, but never change it after registering the Pill:
```lua
pill_makePreferable("super_jump_freddy", true) -- Now it's playable!
```
The game deliberately does not make the animatronic playable automatically, to allow server admins to do this. What if an admin wants to temporarily remove the animatronic from the selection? After a map change, playability will reset because of your code.
:::

A detailed description of these functions can be found here - [FH Functions →](/en/reference/functions.md)

## Next step

Ready? Let's create our first modification — add an animatronic from the Workshop.

[First modification →](/en/guide/first-modification.md)