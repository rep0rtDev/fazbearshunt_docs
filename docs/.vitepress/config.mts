import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Fazbear's Hunt Wiki",
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

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: 'Поиск', buttonAriaLabel: 'Поиск' },
              modal: {
                noResultsText: 'Ничего не найдено',
                resetButtonTitle: 'Сбросить',
                footer: { selectText: 'выбрать', navigateText: 'навигация', closeText: 'закрыть' }
              }
            }
          },
          en: {
            translations: {
              button: { buttonText: 'Search', buttonAriaLabel: 'Search' },
              modal: {
                noResultsText: 'No results',
                resetButtonTitle: 'Reset',
                footer: { selectText: 'select', navigateText: 'navigate', closeText: 'close' }
              }
            }
          }
        }
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/rep0rtDev/fazbearshunt_docs' },
    ],
  },

  markdown: {
    theme: { light: 'github-light', dark: 'one-dark-pro' },
  },

  locales: {
    root: {
      label: 'Русский',
      lang: 'ru-RU',
      description: 'Техническая документация для гейммода Fazbear\'s Hunt',

      themeConfig: {
        nav: [
          { text: 'Главная', link: '/' },
          { text: 'Discord', link: 'https://discord.gg/3yFA2pwQJR' },
          { text: 'GitHub', link: 'https://github.com/rep0rtDev/fazbearshunt_docs' },
        ],

        sidebar: [
          {
            text: 'Дополнительно',
            collapsed: false,
            items: [
              { text: 'FAQ', link: '/faq' },
              { text: 'Hammer', link: '/hammer' },
            ]
          },
          {
            text: 'Руководство',
            collapsed: false,
            items: [
              { text: 'О режиме', link: '/guide/about' },
              { text: 'Начало работы', link: '/guide/getting-started' },
              {
                text: 'Аниматроники',
                collapsed: true,
                items: [
                  { text: 'База Pills', link: '/guide/animatronics/pills-base' },
                  { text: 'Структура и Регистрация Пилла', link: '/guide/animatronics/pill-structure-registration' },
                  { text: 'Регистрация аниматроников', link: '/guide/animatronics/fh-registration' },
                ]
              },
              { text: 'Первая модификация', link: '/guide/first-modification' },
            ]
          },
          {
            text: 'Геймплей',
            collapsed: false,
            items: [
              {
                text: 'Раунды',
                collapsed: true,
                items: [
                  { text: 'Обзор', link: '/gameplay/rounds' },
                  { text: 'fh.RegisterRoundType', link: '/gameplay/rounds#fh-registerroundtype-name-id-func-weight-minplayers-maxplayers-server' },
                  { text: 'fh.SetRoundTypeBlocked', link: '/gameplay/rounds#fh-setroundtypeblocked-id-block-server' },
                  { text: 'fh.GetRoundTypes', link: '/gameplay/rounds#fh-getroundtypes-server' },
                  { text: 'fh.GetRoundTypeByName', link: '/gameplay/rounds#fh-getroundtypebyname-name-server' },
                  { text: 'fh.AddRoundMusic', link: '/gameplay/rounds#fh-addroundmusic-num-music-server' },
                ]
              },
              {
                text: 'Подарки',
                collapsed: true,
                items: [
                  { text: 'Обзор', link: '/gameplay/gifts' },
                  { text: 'gifts.AddPositiveEffect', link: '/gameplay/gifts#gifts-addpositiveeffect-name-desc-num-func-req-server' },
                  { text: 'gifts.AddNegativeEffect', link: '/gameplay/gifts#gifts-addnegativeeffect-name-desc-num-func-server' },
                  { text: 'gifts.GrantEffect', link: '/gameplay/gifts#gifts-addnegativeeffect-ply-name-server' },
                  { text: 'FH_ShouldPlayerReceiveGifts', link: '/gameplay/gifts#fh-shouldplayerreceivegifts-hook-server' },
                ]
              },
              {
                text: 'Просветы',
                collapsed: true,
                items: [
                  { text: 'Обзор', link: '/gameplay/highlights' },
                  { text: 'highlight.ByDistance', link: '/gameplay/highlights#highlight-bydistance-ply-ent-server' },
                  { text: 'highlight.Add', link: '/gameplay/highlights#highlight-add-ply-players-duration-server' },
                  { text: 'highlight.Cooldown', link: '/gameplay/highlights#highlight-cooldown-ply-duration-server' },
                  { text: 'highlight.AddVisionSounds', link: '/gameplay/highlights#highlight-addvisionsounds-name-snd-affected-snd-unaffected-server' },
                  { text: 'highlight.NotifyTarget', link: '/gameplay/highlights#highlight-notifytarget-target-ent-isaffected-server' },
                ]
              },
              {
                text: 'Статистика',
                collapsed: true,
                items: [
                  { text: 'Обзор', link: '/gameplay/statistics' },
                  { text: 'stats.SetMin', link: '/gameplay/statistics#stats-setmin-statname-minvalue-server' },
                  { text: 'stats.Add', link: '/gameplay/statistics#stats-add-ply-statname-value-server' },
                  { text: 'stats.GetTop', link: '/gameplay/statistics#stats-gettop-statname-server' },
                ]
              },
            ]
          },
          {
            text: 'Справочник',
            collapsed: false,
            items: [
              {
                text: 'PlayerMeta',
                collapsed: true,
                items: [
                  { text: 'Обзор', link: '/reference/player-meta' },
                  { text: 'IsSurvivor', link: '/reference/player-meta#player-issurvivor' },
                  { text: 'IsAnimatronic', link: '/reference/player-meta#player-isanimatronic' },
                  { text: 'ReturnToSpawn', link: '/reference/player-meta#player-returntospawn' },
                  { text: 'IsStuck / Unstuck', link: '/reference/player-meta#застревания-server' },
                  { text: 'Push (толкания)', link: '/reference/player-meta#толкания-server' },
                  { text: 'Voice Chat', link: '/reference/player-meta#голосовои-чат-server' },
                  { text: 'GFreddy Immune', link: '/reference/player-meta#золотои-фредди-server' },
                  { text: 'Gift Ownership', link: '/reference/player-meta#setgiftownership' },
                ]
              },
              {
                text: 'PillCostumeMeta',
                collapsed: true,
                items: [
                  { text: 'Основные', link: '/reference/pillcostume-meta#main' },
                  { text: 'Вспомогательные', link: '/reference/pillcostume-meta#helpies' },
                  { text: 'Анимации', link: '/reference/pillcostume-meta#animations' },
                  { text: 'Звуки', link: '/reference/pillcostume-meta#sounds' },
                  { text: 'Скорость', link: '/reference/pillcostume-meta#speed' },
                  { text: 'Отсоединение от игрока', link: '/reference/pillcostume-meta#detaching' },
                ]
              },
              {
                text: 'Функции FH',
                collapsed: true,
                items: [
                  { text: 'Обзор', link: '/reference/functions' },
                  { text: 'giveKiller', link: '/reference/functions#givekiller-ply-killer-force-server' },
                  { text: 'TaseAnimatronic', link: '/reference/functions#taseanimatronic-ply-server' },
                  { text: 'restoreAnimatronics', link: '/reference/functions#restoreanimatronics-server' },
                  { text: 'doGiftSpawning', link: '/reference/functions#dogiftspawning' },
                  { text: 'disableGiftSpawning', link: '/reference/functions#disablegiftspawning' },
                  { text: 'fh.GetRoundCount', link: '/reference/functions#fh-getroundcount-server' },
                  { text: 'fh.GetEarnedKillers', link: '/reference/functions#fh-getearnedkillers-players-server' },
                  { text: 'fh.GetRoundType', link: '/reference/functions#fh-getroundtype-server' },
                  { text: 'performJumpscare', link: '/reference/functions#performjumpscare' },
                  { text: 'FindNearestPlayer', link: '/reference/functions#findnearestplayer' },
                  { text: 'killers.Register', link: '/reference/functions#killersregister' },
                ]
              },
              { text: 'Аниматроники', link: '/reference/animatronics' },
              { text: 'Темы погони', link: '/reference/terror-radius' },
              { text: 'Типы раундов', link: '/reference/round-types' },
            ]
          },
          {
            text: 'Хуки',
            collapsed: false,
            items: [
              { text: 'Обзор', link: '/hooks/' },
              {
                text: 'Раунд',
                collapsed: true,
                items: [
                  { text: 'fh_prestartgame', link: '/hooks/round#fh_prestartgame' },
                  { text: 'fh_startgame', link: '/hooks/round#fh_startgame' },
                  { text: 'fh_poststartgame', link: '/hooks/round#fh_poststartgame' },
                  { text: 'fh_postendgame', link: '/hooks/round#fh_postendgame' },
                ]
              },
              {
                text: 'Аниматроники',
                collapsed: true,
                items: [
                  { text: 'FH_PlayerShouldJumpscare', link: '/hooks/animatronics#fh_playershouldjumpscare' },
                  { text: 'FH_HandleTaserHit', link: '/hooks/animatronics#fh-handletaserhit-hook-server' },
                  { text: 'FH_AnimatronicJumpscare', link: '/hooks/animatronics#fh_animatronicjumpscare' },
                  { text: 'FH_JumpscareEvent', link: '/hooks/animatronics#fh_jumpscareevent' },
                  { text: 'FH_OverrideVoiceline', link: '/hooks/animatronics#fh-overridevoiceline-hook-server' },
                ]
              },
              {
                text: 'Способности',
                collapsed: true,
                items: [
                  { text: 'Фредди', link: '/hooks/abilities#freddy' },
                  { text: 'Бонни', link: '/hooks/abilities#bonnie' },
                  { text: 'Чика', link: '/hooks/abilities#chica' },
                  { text: 'Шедоу Фредди', link: '/hooks/abilities#shadow-freddy' },
                  { text: 'Эндоскелет', link: '/hooks/abilities#endo02' },
                  { text: 'Золотой Фредди', link: '/hooks/abilities#golden-freddy' },
                  { text: 'Той Чика', link: '/hooks/abilities#toy-chica' },
                ]
              },
              {
                text: 'Ивенты',
                collapsed: true,
                items: [
                  { text: 'FH_KillerObsessed', link: '/hooks/events#fh-killerobsessed' },
                  { text: 'FH_KillerLostObsession', link: '/hooks/events#fh-killerlostobsession' },
                ]
              },
            ]
          },
        ],

        outline: {
          label: 'На странице',
          level: [2, 3]
        },

        docFooter: { prev: 'Назад', next: 'Далее' },
        lastUpdatedText: 'Обновлено',
        darkModeSwitchLabel: 'Тема',
        sidebarMenuLabel: 'Меню',
        returnToTopLabel: 'Наверх',
        langMenuLabel: 'Сменить язык',
      }
    },

    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      description: 'Technical documentation for the Fazbear\'s Hunt gamemode',

      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Discord', link: 'https://discord.gg/3fSG5k2NFX' },
          { text: 'GitHub', link: 'https://github.com/rep0rtDev/fazbearshunt_docs' },
        ],

        sidebar: [
          {
            text: 'Other',
            collapsed: false,
            items: [
              { text: 'FAQ', link: '/en/faq' },
            ]
          },
          {
            text: 'Guide',
            collapsed: false,
            items: [
              { text: 'About the gamemode', link: '/en/guide/about' },
              { text: 'Getting started', link: '/en/guide/getting-started' },
              { text: 'First modification', link: '/en/guide/first-modification' },
            ]
          },
          {
            text: 'Gameplay',
            collapsed: false,
            items: [
              {
                text: 'Rounds',
                collapsed: true,
                items: [
                  { text: 'Overview', link: '/en/gameplay/rounds' },
                  { text: 'fh.RegisterRoundType', link: '/en/gameplay/rounds#fh-registerroundtype-name-id-func-weight-minplayers-maxplayers-server' },
                  { text: 'fh.SetRoundTypeBlocked', link: '/en/gameplay/rounds#fh-setroundtypeblocked-id-block-server' },
                  { text: 'fh.GetRoundTypes', link: '/en/gameplay/rounds#fh-getroundtypes-server' },
                  { text: 'fh.GetRoundTypeByName', link: '/en/gameplay/rounds#fh-getroundtypebyname-name-server' },
                  { text: 'fh.AddRoundMusic', link: '/en/gameplay/rounds#fh-addroundmusic-num-music-server' },
                ]
              },
              {
                text: 'Gifts',
                collapsed: true,
                items: [
                  { text: 'Overview', link: '/en/gameplay/gifts' },
                  { text: 'gifts.AddPositiveEffect', link: '/en/gameplay/gifts#gifts-addpositiveeffect-name-desc-num-func-req-server' },
                  { text: 'gifts.AddNegativeEffect', link: '/en/gameplay/gifts#gifts-addnegativeeffect-name-desc-num-func-server' },
                  { text: 'gifts.GrantEffect', link: '/en/gameplay/gifts#gifts-addnegativeeffect-ply-name-server' },
                  { text: 'FH_ShouldPlayerReceiveGifts', link: '/en/gameplay/gifts#fh-shouldplayerreceivegifts-hook-server' },
                ]
              },
              {
                text: 'Highlights',
                collapsed: true,
                items: [
                  { text: 'Overview', link: '/en/gameplay/highlights' },
                  { text: 'highlight.ByDistance', link: '/en/gameplay/highlights#highlight-bydistance-ply-ent-server' },
                  { text: 'highlight.Add', link: '/en/gameplay/highlights#highlight-add-ply-players-duration-server' },
                  { text: 'highlight.Cooldown', link: '/en/gameplay/highlights#highlight-cooldown-ply-duration-server' },
                  { text: 'highlight.AddVisionSounds', link: '/en/gameplay/highlights#highlight-addvisionsounds-name-snd-affected-snd-unaffected-server' },
                  { text: 'highlight.NotifyTarget', link: '/en/gameplay/highlights#highlight-notifytarget-target-ent-isaffected-server' },
                ]
              },
              {
                text: 'Statistics',
                collapsed: true,
                items: [
                  { text: 'Overview', link: '/en/gameplay/statistics' },
                  { text: 'stats.SetMin', link: '/en/gameplay/statistics#stats-setmin-statname-minvalue-server' },
                  { text: 'stats.Add', link: '/en/gameplay/statistics#stats-add-ply-statname-value-server' },
                  { text: 'stats.GetTop', link: '/en/gameplay/statistics#stats-gettop-statname-server' },
                ]
              },
            ]
          },
          {
            text: 'Reference',
            collapsed: false,
            items: [
              {
                text: 'PlayerMeta',
                collapsed: true,
                items: [
                  { text: 'Overview', link: '/en/reference/player-meta' },
                  { text: 'IsSurvivor', link: '/en/reference/player-meta#player-issurvivor' },
                  { text: 'IsAnimatronic', link: '/en/reference/player-meta#player-isanimatronic' },
                  { text: 'ReturnToSpawn', link: '/en/reference/player-meta#player-returntospawn' },
                  { text: 'IsStuck / Unstuck', link: '/en/reference/player-meta#stuck-server' },
                  { text: 'Push (toлкания)', link: '/en/reference/player-meta#pushing-server' },
                  { text: 'Voice Chat', link: '/en/reference/player-meta#voice-chat-server' },
                  { text: 'GFreddy Immune', link: '/en/reference/player-meta#golden-freddy-server' },
                  { text: 'Gift Ownership', link: '/en/reference/player-meta#setgiftownership' },
                ]
              },
              {
                text: 'FH Functions',
                collapsed: true,
                items: [
                  { text: 'Overview', link: '/en/reference/functions' },
                  { text: 'giveKiller', link: '/en/reference/functions#givekiller-ply-killer-force-server' },
                  { text: 'TaseAnimatronic', link: '/en/reference/functions#taseanimatronic-ply-server' },
                  { text: 'restoreAnimatronics', link: '/en/reference/functions#restoreanimatronics-server' },
                  { text: 'doGiftSpawning', link: '/en/reference/functions#dogiftspawning' },
                  { text: 'disableGiftSpawning', link: '/en/reference/functions#disablegiftspawning' },
                  { text: 'fh.GetRoundCount', link: '/en/reference/functions#fh-getroundcount-server' },
                  { text: 'fh.GetEarnedKillers', link: '/en/reference/functions#fh-getearnedkillers-players-server' },
                  { text: 'fh.GetRoundType', link: '/en/reference/functions#fh-getroundtype-server' },
                  { text: 'jumpscareEvent', link: '/en/reference/functions#jumpscareevent-ply-ent-target-dist-server' },
                  { text: 'FindNearestPlayer', link: '/en/reference/functions#findnearestplayer-origin-radius-ignoreplayer-fov-shared' },
                ]
              },
              { text: 'Animatronics', link: '/en/reference/animatronics' },
              { text: 'Round types', link: '/en/reference/round-types' },
            ]
          },
          {
            text: 'Hooks',
            collapsed: false,
            items: [
              { text: 'Overview', link: '/en/hooks/' },
              {
                text: 'Round',
                collapsed: true,
                items: [
                  { text: 'fh_prestartgame', link: '/en/hooks/round#fh_prestartgame' },
                  { text: 'fh_startgame', link: '/en/hooks/round#fh_startgame' },
                  { text: 'fh_poststartgame', link: '/en/hooks/round#fh_poststartgame' },
                  { text: 'fh_postendgame', link: '/en/hooks/round#fh_postendgame' },
                ]
              },
              {
                text: 'Animatronics',
                collapsed: true,
                items: [
                  { text: 'FH_PlayerShouldJumpscare', link: '/en/hooks/animatronics#fh_playershouldjumpscare' },
                  { text: 'FH_HandleTaserHit', link: '/en/hooks/animatronics#fh-handletaserhit-hook-server' },
                  { text: 'FH_AnimatronicJumpscare', link: '/en/hooks/animatronics#fh_animatronicjumpscare' },
                  { text: 'FH_JumpscareEvent', link: '/en/hooks/animatronics#fh_jumpscareevent' },
                  { text: 'FH_OverrideVoiceline', link: '/en/hooks/animatronics#fh-overridevoiceline-hook-server' },
                ]
              },
              {
                text: 'Abilities',
                collapsed: true,
                items: [
                  { text: 'Freddy', link: '/en/hooks/abilities#freddy' },
                  { text: 'Bonnie', link: '/en/hooks/abilities#bonnie' },
                  { text: 'Chica', link: '/en/hooks/abilities#chica' },
                  { text: 'Shadow Freddy', link: '/en/hooks/abilities#shadow-freddy' },
                  { text: 'Endo02', link: '/en/hooks/abilities#endo02' },
                  { text: 'Golden Freddy', link: '/en/hooks/abilities#golden-freddy' },
                  { text: 'Toy Chica', link: '/en/hooks/abilities#toy-chica' },
                ]
              },
              {
                text: 'Events',
                collapsed: true,
                items: [
                  { text: 'FH_KillerObsessed', link: '/en/hooks/events#fh-killerobsessed' },
                  { text: 'FH_KillerLostObsession', link: '/en/hooks/events#fh-killerlostobsession' },
                ]
              },
            ]
          },
        ],

        outline: {
          label: 'On this page',
          level: [2, 3]
        },

        docFooter: { prev: 'Previous', next: 'Next' },
        lastUpdatedText: 'Updated',
        darkModeSwitchLabel: 'Theme',
        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Return to top',
        langMenuLabel: 'Change language',
      }
    }
  },
})
