# Начало работы

Это руководство поможет вам подготовить рабочее окружение для разработки модификаций под Fazbear's Hunt.

## Требования

- **Garry's Mod** последней версии
- Установленный гейммод **Fazbear's Hunt**
- Любой текстовый редактор ([VS Code](https://code.visualstudio.com/) рекомендуется)
- Базовое понимание GLua

## Где писать код

Модификации для FH пишутся в виде обычных аддонов Garry's Mod. Создайте структуру:

```
garrysmod/addons/my_fh_addon/
└── lua/
    └── autorun/
        ├── server/
        │   └── my_server_code.lua
        ├── client/
        │   └── my_client_code.lua
        └── my_shared_code.lua
```

::: tip Автозагрузка
Файлы в `lua/autorun/` подгружаются автоматически. Используйте подпапки `server/` и `client/` для разделения серверного и клиентского кода.
:::

## Проверка установки

Создайте файл `lua/autorun/server/fh_test.lua`:

```lua
hook.Add("fh_poststartgame", "MyFirstHook", function(roundType, animatronics)
    print("[FH Test] Раунд начался! Тип:", roundType)
    print("[FH Test] Аниматроники:", #animatronics)
end)
```

Запустите сервер с гейммодом FH, начните раунд — в консоли должны появиться сообщения. Если да — всё работает.

## Бейджи в документации

В этой вики используются следующие бейджи:

<span class="fh-badge server">SERVER</span> — функция только на сервере
<span class="fh-badge client">CLIENT</span> — функция только на клиенте
<span class="fh-badge shared">SHARED</span> — функция доступна везде
<span class="fh-badge hook">HOOK</span> — это хук, его можно ловить

## Следующий шаг

Готовы? Создадим первую модификацию — добавим аниматроника из Мастерской.

[Первая модификация →](/guide/first-modification.md)