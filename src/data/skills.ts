export interface SkillGroup {
  id: string
  label: string
  items: string[]
}

export const skills: SkillGroup[] = [
  { id: 'frontend', label: 'frontend', items: ['Nuxt', 'Vue', 'React', 'Next.js', 'Angular', 'TypeScript'] },
  { id: 'backend', label: 'backend', items: ['C#', '.NET', 'EF Core', 'Node.js', 'Python', 'REST APIs'] },
  { id: 'data', label: 'data', items: ['SQL Server', 'PostgreSQL', 'MongoDB', 'Cosmos DB', 'Algolia', 'Azure AI Search'] },
  { id: 'platform', label: 'platform', items: ['Azure', 'Cloudflare', 'AWS', 'Bicep', 'CI/CD', 'Kontent.ai'] },
  { id: 'quality', label: 'quality', items: ['Playwright', 'Vitest', 'Lighthouse', 'Web Vitals', 'GA4 / GTM'] },
  { id: 'ai', label: 'ai', items: ['Claude', 'Google Gemini', 'LLM pipelines', 'RAG'] },
]
