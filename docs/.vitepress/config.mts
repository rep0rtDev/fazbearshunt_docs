import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'ru-RU',
  title: "Fazbear's Hunt Wiki",
  description: 'Техническая документация для гейммода Fazbear\'s Hunt',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
    ['meta', { name: 'theme-color', content: '#c0392b' }],
  ],

  themeConfig: {
    logo: '/logo.png',
    siteTitle: "Fazbear's Hunt",

    nav: [
      { text: 'Главная', link: '/' },
      { text: 'Discord', link: 'https://discord.gg/fazbearhunt' },
      { text: 'GitHub', link: 'https://github.com/s3rgeant/fazbearshunt_docs' },
    ],

    // ОДИН общий сайдбар для всех страниц — Facepunch-style
    sidebar: [
      {
        text: 'Руководство',
        collapsed: false,
        items: [
          { text: 'О режиме', link: '/guide/introduction' },
          { text: 'Начало работы', link: '/guide/getting-started' },
          { text: 'Первая модификация', link: '/guide/first-modification' },
        ]
      },
      {
        text: 'Геймплей',
        collapsed: false,
        items: [
          { text: 'Раунды', link: '/gameplay/rounds' },
          { text: 'Подарки', link: '/gameplay/gifts' },
          { text: 'Просветы', link: '/gameplay/highlights' },
          { text: 'Статистика', link: '/gameplay/statistics' },
        ]
      },
      {
        text: 'Справочник',
        collapsed: false,
        items: [
          { text: 'PlayerMeta', link: '/reference/player-meta' },
          { text: 'Функции FH', link: '/reference/functions' },
          { text: 'Аниматроники', link: '/reference/animatronics' },
          { text: 'Типы раундов', link: '/reference/round-types' },
        ]
      },
      {
        text: 'Хуки',
        collapsed: false,
        items: [
          { text: 'Обзор', link: '/hooks/' },
          { text: 'Раунд', link: '/hooks/round' },
          { text: 'Аниматроники', link: '/hooks/animatronics' },
          { text: 'Способности', link: '/hooks/abilities' },
          { text: 'Ивенты', link: '/hooks/events' },
        ]
      },
      {
        text: 'Дополнительно',
        collapsed: false,
        items: [
          { text: 'FAQ', link: '/faq' },
        ]
      },
    ],

    outline: {
      label: 'На странице',
      level: [2, 3]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/s3rgeant/fazbearshunt_docs' },
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: 'Поиск', buttonAriaLabel: 'Поиск' },
          modal: {
            noResultsText: 'Ничего не найдено',
            resetButtonTitle: 'Сбросить',
            footer: { selectText: 'выбрать', navigateText: 'навигация', closeText: 'закрыть' }
          }
        }
      }
    },

    docFooter: { prev: 'Назад', next: 'Далее' },
    lastUpdatedText: 'Обновлено',
    darkModeSwitchLabel: 'Тема',
    sidebarMenuLabel: 'Меню',
    returnToTopLabel: 'Наверх',
  },

  markdown: {
    theme: { light: 'github-light', dark: 'one-dark-pro' },
  }
})