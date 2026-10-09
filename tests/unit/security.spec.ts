import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? sourceFiles(path) : /\.(tsx?|mjs)$/.test(name) ? [path] : []
  })
}

const files = sourceFiles('src').map((path) => ({ path: path.replace(/\\/g, '/'), text: readFileSync(path, 'utf8') }))

describe('source guards', () => {
  it('only uses raw HTML for the fixed boot script in the root document', () => {
    const offenders = files.filter((f) => f.text.includes('dangerouslySetInnerHTML')).map((f) => f.path)
    expect(offenders).toEqual(['src/components/RootDocument.tsx'])
  })

  it('opens new tabs only through ExternalLink', () => {
    const offenders = files
      .filter((f) => f.text.includes('target="_blank"') && !f.path.endsWith('ExternalLink.tsx'))
      .map((f) => f.path)
    expect(offenders).toEqual([])
  })

  it('sets noopener and noreferrer on external links', () => {
    const link = files.find((f) => f.path.endsWith('ExternalLink.tsx'))!
    expect(link.text).toContain('rel="noopener noreferrer"')
  })

  it('ships a Content-Security-Policy', () => {
    const layout = files.find((f) => f.path.endsWith('components/RootDocument.tsx'))!
    expect(layout.text).toContain('Content-Security-Policy')
    expect(layout.text).toContain("object-src 'none'")
  })

  it('renders every page, including the 404, through the root document', () => {
    const roots = files.filter((f) => /\/(layout|global-not-found)\.tsx$/.test(f.path))
    expect(roots.length).toBeGreaterThanOrEqual(3)
    for (const f of roots) expect(f.text, f.path).toContain('<RootDocument')
  })
})
