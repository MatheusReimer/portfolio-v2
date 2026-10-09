import { BASE_PATH } from '@/site'

export const locales = ['en', 'pt', 'de'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

/** Locales other than English, each served from its own folder (/pt/, /de/). */
export const prefixedLocales = locales.filter((l): l is Exclude<Locale, 'en'> => l !== defaultLocale)

export interface LocaleInfo {
  /** Short code shown in the switcher. */
  short: string
  /** The language's own name, used as the switcher link's accessible name. */
  name: string
  /** BCP 47 tag for `<html lang>` and hreflang. */
  htmlLang: string
  ogLocale: string
}

export const localeInfo: Record<Locale, LocaleInfo> = {
  en: { short: 'EN', name: 'English', htmlLang: 'en', ogLocale: 'en_US' },
  pt: { short: 'PT', name: 'Português', htmlLang: 'pt-BR', ogLocale: 'pt_BR' },
  de: { short: 'DE', name: 'Deutsch', htmlLang: 'de', ogLocale: 'de_DE' },
}

/** Path of a locale's home page, relative to the base path. */
export function localePath(locale: Locale): string {
  return locale === defaultLocale ? '/' : `/${locale}/`
}

/**
 * Full href of a locale's home page. Language pages are plain links, not
 * next/link: each locale has its own root layout, so switching is a full page
 * load anyway, and prefetching it only produces requests the export can't serve.
 */
export function localeHref(locale: Locale): string {
  return `${BASE_PATH}${localePath(locale)}`
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}
