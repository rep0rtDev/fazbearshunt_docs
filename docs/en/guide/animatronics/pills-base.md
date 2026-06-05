# Pills Base

**Fazbear's Hunt** uses [Parakeets Pill Pack](https://steamcommunity.com/sharedfiles/filedetails/?id=950845673) as the basis for the Pills database for registering animatronics. Thus, animatronics in the gamemode are Pills, and that is exactly what we will call them from now on.

# Differences between Parakeets Pill Pack and FH Pills

- The database has been renamed from `pk_pills` to `pills`.
- The Pill entity has been renamed from `pill_ent_costume` to `pill_costume`.
- Support for layered animations: play animations on top of others, e.g., wind-ups, attacks, etc.
- Added Lag Compensation for `attack`, `attack2`, and `reload` abilities.
- No longer need to use `ent:GetPuppet()`, you can use the Pill itself directly.
- Removed support for "Physical" Pills.

## For experienced users

If you are already familiar with the [Parakeets Pill Pack](https://steamcommunity.com/sharedfiles/filedetails/?id=950845673) base, porting a Pill from there can be done in a few steps:

- Copy your Pill's registration code.
- Create the script `my_fh_addon/gamemodes/fazbearshunt/gamemode/animatronics/my_animatronic.lua`, and then paste your code here.
- Rename `pk_pills` to `pills` everywhere.
- Save the script, join any map, open the Admin Panel *(press Q)* and go to the **Animatronics** section. Your Pill should be in the "Unknown" category.

If everything works, you can proceed to one of the sections:
- [Pill Structure and Registration →](/en/guide/animatronics/pill-structure-registration.md) (Since changes have been made to the Pill structure)
- [Registration into FH database →](/en/guide/animatronics/fh-registration.md) (If you already want to make your Pill playable)

## For beginners

To port, or even create your own Pill, you will need to read the following section, which explains Pill registration.

[Pill Structure and Registration →](/en/guide/animatronics/pill-structure-registration.md)