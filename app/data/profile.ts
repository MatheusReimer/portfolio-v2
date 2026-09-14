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
  availability: 'Open to senior front-end and full-stack roles',

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
        'A global marketing platform. I designed and built the prefetched Nuxt.js architecture that replaced its legacy SPA, and every one of those users is served by it.',
    },
    {
      label: 'Requests / mo',
      short: 'Requests',
      value: '35M+',
      note: 'served without downtime',
      detail:
        'Handled through a zero-downtime migration off the old system. The new architecture removed backend load from ordinary page requests entirely, which is what made the volume survivable.',
    },
    {
      label: 'Pages at 90+',
      short: 'Lighthouse',
      value: '13K+',
      note: 'scoring 90+ post-migration',
      detail:
        'Lighthouse 90+ across more than thirteen thousand pages after the rebuild — not a hand-picked sample. Performance treated as an architecture problem rather than a tooling one.',
    },
    {
      label: 'Years shipping',
      short: 'Years',
      value: '5+',
      note: 'since 2021, professionally',
      detail:
        'Shipping since 2021: chatbot APIs in C# and .NET at Take Blip, freelance full-stack work, then platform engineering at Thinklogic. Before that, two years of IT support learning how systems fail.',
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
    { name: 'English', level: 'Professional', score: 4 },
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
