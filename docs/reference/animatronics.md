# Аниматроники

Краткий справочник по работе с аниматрониками в Fazbear's Hunt.

## Как устроены аниматроники

Каждый аниматроник в FH — это **Пилл-Пак** ([Pill Pack](https://steamcommunity.com/sharedfiles/filedetails/?id=104604943)) с определённым техническим именем (например, `pill_wfreddy2`).

Гейммод определяет:
- **Играбельные** — могут быть выбраны как основной аниматроник раунда
- **Вторичные** — могут появляться как дополнительные

## Базовые операции

### Добавить аниматроника в режим

```lua
pill_makePreferable("pill_wfreddy2", true)
```

### Сделать вторичным

```lua
pill_makeSecondary("pill_wbonnie2", true)
```

### Получить модель аниматроника игрока

```lua
local ent = pk_pills.getMappedEnt(ply)
if IsValid(ent) then
    print("Модель:", ent:GetModel())
end
```

## Реакция на способности

Используйте хуки для реакции на действия аниматроников:

| Аниматроник | Хук | Описание |
|---|---|---|
| Фредди | [`FH_BlindRageStart`](/hooks/abilities#freddy) | Слепая Ярость началась |
| Бонни | [`FH_YoursMineStart`](/hooks/abilities#bonnie) | Чужой Взгляд начался |
| Чика | [`FH_MinePlanted`](/hooks/abilities#chica) | Кекс установлен |
| Шедоу Фредди | [`FH_SFreddySubmergeIn`](/hooks/abilities#shadow-freddy) | Уход в невидимость |
| Золотой Фредди | [`FH_OutworldStart`](/hooks/abilities#golden-freddy) | Загранное Измерение |

См. полный список: [Способности аниматроников →](/hooks/abilities)

## Скримеры

Скример — кульминационное действие аниматроника. Перехват скримеров идёт через:

- [`FH_PlayerShouldJumpscare`](/hooks/animatronics#fh_playershouldjumpscare) — можно отменить
- [`FH_AnimatronicJumpscare`](/hooks/animatronics#fh_animatronicjumpscare) — после успешного скримера
- [`FH_JumpscareEvent`](/hooks/animatronics#fh_jumpscareevent) — перед заморозкой жертвы

## Создание собственного скримера

```lua
hook.Add("KeyPress", "MyJumpscare", function(ply, key)
    if not ply:IsAnimatronic() then return end
    if key ~= IN_ATTACK then return end

    local ent = pk_pills.getMappedEnt(ply)
    if not IsValid(ent) then return end

    local target = FindNearestPlayer(ply:GetPos(), 80, ply, 90)
    if not IsValid(target) or not target:IsSurvivor() then return end

    -- 1. Проиграть свою анимацию...
    -- 2. Запустить скример FH
    jumpscareEvent(ply, ent, target, ply:GetPos():Distance(target:GetPos()))
end)
```