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
    workflow: {
      title: 'AI workflow',
      lede: 'I do most of my engineering with AI agents now, at work and on my own projects. Over time I built a loop around them. Most of the tools in it are my own code; the ones marked adopted are open source.',
      listLabel: 'Workflow stages',
      built: 'built',
      adopted: 'adopted',
      loop: 'back to memory. Each round starts from what the last one learned.',
      graphLabel: 'Diagram of the loop: memory, plan, build, validate, measure and learn, with learn feeding back into memory. I approve the plan and the lessons.',
      me: 'me',
      approves: 'approve + steer',
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
