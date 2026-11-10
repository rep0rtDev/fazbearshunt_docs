> <span class="fh-badge server">server</span> **gifts.SetBlockPositiveEffect(@string@ gift, @bool@ isBlocked)**

# Описание

Выдаёт игроку позитивный эффект с подарков.

# Аргументы

> `1` @string@ **gift**

- Название эффекта.

> `2` @bool@ **isBlocked**

- Будет-ли эффект заблокирован?

## Пример

Выключаем выпадение дробовика и грави-пушки.

```lua
gifts.SetBlockPositiveEffect("oldshotgun", true)
gifts.SetBlockPositiveEffect("gravity_gun", true)
```