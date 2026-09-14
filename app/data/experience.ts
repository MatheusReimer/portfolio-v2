export interface Achievement {
  text: string
  /** Public, verifiable link to the shipped work, when one exists. */
  url?: string
  urlLabel?: string
}

export interface Role {
  id: string
  company: string
  role: string
  period: string
  start: string
  end: string
  location: string
  stack: string[]
  highlight: string
  achievements: Achievement[]
}

export const experience: Role[] = [
  {
    id: 'thinklogic',
    company: 'Thinklogic',
    role: 'Software Engineer',
    period: 'Mar 2023 — Present',
    start: '2023-03',
    end: 'present',
    location: 'Remote · USA',
    stack: ['Nuxt.js', 'Vue.js', 'TypeScript', 'C#', 'Angular'],
    highlight:
      'Full-stack engineer on a global marketing platform serving 400,000+ unique monthly users and 35M+ monthly requests.',
    achievements: [
      {
        text: 'Independently designed and built a prefetched Nuxt.js version of the platform from scratch, reaching Lighthouse 90+ across 13,000+ pages — neutralising DDoS exposure and eliminating backend load on page requests.',
        url: 'https://www.chatsworth.com',
        urlLabel: 'chatsworth.com',
      },
      {
        text: 'Engineered an automated CMS translation pipeline using Google Gemini, clearing a translation backlog across all international locales in days rather than quarters.',
        url: 'https://www.exemplars.health/',
        urlLabel: 'exemplars.health',
      },
      {
        text: 'Replaced Azure Search with Algolia, integrated with GTM and GA4 for full search analytics, and handed ranking control to the client’s marketing team.',
        url: 'https://www.chatsworth.com',
        urlLabel: 'chatsworth.com',
      },
      {
        text: 'Led a two-person team to redesign and migrate 40 CMS pages in 21 days — nine days ahead of a hard, non-negotiable deadline — incorporating AI tooling throughout the workflow.',
        url: 'https://www.jndla.com/',
        urlLabel: 'jndla.com',
      },
      {
        text: 'Built a factory-pattern data normalisation layer unifying two CMS platforms and two databases into a single typed schema consumed by the entire front end.',
        url: 'https://manatt.com',
        urlLabel: 'manatt.com',
      },
    ],
  },
  {
    id: 'take-blip',
    company: 'Take Blip',
    role: 'Chatbot Developer',
    period: 'Sep 2021 — Apr 2023 · 1 yr 8 mos',
    start: '2021-09',
    end: '2023-04',
    location: 'Brazil · Full-time',
    stack: ['C#', '.NET', 'JavaScript', 'REST APIs'],
    highlight:
      'Built chatbots and backend APIs for enterprise clients across health, retail, and finance.',
    achievements: [
      {
        text: 'Part of a team building and maintaining chatbots handling over 3,000 interactions per minute for large-scale enterprise clients.',
      },
      {
        text: 'Created C#/.NET and JavaScript APIs connecting client backend services to conversation flows, retrieving and transforming data in real time.',
      },
      {
        text: 'Delivered for health-sector clients where uninterrupted, accurate communication was business-critical.',
      },
      {
        text: 'Implemented automated testing, code quality gates, and security reporting as part of the CI pipeline.',
      },
      {
        text: 'Worked directly with executive teams across IT, Marketing, and Sales to align technical delivery with business goals.',
      },
    ],
  },
  {
    id: 'freelance',
    company: 'Freelance',
    role: 'Full-Stack Developer',
    period: 'Feb 2021 — Sep 2021 · 8 mos',
    start: '2021-02',
    end: '2021-09',
    location: 'Balneário Piçarras, Brazil · Self-employed',
    stack: ['JavaScript', 'Node.js', 'React', 'Python', 'Django'],
    highlight:
      'Designed, built, and deployed five websites end to end in six months, before entering the industry full-time.',
    achievements: [
      {
        text: 'Sole developer on every project — requirements, design, front end, back end, databases, and deployment.',
      },
      {
        text: 'Selected the stack and deployment platform per project based on client goals and budget.',
      },
      {
        text: 'Built a full-stack personal trainer website using Node.js, HTML, and CSS.',
        url: 'https://pavanellopersonal.com.br',
        urlLabel: 'pavanellopersonal.com.br',
      },
      {
        text: 'Built a real estate agency platform using Python (Django), React, and SCSS.',
      },
    ],
  },
  {
    id: 'grupo-gmaes',
    company: 'Grupo Gmaes',
    role: 'Engineering Intern',
    period: 'Nov 2019 — Feb 2021 · 1 yr 4 mos',
    start: '2019-11',
    end: '2021-02',
    location: 'Itajaí, Santa Catarina, Brazil',
    stack: ['Linux', 'Windows Server', 'Networking'],
    highlight:
      'IT support internship — the starting point. Learned how systems fail before learning how to build them.',
    achievements: [
      { text: 'Supported implementation and troubleshooting of Linux and Windows servers.' },
      { text: 'Diagnosed and resolved issues across email systems, machines, networks, and infrastructure.' },
      { text: 'Handled client support and internal technical requests daily.' },
      { text: 'Managed reporting and monitoring for recurring system issues.' },
    ],
  },
]
