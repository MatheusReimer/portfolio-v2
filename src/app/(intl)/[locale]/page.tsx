import { notFound } from 'next/navigation'
import { HomePage } from '@/components/HomePage'
import { isLocale } from '@/i18n/locales'

export { generateStaticParams } from './layout'

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale) || locale === 'en') notFound()
  return <HomePage locale={locale} />
}
