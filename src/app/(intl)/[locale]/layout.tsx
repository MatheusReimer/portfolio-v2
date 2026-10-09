import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { buildMetadata, RootDocument } from '@/components/RootDocument'
import { isLocale, prefixedLocales } from '@/i18n/locales'

export { viewport } from '@/components/RootDocument'

// Only the listed locales are built; anything else is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return prefixedLocales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return isLocale(locale) ? buildMetadata(locale) : {}
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale) || locale === 'en') notFound()
  return <RootDocument locale={locale}>{children}</RootDocument>
}
