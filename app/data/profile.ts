export interface SocialLink {
  id: string
  label: string
  href: string
  handle: string
}

export interface Stat {
  label: string
  value: string
  note: string
  /** Short caption for the inventory slot, where space is tight. */
  short: string
  /** The context shown when the slot is selected. Every claim traceable to the
      experience timeline — this is the line someone quotes back in an interview. */
  detail: string
  /** Public link that backs the claim up, where one exists. */
  href?: string
  hrefLabel?: string
}

export interface Language {
  name: string
  level: string
  /** Filled segments out of 5, for the pixel meter. */
  score: number
}

export const profile = {
  name: 'Matheus Reimer',
  role: 'Software Engineer',
  location: 'Blumenau, Santa Catarina, Brazil',
  availability: 'Open to new opportunities',

  // One-line value proposition used in the hero.
  tagline: 'I build front-end platforms that stay fast under real traffic.',

  summary:
    'Software engineer with five years building and maintaining scalable web applications for enterprise clients. I specialise in front-end architecture and performance with Nuxt.js and Vue.js, backed by a full-stack background in C#/.NET and Angular. I use AI heavily in my day-to-day workflow — not as a novelty, but as production tooling I have shipped real systems with.',

  metaDescription:
    'Software engineer specialising in front-end architecture, performance, and AI-assisted delivery with Nuxt.js and Vue.js — 400,000+ users, 35M+ requests monthly.',

  stats: [
    {
      label: 'Unique users / mo',
      short: 'Users',
      value: '400K+',
      note: 'on the platform I architected',
      detail:
        'A global marketing platform. I designed and built the prefetched Nuxt.js architecture that replaced its legacy SPA, and every one of those users is served by it. Pages come from the edge rather than from an application server, which is what made the number a capacity problem instead of a cost problem.',
      href: 'https://www.chatsworth.com',
      hrefLabel: 'chatsworth.com',
    },
    {
      label: 'Requests / mo',
      short: 'Requests',
      value: '35M+',
      note: 'served without downtime',
      detail:
        'Handled through a zero-downtime migration off the old system, with the legacy platform kept alive beside it until the last route moved. The new architecture removed backend load from ordinary page requests entirely, which is what made the volume survivable — and incidentally neutralised the DDoS exposure the old setup carried.',
      href: 'https://www.chatsworth.com',
      hrefLabel: 'chatsworth.com',
    },
    {
      label: 'Pages at 90+',
      short: 'Lighthouse',
      value: '13K+',
      note: 'scoring 90+ post-migration',
      detail:
        'Lighthouse 90+ across more than thirteen thousand pages after the rebuild — the whole site, not a hand-picked sample. Reached by treating performance as an architecture problem rather than a tooling one: prefetch windows tied to navigation intent, route-level code splitting, and lazy hydration, chosen after benchmarking SSR against CSR under real traffic.',
      href: 'https://www.chatsworth.com',
      hrefLabel: 'chatsworth.com',
    },
    {
      label: 'Years shipping',
      short: 'Years',
      value: '5+',
      note: 'since 2021, professionally',
      detail:
        'Shipping since 2021: chatbot APIs in C# and .NET at Take Blip handling 3,000 interactions a minute, freelance full-stack work across five sites, then platform engineering at Thinklogic. Before any of it, two years of IT support — servers, networks, and the habit of staying calm while something is broken.',
    },
    {
      label: 'Pages migrated',
      short: 'Migration',
      value: '40',
      note: 'in 21 days, nine days early',
      detail:
        'A CMS redesign and migration against a hard, non-negotiable deadline. I led a two-person team and built AI tooling into the workflow rather than around it, and we finished nine days ahead. The schedule held because the repetitive work was automated and the review was not.',
      href: 'https://www.jndla.com/',
      hrefLabel: 'jndla.com',
    },
    {
      label: 'Locales cleared',
      short: 'Locales',
      value: 'ALL',
      note: 'in days, not quarters',
      detail:
        'An automated CMS translation pipeline built on Google Gemini. It cleared a translation backlog across every international locale in days — work that had been measured in quarters. The engineering was not the model call; it was the schema validation, the review gate, and the deterministic fallback behind it.',
      href: 'https://www.exemplars.health/',
      hrefLabel: 'exemplars.health',
    },
  ] satisfies Stat[],

  // Short, factual career narrative. First person, no embellishment.
  about: [
    'I started as an IT support intern — servers, networks, printers, anything that broke. Two years of learning how systems fail before I ever learned how to build them. I picked up development work on the side, which gave me enough confidence to apply for a junior role.',
    'I spent two years at a chatbot company writing C# and JavaScript APIs, automating workflows and integrating systems for large pharma and retail clients. During that time I earned a scholarship to study and work abroad at the Deggendorf Institute of Technology in Germany, which changed how I think about software and opened the door to international work.',
    'When I hit the ceiling of what I could learn there, I joined a US-based company where I work today — more variety, more ownership, and considerably more interesting problems.',
  ],

  // How I work — kept short and concrete.
  principles: [
    {
      title: 'Measure, then optimise',
      body: 'Performance work without real-user data is guesswork. I benchmark before choosing an architecture, and verify against production traffic after shipping.',
    },
    {
      title: 'Architecture over cleverness',
      body: 'I favour boring, maintainable patterns that a team can still reason about in two years over clever code that only works while I remember why.',
    },
    {
      title: 'Own the whole path',
      body: 'Requirements through deployment. Knowing the backend and the infrastructure makes me a better front-end engineer, not a distracted one.',
    },
  ],

  languages: [
    { name: 'Portuguese', level: 'Native', score: 5 },
    { name: 'English', level: 'Native', score: 5 },
    { name: 'German', level: 'Intermediate', score: 3 },
    { name: 'Italian', level: 'Basic', score: 2 },
  ] satisfies Language[],

  email: 'matheusreimer1@gmail.com',

  socials: [
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/MatheusReimer',
      handle: 'MatheusReimer',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/matheus-reimer-636b10187/',
      handle: 'matheus-reimer',
    },
  ] satisfies SocialLink[],
}
