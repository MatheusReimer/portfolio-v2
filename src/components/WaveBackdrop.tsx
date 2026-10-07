'use client'

import { useEffect, useRef } from 'react'

/**
 * A slow, PS3 XMB-style ribbon: many thin translucent strands following
 * slightly offset sine waves, so together they twist like a sheet of silk,
 * plus a few sparkles drifting through it.
 *
 * Decorative only. Pauses while the tab is hidden and renders a single still
 * frame for users who prefer reduced motion.
 */

interface Ribbon {
  strands: number
  /** Vertical centre as a fraction of the viewport height. */
  baseY: number
  amplitude: number
  wavelength: number
  speed: number
  /** How far apart neighbouring strands drift in phase; this is the twist. */
  spread: number
  color: [number, number, number]
  alpha: number
}

interface Sparkle {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  phase: number
}

const RIBBONS: Ribbon[] = [
  { strands: 26, baseY: 0.9, amplitude: 0.11, wavelength: 1.25, speed: 0.11, spread: 0.035, color: [239, 68, 68], alpha: 0.2 },
  { strands: 20, baseY: 0.94, amplitude: 0.08, wavelength: 0.9, speed: -0.08, spread: 0.05, color: [253, 164, 175], alpha: 0.13 },
  { strands: 14, baseY: 0.86, amplitude: 0.06, wavelength: 1.7, speed: 0.06, spread: 0.06, color: [251, 146, 60], alpha: 0.09 },
]

const SPARKLES = 46
const MAX_DPR = 2
/** Global tuning: how fast everything moves and how strongly it shows. */
const SPEED = 0.55
const OPACITY = 0.65

export function WaveBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let frame = 0
    let last = performance.now()
    let time = 0

    const sparkles: Sparkle[] = Array.from({ length: SPARKLES }, () => ({
      x: Math.random(),
      y: 0.72 + Math.random() * 0.28,
      r: 0.6 + Math.random() * 1.4,
      vx: 0.004 + Math.random() * 0.012,
      vy: (Math.random() - 0.5) * 0.004,
      phase: Math.random() * Math.PI * 2,
    }))

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      width = window.innerWidth
      height = window.innerHeight
      canvas!.width = Math.round(width * dpr)
      canvas!.height = Math.round(height * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function drawRibbon(r: Ribbon, t: number) {
      const step = Math.max(8, width / 120)
      const k = (Math.PI * 2) / (width * r.wavelength)
      const amp = r.amplitude * height
      const [cr, cg, cb] = r.color
      const strandY = (x: number, s: number) => {
        const offset = s * r.spread
        return (
          r.baseY * height +
          Math.sin(x * k + t * r.speed * 6 + offset * 6) * amp +
          Math.sin(x * k * 0.55 - t * r.speed * 3.4 + offset * 9) * amp * 0.55 +
          Math.cos(x * k * 1.7 + t * r.speed * 2 + s * 0.04) * amp * 0.12
        )
      }

      // Soft sheet between the outermost strands: the "silk" of the ribbon.
      ctx!.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${r.alpha * 0.22 * OPACITY})`
      ctx!.beginPath()
      for (let x = -step; x <= width + step; x += step) {
        if (x === -step) ctx!.moveTo(x, strandY(x, 0))
        else ctx!.lineTo(x, strandY(x, 0))
      }
      for (let x = width + step; x >= -step; x -= step) ctx!.lineTo(x, strandY(x, r.strands - 1))
      ctx!.closePath()
      ctx!.fill()

      ctx!.lineWidth = 1
      for (let s = 0; s < r.strands; s++) {
        // Strands in the middle of the ribbon are brighter, edges fade out.
        const centre = 1 - Math.abs(s / (r.strands - 1) - 0.5) * 2
        ctx!.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, ${r.alpha * (0.25 + 0.75 * centre) * OPACITY})`
        ctx!.beginPath()
        for (let x = -step; x <= width + step; x += step) {
          if (x === -step) ctx!.moveTo(x, strandY(x, s))
          else ctx!.lineTo(x, strandY(x, s))
        }
        ctx!.stroke()
      }
    }

    function drawSparkles(t: number, dt: number) {
      for (const p of sparkles) {
        p.x += p.vx * dt
        p.y += p.vy * dt
        if (p.x > 1.02) {
          p.x = -0.02
          p.y = 0.72 + Math.random() * 0.28
        }
        const twinkle = 0.35 + 0.65 * Math.max(0, Math.sin(t * 1.3 + p.phase))
        ctx!.fillStyle = `rgba(255, 228, 230, ${0.5 * twinkle * OPACITY})`
        ctx!.beginPath()
        ctx!.arc(p.x * width, p.y * height, p.r, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    function draw(dt: number) {
      ctx!.clearRect(0, 0, width, height)
      ctx!.globalCompositeOperation = 'lighter'
      for (const r of RIBBONS) drawRibbon(r, time)
      drawSparkles(time, dt)
      ctx!.globalCompositeOperation = 'source-over'
    }

    function tick(now: number) {
      // Clamp so a long pause (background tab) doesn't make things jump.
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      time += dt * SPEED
      draw(dt * SPEED)
      frame = requestAnimationFrame(tick)
    }

    function onVisibility() {
      cancelAnimationFrame(frame)
      if (!document.hidden && !reduceMotion) {
        last = performance.now()
        frame = requestAnimationFrame(tick)
      }
    }

    resize()
    time = 12 // start mid-motion rather than from a flat line
    draw(0)
    if (!reduceMotion) frame = requestAnimationFrame(tick)

    const onResize = () => {
      resize()
      draw(0)
    }
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="backdrop-wave" aria-hidden="true" />
}
