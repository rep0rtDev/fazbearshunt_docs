> <span class="fh-badge shared">shared</span> @boolean@ @Entity@:IsInvisible()

# Описание

Невидимый-ли игрок?

:::tip На заметку
Чтобы вернуло `true`, энтити должно иметь материал `models/null` или быть `:GetNoDraw() == true`.
:::

# Возвращает

> `1` @boolean@

- Если игрок невидимый, возвращает true, и false если нет.