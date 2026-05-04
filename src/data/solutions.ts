export type SolutionType = "attack" | "defense" | "spell" | "trap";

export interface Solution {
  id: string;
  title: string;
  subtitle: string;
  type: SolutionType;
  power: number;
  brief: string;
  explanation: string;
  architecture: string;
  tradeoffs: string;
  tech: string[];
  metrics?: string;
}

export interface Combo {
  challengeIds: string[];
  solutionIds: string[];
  label: string;
  insight: string;
}

export const solutions: Solution[] = [
  {
    id: "gemini-translation",
    title: "AI Translation Pipeline",
    subtitle: "Gemini × CMS Auto-Translate",
    type: "spell",
    power: 2200,
    brief: "A pipeline that hooks Google Gemini into the CMS — new content goes in, translated content comes out, no human loop needed.",
    explanation:
      "Designed and built an integration that pipes CMS fields through Google Gemini for automatic translation. The pipeline detects new or updated content, sends structured field data to Gemini with locale context, receives translated output, validates it, and writes it back into the correct CMS locale fields. No human loop required for standard content.",
    architecture:
      "Event-driven: CMS webhook fires on content publish → translation orchestrator queues affected fields by priority → Gemini API called per target language with domain context injected → output normalized and validated → CMS write-back via API. Exponential backoff on failure. Translation memory skips fields unchanged since last run.",
    tradeoffs:
      "LLM outputs can drift on technical or branded terms. Solved with a glossary injection system — critical domain vocabulary is always passed as context alongside the content. Human review is reserved for high-stakes marketing copy; the pipeline handles the volume automatically.",
    tech: ["Google Gemini", "Node.js", "CMS API", "TypeScript"],
    metrics: "Thousands of CMS fields translated automatically. Translation backlog cleared in days, not quarters.",
  },
  {
    id: "json-prefetch-platform",
    title: "The Daily Rebuild",
    subtitle: "JSON Prefetch · 90+ Lighthouse",
    type: "attack",
    power: 3200,
    brief: "Rebuilt the entire platform as a JSON-prefetched static system. Google Lighthouse 90+ on every page.",
    explanation:
      "Remodelled the entire site delivery from dynamic to a prefetched architecture backed by flat JSON files. Every page's data is pre-built once per day from CMS updates, then served as static assets from edge. Pages load without hitting any backend. Bot and DDoS traffic absorb into static content — nothing to overwhelm.",
    architecture:
      "Nightly build job pulls all CMS changes from the previous day, generates structured JSON data files per page and locale, triggers a full static rebuild pipeline. Pages served from CDN edge with aggressive cache headers. DDoS traffic hits the edge and stops — no backend ever touched. Emergency override triggers an out-of-cycle rebuild for breaking content.",
    tradeoffs:
      "Content is at most 24 hours stale — accepted by client as a fair tradeoff for the performance gain. Time-sensitive content goes through a separate lightweight real-time channel. The vast majority of marketing content has no same-day freshness requirement.",
    tech: ["Nuxt.js", "Vue.js", "CDN", "Node.js", "CMS API"],
    metrics: "Lighthouse 90+ across all 13,000+ pages. DDoS neutralized. Client called it 'a smile on the face'.",
  },
  {
    id: "algolia-search",
    title: "Algolia Search",
    subtitle: "Analytics + GTM + AI Scoring",
    type: "attack",
    power: 2400,
    brief: "Replaced Azure Search with Algolia — sub-millisecond results, built-in analytics, client-managed rankings.",
    explanation:
      "Replaced Azure Search with Algolia, integrated search analytics through GTM into GA4, and enabled the client's marketing team to manage search rankings and boosts directly from the Algolia dashboard. The switch gave the client something they didn't have before: full visibility into what users search for and direct control over how their content surfaces.",
    architecture:
      "Algolia indices synced from CMS on content updates. GTM integration captures search events — queries, result clicks, conversions — and pipes them into GA4. AI-powered ranking rules trained on behavioral signals. Client dashboard access scoped to safe ranking operations. Re-index triggered automatically on CMS content publish.",
    tradeoffs:
      "Algolia costs more than Azure Search at scale. The business case was straightforward: the cost of a slow, unanalysed search was higher than the platform fee. Search is a primary conversion driver on a marketing site — it deserved a proper tool.",
    tech: ["Algolia", "Vue.js", "GTM", "GA4", "Node.js", "TypeScript"],
    metrics: "Sub-millisecond search results. Client now manages rankings independently. Full search-to-conversion funnel tracked.",
  },
  {
    id: "ai-sprint-delivery",
    title: "21-Day Delivery",
    subtitle: "Lead Dev · AI Workflow · 9 Days Early",
    type: "spell",
    power: 2800,
    brief: "Led a 2-person team. Baked AI into every step of the workflow. Shipped 40 pages in 21 days.",
    explanation:
      "As lead developer, I redesigned our workflow from scratch to incorporate AI at every repeatable step — content mapping, boilerplate generation, CMS schema translation, QA checklists. The parts that required judgment stayed human. The parts that didn't got automated. Extra hours on top of that. We delivered 40 fully redesigned and migrated pages in 21 days — 9 days ahead of the hard deadline.",
    architecture:
      "Divided pages into batches by complexity. AI-assisted scripts handled CMS-to-CMS field mapping and content migration. Component library built first, then pages assembled from it. QA ran in parallel with development, not sequentially after. Daily standups replaced weekly planning — visibility was everything with a team this small.",
    tradeoffs:
      "Small team meant no specialists — everyone owned everything across design, CMS config, frontend, and QA. AI handled the repetitive. Human judgment was reserved for decisions that actually required it. The overhead of coordination is lower when the team is two people.",
    tech: ["AI Tooling", "CMS", "Vue.js", "TypeScript", "Nuxt.js"],
    metrics: "40 pages. 21 days. 9 days under deadline. Client relationship preserved.",
  },
  {
    id: "data-normalization",
    title: "The Normalizer",
    subtitle: "Factory Pattern · Unified Schema",
    type: "trap",
    power: 2600,
    brief: "A factory-based normalization layer converts 4 different source schemas into one before any component sees data.",
    explanation:
      "Built a normalization layer between the data sources and the UI. Regardless of which of the four sources the data came from — CMS A, CMS B, DB 1, or DB 2 — it passes through a factory that maps it to a single typed internal schema. Components only ever interact with normalized data and have no knowledge of source origin. Adding a fifth source means writing one new factory, not touching any existing components.",
    architecture:
      "Each data source has a dedicated normalizer factory — a typed function that takes raw source data and returns a standardized model. A resolver layer identifies source origin by context and routes to the correct factory. The output interface is identical regardless of path. TypeScript enforces the contract at compile time — schema mismatches surface as build errors, not runtime bugs.",
    tradeoffs:
      "Normalization adds a transform step on every data load. Acceptable overhead for this case — the alternative was conditional branching in every component, which compounds with every new feature. The factory pattern means structural changes to one source are fully isolated from the rest of the system.",
    tech: ["TypeScript", "Vue.js", "Nuxt.js", "REST APIs"],
    metrics: "4 data sources rendered as one unified UI. New source integrations now take hours instead of days.",
  },
];

export const combos: Combo[] = [
  {
    challengeIds: ["marketing-scale", "seo-translation"],
    solutionIds: ["json-prefetch-platform", "gemini-translation"],
    label: "Full-Stack Content Machine",
    insight:
      "Performance and multilingual SEO are the same problem at scale — a slow, untranslated page is invisible twice over. Solving both together with a prefetched static build and an automated translation pipeline meant the site became fast, crawlable, and globally indexed with a single architectural shift.",
  },
  {
    challengeIds: ["search-limitations", "data-chaos"],
    solutionIds: ["algolia-search", "data-normalization"],
    label: "Discoverability & Data",
    insight:
      "Search only works when the data behind it is clean. Algolia's relevance is meaningless if the index is fed inconsistent schemas from four different sources. Normalizing the data layer first made the search integration straightforward — the combo solved content findability at every layer.",
  },
];

export const defaultSolutions: Record<string, string[]> = {
  "seo-translation": ["gemini-translation"],
  "marketing-scale": ["json-prefetch-platform"],
  "search-limitations": ["algolia-search"],
  "deadline-migration": ["ai-sprint-delivery"],
  "data-chaos": ["data-normalization"],
};
