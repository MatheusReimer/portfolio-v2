/**
 * Interface copy: headings, buttons, labels. Shell commands, nav paths and
 * technology names stay in English on purpose; they are part of the terminal
 * design, not prose.
 */
export interface UiMessages {
  /** Short month names, January first. */
  months: [string, string, string, string, string, string, string, string, string, string, string, string]
  present: string
  skipToContent: string
  sectionsNav: string
  languageNav: string
  hero: { viewWork: string; emailMe: string; skip: string }
  live: { title: string; lede: string; listLabel: string; client: string; personal: string }
  work: { title: string; lede: string; featured: string; internal: string }
  projects: { title: string; lede: string; privateRepo: string; source: string }
  workflow: {
    title: string
    lede: string
    listLabel: string
    built: string
    adopted: string
    loop: string
    /** One-sentence summary of the diagram for screen readers. */
    graphLabel: string
    /** Centre of the diagram: me, and what I approve. Keep both short; they sit inside a small circle. */
    me: string
    approves: string
  }
  experience: { title: string; at: string }
  stack: { title: string }
  about: { title: string; languages: string }
  contact: { title: string }
  footer: { builtWith: string; source: string }
  labels: {
    stack: (name: string) => string
    sourceCode: (name: string) => string
    liveSite: (name: string) => string
  }
}

/**
 * Translated copy for the content in `src/data`. English is the source and
 * needs no entry; every other locale must cover every id. A unit test checks
 * that nothing is missing, extra, or a different length from the English.
 */
export interface ContentTranslation {
  profile: {
    role: string
    location: string
    availability: string
    tagline: string
    summary: string
    metaDescription: string
    /** Same order as `profile.stats`. */
    statLabels: string[]
    about: string[]
    principles: { title: string; body: string }[]
    /** Same order as `profile.languages`. */
    languages: { name: string; level: string }[]
  }
  work: Record<string, { product: string; role: string; highlights: string[] }>
  projects: Record<string, { summary: string; highlights: string[] }>
  workflow: Record<string, { title: string; body: string }>
  /** Each note keeps the same number of paragraphs as the English. */
  workflowNotes: Record<string, { title: string; body: string[] }>
  experience: Record<string, { role: string; location: string; summary: string; points: string[] }>
}

export interface Translation {
  ui: UiMessages
  /** Null for English, whose content is the source in `src/data`. */
  content: ContentTranslation | null
}
