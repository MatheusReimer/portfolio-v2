export interface Skill {
  id: string;
  name: string;
  type: "active" | "passive";
  icon: string;
  shortDesc: string;
  details: {
    description: string;
    examples: string[];
    tools: string[];
    metrics?: string;
  };
}

export const activeSkills: Skill[] = [
  {
    id: "scalability",
    name: "Scalability Engineering",
    type: "active",
    icon: "⚡",
    shortDesc: "Design systems that grow with traffic without rewrites.",
    details: {
      description:
        "Architecting and maintaining front-end platforms designed to handle hundreds of thousands of users and tens of millions of requests per month.",
      examples: [
        "Built a prefetched architecture serving 400k+ active users",
        "Reduced critical-path load times significantly vs. legacy system",
        "Designed cache-first data fetching strategies for high-traffic routes",
      ],
      tools: ["Nuxt.js", "Vue.js", "CDN prefetch", "Service Workers"],
      metrics: "35M+ monthly requests handled with zero downtime",
    },
  },
  {
    id: "performance",
    name: "Performance Optimization",
    type: "active",
    icon: "🚀",
    shortDesc: "Measurable speed gains on real production traffic.",
    details: {
      description:
        "Deep focus on Lighthouse scores, Core Web Vitals, and real-user metrics. Optimization goes beyond tooling — it's about architecture decisions.",
      examples: [
        "Designed prefetched SSR architecture from scratch to replace legacy SPA",
        "Eliminated render-blocking resources across main user flows",
        "Implemented route-level code splitting and lazy hydration",
      ],
      tools: ["Nuxt.js SSR", "Webpack", "Lighthouse CI", "Web Vitals API"],
      metrics: "Significant LCP and TTI improvement post-migration",
    },
  },
  {
    id: "frontend-arch",
    name: "Frontend Architecture",
    type: "active",
    icon: "🏗️",
    shortDesc: "Structure codebases that scale with teams, not just traffic.",
    details: {
      description:
        "Designing component systems, data-fetching patterns, and module boundaries that make large apps maintainable as teams grow.",
      examples: [
        "Led architecture design of a Nuxt.js platform from zero to production",
        "Established component design system patterns adopted team-wide",
        "Defined API integration contracts between front-end and back-end teams",
      ],
      tools: ["Vue.js", "Nuxt.js", "TypeScript", "Pinia", "Storybook"],
    },
  },
  {
    id: "system-design",
    name: "System Design",
    type: "active",
    icon: "🧩",
    shortDesc: "Think in tradeoffs, not just solutions.",
    details: {
      description:
        "Evaluating architectural tradeoffs — SSR vs CSR, caching strategies, prefetch windows — with real constraints like team size, budget, and traffic patterns.",
      examples: [
        "Chose prefetch-over-SSR strategy after benchmarking both under real load",
        "Proposed and implemented phased migration from legacy SPA to modern stack",
        "Balanced developer experience improvements with zero user-facing regressions",
      ],
      tools: ["C#", "Angular", "Vue.js", "REST APIs", "Azure"],
    },
  },
];

export const passiveSkills = [
  {
    id: "vuejs",
    name: "Vue.js",
    icon: "🟢",
    buff: "UI Performance",
    description:
      "Reactive component architecture enabling smooth, high-performance user interfaces at scale.",
    usage: "Primary framework for all front-end work since 2021.",
  },
  {
    id: "nuxtjs",
    name: "Nuxt.js",
    icon: "⬛",
    buff: "SSR & Optimization",
    description:
      "Server-side rendering, static generation, and route-level optimizations baked into the framework.",
    usage: "Platform powering 400k+ users — SSR + prefetch architecture.",
  },
  {
    id: "csharp",
    name: "C#",
    icon: "🔵",
    buff: "Backend Systems",
    description:
      "Solid foundation in backend development, API design, and enterprise-grade application patterns.",
    usage: "Full-stack work on enterprise API integrations and .NET services.",
  },
  {
    id: "angular",
    name: "Angular",
    icon: "🔴",
    buff: "Legacy Architecture",
    description:
      "Experience navigating and modernizing large-scale Angular codebases without breaking existing flows.",
    usage: "Front-end development on large enterprise projects.",
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "🔷",
    buff: "Type Safety",
    description:
      "Strong typing across the stack reduces runtime errors and improves codebase confidence.",
    usage: "Default language for all modern projects.",
  },
  {
    id: "rest-apis",
    name: "REST APIs",
    icon: "🔗",
    buff: "Integration",
    description:
      "Designing and consuming APIs with a focus on contract clarity and error resilience.",
    usage: "Cross-team API integrations on enterprise platforms.",
  },
];
