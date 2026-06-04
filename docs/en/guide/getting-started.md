# Getting Started

This guide will help you prepare a working environment for developing modifications for Fazbear's Hunt.

## Requirements

- Latest version of **Garry's Mod**
- Installed **Fazbear's Hunt** gamemode
- Any text editor ([VS Code](https://code.visualstudio.com/) recommended)
- Basic understanding of GLua

## Where to write code

Modifications for FH are written as regular Garry's Mod addons. Create the following structure:

```
garrysmod/addons/my_fh_addon/
└── gamemodes/
    └── fazbearshunt/
        └── gamemode/
            ├── sv_server_code.lua
            ├── cl_client_code.lua
            └── sh_shared_code.lua
```

::: tip Auto-loading
Files in `gamemodes/fazbearshunt/gamemode/` are loaded automatically. Use `sv_`, `cl_` and `sh_` file prefixes to separate server and client code.
:::

## Checking the installation

Create the file `gamemodes/fazbearshunt/gamemode/sv_test.lua`:

```lua
hook.Add("fh_poststartgame", "MyFirstHook", function(roundType, animatronics)
    print("[FH Test] Round started! Type:", roundType)
    print("[FH Test] Animatronics:", table.Count(animatronics))
end)
```

Start a server with the FH gamemode, begin a round — messages should appear in the console. If messages appear, everything is working.

## Badges in this documentation

The following badges are used in this wiki:

<span class="fh-badge server">SERVER</span> — server-only function
<span class="fh-badge client">CLIENT</span> — client-only function
<span class="fh-badge shared">SHARED</span> — function available everywhere
<span class="fh-badge hook">HOOK</span> — this is a hook that can be caught

## Next step

Before you start working, you first need to understand what the Pills database is and how to register animatronics.

[Pills Base →](/en/guide/animatronics/pills-base.md)