> <span class="fh-badge shared">shared</span> @string@ **killers.GetFullName(@string@ pill)**

# Описание

Возвращает полное имя Пилла.

# Аргументы

> `1` @string@ **pill**

- Название Пилла, например `pill_wfreddy2`.

# Возвращает

> `1` @string@

- Полное имя Пилла.

## Пример

```lua
print( language.GetPhrase( killers.GetFullName( "pill_wfreddy2" ) ) )
```

**Вывод**:

```lua
Фредди
```