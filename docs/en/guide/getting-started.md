# Getting Started

This guide will help you set up a development environment for creating Fazbear's Hunt modifications.

## Requirements

- **Garry's Mod** (latest version)
- The **Fazbear's Hunt** gamemode installed
- Any text editor ([VS Code](https://code.visualstudio.com/) recommended)
- Basic understanding of GLua

## Where to Write Code

Modifications for FH are written as regular Garry's Mod addons. Create the following structure:

```
garrysmod/addons/my_fh_addon/
└── lua/
    └── autorun/
        ├── server/
        │   └── my_server_code.lua
        ├── client/
        │   └── my_client_code.lua
        └── my_shared_code.lua
```

::: tip Auto-loading
Files in `lua/autorun/` are loaded automatically. Use the `server/` and `client/` subdirectories to separate server and client code.
:::

## Verifying Your Setup

Create a file at `lua/autorun/server/fh_test.lua`:

```lua
hook.Add("fh_poststartgame", "MyFirstHook", function(roundType, animatronics)
    print("[FH Test] Round started! Type:", roundType)
    print("[FH Test] Animatronics:", #animatronics)
end)
```

Start a server with the FH gamemode and begin a round — the messages should appear in the console. If they do, everything is working.

## Badges in the Documentation

This wiki uses the following badges:

<span class="fh-badge server">SERVER</span> — server-side only  
<span class="fh-badge client">CLIENT</span> — client-side only  
<span class="fh-badge shared">SHARED</span> — available on both sides  
<span class="fh-badge hook">HOOK</span> — this is a hook you can listen to  

## Next Step

Ready? Let's create your first modification — adding an animatronic from the Workshop.

[First Modification →](/en/guide/first-modification.md)
