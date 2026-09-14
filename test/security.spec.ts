import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { mount } from '@vue/test-utils'
import ExternalLink from '../app/components/ExternalLink.vue'

const COMPONENT_DIR = join(process.cwd(), 'app/components')
const componentFiles = readdirSync(COMPONENT_DIR).filter(f => f.endsWith('.vue'))

const readComponent = (file: string) => readFileSync(join(COMPONENT_DIR, file), 'utf8')

describe('ExternalLink', () => {
  it('always sets noopener and noreferrer (reverse tabnabbing)', () => {
    const wrapper = mount(ExternalLink, {
      props: { href: 'https://example.com' },
      global: { stubs: { PixelSprite: true } },
    })
    const rel = wrapper.attributes('rel') ?? ''
    expect(rel).toContain('noopener')
    expect(rel).toContain('noreferrer')
    expect(wrapper.attributes('target')).toBe('_blank')
  })
})

describe('component source', () => {
  // OWASP A03. There is no user input on this site today, but v-html is how
  // that changes from "impossible" to "one careless edit away".
  it.each(componentFiles)('%s does not use v-html', (file) => {
    expect(readComponent(file)).not.toMatch(/v-html/)
  })

  it.each(componentFiles)('%s opens new tabs only with noopener noreferrer', (file) => {
    const source = readComponent(file)
    const blankLinks = source.match(/target="_blank"/g) ?? []
    const safeRels = source.match(/rel="noopener noreferrer"/g) ?? []
    expect(safeRels.length).toBeGreaterThanOrEqual(blankLinks.length)
  })
})

describe('build configuration', () => {
  const config = readFileSync(join(process.cwd(), 'nuxt.config.ts'), 'utf8')

  it('declares a Content-Security-Policy', () => {
    expect(config).toContain('Content-Security-Policy')
    expect(config).toContain("default-src 'self'")
    expect(config).toContain("object-src 'none'")
  })

  it('sets a referrer policy', () => {
    expect(config).toContain('strict-origin-when-cross-origin')
  })

  it('keeps the GitHub Pages base path in sync with the deploy target', () => {
    expect(config).toContain("'/portfolio-v2/'")
  })
})
