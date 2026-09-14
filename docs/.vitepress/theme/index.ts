import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './style.css'

const RegExpCtor = RegExp as typeof RegExp & { escape?: (text: string) => string }
if (typeof RegExpCtor.escape !== 'function') {
  RegExpCtor.escape = (text: string) => text.replace(/[\\^$.*+?()[\]{}|\/-]/g, '\\$&')
}

export default {
  extends: DefaultTheme,
} satisfies Theme
