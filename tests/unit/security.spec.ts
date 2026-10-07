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
  it('only uses raw HTML for the fixed boot script in the layout', () => {
    const offenders = files.filter((f) => f.text.includes('dangerouslySetInnerHTML')).map((f) => f.path)
    expect(offenders).toEqual(['src/app/layout.tsx'])
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
    const layout = files.find((f) => f.path.endsWith('app/layout.tsx'))!
    expect(layout.text).toContain('Content-Security-Policy')
    expect(layout.text).toContain("object-src 'none'")
  })
})
