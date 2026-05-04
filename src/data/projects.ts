export interface Project {
  id: string;
  bossName: string;
  subtitle: string;
  difficulty: "Elite" | "Legendary" | "Mythic";
  challenge: string;
  actions: string[];
  tech: string[];
  outcome: string;
  metrics: string[];
}

export const projects: Project[] = [
  {
    id: "high-traffic-platform",
    bossName: "High-Traffic Platform Overhaul",
    subtitle: "400k Users · 35M Monthly Requests",
    difficulty: "Mythic",
    challenge:
      "A legacy SPA serving hundreds of thousands of users was hitting performance ceilings. Load times were degrading under traffic spikes, and the architecture couldn't scale without a complete rethink.",
    actions: [
      "Maintained and stabilized the existing legacy system during analysis phase",
      "Designed a new prefetched architecture from scratch — replacing the SPA model entirely",
      "Implemented server-side rendering with intelligent prefetch windows for high-traffic routes",
      "Coordinated migration with zero downtime, phasing out the legacy system progressively",
    ],
    tech: ["Nuxt.js", "Vue.js", "Node.js", "CDN", "SSR", "Service Workers"],
    outcome:
      "The new architecture significantly improved loading performance and resilience under peak traffic, delivering a measurably better experience for all users.",
    metrics: [
      "400,000+ active users served",
      "35M+ monthly requests handled",
      "Significant LCP improvement post-migration",
      "Zero-downtime legacy replacement",
    ],
  },
  {
    id: "enterprise-integration",
    bossName: "Enterprise API Integration Suite",
    subtitle: "Full-Stack · C# · Angular",
    difficulty: "Legendary",
    challenge:
      "Multiple enterprise clients needed complex API integrations between front-end systems and backend services, with strict reliability and performance requirements.",
    actions: [
      "Built and maintained full-stack features across C# APIs and Angular front-ends",
      "Defined integration contracts between services to reduce coupling",
      "Implemented error handling and retry strategies for external API dependencies",
      "Delivered features across multiple large-scale enterprise projects simultaneously",
    ],
    tech: ["C#", "Angular", ".NET", "REST APIs", "Azure", "TypeScript"],
    outcome:
      "Reliable, maintainable integrations delivered across multiple enterprise clients, establishing patterns reused across the team.",
    metrics: [
      "Multiple enterprise clients served",
      "Cross-team API contracts established",
      "Patterns adopted team-wide",
    ],
  },
  {
    id: "prefetch-architecture",
    bossName: "Prefetch Architecture Design",
    subtitle: "From Concept to Production",
    difficulty: "Elite",
    challenge:
      "Standard SSR wasn't solving the specific latency profile of the platform's most common user flows. A custom prefetch strategy was needed that balanced server load with client speed.",
    actions: [
      "Benchmarked SSR vs CSR vs prefetch approaches under realistic traffic",
      "Designed prefetch windows tied to user navigation intent signals",
      "Built the architecture from zero, documenting decisions for the team",
      "Iterated based on real-user performance data post-launch",
    ],
    tech: ["Nuxt.js", "Vue.js", "Performance API", "Web Vitals", "Webpack"],
    outcome:
      "A bespoke prefetch system tuned to the platform's specific traffic patterns, outperforming both pure SSR and SPA approaches on key user flows.",
    metrics: [
      "Custom prefetch strategy outperforms SSR baseline",
      "Faster perceived load on critical user flows",
      "Architecture documented and replicated by team",
    ],
  },
];
