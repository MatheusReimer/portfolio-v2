/** Personal projects. Only public repositories or sites get a link; the rest show as private. */
export interface SideProject {
  id: string
  name: string
  summary: string
  stack: string[]
  highlights: string[]
  repo?: string
  site?: string
  /** Link text for `site` when its host is not worth showing, e.g. a raw cloud URL. */
  siteLabel?: string
}

export const projects: SideProject[] = [
  {
    id: 'expense-tracker',
    name: 'Expense Tracker',
    summary: 'A personal expense tracker with AI-assisted data entry.',
    stack: ['React 19', 'TypeScript', 'React Query', 'Hono', 'MongoDB', 'AWS Lambda', 'AWS CDK'],
    highlights: [
      'Upload a receipt or invoice and the form fills itself in; type a description and the category is suggested.',
      'Monorepo with a typed API, infrastructure as code, and tests on the CDK templates.',
    ],
    repo: 'https://github.com/MatheusReimer/extropy-ledger',
    // Served from API Gateway until the account can create a CloudFront distribution.
    site: 'https://k7dptwm6x7.execute-api.us-east-1.amazonaws.com',
    siteLabel: 'live app',
  },
  {
    id: 'mtg-oracle',
    name: 'MTG Oracle',
    summary: 'A voice assistant that answers Magic: The Gathering rules questions.',
    stack: ['React Native', 'Expo', 'TypeScript', 'Python', 'Ollama', 'ChromaDB'],
    highlights: [
      'Retrieval-augmented answers grounded in the official comprehensive rules, running on a local model.',
      'Mobile client in React Native with speech input.',
    ],
    // Repository is private; add `repo` once it is public.
  },
  {
    id: 'rena',
    name: 'RENA',
    summary: 'A social network for rating and discussing films, TV, books and games.',
    stack: ['Nuxt 4', 'TypeScript', 'PostgreSQL', 'Drizzle', 'Better Auth', 'Playwright'],
    highlights: [
      'One identity across every kind of media, with friends, lists, reviews and discussions.',
      'Pulls catalog data from several public media APIs with fallbacks between them.',
    ],
    repo: 'https://github.com/MatheusReimer/RENA',
    site: 'https://rena.reviews',
  },
  {
    id: 'trama-fina',
    name: 'Trama Fina',
    summary: 'Storefront site for a handmade handbag business.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    highlights: ['Lightweight static site with custom animations, built for a small local business.'],
    site: 'https://tramafina.store',
  },
]
