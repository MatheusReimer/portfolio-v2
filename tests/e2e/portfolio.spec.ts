import { expect, test } from '@playwright/test'
import { experience } from '../../src/data/experience'
import { profile } from '../../src/data/profile'
import { projects } from '../../src/data/projects'
import { work } from '../../src/data/work'

const SECTIONS = ['work', 'projects', 'experience', 'stack', 'about', 'contact']

test.describe('portfolio', () => {
  test('loads without console errors and types out the hero', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    page.on('pageerror', (e) => errors.push(e.message))

    await page.goto('./')
    await expect(page).toHaveTitle(new RegExp(profile.name))
    const hero = page.locator('.hero-term')
    await expect(hero).toHaveAttribute('data-mode', 'typing')
    await expect(hero).toHaveAttribute('data-mode', 'done', { timeout: 10_000 })
    await expect(page.getByRole('heading', { level: 1, name: profile.name })).toBeVisible()
    for (const stat of profile.stats) await expect(hero.getByText(stat.value, { exact: true })).toBeVisible()
    expect(errors).toEqual([])
  })

  test('skip button finishes the animation immediately', async ({ page }) => {
    await page.goto('./')
    await page.getByRole('button', { name: 'skip' }).click()
    await expect(page.locator('.hero-term')).toHaveAttribute('data-mode', 'done')
    await expect(page.getByText(profile.tagline)).toBeVisible()
  })

  test('nav links scroll each section into view and reveal it', async ({ page, isMobile }) => {
    await page.goto('./')
    for (const id of SECTIONS) {
      const link = page.getByRole('navigation', { name: 'Sections' }).getByRole('link', { name: id, exact: true })
      if (isMobile) await link.scrollIntoViewIfNeeded()
      await link.click()
      await expect(page).toHaveURL(new RegExp(`#${id}$`))
      const section = page.locator(`section#${id}`)
      await expect(section).toBeInViewport()
      await expect(section.locator('.section-title')).toHaveCSS('opacity', '1')
    }
  })

  test('shows every client, project and role', async ({ page }) => {
    await page.goto('./')
    for (const p of work) await expect(page.getByRole('heading', { name: p.client, exact: true })).toBeAttached()
    for (const p of projects) await expect(page.getByRole('heading', { name: p.name, exact: true })).toBeAttached()
    for (const r of experience) await expect(page.locator('.log-title', { hasText: r.company })).toBeAttached()
  })

  test('external links open safely in a new tab', async ({ page }) => {
    await page.goto('./')
    const external = page.locator('a[href^="http"]')
    const count = await external.count()
    expect(count).toBeGreaterThan(10)
    for (let i = 0; i < count; i++) {
      await expect(external.nth(i)).toHaveAttribute('target', '_blank')
      await expect(external.nth(i)).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })

  test('has no horizontal scroll', async ({ page }) => {
    await page.goto('./')
    await page.getByRole('button', { name: 'skip' }).click()
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBe(0)
  })
})

test.describe('without animation', () => {
  test.use({ reducedMotion: 'reduce' })

  test('reduced motion shows everything immediately', async ({ page }) => {
    await page.goto('./')
    await expect(page.locator('.hero-term')).toHaveAttribute('data-mode', 'static')
    await expect(page.getByText(profile.tagline)).toBeVisible()
    await expect(page.locator('section#contact .section-title')).toHaveCSS('opacity', '1')
  })
})

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test('all content is readable', async ({ page }) => {
    await page.goto('./')
    await expect(page.getByRole('heading', { level: 1, name: profile.name })).toBeVisible()
    await expect(page.getByText(profile.tagline)).toBeVisible()
    await page.locator('section#contact').scrollIntoViewIfNeeded()
    await expect(page.getByRole('link', { name: profile.email })).toBeVisible()
  })
})
