import { expect, test } from '@playwright/test'
import { experience } from '../../src/data/experience'
import { liveSites } from '../../src/data/live'
import { profile } from '../../src/data/profile'
import { projects } from '../../src/data/projects'
import { work } from '../../src/data/work'
import { getContent } from '../../src/i18n/content'

const SECTIONS = ['live', 'work', 'projects', 'experience', 'stack', 'about', 'contact']

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

  test('live section links to every production site', async ({ page }) => {
    await page.goto('./')
    const rail = page.getByRole('list', { name: 'Live sites' })
    await expect(rail.getByRole('link')).toHaveCount(liveSites.length)
    for (const s of liveSites) {
      const link = rail.locator(`a[href="${s.url}"]`)
      await expect(link).toHaveAccessibleName(new RegExp(`^${s.name},`))
      await expect(link).toBeVisible()
    }
  })

  test('live sites swipe sideways on phones and sit in a grid on desktop', async ({ page, isMobile }) => {
    await page.goto('./')
    await page.getByRole('button', { name: 'skip' }).click()
    const rail = page.getByRole('list', { name: 'Live sites' })
    await rail.scrollIntoViewIfNeeded()
    const links = rail.getByRole('link')
    const last = links.last()

    if (isMobile) {
      // The last card starts off screen; swiping the rail brings it into view.
      await expect(last).not.toBeInViewport()
      await rail.evaluate((el) => el.scrollTo({ left: el.scrollWidth, behavior: 'instant' }))
      await expect(last).toBeInViewport()
    } else {
      // No sideways scroll: every card is on screen and the first two share a row.
      expect(await rail.evaluate((el) => el.scrollWidth - el.clientWidth)).toBe(0)
      const [a, b] = [await links.nth(0).boundingBox(), await links.nth(1).boundingBox()]
      expect(a?.y).toBe(b?.y)
    }
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

const LANGUAGES = [
  { path: './', lang: 'en', name: 'English', live: 'Live in production', contact: 'Contact' },
  { path: './pt/', lang: 'pt-BR', name: 'Português', live: 'Em produção', contact: 'Contato' },
  { path: './de/', lang: 'de', name: 'Deutsch', live: 'Live in Produktion', contact: 'Kontakt' },
]

test.describe('languages', () => {
  for (const l of LANGUAGES) {
    test(`${l.lang} page is fully translated and fits the screen`, async ({ page }) => {
      const errors: string[] = []
      page.on('pageerror', (e) => errors.push(e.message))
      await page.goto(l.path)
      await expect(page.locator('html')).toHaveAttribute('lang', l.lang)
      await expect(page.getByRole('heading', { level: 1, name: profile.name })).toBeVisible()
      await expect(page.getByRole('heading', { level: 2, name: l.live, exact: true })).toBeAttached()
      await expect(page.getByRole('heading', { level: 2, name: l.contact, exact: true })).toBeAttached()
      await expect(page.getByRole('link', { name: l.name })).toHaveAttribute('aria-current', 'page')
      for (const p of work) await expect(page.getByRole('heading', { name: p.client, exact: true })).toBeAttached()
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(overflow).toBe(0)
      expect(errors).toEqual([])
    })
  }

  test('the switcher moves between languages', async ({ page }) => {
    await page.goto('./')
    const switcher = page.getByRole('navigation', { name: 'Language' })
    await switcher.getByRole('link', { name: 'Português' }).click()
    await expect(page).toHaveURL(/\/portfolio-v2\/pt\/$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')

    await page.getByRole('navigation', { name: 'Idioma' }).getByRole('link', { name: 'Deutsch' }).click()
    await expect(page).toHaveURL(/\/portfolio-v2\/de\/$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'de')

    await page.getByRole('navigation', { name: 'Sprache' }).getByRole('link', { name: 'English' }).click()
    await expect(page).toHaveURL(/\/portfolio-v2\/$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  })

  test('unknown pages get the styled 404 with links home', async ({ page }) => {
    const response = await page.goto('./nope/')
    expect(response?.status()).toBe(404)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.getByRole('heading', { name: /404/ })).toBeVisible()
    await page.getByRole('link', { name: /Deutsch/ }).click()
    await expect(page.locator('html')).toHaveAttribute('lang', 'de')
  })
})

test.describe('languages without JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test('the switcher works as plain links', async ({ page }) => {
    await page.goto('./')
    await page.getByRole('link', { name: 'Deutsch' }).click()
    await expect(page.locator('html')).toHaveAttribute('lang', 'de')
    await expect(page.getByText(getContent('de').profile.tagline)).toBeVisible()
  })
})
