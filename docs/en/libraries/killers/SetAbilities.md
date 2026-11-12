> <span class="fh-badge shared">shared</span> **killers.SetAbilities(@string@ pill, @table@ abilities)**

# Description

Lets you set the list of abilities for an animatronic that will be shown in its interface.

# Arguments

> `1` @string@ **pill**

- The Pill's technical name, for example `freddy`.

> `2` @table@ **abilities**

- The list of the Pill's abilities.

## Example

```lua
killers.SetAbilities("scrapbaby", {
	[1] = { name = 'snatch', key = 'RMB' },
	[2] = { name = 'highlight', key = 'R' },
	[3] = { name = 'kill', key = 'LMB', hidden = true },
})
```