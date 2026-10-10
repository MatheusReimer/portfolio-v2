import { experience } from '@/data/experience'
import { buildLiveSites } from '@/data/live'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { skills } from '@/data/skills'
import { work } from '@/data/work'
import { workflow, workflowNotes, workflowStack } from '@/data/workflow'
import { de } from './de'
import { en } from './en'
import type { Locale } from './locales'
import { pt } from './pt'
import type { Translation, UiMessages } from './types'

export const translations: Record<Locale, Translation> = { en, pt, de }

/**
 * The whole page's copy in one language: the English source in `src/data`
 * with that locale's translated fields laid over it. Links, ids, dates and
 * stack names always come from the source.
 */
export function getContent(locale: Locale) {
  const { ui, content: t } = translations[locale]

  const localProfile = t
    ? {
        ...profile,
        role: t.profile.role,
        location: t.profile.location,
        availability: t.profile.availability,
        tagline: t.profile.tagline,
        summary: t.profile.summary,
        metaDescription: t.profile.metaDescription,
        stats: profile.stats.map((s, i) => ({ ...s, label: t.profile.statLabels[i] })),
        about: t.profile.about,
        principles: t.profile.principles,
        languages: t.profile.languages,
      }
    : profile

  const localWork = t ? work.map((p) => ({ ...p, ...t.work[p.id] })) : work
  const localProjects = t ? projects.map((p) => ({ ...p, ...t.projects[p.id] })) : projects
  const localExperience = t ? experience.map((r) => ({ ...r, ...t.experience[r.id] })) : experience
  const localWorkflow = t ? workflow.map((s) => ({ ...s, ...t.workflow[s.id] })) : workflow

  return {
    locale,
    ui,
    profile: localProfile,
    work: localWork,
    projects: localProjects,
    experience: localExperience,
    workflow: localWorkflow,
    workflowStack,
    workflowNotes: t ? workflowNotes.map((n) => ({ ...n, ...t.workflowNotes[n.id] })) : workflowNotes,
    skills,
    liveSites: buildLiveSites(localWork, localProjects),
  }
}

export type Content = ReturnType<typeof getContent>

/** "Sep 2024 → present", "set 2024 → atual", or a single month when it started and ended in the same one. */
export function formatPeriod(ui: UiMessages, start: string, end?: string): string {
  const month = (ym: string) => {
    const [year, m] = ym.split('-').map(Number)
    return `${ui.months[m - 1]} ${year}`
  }
  if (end === start) return month(start)
  return `${month(start)} → ${end ? month(end) : ui.present}`
}
