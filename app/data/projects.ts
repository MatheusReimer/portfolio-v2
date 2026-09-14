export interface Project {
  id: string
  title: string
  subtitle: string
  /** My actual role on the work — replaces the old difficulty rating. */
  contribution: string
  context: string
  approach: string[]
  tech: string[]
  outcome: string
  metrics: string[]
}

export const projects: Project[] = [
  {
    id: 'high-traffic-platform',
    title: 'High-Traffic Platform Overhaul',
    subtitle: '400K users · 35M monthly requests',
    contribution: 'Sole architect, phased migration lead',
    context:
      'A legacy SPA serving hundreds of thousands of users was hitting performance ceilings. Load times degraded under traffic spikes, and the architecture could not scale without a complete rethink.',
    approach: [
      'Stabilised and maintained the existing legacy system throughout the analysis phase',
      'Designed a new prefetched architecture from scratch, replacing the SPA model entirely',
      'Implemented server-side rendering with intelligent prefetch windows on high-traffic routes',
      'Coordinated a zero-downtime migration, phasing out the legacy system progressively',
    ],
    tech: ['Nuxt.js', 'Vue.js', 'Node.js', 'SSR', 'CDN', 'Service Workers'],
    outcome:
      'The new architecture substantially improved load performance and resilience under peak traffic, and removed backend load from ordinary page requests.',
    metrics: [
      '400,000+ active users served',
      '35M+ monthly requests handled',
      'Significant LCP improvement post-migration',
      'Zero-downtime legacy replacement',
    ],
  },
  {
    id: 'prefetch-architecture',
    title: 'Prefetch Architecture Design',
    subtitle: 'Concept to production',
    contribution: 'Research, design, implementation, documentation',
    context:
      'Standard SSR did not solve the specific latency profile of the platform’s most common user flows. A custom prefetch strategy was needed that balanced server load against client speed.',
    approach: [
      'Benchmarked SSR, CSR, and prefetch approaches under realistic traffic',
      'Designed prefetch windows tied to user navigation-intent signals',
      'Built the architecture from zero and documented the decisions for the team',
      'Iterated on real-user performance data after launch',
    ],
    tech: ['Nuxt.js', 'Vue.js', 'Performance API', 'Web Vitals', 'Webpack'],
    outcome:
      'A bespoke prefetch system tuned to the platform’s traffic patterns, outperforming both pure SSR and SPA approaches on the critical user flows.',
    metrics: [
      'Outperforms the SSR baseline on key flows',
      'Faster perceived load on critical journeys',
      'Architecture documented and replicated by the team',
    ],
  },
  {
    id: 'enterprise-integration',
    title: 'Enterprise API Integration Suite',
    subtitle: 'Full-stack · C# · Angular',
    contribution: 'Full-stack delivery across multiple client projects',
    context:
      'Multiple enterprise clients needed complex integrations between front-end systems and backend services, under strict reliability and performance requirements.',
    approach: [
      'Built and maintained full-stack features across C# APIs and Angular front ends',
      'Defined integration contracts between services to reduce coupling',
      'Implemented error handling and retry strategies for external API dependencies',
      'Delivered across several large enterprise projects in parallel',
    ],
    tech: ['C#', '.NET', 'Angular', 'TypeScript', 'REST APIs', 'Azure'],
    outcome:
      'Reliable, maintainable integrations delivered across multiple enterprise clients, establishing patterns that were reused across the team.',
    metrics: [
      'Multiple enterprise clients served',
      'Cross-team API contracts established',
      'Patterns adopted team-wide',
    ],
  },
]
