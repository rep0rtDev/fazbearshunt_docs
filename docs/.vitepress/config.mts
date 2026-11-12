import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'

const DOCS_DIR = fileURLToPath(new URL('..', import.meta.url))

type Realm = 'server' | 'client' | 'shared'
const REALM_RE = /fh-badge (server|client|shared)/
const HEADING_RE = /^#{1,4} /

function readPage(link: string): string[] | null {
  const pathname = link.split('#')[0]
  const rel = pathname.endsWith('/') ? `${pathname}index` : pathname
  const file = path.join(DOCS_DIR, `${rel}.md`)
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8').split('\n') : null
}

function escapeRegExp(text: string) {
  return text.replace(/[\\^$.*+?()[\]{}|\/-]/g, '\\$&')
}

function realmOf(item: DefaultTheme.SidebarItem): Realm | null {
  if (!item.link || !item.text) return null
  const lines = readPage(item.link)
  if (!lines) return null

  if (!item.link.includes('#')) {
    return (lines[0]?.match(REALM_RE)?.[1] as Realm | undefined) ?? null
  }

  const nameRe = new RegExp(`(^|[^A-Za-z0-9_])${escapeRegExp(item.text)}[(\`]`)
  const idx = lines.findIndex(line => HEADING_RE.test(line) && nameRe.test(line))
  if (idx === -1) return null

  for (let i = idx; i >= 0; i--) {
    const line = lines[i]
    if (!HEADING_RE.test(line)) continue
    const realm = line.match(REALM_RE)?.[1] as Realm | undefined
    if (realm) return realm
    if (line.startsWith('## ') && i !== idx) break
  }
  return null
}

function withRealmIcons(items: DefaultTheme.SidebarItem[]): DefaultTheme.SidebarItem[] {
  return items.map((item) => {
    const realm = realmOf(item)
    return {
      ...item,
      ...(realm && { text: `<span class="fh-realm ${realm}" title="${realm}"></span>${item.text}` }),
      ...(item.items && { items: withRealmIcons(item.items) }),
    }
  })
}

const TYPE_LINKS: Record<string, string> = {
  Vector: 'https://wiki.facepunch.com/gmod/Vector',
  Color: 'https://wiki.facepunch.com/gmod/Color',
  Player: 'https://wiki.facepunch.com/gmod/Player',
  Entity: 'https://wiki.facepunch.com/gmod/Entity',
  Angle: 'https://wiki.facepunch.com/gmod/Angle',
  number: 'https://wiki.facepunch.com/gmod/number',
  string: 'https://wiki.facepunch.com/gmod/string',
  boolean: 'https://wiki.facepunch.com/gmod/boolean',
  table: 'https://wiki.facepunch.com/gmod/table',
  function: 'https://wiki.facepunch.com/gmod/function',
  nil: 'https://wiki.facepunch.com/gmod/nil',
  IMaterial: 'https://wiki.facepunch.com/gmod/IMaterial',
}

export default defineConfig({
  title: "Fazbear's Hunt Wiki",
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
    ['meta', { name: 'theme-color', content: '#c0392b' }],
  ],

  vite: {
    plugins: [
      pagefindPlugin({
        excludeSelector: ['div.aside', 'a.header-anchor', 'img'],
        locales: {
          root: {
            btnPlaceholder: 'Поиск',
            placeholder: 'Поиск по документации',
            emptyText: 'Ничего не найдено',
            loadingText: 'Поиск...',
            heading: 'Найдено: {{searchResult}}',
            toSelect: 'выбрать',
            toNavigate: 'навигация',
            toClose: 'закрыть',
            searchBy: 'Поиск через',
          },
          en: {
            btnPlaceholder: 'Search',
            placeholder: 'Search docs',
            emptyText: 'No results',
            loadingText: 'Searching...',
            heading: 'Total: {{searchResult}} results',
            toSelect: 'to select',
            toNavigate: 'to navigate',
            toClose: 'to close',
            searchBy: 'Search by',
          },
        },
      }),
    ],
  },

  themeConfig: {
    logo: '/logo.png',
    siteTitle: "Fazbear's Hunt",

    socialLinks: [
      { icon: 'github', link: 'https://github.com/rep0rtDev/fazbearshunt_docs' },
    ],
  },

  markdown: {
    theme: { light: 'github-light', dark: 'one-dark-pro' },

    config(md) {
      md.core.ruler.before('normalize', 'gmod-type-links', (state) => {
        state.src = state.src.replace(
          /@([A-Za-z0-9_]+)@/g,
          (match, typeName) => {
            const url = TYPE_LINKS[typeName]
            return url ? `[${typeName}](${url})` : match
          }
        )
      })
    }
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

        sidebar: withRealmIcons([
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
            text: 'Справочник',
            collapsed: false,
            items: [
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
              { text: 'Аниматроники', link: '/reference/animatronics' },
              { text: 'Темы погони', link: '/reference/terror-radius' },
              { text: 'ViewModel аниматроника', link: '/reference/viewmodels' },
              { text: 'Типы раундов', link: '/reference/round-types' },
              { text: 'Работа со статистикой', link: '/reference/statistics' },
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
            ]
          },
          {
            text: 'Справочник 2',
            collapsed: false,
            items: [
              {
                text: 'Globals',
                collapsed: true,
                items: [
                  { text: 'AreLandConditionsGood', link: '/globals/AreLandConditionsGood' },
                  { text: 'DisplayText', link: '/globals/DisplayText' },
                  { text: 'FindNearestPlayer', link: '/globals/FindNearestPlayer' },
                  { text: 'GiveKiller', link: '/globals/GiveKiller' },
                  { text: 'GiveKillerSilent', link: '/globals/GiveKillerSilent' },
                  { text: 'IsChristmas', link: '/globals/IsChristmas' },
                  { text: 'IsHalloween', link: '/globals/IsHalloween' },
                  { text: 'PlayerInOutworld', link: '/globals/PlayerInOutworld' },
                  { text: 'TaseAnimatronic', link: '/globals/TaseAnimatronic' },
                ]
              },
              {
                text: 'Classes',
                collapsed: true,
                items: [
                  {
                    text: 'Entity',
                    collapsed: true,
                    items: [
                      { text: 'IsInvisible', link: '/classes/entity/IsInvisible' },
                    ]
                  },
                  {
                    text: 'Player',
                    collapsed: true,
                    items: [
                      { text: 'ForceListenPlayer', link: '/classes/player/ForceListenPlayer' },
                      { text: 'GetAudible', link: '/classes/player/GetAudible' },
                      { text: 'GetGFreddyImmune', link: '/classes/player/GetGFreddyImmune' },
                      { text: 'GetGiftOwnership', link: '/classes/player/GetGiftOwnership' },
                      { text: 'GetOnlyAudibleByTeammates', link: '/classes/player/GetOnlyAudibleByTeammates' },
                      { text: 'GetPill', link: '/classes/player/GetPill' },
                      { text: 'IsAnimatronic', link: '/classes/player/IsAnimatronic' },
                      { text: 'IsJumpscared', link: '/classes/player/IsJumpscared' },
                      { text: 'IsPushBlocked', link: '/classes/player/IsPushBlocked' },
                      { text: 'IsPushImmune', link: '/classes/player/IsPushImmune' },
                      { text: 'IsStuck', link: '/classes/player/IsStuck' },
                      { text: 'IsSurvivor', link: '/classes/player/IsSurvivor' },
                      { text: 'ResetListenPlayer', link: '/classes/player/ResetListenPlayer' },
                      { text: 'ReturnToSpawn', link: '/classes/player/ReturnToSpawn' },
                      { text: 'SetAudible', link: '/classes/player/SetAudible' },
                      { text: 'SetGFreddyImmune', link: '/classes/player/SetGFreddyImmune' },
                      { text: 'SetGiftOwnership', link: '/classes/player/SetGiftOwnership' },
                      { text: 'SetJumpscared', link: '/classes/player/SetJumpscared' },
                      { text: 'SetOnlyAudibleByTeammates', link: '/classes/player/SetOnlyAudibleByTeammates' },
                      { text: 'SetPushBlocked', link: '/classes/player/SetPushBlocked' },
                      { text: 'SetPushImmune', link: '/classes/player/SetPushImmune' },
                      { text: 'SetSpeedSlowdown', link: '/classes/player/SetSpeedSlowdown' },
                      { text: 'SuppressRagdollSpawn', link: '/classes/player/SuppressRagdollSpawn' },
                      { text: 'Unstuck', link: '/classes/player/Unstuck' },
                    ]
                  },
                ]
              },
              {
                text: 'Hooks',
                collapsed: true,
                items: [
                  {
                    text: 'GM',
                    collapsed: true,
                    items: [
                      { text: 'FH_AnimatronicJumpscare', link: '/hooks/gm/FH_AnimatronicJumpscare' },
                      { text: 'FH_HandleGiftPickup', link: '/hooks/gm/FH_HandleGiftPickup' },
                      { text: 'FH_HandleTaserHit', link: '/hooks/gm/FH_HandleTaserHit' },
                      { text: 'FH_KillerAxeReceived', link: '/hooks/gm/FH_KillerAxeReceived' },
                      { text: 'FH_KillerLostObsession', link: '/hooks/gm/FH_KillerLostObsession' },
                      { text: 'FH_KillerObsessed', link: '/hooks/gm/FH_KillerObsessed' },
                      { text: 'FH_LastManStanding', link: '/hooks/gm/FH_LastManStanding' },
                      { text: 'FH_OverrideVoiceline', link: '/hooks/gm/FH_OverrideVoiceline' },
                      { text: 'FH_PlayerShouldJumpscare', link: '/hooks/gm/FH_PlayerShouldJumpscare' },
                      { text: 'FH_ShouldPlayerReceiveGifts', link: '/hooks/gm/FH_ShouldPlayerReceiveGifts' },
                      { text: 'ForceDrawPill', link: '/hooks/gm/ForceDrawPill' },
                      { text: 'PillApply', link: '/hooks/gm/PillApply' },
                      { text: 'PillCreated', link: '/hooks/gm/PillCreated' },
                      { text: 'PillRestore', link: '/hooks/gm/PillRestore' },
                      { text: 'PillSound', link: '/hooks/gm/PillSound' },
                      { text: 'ShouldSpawnRagdoll', link: '/hooks/gm/ShouldSpawnRagdoll' },
                      { text: 'SuccessTaserHit', link: '/hooks/gm/SuccessTaserHit' },
                    ]
                  },
                ]
              },
              {
                text: 'Libraries',
                collapsed: true,
                items: [
                  {
                    text: 'gifts',
                    collapsed: true,
                    items: [
                      { text: 'AddPositiveEffect', link: '/libraries/gifts/AddPositiveEffect' },
                      { text: 'AddNegativeEffect', link: '/libraries/gifts/AddNegativeEffect' },
                      { text: 'GrantEffect', link: '/libraries/gifts/GrantEffect' },
                      { text: 'SetBlockPositiveEffect', link: '/libraries/gifts/SetBlockPositiveEffect' },
                    ]
                  },
                  {
                    text: 'highlight',
                    collapsed: true,
                    items: [
                      { text: 'Add', link: '/libraries/highlight/Add' },
                      { text: 'AddVisionSounds', link: '/libraries/highlight/AddVisionSounds' },
                      { text: 'ByDistance', link: '/libraries/highlight/ByDistance' },
                      { text: 'Cooldown', link: '/libraries/highlight/Cooldown' },
                      { text: 'GetCooldown', link: '/libraries/highlight/GetCooldown' },
                      { text: 'GetVisionSounds', link: '/libraries/highlight/GetVisionSounds' },
                      { text: 'NotifyTarget', link: '/libraries/highlight/NotifyTarget' },
                    ]
                  },
                  {
                    text: 'killers',
                    collapsed: true,
                    items: [
                      { text: 'GetAll', link: '/libraries/killers/GetAll' },
                      { text: 'GetAllNonPreferables', link: '/libraries/killers/GetAllNonPreferables' },
                      { text: 'GetAllPreferables', link: '/libraries/killers/GetAllPreferables' },
                      { text: 'GetAllSolos', link: '/libraries/killers/GetAllSolos' },
                      { text: 'GetAvatar', link: '/libraries/killers/GetAvatar' },
                      { text: 'GetColor', link: '/libraries/killers/GetColor' },
                      { text: 'GetFullName', link: '/libraries/killers/GetFullName' },
                      { text: 'GetName', link: '/libraries/killers/GetName' },
                      { text: 'GetPortrait', link: '/libraries/killers/GetPortrait' },
                      { text: 'Register', link: '/libraries/killers/Register' },
                      { text: 'SetAbilities', link: '/libraries/killers/SetAbilities' },
                    ]
                  },
                  {
                    text: 'playerlist',
                    collapsed: true,
                    items: [
                      { text: 'AddIconSet', link: '/libraries/playerlist/AddIconSet' },
                      { text: 'GetPlayerIcon', link: '/libraries/playerlist/GetPlayerIcon' },
                      { text: 'ResetIconSet', link: '/libraries/playerlist/ResetIconSet' },
                      { text: 'SetPlayerIcon', link: '/libraries/playerlist/SetPlayerIcon' },
                    ]
                  },
                  {
                    text: 'stats',
                    collapsed: true,
                    items: [
                      { text: 'Add', link: '/libraries/stats/Add' },
                      { text: 'GetTop', link: '/libraries/stats/GetTop' },
                      { text: 'SetMin', link: '/libraries/stats/SetMin' },
                    ]
                  },
                  { text: 'rounds', link: '/libraries/rounds' },
                ]
              },
              {
                text: 'Enumerations',
                collapsed: true,
                items: [
                  { text: 'TEAM', link: '/enums/team' },
                ]
              },
            ]
          },
        ]),

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

        sidebar: withRealmIcons([
          {
            text: 'Other',
            collapsed: false,
            items: [
              { text: 'FAQ', link: '/en/faq' },
              { text: 'Hammer', link: '/en/hammer' },
            ]
          },
          {
            text: 'Guide',
            collapsed: false,
            items: [
              { text: 'About the gamemode', link: '/en/guide/about' },
              { text: 'Getting started', link: '/en/guide/getting-started' },
              {
                text: 'Animatronics',
                collapsed: true,
                items: [
                  { text: 'Pills Base', link: '/en/guide/animatronics/pills-base' },
                  { text: 'Pill Structure & Registration', link: '/en/guide/animatronics/pill-structure-registration' },
                  { text: 'Animatronic registration', link: '/en/guide/animatronics/fh-registration' },
                ]
              },
              { text: 'First modification', link: '/en/guide/first-modification' },
            ]
          },
          {
            text: 'Reference',
            collapsed: false,
            items: [
              {
                text: 'PillCostumeMeta',
                collapsed: true,
                items: [
                  { text: 'Main', link: '/en/reference/pillcostume-meta#main' },
                  { text: 'Helpers', link: '/en/reference/pillcostume-meta#helpies' },
                  { text: 'Animations', link: '/en/reference/pillcostume-meta#animations' },
                  { text: 'Sounds', link: '/en/reference/pillcostume-meta#sounds' },
                  { text: 'Speed', link: '/en/reference/pillcostume-meta#speed' },
                  { text: 'Detaching', link: '/en/reference/pillcostume-meta#detaching' },
                ]
              },
              { text: 'Animatronics', link: '/en/reference/animatronics' },
              { text: 'Chase themes', link: '/en/reference/terror-radius' },
              { text: 'Pills ViewModels', link: '/en/reference/viewmodels' },
              { text: 'Round types', link: '/en/reference/round-types' },
              { text: 'Statistics', link: '/en/reference/statistics' },
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
            ]
          },
          {
            text: 'Reference 2',
            collapsed: false,
            items: [
              {
                text: 'Globals',
                collapsed: true,
                items: [
                  { text: 'AreLandConditionsGood', link: '/en/globals/AreLandConditionsGood' },
                  { text: 'DisplayText', link: '/en/globals/DisplayText' },
                  { text: 'FindNearestPlayer', link: '/en/globals/FindNearestPlayer' },
                  { text: 'GiveKiller', link: '/en/globals/GiveKiller' },
                  { text: 'GiveKillerSilent', link: '/en/globals/GiveKillerSilent' },
                  { text: 'IsChristmas', link: '/en/globals/IsChristmas' },
                  { text: 'IsHalloween', link: '/en/globals/IsHalloween' },
                  { text: 'PlayerInOutworld', link: '/en/globals/PlayerInOutworld' },
                  { text: 'TaseAnimatronic', link: '/en/globals/TaseAnimatronic' },
                ]
              },
              {
                text: 'Classes',
                collapsed: true,
                items: [
                  {
                    text: 'Entity',
                    collapsed: true,
                    items: [
                      { text: 'IsInvisible', link: '/en/classes/entity/IsInvisible' },
                    ]
                  },
                  {
                    text: 'Player',
                    collapsed: true,
                    items: [
                      { text: 'ForceListenPlayer', link: '/en/classes/player/ForceListenPlayer' },
                      { text: 'GetAudible', link: '/en/classes/player/GetAudible' },
                      { text: 'GetGFreddyImmune', link: '/en/classes/player/GetGFreddyImmune' },
                      { text: 'GetGiftOwnership', link: '/en/classes/player/GetGiftOwnership' },
                      { text: 'GetOnlyAudibleByTeammates', link: '/en/classes/player/GetOnlyAudibleByTeammates' },
                      { text: 'GetPill', link: '/en/classes/player/GetPill' },
                      { text: 'IsAnimatronic', link: '/en/classes/player/IsAnimatronic' },
                      { text: 'IsJumpscared', link: '/en/classes/player/IsJumpscared' },
                      { text: 'IsPushBlocked', link: '/en/classes/player/IsPushBlocked' },
                      { text: 'IsPushImmune', link: '/en/classes/player/IsPushImmune' },
                      { text: 'IsStuck', link: '/en/classes/player/IsStuck' },
                      { text: 'IsSurvivor', link: '/en/classes/player/IsSurvivor' },
                      { text: 'ResetListenPlayer', link: '/en/classes/player/ResetListenPlayer' },
                      { text: 'ReturnToSpawn', link: '/en/classes/player/ReturnToSpawn' },
                      { text: 'SetAudible', link: '/en/classes/player/SetAudible' },
                      { text: 'SetGFreddyImmune', link: '/en/classes/player/SetGFreddyImmune' },
                      { text: 'SetGiftOwnership', link: '/en/classes/player/SetGiftOwnership' },
                      { text: 'SetJumpscared', link: '/en/classes/player/SetJumpscared' },
                      { text: 'SetOnlyAudibleByTeammates', link: '/en/classes/player/SetOnlyAudibleByTeammates' },
                      { text: 'SetPushBlocked', link: '/en/classes/player/SetPushBlocked' },
                      { text: 'SetPushImmune', link: '/en/classes/player/SetPushImmune' },
                      { text: 'SetSpeedSlowdown', link: '/en/classes/player/SetSpeedSlowdown' },
                      { text: 'SuppressRagdollSpawn', link: '/en/classes/player/SuppressRagdollSpawn' },
                      { text: 'Unstuck', link: '/en/classes/player/Unstuck' },
                    ]
                  },
                ]
              },
              {
                text: 'Hooks',
                collapsed: true,
                items: [
                  {
                    text: 'GM',
                    collapsed: true,
                    items: [
                      { text: 'FH_AnimatronicJumpscare', link: '/en/hooks/gm/FH_AnimatronicJumpscare' },
                      { text: 'FH_HandleGiftPickup', link: '/en/hooks/gm/FH_HandleGiftPickup' },
                      { text: 'FH_HandleTaserHit', link: '/en/hooks/gm/FH_HandleTaserHit' },
                      { text: 'FH_KillerAxeReceived', link: '/en/hooks/gm/FH_KillerAxeReceived' },
                      { text: 'FH_KillerLostObsession', link: '/en/hooks/gm/FH_KillerLostObsession' },
                      { text: 'FH_KillerObsessed', link: '/en/hooks/gm/FH_KillerObsessed' },
                      { text: 'FH_LastManStanding', link: '/en/hooks/gm/FH_LastManStanding' },
                      { text: 'FH_OverrideVoiceline', link: '/en/hooks/gm/FH_OverrideVoiceline' },
                      { text: 'FH_PlayerShouldJumpscare', link: '/en/hooks/gm/FH_PlayerShouldJumpscare' },
                      { text: 'FH_ShouldPlayerReceiveGifts', link: '/en/hooks/gm/FH_ShouldPlayerReceiveGifts' },
                      { text: 'ForceDrawPill', link: '/en/hooks/gm/ForceDrawPill' },
                      { text: 'PillApply', link: '/en/hooks/gm/PillApply' },
                      { text: 'PillCreated', link: '/en/hooks/gm/PillCreated' },
                      { text: 'PillRestore', link: '/en/hooks/gm/PillRestore' },
                      { text: 'PillSound', link: '/en/hooks/gm/PillSound' },
                      { text: 'ShouldSpawnRagdoll', link: '/en/hooks/gm/ShouldSpawnRagdoll' },
                      { text: 'SuccessTaserHit', link: '/en/hooks/gm/SuccessTaserHit' },
                    ]
                  },
                ]
              },
              {
                text: 'Libraries',
                collapsed: true,
                items: [
                  {
                    text: 'gifts',
                    collapsed: true,
                    items: [
                      { text: 'AddPositiveEffect', link: '/en/libraries/gifts/AddPositiveEffect' },
                      { text: 'AddNegativeEffect', link: '/en/libraries/gifts/AddNegativeEffect' },
                      { text: 'GrantEffect', link: '/en/libraries/gifts/GrantEffect' },
                      { text: 'SetBlockPositiveEffect', link: '/en/libraries/gifts/SetBlockPositiveEffect' },
                    ]
                  },
                  {
                    text: 'highlight',
                    collapsed: true,
                    items: [
                      { text: 'Add', link: '/en/libraries/highlight/Add' },
                      { text: 'AddVisionSounds', link: '/en/libraries/highlight/AddVisionSounds' },
                      { text: 'ByDistance', link: '/en/libraries/highlight/ByDistance' },
                      { text: 'Cooldown', link: '/en/libraries/highlight/Cooldown' },
                      { text: 'GetCooldown', link: '/en/libraries/highlight/GetCooldown' },
                      { text: 'GetVisionSounds', link: '/en/libraries/highlight/GetVisionSounds' },
                      { text: 'NotifyTarget', link: '/en/libraries/highlight/NotifyTarget' },
                    ]
                  },
                  {
                    text: 'killers',
                    collapsed: true,
                    items: [
                      { text: 'GetAll', link: '/en/libraries/killers/GetAll' },
                      { text: 'GetAllNonPreferables', link: '/en/libraries/killers/GetAllNonPreferables' },
                      { text: 'GetAllPreferables', link: '/en/libraries/killers/GetAllPreferables' },
                      { text: 'GetAllSolos', link: '/en/libraries/killers/GetAllSolos' },
                      { text: 'GetAvatar', link: '/en/libraries/killers/GetAvatar' },
                      { text: 'GetColor', link: '/en/libraries/killers/GetColor' },
                      { text: 'GetFullName', link: '/en/libraries/killers/GetFullName' },
                      { text: 'GetName', link: '/en/libraries/killers/GetName' },
                      { text: 'GetPortrait', link: '/en/libraries/killers/GetPortrait' },
                      { text: 'Register', link: '/en/libraries/killers/Register' },
                      { text: 'SetAbilities', link: '/en/libraries/killers/SetAbilities' },
                    ]
                  },
                  {
                    text: 'playerlist',
                    collapsed: true,
                    items: [
                      { text: 'AddIconSet', link: '/en/libraries/playerlist/AddIconSet' },
                      { text: 'GetPlayerIcon', link: '/en/libraries/playerlist/GetPlayerIcon' },
                      { text: 'ResetIconSet', link: '/en/libraries/playerlist/ResetIconSet' },
                      { text: 'SetPlayerIcon', link: '/en/libraries/playerlist/SetPlayerIcon' },
                    ]
                  },
                  {
                    text: 'stats',
                    collapsed: true,
                    items: [
                      { text: 'Add', link: '/en/libraries/stats/Add' },
                      { text: 'GetTop', link: '/en/libraries/stats/GetTop' },
                      { text: 'SetMin', link: '/en/libraries/stats/SetMin' },
                    ]
                  },
                  { text: 'rounds', link: '/en/libraries/rounds' },
                ]
              },
              {
                text: 'Enumerations',
                collapsed: true,
                items: [
                  { text: 'TEAM', link: '/en/enums/team' },
                ]
              },
            ]
          },
        ]),

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
