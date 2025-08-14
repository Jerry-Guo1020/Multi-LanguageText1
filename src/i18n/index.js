import { createI18n } from 'vue-i18n'
import zh from './locales/zh-CN.json'
import en from './locales/en-US.json'

const STORAGE_KEY = 'app-locale'

function detectLocale() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return saved
  } catch (_) {}
  const lang = (navigator.language || 'zh-CN').toLowerCase()
  return lang.includes('zh') ? 'zh-CN' : 'en-US'
}

export const i18n = createI18n({
  legacy: false,          // 组合式 API
  globalInjection: true,  // 允许模板里直接用 $t
  locale: detectLocale(),
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zh,
    'en-US': en
  }
})

export function setLocale(locale) {
  i18n.global.locale.value = locale
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch (_) {}
}
