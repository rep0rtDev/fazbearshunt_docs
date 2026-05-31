# FAQ

Frequently asked questions about developing for Fazbear's Hunt.

## General

### What is the gamemode's technical name?

fazbearshunt

### Which version of GMod is needed?

Any up-to-date version of Garry's Mod (post-2020). The gamemode is regularly updated for the latest builds.

:::tip
The gamemode is developed and tested on the 64-bit version of Garry's Mod. If you encounter a bug/exploit in another version, make sure it also occurs in the 64-bit version.
:::

### Where are the gamemode's source files?

The source files can be obtained by extracting the gamemode's files. However, to avoid doing that, this documentation explains how the gamemode works.

### How do I report an API error?

Open an issue in the [documentation repository](https://github.com/rep0rtDev/fazbearshunt_docs/issues).

---

## Development

### Where should I write my modification code?

In a regular GMod addon: `garrysmod/addons/<addon_name>/lua/autorun/`.

### Why isn't my hook firing?

Check:
1. **Execution side** — server hooks don't work in client files, and vice versa
2. **Hook name** — capitalization matters (`FH_PlayerShouldJumpscare`, not `fh_playershouldjumpscare`)
3. **Unique name** — the second argument of `hook.Add` must be unique
4. **File loading** — check the console for errors on startup

### How can I track variables?

Use `print()`, `PrintTable()`, and GMod's built-in profiler. The server console logs to `garrysmod/console.log`.

### Can I use third-party Pill Packs?

Yes! As long as you don't put third-party Pill Pack content into your own addon, no one can tell you that their work has been stolen.

See [First modification →](/en/guide/first-modification.md)

---

## Compatibility

### Will my code work after a gamemode update?

It depends on what has changed. **Monitor this wiki** — functions may be renamed or removed.

### Can I override standard hooks?

Yes, through return values. For example, returning `false` in `FH_PlayerShouldJumpscare` cancels the standard screamer.

### Do addons conflict with each other?

If multiple addons modify the same thing — yes, conflicts can occur. Use **unique names** for hooks and check the load order.