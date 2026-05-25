import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'ru-RU',
  title: "Fazbear's Hunt Wiki",
  description: 'Техническая документация для гейммода Fazbear\'s Hunt в Garry\'s Mod',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
    ['meta', { name: 'theme-color', content: '#ef4444' }],
    ['meta', { property: 'og:title', content: "Fazbear's Hunt Wiki" }],
    ['meta', { property: 'og:description', content: 'Technical documentation for the Fazbear\'s Hunt gamemode' }],
    ['meta', { property: 'og:type', content: 'website' }],
  ],

  themeConfig: {
    logo: '/logo.png',
    siteTitle: "Fazbear's Hunt",

    nav: [
      { text: 'Главная', link: '/' },
      { text: 'Руководство', link: '/guide/introduction' },
      { text: 'Геймплей', link: '/gameplay/rounds' },
      { text: 'Справочник', link: '/reference/player-meta' },
      { text: 'Хуки', link: '/hooks/' },
      {
        text: 'Ссылки',
        items: [
          { text: 'Discord', link: 'https://discord.gg/3yFA2pwQJR' },
          { text: 'GitHub Wiki', link: 'https://github.com/rep0rtDev/fazbearshunt_docs' },
          { text: 'GMod Wiki', link: 'https://wiki.facepunch.com/gmod/' },
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Введение',
          collapsed: false,
          items: [
            { text: 'О режиме', link: '/guide/introduction' },
            { text: 'Начало работы', link: '/guide/getting-started' },
            { text: 'Первая модификация', link: '/guide/first-modification' },
          ]
        }
      ],

      '/gameplay/': [
        {
          text: 'Геймплейные системы',
          collapsed: false,
          items: [
            { text: 'Раунды', link: '/gameplay/rounds' },
            { text: 'Подарки', link: '/gameplay/gifts' },
            { text: 'Просветы', link: '/gameplay/highlights' },
            { text: 'Статистика', link: '/gameplay/statistics' },
          ]
        }
      ],

      '/reference/': [
        {
          text: 'API справочник',
          collapsed: false,
          items: [
            { text: 'PlayerMeta', link: '/reference/player-meta' },
            { text: 'Функции FH', link: '/reference/functions' },
            { text: 'Аниматроники', link: '/reference/animatronics' },
            { text: 'Типы раундов', link: '/reference/round-types' },
          ]
        }
      ],

      '/hooks/': [
        {
          text: 'Хуки',
          collapsed: false,
          items: [
            { text: 'Обзор хуков', link: '/hooks/' },
            { text: 'Хуки раунда', link: '/hooks/round' },
            { text: 'Хуки аниматроников', link: '/hooks/animatronics' },
            { text: 'Способности аниматроников', link: '/hooks/abilities' },
            { text: 'Хуки ивентов', link: '/hooks/events' },
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/rep0rtDev/fazbearshunt_docs' },
      { icon: 'discord', link: 'https://discord.gg/3yFA2pwQJR' },
    ],

    footer: {
      message: 'Released under love for the FNAF community.',
      copyright: `© ${new Date().getFullYear()} Fazbear's Hunt Team`
    },

    editLink: {
      pattern: 'https://github.com/rep0rtDev/fazbearshunt_docs/edit/main/docs/:path',
      text: 'Редактировать на GitHub'
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: 'Поиск',
            buttonAriaLabel: 'Поиск'
          },
          modal: {
            noResultsText: 'Ничего не найдено',
            resetButtonTitle: 'Сбросить',
            footer: {
              selectText: 'выбрать',
              navigateText: 'навигация',
              closeText: 'закрыть'
            }
          }
        }
      }
    },

    outline: {
      label: 'На этой странице',
      level: [2, 3]
    },

    docFooter: {
      prev: 'Назад',
      next: 'Далее'
    },

    lastUpdatedText: 'Обновлено',
    darkModeSwitchLabel: 'Тема',
    sidebarMenuLabel: 'Меню',
    returnToTopLabel: 'Наверх',
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'one-dark-pro'
    },
    lineNumbers: false,
  }
})
