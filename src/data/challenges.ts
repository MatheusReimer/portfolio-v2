export type ChallengeSubtype = "traffic" | "performance" | "legacy" | "architecture" | "integration";

export interface Challenge {
  id: string;
  title: string;
  subtitle: string;
  subtype: ChallengeSubtype;
  power: number;
  brief: string;
  context: string;
  impact: string;
  rootCause: string;
  constraints: string;
  tags: string[];
}

export const challenges: Challenge[] = [
  {
    id: "seo-translation",
    title: "Lost in Translation",
    subtitle: "CMS Fields Go Multilingual",
    subtype: "architecture",
    power: 1800,
    brief: "CMS content locked in one language. SEO coverage tanking across every other market.",
    context:
      "The marketing website served international markets but all CMS content was maintained in a single language. Translating thousands of product and marketing fields manually was impossible at scale. Search crawlers were indexing untranslated content in every locale — entire language markets effectively invisible.",
    impact:
      "International SEO investment returning near-zero ROI. Translation backlog growing faster than any team could clear. Every day without a solution was a day of compounding search invisibility.",
    rootCause:
      "The platform was built for a single market. Internationalization was bolted on later — CMS fields were never modelled with locale variants in mind. Every locale had a content entry that was just a copy of the English source, left blank. Nobody owned the translation workflow, so nothing got translated.",
    constraints:
      "Translation vendors quoted months and five-figure budgets. Internal teams were already at capacity. The CMS API had rate limits that made bulk updates slow and fragile. Any translation error written back to a live page was a direct SEO liability — wrong content indexed under the wrong locale could actively damage rankings.",
    tags: ["SEO", "CMS", "i18n", "Scale"],
  },
  {
    id: "marketing-scale",
    title: "The Uncacheable Giant",
    subtitle: "13,000 Pages · Bots · DDoS",
    subtype: "performance",
    power: 2800,
    brief: "13,000+ pages. Can't cache everything. Bots crawling, DDoS hitting, performance dying.",
    context:
      "A global marketing platform pulling double duty as both a public-facing and internal tool. 400k+ unique monthly users, 35M+ monthly requests. The sheer page count made full CDN caching impossible. Bot traffic and intermittent DDoS attacks compounded the load. Performance was degrading visibly and leadership was watching.",
    impact:
      "Every slow page is a lost conversion. At 13,000 pages serving 400k users the compounding effect of poor performance was costing real business revenue. A structural solution was the only path forward.",
    rootCause:
      "The platform grew organically over years. What started as a 200-page site became 13,000 pages through CMS-driven expansion — no single moment where someone decided to rearchitect. The server-side rendering approach that worked at 200 pages became a liability at scale. Caching was attempted but the sheer page count and dynamic content made full CDN coverage impractical with the existing setup.",
    constraints:
      "A full rewrite was off the table — the site was live, in active use, and generating revenue. Any solution had to be deployable without disrupting existing content workflows, had to coexist with the live system during rollout, and had to be achievable without hiring a dedicated infrastructure team. The client also needed to keep their CMS — swapping data sources wasn't on the table.",
    tags: ["400k Users", "35M Requests", "DDoS", "13k Pages"],
  },
  {
    id: "search-limitations",
    title: "Search That Doesn't Search",
    subtitle: "Azure Search Hits Its Ceiling",
    subtype: "performance",
    power: 2000,
    brief: "Azure Search functioning — but not performing. Marketing flying blind on what users want.",
    context:
      "The search implementation worked technically but lacked the performance and observability marketing needed. No built-in relevance tuning, no user behavior insights, no way for the client to self-manage rankings. On a marketing website where content discoverability drives revenue, a search tool the client can't own is a liability.",
    impact:
      "Users not finding what they're looking for. Marketing team unable to act on search behavior. Client locked into developer dependency for every ranking change.",
    rootCause:
      "Azure Search was the default choice when the site was first built — low friction, already on the Azure stack, got the job done. Nobody had requirements for analytics or self-service ranking at the time. By the time the site matured into a serious marketing platform, the tool that made sense at launch was actively limiting what the business could do with it.",
    constraints:
      "Migrating search meant re-indexing thousands of pages, updating all frontend search components, and keeping search functional throughout the transition — a broken search bar on a marketing site is not an option. The replacement also had to be self-service for marketing: any tool that required a developer to make ranking changes would recreate the same dependency problem.",
    tags: ["Search", "Azure", "Analytics", "UX"],
  },
  {
    id: "deadline-migration",
    title: "21 Days or Bust",
    subtitle: "40 Pages · 2 Devs · No Budget",
    subtype: "legacy",
    power: 2400,
    brief: "40 CMS pages to redesign and migrate. Hard 30-day deadline. Almost no budget.",
    context:
      "A client leader was retiring and tied their legacy system to the handover — the deadline was non-negotiable. 40 pages across two CMS systems needed a full redesign and rebuild. Budget constrained the team to 2–3 people where a project like this typically calls for significantly more. I was the lead developer.",
    impact:
      "Missing the deadline would have broken the client relationship and the handover process entirely. There was no contingency.",
    rootCause:
      "A long-tenured client leader tied their legacy CMS instance to their own departure as part of a planned handover. The old CMS contract was set to expire on the same date. The content was outdated and the design hadn't been touched in years. Three separate problems — personnel, contract, and technical debt — all converged on a single non-negotiable date.",
    constraints:
      "Two developers. No design agency. Content spread across two CMS systems with completely different schemas. Several pages had custom integrations that couldn't be templated or automated. Budget ruled out bringing in extra help. And the deadline was tied to a human milestone — a retiring executive — which meant it carried reputational weight beyond the technical deliverable.",
    tags: ["Migration", "CMS", "Lead Dev", "Deadline"],
  },
  {
    id: "data-chaos",
    title: "Four-Source Data Chaos",
    subtitle: "2 CMS · 2 DBs · 1 UI",
    subtype: "integration",
    power: 2200,
    brief: "4 completely different data sources. Completely different schemas. Must look like one on screen.",
    context:
      "A client running 2 separate CMS platforms and 2 distinct databases — each with their own field names, structures, and relationships. The product requirement: all data must render seamlessly as if it came from a single unified source. Building this naively meant spaghetti conditionals in every component.",
    impact:
      "A poorly abstracted data layer would bake fragility into every future feature. A structural fix was needed or every new requirement would multiply the technical debt.",
    rootCause:
      "The client acquired two companies over 18 months. Each acquisition came with its own CMS and its own database. Nobody consolidated — the systems ran in parallel because consolidation was expensive, risky, and never the most urgent thing on the roadmap. The product requirement to unify the UI arrived before the data architecture had any chance to catch up.",
    constraints:
      "Migrating the underlying data sources wasn't an option — each system had active teams writing to it daily. We couldn't designate one CMS as the source of truth without a multi-quarter data migration project. The solution had to live entirely in the frontend data layer, had to be type-safe, and had to be maintainable by developers who didn't have deep knowledge of each source's internals.",
    tags: ["Integration", "Architecture", "Data", "CMS"],
  },
];
