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
}

export interface Language {
  name: string
  level: string
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
    { label: 'Unique users / mo', value: '400K+', note: 'on the platform I architected' },
    { label: 'Requests / mo', value: '35M+', note: 'served without downtime' },
    { label: 'Pages at 90+', value: '13K+', note: 'Lighthouse, post-migration' },
    { label: 'Years shipping', value: '5+', note: 'since 2021, professionally' },
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
    { name: 'Portuguese', level: 'Native' },
    { name: 'English', level: 'Professional' },
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
