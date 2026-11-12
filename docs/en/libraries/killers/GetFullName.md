> <span class="fh-badge shared">shared</span> @string@ **killers.GetFullName(@string@ pill)**

# Description

Returns a Pill's full name.

# Arguments

> `1` @string@ **pill**

- The Pill's name, for example `pill_wfreddy2`.

# Returns

> `1` @string@

- The Pill's full name.

## Example

```lua
print( language.GetPhrase( killers.GetFullName( "pill_wfreddy2" ) ) )
```

**Output**:

```lua
Freddy
```