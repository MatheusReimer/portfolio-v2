export interface Capability {
  id: string
  name: string
  summary: string
  description: string
  evidence: string[]
  tools: string[]
}

export interface TechGroup {
  id: string
  label: string
  items: string[]
}

/** Deep areas — the things I would claim in an interview and defend. */
export const capabilities: Capability[] = [
  {
    id: 'performance',
    name: 'Performance Engineering',
    summary: 'Measurable speed gains on real production traffic.',
    description:
      'Lighthouse scores, Core Web Vitals, and real-user metrics — treated as architecture problems rather than tooling problems.',
    evidence: [
      'Designed a prefetched SSR architecture from scratch to replace a legacy SPA',
      'Reached Lighthouse 90+ across 13,000+ pages',
      'Eliminated render-blocking resources across the main user flows',
      'Implemented route-level code splitting and lazy hydration',
    ],
    tools: ['Nuxt.js SSR', 'Lighthouse CI', 'Web Vitals API', 'Webpack'],
  },
  {
    id: 'scalability',
    name: 'Scalability Engineering',
    summary: 'Systems that absorb traffic growth without a rewrite.',
    description:
      'Architecting front-end platforms built to handle hundreds of thousands of users and tens of millions of requests per month.',
    evidence: [
      'Built a prefetched architecture serving 400,000+ active users',
      'Handled 35M+ monthly requests with zero downtime',
      'Designed cache-first data fetching for high-traffic routes',
      'Removed backend load from ordinary page requests entirely',
    ],
    tools: ['Nuxt.js', 'Vue.js', 'CDN prefetch', 'Service Workers'],
  },
  {
    id: 'frontend-architecture',
    name: 'Front-End Architecture',
    summary: 'Codebases that scale with the team, not just the traffic.',
    description:
      'Component systems, data-fetching patterns, and module boundaries that keep large applications maintainable as teams grow.',
    evidence: [
      'Led architecture of a Nuxt.js platform from zero to production',
      'Established design-system patterns adopted across the team',
      'Defined API integration contracts between front-end and backend teams',
      'Built a factory-pattern normalisation layer unifying four data sources',
    ],
    tools: ['Vue.js', 'Nuxt.js', 'TypeScript', 'Pinia'],
  },
  {
    id: 'ai-delivery',
    name: 'AI-Assisted Delivery',
    summary: 'AI as production tooling, not as a demo.',
    description:
      'I build AI into the delivery pipeline itself — generation, translation, migration, and review — and I have shipped the output to production for enterprise clients. The interesting part is not the model; it is the validation and fallback around it.',
    evidence: [
      'Engineered an automated CMS translation pipeline on Google Gemini, clearing a backlog across every international locale in days instead of quarters',
      'Led a 40-page CMS redesign and migration that landed nine days early, with AI tooling used throughout the workflow',
      'Use AI daily for scaffolding, refactoring, and review — with the output treated as a draft that still gets read',
      'Design the guardrails around generated content: schema validation, human review gates, and deterministic fallbacks',
    ],
    tools: ['Google Gemini', 'Claude', 'LLM pipelines', 'Prompt design'],
  },
  {
    id: 'system-design',
    name: 'System Design',
    summary: 'Thinking in trade-offs rather than in solutions.',
    description:
      'Evaluating architectural trade-offs — SSR against CSR, caching strategies, prefetch windows — against real constraints like team size, budget, and traffic shape.',
    evidence: [
      'Chose prefetch over SSR after benchmarking both under real load',
      'Proposed and executed a phased migration off a legacy SPA',
      'Balanced developer-experience gains against zero user-facing regressions',
    ],
    tools: ['C#', '.NET', 'Angular', 'Azure', 'REST APIs'],
  },
]

/** The working toolkit, grouped. */
export const stack: TechGroup[] = [
  {
    id: 'primary',
    label: 'Primary',
    items: ['Nuxt.js', 'Vue.js', 'TypeScript', 'JavaScript'],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: ['C#', '.NET', 'Node.js', 'Python', 'Django', 'REST APIs'],
  },
  {
    id: 'also',
    label: 'Also shipped',
    items: ['Angular', 'React', 'Next.js', 'SCSS', 'Tailwind'],
  },
  {
    id: 'platform',
    label: 'Platform',
    items: ['Azure', 'Algolia', 'GA4 / GTM', 'CI/CD', 'Linux'],
  },
  {
    id: 'ai',
    label: 'AI tooling',
    items: ['Google Gemini', 'Claude', 'LLM pipelines', 'Prompt design'],
  },
]
