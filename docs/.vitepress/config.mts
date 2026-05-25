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
          { text: 'fh.RegisterRoundType', link: '/gameplay/rounds#fh-registerroundtype' },
          { text: 'fh.GetRoundTypes', link: '/gameplay/rounds#fh-getroundtypes' },
          { text: 'fh.GetRoundTypeByName', link: '/gameplay/rounds#fh-getroundtypebyname' },
          { text: 'fh.AddRoundMusic', link: '/gameplay/rounds#fh-addroundmusic' },
        ]
      },
      {
        text: 'Подарки',
        collapsed: true,
        items: [
          { text: 'Обзор', link: '/gameplay/gifts' },
          { text: 'gifts.AddPositiveEffect', link: '/gameplay/gifts#gifts-addpositiveeffect' },
          { text: 'gifts.AddNegativeEffect', link: '/gameplay/gifts#gifts-addnegativeeffect' },
          { text: 'FH_ShouldPlayerReceiveGifts', link: '/gameplay/gifts#fh-shouldplayerreceivegifts' },
        ]
      },
      {
        text: 'Просветы',
        collapsed: true,
        items: [
          { text: 'Обзор', link: '/gameplay/highlights' },
          { text: 'highlight.ByDistance', link: '/gameplay/highlights#highlight-bydistance' },
          { text: 'highlight.Add', link: '/gameplay/highlights#highlight-add' },
          { text: 'highlight.Cooldown', link: '/gameplay/highlights#highlight-cooldown' },
          { text: 'highlight.AddVisionSounds', link: '/gameplay/highlights#highlight-addvisionsounds' },
          { text: 'highlight.NotifyTarget', link: '/gameplay/highlights#highlight-notifytarget' },
        ]
      },
      {
        text: 'Статистика',
        collapsed: true,
        items: [
          { text: 'Обзор', link: '/gameplay/statistics' },
          { text: 'stats.SetMin', link: '/gameplay/statistics#stats-setmin' },
          { text: 'stats.Add', link: '/gameplay/statistics#stats-add' },
          { text: 'stats.GetTop', link: '/gameplay/statistics#stats-gettop' },
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
          { text: 'IsSurvivor', link: '/reference/player-meta#playerissurvivor' },
          { text: 'IsAnimatronic', link: '/reference/player-meta#playerisanimatronic' },
          { text: 'ReturnToSpawn', link: '/reference/player-meta#playerreturntospawn' },
          { text: 'IsStuck / Unstuck', link: '/reference/player-meta#застревания' },
          { text: 'Push (толкания)', link: '/reference/player-meta#толкания' },
          { text: 'Voice Chat', link: '/reference/player-meta#голосовой-чат' },
          { text: 'GFreddy Immune', link: '/reference/player-meta#золотой-фредди' },
          { text: 'Gift Ownership', link: '/reference/player-meta#подарки' },
        ]
      },
      {
        text: 'Функции FH',
        collapsed: true,
        items: [
          { text: 'Обзор', link: '/reference/functions' },
          { text: 'giveKiller', link: '/reference/functions#givekiller' },
          { text: 'TaseAnimatronic', link: '/reference/functions#taseanimatronic' },
          { text: 'restoreAnimatronics', link: '/reference/functions#restoreanimatronics' },
          { text: 'doGiftSpawning', link: '/reference/functions#dogiftspawning' },
          { text: 'disableGiftSpawning', link: '/reference/functions#disablegiftspawning' },
          { text: 'fh.GetRoundCount', link: '/reference/functions#fh-getroundcount' },
          { text: 'fh.GetEarnedKillers', link: '/reference/functions#fh-getearnedkillers' },
          { text: 'fh.SetRoundType', link: '/reference/functions#fh-setroundtype' },
          { text: 'fh.GetRoundType', link: '/reference/functions#fh-getroundtype' },
          { text: 'jumpscareEvent', link: '/reference/functions#jumpscareevent' },
          { text: 'HighlightPlayers', link: '/reference/functions#highlightplayers' },
          { text: 'takePlayer / endoRelease', link: '/reference/functions#takeplayer' },
          { text: 'FindNearestPlayer', link: '/reference/functions#findnearestplayer' },
        ]
      },
      {
        text: 'Аниматроники',
        collapsed: true,
        items: [
          { text: 'Обзор', link: '/reference/animatronics' },
          { text: 'pill_makePreferable', link: '/reference/animatronics#pill-makepreferable' },
          { text: 'pill_makeSecondary', link: '/reference/animatronics#pill-makesecondary' },
          { text: 'killers.getAllPreferables', link: '/reference/animatronics#killers-getallpreferables' },
          { text: 'killers.getAllSecondaries', link: '/reference/animatronics#killers-getallsecondaries' },
          { text: 'killers.getAll', link: '/reference/animatronics#killers-getall' },
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
          { text: 'fh_prestartgame', link: '/hooks/round#fh-prestartgame' },
          { text: 'fh_startgame', link: '/hooks/round#fh-startgame' },
          { text: 'fh_poststartgame', link: '/hooks/round#fh-poststartgame' },
          { text: 'fh_postendgame', link: '/hooks/round#fh-postendgame' },
        ]
      },
      {
        text: 'Аниматроники',
        collapsed: true,
        items: [
          { text: 'FH_PlayerShouldJumpscare', link: '/hooks/animatronics#fh-playershouldjumpscare' },
          { text: 'FH_HandleTaserHit', link: '/hooks/animatronics#fh-handletaserhit' },
          { text: 'FH_AnimatronicJumpscare', link: '/hooks/animatronics#fh-animatronicjumpscare' },
          { text: 'FH_JumpscareEvent', link: '/hooks/animatronics#fh-jumpscareevent' },
          { text: 'FH_OverrideVoiceline', link: '/hooks/animatronics#fh-overridevoiceline' },
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
