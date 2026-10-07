export interface Role {
  id: string
  company: string
  role: string
  period: string
  /** YYYY-MM. Roles are listed newest first; a test enforces it. */
  start: string
  location: string
  summary: string
  points: string[]
}

export const experience: Role[] = [
  {
    id: 'thinklogic',
    company: 'Thinklogic',
    role: 'Software Engineer',
    period: 'Mar 2023 → present',
    start: '2023-03',
    location: 'Remote, USA',
    summary:
      'Full-stack engineer at a US software consultancy, leading and building web platforms for enterprise clients. The client work is listed in detail above.',
    points: [
      'Lead developer on chatsworth.com: 400,000+ monthly users, 35M+ monthly requests, 13,000+ pages at Lighthouse 90+.',
      'Built jndla.com from the first commit and led its 40-page migration to an early finish.',
      'Delivered search, caching and SEO work across seven client platforms on Nuxt, Kontent.ai and Azure.',
      'Full-stack C#, .NET and Angular delivery on an internal case-management system.',
    ],
  },
  {
    id: 'take-blip',
    company: 'Take Blip',
    role: 'Chatbot Developer',
    period: 'Sep 2021 → Apr 2023',
    start: '2021-09',
    location: 'Brazil',
    summary: 'Chatbots and backend APIs for enterprise clients in health, retail and finance.',
    points: [
      'Part of a team running chatbots that handled over 3,000 interactions per minute.',
      'Built C#, .NET and JavaScript APIs connecting client backends to conversation flows in real time.',
      'Added automated tests, code-quality gates and security reporting to the CI pipeline.',
      'Worked directly with client IT, marketing and sales leads to align delivery with business goals.',
    ],
  },
  {
    id: 'freelance',
    company: 'Freelance',
    role: 'Full-Stack Developer',
    period: 'Feb 2021 → Sep 2021',
    start: '2021-02',
    location: 'Brazil',
    summary: 'Designed, built and deployed five websites end to end in six months.',
    points: [
      'Sole developer on every project, from requirements and design to databases and deployment.',
      'Built a real estate agency platform with React, Python and Django.',
      'Built a personal trainer website with Node.js.',
    ],
  },
  {
    id: 'grupo-gmaes',
    company: 'Grupo Gmaes',
    role: 'IT Intern',
    period: 'Nov 2019 → Feb 2021',
    start: '2019-11',
    location: 'Itajaí, Brazil',
    summary: 'IT support for Linux and Windows servers, networks and internal systems.',
    points: [
      'Diagnosed and resolved issues across email systems, machines, networks and infrastructure.',
      'Handled reporting and monitoring for recurring system issues.',
    ],
  },
]
