# Fazbear's Hunt Wiki

Welcome to the technical documentation for the **Fazbear's Hunt** gamemode for Garry's Mod.

This wiki is a reference for developers who want to create modifications, extensions, and custom animatronics for the gamemode.

::: tip New here?
If this is your first time — start with **[About the Gamemode](/guide/introduction)**, then move on to **[Getting Started](/guide/getting-started)**.
:::

## Where to Begin

To get started confidently, you need at least basic programming skills and a moderate understanding of [GLua](https://wiki.facepunch.com/gmod/) structure.

If you're a beginner and want to make a simple modification (e.g. add someone else's Pill Pack from the Steam Workshop), read the [First Modification](/guide/first-modification) section.

## Documentation Sections

### 📖 Guide

Introduction to the gamemode, setting up a development environment, first modification.

- [About the Gamemode](/guide/introduction)
- [Getting Started](/guide/getting-started)
- [First Modification](/guide/first-modification)

### 🎮 Gameplay Systems

Documentation on the core mechanics of Fazbear's Hunt.

- [Rounds](/gameplay/rounds) — creating custom round types
- [Gifts](/gameplay/gifts) — custom positive and negative effects
- [Highlights](/gameplay/highlights) — player highlighting through walls
- [Statistics](/gameplay/statistics) — custom round metrics

### 📚 API Reference

Full technical reference for all functions and methods.

- [PlayerMeta](/reference/player-meta) — Player metatable extensions
- [FH Functions](/reference/functions) — global gamemode functions
- [Animatronics](/reference/animatronics) — animatronic list management
- [Round Types](/reference/round-types) — built-in and custom types

### 🪝 Hooks

All gamemode hooks with usage examples.

- [Hooks Overview](/hooks/) — how to use hooks
- [Round Hooks](/hooks/round) — round start and end
- [Animatronic Hooks](/hooks/animatronics) — jumpscares, Taser
- [Animatronic Abilities](/hooks/abilities) — unique hooks per animatronic
- [Event Hooks](/hooks/events) — Maniac's Mask etc.

## Keep in Mind

::: warning Stay Updated
If you want your modification to work reliably — keep an eye on wiki updates after gamemode updates. Functions may change or be removed.
:::

## Useful Links

- [Fazbear's Hunt Discord Server](https://discord.gg/3yFA2pwQJR)
- [Documentation GitHub Repository](https://github.com/rep0rtDev/fazbearshunt_docs)
- [Official GMod Wiki](https://wiki.facepunch.com/gmod/)
