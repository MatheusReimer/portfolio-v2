'use client'

import { useEffect } from 'react'

/**
 * Reveals `.reveal` elements as they enter the viewport.
 *
 * Anything already on screen is marked visible before the `hydrated` class
 * turns hiding on, so content never blinks out on load. Without JavaScript,
 * or with reduced motion, nothing is ever hidden.
 */
export function RevealController() {
  useEffect(() => {
    const root = document.documentElement
    if (!root.classList.contains('motion-ok')) return

    const items = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    const inView = (el: HTMLElement) => el.getBoundingClientRect().top < window.innerHeight * 0.92

    items.filter(inView).forEach((el) => el.classList.add('is-visible'))
    root.classList.add('hydrated')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    items.filter((el) => !el.classList.contains('is-visible')).forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return null
}
