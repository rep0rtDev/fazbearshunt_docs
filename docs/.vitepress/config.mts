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
      { text: 'Discord', link: 'https://discord.gg/3yFA2pwQJR' },
      { text: 'GitHub', link: 'https://github.com/rep0rtDev/fazbearshunt_docs' },
    ],

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
          {
            text: 'Раунды',
            collapsed: true,
            items: [
              { text: 'Обзор', link: '/gameplay/rounds' },
              { text: 'fh.RegisterRoundType', link: '/gameplay/rounds#fh-registerroundtype-name-id-func-weight-minplayers-maxplayers-shared' },
              { text: 'fh.GetRoundTypes', link: '/gameplay/rounds#fh-getroundtypes-shared' },
              { text: 'fh.GetRoundTypeByName', link: '/gameplay/rounds#fh-getroundtypebyname-name-shared' },
              { text: 'fh.AddRoundMusic', link: '/gameplay/rounds#fh-addroundmusic-num-music-shared' },
            ]
          },
          {
            text: 'Подарки',
            collapsed: true,
            items: [
              { text: 'Обзор', link: '/gameplay/gifts' },
              { text: 'gifts.AddPositiveEffect', link: '/gameplay/gifts#gifts-addpositiveeffect-name-desc-num-func-req-server' },
              { text: 'gifts.AddNegativeEffect', link: '/gameplay/gifts#gifts-addnegativeeffect-name-desc-num-func-server' },
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
              { text: 'highlight.AddVisionSounds', link: '/gameplay/highlights#highlight-addvisionsounds-name-snd-affected-snd-unaffected-shared' },
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
              { text: 'Voice Chat', link: '/reference/player-meta#голосовой-чат-server' },
              { text: 'GFreddy Immune', link: '/reference/player-meta#золотой-фредди-server' },
              { text: 'Gift Ownership', link: '/reference/player-meta#setgiftownership' },
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
              { text: 'fh.GetRoundCount', link: '/reference/functions#fh-getroundcount-shared' },
              { text: 'fh.GetEarnedKillers', link: '/reference/functions#fh-getearnedkillers-players-server' },
              { text: 'fh.SetRoundType', link: '/reference/functions#fh-setroundtype-number-server' },
              { text: 'fh.GetRoundType', link: '/reference/functions#fh-getroundtype-shared' },
              { text: 'jumpscareEvent', link: '/reference/functions#jumpscareevent-ply-ent-target-dist-server' },
              { text: 'HighlightPlayers', link: '/reference/functions#highlightplayers-ply-ent-server' },
              { text: 'takePlayer / endoRelease', link: '/reference/functions#takeplayer-ply-ent-server' },
              { text: 'FindNearestPlayer', link: '/reference/functions#findnearestplayer-origin-radius-ignoreplayer-fov-server' },
            ]
          },
          {
            text: 'Аниматроники',
            collapsed: true,
            items: [
              { text: 'Обзор', link: '/reference/animatronics' },
              { text: 'pill_makePreferable', link: '/reference/functions#pill-makepreferable-anim-bool-shared' },
              { text: 'pill_makeSecondary', link: '/reference/functions#pill-makesecondary-anim-bool-shared' },
              { text: 'killers.getAllPreferables', link: '/reference/functions#killers-getallpreferables-secondaries-shared' },
              { text: 'killers.getAllSecondaries', link: '/reference/functions#killers-getallsecondaries-shared' },
              { text: 'killers.getAll', link: '/reference/functions#killers-getall-shared' },
            ]
          },
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
              { text: 'Золотой Фредди', link: '/hooks/abilities#golden-freddy' },
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
      { icon: 'github', link: 'https://github.com/rep0rtDev/fazbearshunt_docs' },
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
