import type { Translation } from './types'

export const en: Translation = {
  ui: {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    present: 'present',
    skipToContent: 'Skip to content',
    sectionsNav: 'Sections',
    languageNav: 'Language',
    hero: { viewWork: 'View work', emailMe: 'Email me', skip: 'skip' },
    live: {
      title: 'Live in production',
      lede: 'Sites I built or helped build that are running today. Open any of them.',
      listLabel: 'Live sites',
      client: 'client',
      personal: 'personal',
    },
    work: {
      title: 'Client work',
      lede: 'Platforms I built and shipped at Thinklogic. Every line below is backed by my own commits in the client repository.',
      featured: 'featured case study',
      internal: 'internal system',
    },
    projects: {
      title: 'Personal projects',
      lede: 'Things I build on my own time, mostly to try a stack properly rather than read about it.',
      privateRepo: 'private repo',
      source: 'source',
    },
    experience: { title: 'Experience', at: 'at' },
    stack: { title: 'Stack' },
    about: { title: 'About', languages: 'languages' },
    contact: { title: 'Contact' },
    footer: { builtWith: 'Built with Next.js, React and TypeScript.', source: 'Source' },
    labels: {
      stack: (name) => `${name} stack`,
      sourceCode: (name) => `${name} source code on GitHub`,
      liveSite: (name) => `${name} live site`,
    },
  },
  content: null,
}
