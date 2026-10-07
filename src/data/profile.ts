export interface SocialLink {
  id: string
  label: string
  href: string
  handle: string
}

export interface Stat {
  value: string
  label: string
  /** Where the number comes from, so it can be defended in an interview. */
  source: string
}

export interface Language {
  name: string
  level: string
}

export const profile = {
  name: 'Matheus Reimer',
  handle: 'matheus',
  role: 'Software Engineer',
  location: 'Blumenau, Santa Catarina, Brazil',
  availability: 'Open to new opportunities',

  tagline: 'I build full-stack platforms that stay fast under real traffic.',

  summary:
    'Software engineer with seven years in tech, building and maintaining web platforms for enterprise clients since 2021. I work across the stack: Nuxt, Vue and Angular on the front end at work and React in my own projects, C# and .NET on the back end, Azure and Cloudflare underneath. I use AI as production tooling in my daily workflow, with its output treated as a draft that still gets reviewed.',

  metaDescription:
    'Matheus Reimer, full-stack software engineer. Nuxt, Vue, React, C# and .NET platforms for enterprise clients, serving 400,000+ users and 35M+ requests a month.',

  stats: [
    { value: '400K+', label: 'monthly users', source: 'chatsworth.com, on the architecture I built' },
    { value: '35M+', label: 'monthly requests', source: 'served through a zero-downtime migration' },
    { value: '13K+', label: 'pages at Lighthouse 90+', source: 'the whole catalog, not a sample' },
    { value: '7', label: 'client platforms', source: 'shipped at Thinklogic since 2023' },
  ] satisfies Stat[],

  about: [
    'I started as an IT support intern: servers, networks, printers, anything that broke. Two years of learning how systems fail before I learned how to build them. I picked up development work on the side, which gave me the confidence to apply for a junior role.',
    'I spent two years at a chatbot company writing C# and JavaScript APIs, automating workflows and integrating systems for large pharma and retail clients. During that time I earned a scholarship to study and work at the Deggendorf Institute of Technology in Germany, which changed how I think about software and opened the door to international work.',
    'Since 2023 I have worked at Thinklogic, a US consultancy, where I lead and build web platforms for clients in manufacturing, law, global health and research.',
  ],

  principles: [
    {
      title: 'Measure, then optimise',
      body: 'Performance work without real-user data is guesswork. I benchmark before choosing an architecture and verify against production traffic after shipping.',
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
    { name: 'English', level: 'Native' },
    { name: 'German', level: 'Intermediate' },
    { name: 'Italian', level: 'Basic' },
  ] satisfies Language[],

  email: 'matheusreimer1@gmail.com',

  socials: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/MatheusReimer', handle: 'MatheusReimer' },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/matheus-reimer-636b10187/',
      handle: 'matheus-reimer',
    },
  ] satisfies SocialLink[],

  sourceUrl: 'https://github.com/MatheusReimer/portfolio-v2',
}
