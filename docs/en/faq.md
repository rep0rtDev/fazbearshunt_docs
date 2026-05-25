# FAQ

Frequently asked questions about developing for Fazbear's Hunt.

## General

### What version of GMod is required?

Any up-to-date version of Garry's Mod (after 2020). The gamemode is regularly updated for the latest builds.

### Where are the gamemode sources?

The gamemode is **proprietary** — sources are closed. This wiki is the official API available for modifications.

### How do I report a bug in the API?

Open an issue in the [documentation repository](https://github.com/s3rgeant/fazbearshunt_docs/issues).

---

## Development

### Where do I write my modification code?

In a regular GMod addon: `garrysmod/addons/<addon_name>/lua/autorun/`.

### Why isn't my hook firing?

Check:
1. **Execution side** — server-side hooks don't work in client files
2. **Hook name** — casing matters (`FH_PlayerShouldJumpscare`, not `fh_player_should_jumpscare`)
3. **Unique name** — the second argument to `hook.Add` must be unique
4. **File loading** — check the console for any errors on startup

### How do I debug?

Use `print()`, `PrintTable()`, and GMod's built-in profiler. The server console prints to `garrysmod/console.log`.

### Can I use someone else's pill packs?

Yes! It's the easiest way to add an animatronic:

```lua
pill_makePreferable("pill_wfreddy_from_workshop", true)
```

See [First Modification →](/en/guide/first-modification.md)

---

## Compatibility

### Will my code work after a gamemode update?

It depends on what changed. **Keep an eye on this wiki** — functions may be renamed or removed. Hooks are generally more stable than functions.

### Can I override default hooks?

Yes, via return values. For example, returning `false` in `FH_PlayerShouldJumpscare` cancels the default jumpscare.

### Can addons conflict with each other?

If multiple addons modify the same thing — yes, a conflict may occur. Use **unique names** for hook handlers and check load order.
