# Аниматроники

Краткий справочник по работе с аниматрониками в Fazbear's Hunt.

## Как устроены аниматроники

Все аниматроники в FH регистрируются таким же методом, как это делается в [Parakeets Pill Pack](https://steamcommunity.com/sharedfiles/filedetails/?id=950845673), но с небольшими поправками и новвоведениями для Пиллов, которые дают разработчикам больше возможностей.

Режим определяет:
- **Играбельные** — могут появиться в выборке в начале обычного раунда
- **Вторичные** — могут появиться в выборке только если аниматроников больше двух

## Базовые операции

### Добавить аниматроника в выборку

```lua
pill_makePreferable("pill_springtrap", true)
```

:::tip Избегайте
Избегайте динамического изменения играбельности аниматроника, так как играбельность можно в любой момент изменить в Админ-Панели.
:::

### Сделать вторичным

```lua
-- Шедоу Фредди теперь появляется в выборке даже если недостаточно аниматроников
pill_makeSecondary("pill_sfreddy2", false)
```

### Получить модель аниматроника игрока

```lua
local ent = pills.getMappedEnt(ply)
if IsValid(ent) then
    print("Модель:", ent:GetModel())
end
```
:::tip Разница
Режим добавляет в [`PlayerMeta`](/reference/PlayerMeta.md) функцию `ply:GetPill()`, но она напрямую вызывает `pills.getMappedEnt(ply)`, поэтому рекомендуется использовать именно второй вариант, для оптимизации.
:::

## Реакция на способности

Используйте хуки для реакции на действия аниматроников:

| Аниматроник | Хук | Описание |
|---|---|---|
| Фредди | [`FH_BlindRageStart`](/hooks/abilities.md#freddy) | Слепая Ярость началась |
| Бонни | [`FH_YoursMineStart`](/hooks/abilities.md#bonnie) | Чужим Разумом начался |
| Чика | [`FH_MinePlanted`](/hooks/abilities.md#chica) | Кекс установлен |
| Шедоу Фредди | [`FH_SFreddySubmergeIn`](/hooks/abilities.md#shadow-freddy) | Уход в невидимость |
| Золотой Фредди | [`FH_OutworldStart`](/hooks/abilities.md#golden-freddy) | Загранное Измерение |

См. полный список: [Способности аниматроников →](/hooks/abilities.md)

## Скримеры

Скример — кульминационное действие аниматроника. Перехват скримеров идёт через:

- [`FH_PlayerShouldJumpscare`](/hooks/animatronics.md#fh_playershouldjumpscare) — можно отменить
- [`FH_AnimatronicJumpscare`](/hooks/animatronics.md#fh_animatronicjumpscare) — после успешного скримера
- [`FH_JumpscareEvent`](/hooks/animatronics.md#fh_jumpscareevent) — перед заморозкой жертвы

## Создание собственного скримера

```lua
function simpleJumpscare(ply, ent)
	local target = FindNearestPlayer(ply:EyePos(), 120, ply, 36)
				
	local success = performJumpscare(ply, ent, target, 1.6)

	if success then
		print( "[TEST] Animatronic " .. ply:Nick() .. " jumpscared " .. target:Nick() )
	end
end
```