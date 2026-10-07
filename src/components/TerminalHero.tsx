'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { profile } from '@/data/profile'

interface Step {
  command: string
  output: ReactNode
}

type Mode = 'static' | 'typing' | 'done'

const TYPE_MS = 55
const BEFORE_OUTPUT_MS = 260
const AFTER_OUTPUT_MS = 520

const STEPS: Step[] = [
  {
    command: 'whoami',
    output: (
      <>
        <h1 className="hero-name">{profile.name}</h1>
        <p className="hero-meta">
          {profile.role} <span className="sep">/</span> {profile.location}
        </p>
      </>
    ),
  },
  {
    command: 'cat tagline.txt',
    output: <p className="hero-tagline">{profile.tagline}</p>,
  },
  {
    command: './stats --production',
    output: (
      <dl className="hero-stats">
        {profile.stats.map((s) => (
          <div key={s.label} className="hero-stat">
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>
    ),
  },
]

/**
 * The hero types its commands out once on load. The server renders the
 * finished state, so without JavaScript (or with reduced motion) everything
 * is simply there. Clicking the terminal or pressing a key skips ahead.
 */
export function TerminalHero() {
  const [mode, setMode] = useState<Mode>('static')
  const [step, setStep] = useState(0)
  const [chars, setChars] = useState(0)
  const [showOutput, setShowOutput] = useState(false)
  const cancelled = useRef(false)

  const skip = useCallback(() => {
    cancelled.current = true
    setMode('done')
  }, [])

  useEffect(() => {
    if (!document.documentElement.classList.contains('motion-ok')) return

    cancelled.current = false
    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

    async function run() {
      setMode('typing')
      for (let i = 0; i < STEPS.length; i++) {
        setStep(i)
        setChars(0)
        setShowOutput(false)
        for (let c = 1; c <= STEPS[i].command.length; c++) {
          await wait(TYPE_MS)
          if (cancelled.current) return
          setChars(c)
        }
        await wait(BEFORE_OUTPUT_MS)
        if (cancelled.current) return
        setShowOutput(true)
        await wait(AFTER_OUTPUT_MS)
        if (cancelled.current) return
      }
      setMode('done')
    }

    void run()
    window.addEventListener('keydown', skip, { once: true })
    return () => {
      cancelled.current = true
      window.removeEventListener('keydown', skip)
    }
  }, [skip])

  return (
    <div className="terminal hero-term" data-mode={mode} onClick={mode === 'typing' ? skip : undefined}>
      <div className="terminal-bar" aria-hidden="true">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="terminal-title">
          {profile.handle}@portfolio: ~
        </span>
      </div>
      <div className="terminal-body">
        {STEPS.map((s, i) => {
          const typing = mode === 'typing'
          const pending = typing && i > step
          const current = typing && i === step
          const command = current ? s.command.slice(0, chars) : s.command
          const outputHidden = pending || (current && !showOutput)
          return (
            <div key={s.command} className="t-row">
              <p className={`t-cmd${pending ? ' is-pending' : ''}`} aria-hidden="true">
                <span className="prompt-sign">$</span> {command}
                {current && !showOutput && <span className="caret" />}
              </p>
              <div className={`t-out${outputHidden ? ' is-pending' : ' is-shown'}`}>{s.output}</div>
            </div>
          )
        })}
        <p className={`t-cmd t-idle${mode === 'typing' ? ' is-pending' : ''}`} aria-hidden="true">
          <span className="prompt-sign">$</span> <span className="caret blink" />
        </p>
      </div>
      {mode === 'typing' && (
        <button type="button" className="skip" onClick={skip}>
          skip
        </button>
      )}
    </div>
  )
}
