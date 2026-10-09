import type { ReactNode } from 'react'
import { buildMetadata, RootDocument } from '@/components/RootDocument'

// English lives at the site root so existing links keep working.
export const metadata = buildMetadata('en')
export { viewport } from '@/components/RootDocument'

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>
}
