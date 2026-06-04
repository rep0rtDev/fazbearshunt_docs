# Начало работы

Это руководство поможет вам подготовить рабочее окружение для разработки модификаций под Fazbear's Hunt.

## Требования

- **Garry's Mod** последней версии
- Установленный режим **Fazbear's Hunt**
- Любой текстовый редактор ([VS Code](https://code.visualstudio.com/) рекомендуется)
- Базовое понимание GLua

## Где писать код

Модификации для FH пишутся в виде обычных аддонов Garry's Mod. Создайте структуру:

```
garrysmod/addons/my_fh_addon/
└── gamemodes/
    └── fazbearshunt/
        └── gamemode/
            ├── sv_server_code.lua
            ├── cl_client_code.lua
            └── sh_shared_code.lua
```

::: tip Автозагрузка
Файлы в `gamemodes/fazbearshunt/gamemode/` подгружаются автоматически. Используйте префиксы файлов `sv_`, `cl_` и `sh_` для разделения серверного и клиентского кода.
:::

## Проверка установки

Создайте файл `gamemodes/fazbearshunt/gamemode/sv_test.lua`:

```lua
hook.Add("fh_poststartgame", "MyFirstHook", function(roundType, animatronics)
    print("[FH Test] Раунд начался! Тип:", roundType)
    print("[FH Test] Аниматроники:", table.Count(animatronics))
end)
```

Запустите сервер с режимом FH, начните раунд — в консоли должны появиться сообщения. Если есть сообщения — всё работает.

## Бейджи в документации

В этой вики используются следующие бейджи:

<span class="fh-badge server">SERVER</span> — функция только на сервере
<span class="fh-badge client">CLIENT</span> — функция только на клиенте
<span class="fh-badge shared">SHARED</span> — функция доступна везде
<span class="fh-badge hook">HOOK</span> — это хук, его можно ловить

## Следующий шаг

Перед тем как приступить к работе, нужно сначала понять что такое база Pills и регистрация аниматроников.

[База Pills →](/guide/animatronics/pills-base.md)