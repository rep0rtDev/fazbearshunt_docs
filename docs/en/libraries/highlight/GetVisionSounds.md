> <span class="fh-badge server">server</span> @table@ **highlight.GetVisionSounds(@Entity@ pill)**

# Description

Returns the unique highlight sound for a specific Pill.

# Arguments

> `1` @Entity@ **pill**

- The Pill entity. Needed so the game can provide the unique highlight sound. Optional.

# Returns

> `1` @table@ **sounds**

- A table of highlight sounds. If `pill` is not specified, returns the generic highlight sound.

# Example

```lua
PrintTable( highlight.GetVisionSounds( Entity(1):GetPillCostume() ) )
```

**Output**:

```lua
["affected"]	=	vision_affected.wav
["unaffected"]	=	vision_unaffected.wav
```