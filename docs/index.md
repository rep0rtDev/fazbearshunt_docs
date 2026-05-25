---
layout: home

hero:
  name: "Fazbear's Hunt"
  text: "Техническая Вики"
  tagline: "Полная документация по разработке модификаций для гейммода Fazbear's Hunt в Garry's Mod. Хуки, функции, аниматроники, раунды — всё в одном месте."
  image:
    src: /logo.png
    alt: Fazbear's Hunt
  actions:
    - theme: brand
      text: Начать
      link: /guide/introduction
    - theme: alt
      text: API справочник
      link: /reference/player-meta
    - theme: alt
      text: GitHub
      link: https://github.com/rep0rtDev/fazbearshunt_docs

features:
  - icon: 🎮
    title: Геймплейные системы
    details: Раунды, подарки, просветы и статистика — узнайте, как работают основные системы режима и как их расширять.
    link: /gameplay/rounds
    linkText: Изучить геймплей
  - icon: 🤖
    title: Аниматроники
    details: Полный API для создания собственных аниматроников, способностей и переопределения поведения существующих.
    link: /reference/animatronics
    linkText: К аниматроникам
  - icon: 
    title: Хуки на каждый случай
    details: Десятки хуков для перехвата событий раунда, скримеров, способностей и пользовательских ивентов.
    link: /hooks/
    linkText: Список хуков
  - icon: ⚡
    title: PlayerMeta
    details: Расширенный API игрока — роли, застревания, толкания, голосовой чат и многое другое.
    link: /reference/player-meta
    linkText: PlayerMeta API
  - icon: 🎁
    title: Своя система подарков
    details: Создавайте собственные положительные и отрицательные эффекты для системы подарков.
    link: /gameplay/gifts
    linkText: Подарки
  - icon: 📊
    title: Статистика раунда
    details: Добавляйте собственные статистические показатели, которые выводятся игрокам в конце раунда.
    link: /gameplay/statistics
    linkText: Статистика
---

<div style="max-width: 1152px; margin: 64px auto 0; padding: 0 24px;">

## С чего начать?

Если вы впервые здесь — пройдите простой путь:

1. **[О режиме](/guide/introduction)** — узнайте, что такое Fazbear's Hunt
2. **[Начало работы](/guide/getting-started)** — настройка окружения для разработки
3. **[Первая модификация](/guide/first-modification)** — добавьте свой аниматроник из Мастерской Steam

После этого можно нырять в **[справочник API](/reference/player-meta)** и **[список хуков](/hooks/)**.

::: tip Полезно знать
Для уверенной работы с API нужно базовое понимание [GLua](https://wiki.facepunch.com/gmod/) — диалекта Lua, используемого в Garry's Mod.
:::

::: warning Следите за обновлениями
Если хотите, чтобы ваша модификация работала стабильно — следите за обновлениями вики после каждого обновления режима. Функции могут изменяться или удаляться.
:::

</div>