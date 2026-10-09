/**
 * Client platforms I worked on at Thinklogic.
 *
 * Every claim here is backed by my own commits in the client repository.
 * Describe features, never internals: no repository URLs, environment IDs,
 * hostnames other than the public site, or client data.
 */
export interface ClientProject {
  id: string
  client: string
  /** What the product is, in one line. */
  product: string
  /** Public site. Omitted for internal systems. */
  url?: string
  role: string
  /** YYYY-MM of when I started on it; also the ordering key. */
  start: string
  /** YYYY-MM of the last month. Omitted while ongoing. */
  end?: string
  stack: string[]
  highlights: string[]
  /** Shown as the expanded case study at the top of the section. */
  featured?: boolean
}

export const work: ClientProject[] = [
  {
    id: 'chatsworth',
    client: 'Chatsworth Products',
    product: 'Marketing site and product catalog for a data-center hardware manufacturer',
    url: 'https://www.chatsworth.com',
    role: 'Lead developer',
    start: '2024-09',
    stack: ['Nuxt', 'Vue', 'TypeScript', 'Kontent.ai', 'Algolia', 'Cloudflare', 'Azure', 'C#'],
    featured: true,
    highlights: [
      'Designed and built the prefetched Nuxt architecture that replaced a legacy SPA, statically generating 13,000+ routes at Lighthouse 90+ and taking backend load off ordinary page requests.',
      'Migrated with zero downtime while serving 400,000+ monthly users and 35M+ monthly requests, keeping the legacy platform alive until the last route moved.',
      'Re-platformed hosting from Azure to Cloudflare Pages, Workers, KV and R2, with batched prerendering and a Cosmos DB to KV data migration.',
      'Replaced Azure Search with Algolia federated autocomplete, wired to GTM and GA4, and handed ranking control to the marketing team.',
      'Built a machine-translation pipeline for Spanish and Simplified Chinese that A/B tests DeepL against Google, caches translations so unchanged copy is never paid for twice, and enforces per-build spend limits.',
    ],
  },
  {
    id: 'jnd',
    client: 'JND Legal Administration',
    product: 'Marketing site and per-case information sites for a legal administration firm',
    url: 'https://www.jndla.com',
    role: 'Primary developer, built from the first commit',
    start: '2026-01',
    stack: ['Nuxt 4', 'Kontent.ai', 'Azure Static Web Apps', 'Azure Functions', 'Bicep'],
    highlights: [
      'Built jndla.com from scratch: content model, page templates, preview and Smart Link editing, redirects, and Bicep infrastructure with UAT and production pipelines.',
      'Publish-triggered rebuilds through an Azure Functions webhook, debounced behind a quiet window so a burst of edits causes one build.',
      'Led a two-person team through a 40-page redesign and migration in 21 days, nine days ahead of a fixed deadline.',
      'Hardened the case information sites with security headers and a nonce-based Content Security Policy.',
    ],
  },
  {
    id: 'exemplars',
    client: 'Exemplars in Global Health',
    product: 'Public-health research platform for a Gates Ventures program',
    url: 'https://www.exemplars.health',
    role: 'Top contributor',
    start: '2024-04',
    end: '2026-05',
    stack: ['Nuxt', 'Kontent.ai', 'Azure AI Search', 'D3', 'Cloudflare'],
    highlights: [
      'Main developer on the move to Nuxt and Kontent.ai: narratives, case studies, key learnings and data-evidence blocks.',
      'Built the faceted search page and cut search-index rebuild time.',
      'Webhook-driven cache invalidation, so editors see published changes without a full deploy.',
    ],
  },
  {
    id: 'manatt',
    client: 'Manatt, Phelps & Phillips',
    product: 'Website for a national law and consulting firm',
    url: 'https://www.manatt.com',
    role: 'Top contributor',
    start: '2024-07',
    end: '2026-05',
    stack: ['Nuxt', 'Kontent.ai', 'Azure AI Search', 'Azure CDN', 'OpenTelemetry'],
    highlights: [
      'Built site-wide fuzzy search on Azure AI Search, with index rebuilds and filters.',
      'Webhook-driven CDN purging and request caching.',
      'Built a factory-pattern normalisation layer that unified two CMS platforms and two databases into one typed schema for the front end.',
    ],
  },
  {
    id: 'addi',
    client: 'AD Data Initiative',
    product: "Research-data platform for Alzheimer's disease",
    url: 'https://www.alzheimersdata.org',
    role: 'Developer',
    start: '2025-03',
    stack: ['Nuxt 4', 'Kontent.ai', 'Azure Static Web Apps'],
    highlights: [
      'Built the initial pages of the V2 site: team and publication lists, case studies, navigation.',
      'Led a two-phase technical SEO overhaul: JSON-LD and FAQ structured data, meta descriptions, responsive images.',
    ],
  },
  {
    id: 'ticket-clinic',
    client: 'The Ticket Clinic',
    product: 'Headlight, an internal case-management system for a traffic-law firm',
    role: 'Full-stack developer',
    start: '2023-04',
    end: '2024-06',
    stack: ['C#', '.NET', 'EF Core', 'SQL Server', 'Angular'],
    highlights: [
      'Built the reporting suite end to end: a dashboard and eight operational reports with PDF output, from .NET report services to the Angular UI.',
      'Built core legal-workflow features: the disposition calendar, payment-plan rules and validation, and role-based permissions.',
      'Worked alongside the React Native client and kiosk apps that consume the same platform APIs.',
    ],
  },
  {
    id: 'inside-lb',
    client: 'Inside LB News',
    product: 'Local news site for Long Beach',
    url: 'https://www.insidelbnews.com',
    role: 'Contributor',
    start: '2025-08',
    end: '2025-08',
    stack: ['Nuxt', 'Kontent.ai'],
    highlights: ['Added JSON-LD structured data, canonical URLs and Lighthouse fixes for search visibility.'],
  },
]
