# Fazbear's Hunt Wiki

Welcome to the technical documentation for the **Fazbear's Hunt** gamemode for Garry's Mod.

This wiki is a reference for developers who want to create modifications, extensions, and custom animatronics for the gamemode.

::: tip For beginners
If this is your first time here — start with the **[About the gamemode](/en/guide/introduction)** section, then proceed to **[Getting started](/en/guide/getting-started)**.
:::

## Where to start

To get started confidently, you need at least basic programming skills and a moderate understanding of [GLua](https://wiki.facepunch.com/gmod/) structure.

If you are a beginner and want to make a simple modification (e.g., add a third-party Pill Pack from the Steam Workshop), read the [First modification](/en/guide/first-modification) section.

## Documentation sections

### 📖 Guide

Introduction to the gamemode, setting up a development environment, first modification.

- [About the gamemode](/en/guide/introduction)
- [Getting started](/en/guide/getting-started)
- [First modification](/en/guide/first-modification)

### 🎮 Gameplay systems

Documentation for Fazbear's Hunt core mechanics.

- [Rounds](/en/gameplay/rounds) — creating custom round types
- [Gifts](/en/gameplay/gifts) — custom positive and negative effects
- [Highlights](/en/gameplay/highlights) — seeing players through walls
- [Statistics](/en/gameplay/statistics) — custom round metrics

### 📚 API reference

Complete technical reference for all functions and methods.

- [PlayerMeta](/en/reference/player-meta) — Player meta-table extensions
- [FH Functions](/en/reference/functions) — global gamemode functions
- [Animatronics](/en/reference/animatronics) — managing animatronic lists
- [Round types](/en/reference/round-types) — built-in and custom

### 🔧 Hooks

All gamemode hooks with usage examples.

- [Hooks overview](/en/hooks/) — how to use hooks
- [Round hooks](/en/hooks/round) — round start, end
- [Animatronic hooks](/en/hooks/animatronics) — screamers, Taser
- [Animatronic abilities](/en/hooks/abilities) — unique hooks for each
- [Event hooks](/en/hooks/events) — Maniac Mask, etc.

## Please note

::: warning Keep up with updates
If you want your modification to work stably — keep up with wiki updates after gamemode updates. Functions may change or be removed.
:::

## Useful links

- [Fazbear's Hunt Discord server](https://discord.gg/3yFA2pwQJR)
- [Documentation GitHub repository](https://github.com/rep0rtDev/fazbearshunt_docs)
- [Official GMod Wiki](https://wiki.facepunch.com/gmod/)