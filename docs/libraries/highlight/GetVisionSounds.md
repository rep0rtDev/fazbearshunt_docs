> <span class="fh-badge server">server</span> @table@ **highlight.GetVisionSounds(@Entity@ pill)**

# Описание

Возвращает уникальный звук просвета для определённого Пилла.

# Аргументы

> `1` @Entity@ **pill**

- Пилл-Энтити. Нужна, чтобы игра смогла выдать уникальный звук просвета. Необязательно указывать.

# Возвращает

> `1` @table@ **sounds**

- Таблица звуков просвета. Если `pill` не указана, выдаст общий звук просвета.

# Пример

```lua
PrintTable( highlight.GetVisionSounds( Entity(1):GetPillCostume() ) )
```

**Вывод**:

```lua
["affected"]	=	vision_affected.wav
["unaffected"]	=	vision_unaffected.wav
```