import { describe, expect, it } from 'vitest'
import {
  buildScene,
  buildQuietScene,
  HORIZON,
  ROAD_Y,
  SCENE_H,
  SCENE_W,
  SKYLINE_CEILING,
} from '../app/utils/scene'
import type { Rect } from '../app/utils/scene'

const scene = buildScene()
const all: Rect[] = [...scene.far, ...scene.mid, ...scene.near]

describe('scene generation', () => {
  it('is deterministic, so SSR and client markup match', () => {
    expect(JSON.stringify(buildScene())).toBe(JSON.stringify(buildScene()))
  })

  it('varies with the seed', () => {
    expect(JSON.stringify(buildScene(1))).not.toBe(JSON.stringify(buildScene(2)))
  })

  it('renders on the declared grid', () => {
    expect(scene.width).toBe(SCENE_W)
    expect(scene.height).toBe(SCENE_H)
  })

  it('fills all three parallax layers', () => {
    expect(scene.far.length).toBeGreaterThan(50)
    expect(scene.mid.length).toBeGreaterThan(20)
    expect(scene.near.length).toBeGreaterThan(10)
  })

  it('stays within a sane node budget', () => {
    // Cheap enough to render every frame; a runaway loop would show up here.
    expect(all.length).toBeLessThan(900)
  })

  it('snaps every rect to whole pixels — a fractional edge would blur', () => {
    for (const r of all) {
      expect(Number.isInteger(r.x)).toBe(true)
      expect(Number.isInteger(r.y)).toBe(true)
      expect(Number.isInteger(r.w)).toBe(true)
      expect(Number.isInteger(r.h)).toBe(true)
    }
  })

  it('gives every rect positive area', () => {
    for (const r of all) {
      expect(r.w).toBeGreaterThan(0)
      expect(r.h).toBeGreaterThan(0)
    }
  })

  it('uses valid hex colours throughout', () => {
    for (const r of all) expect(r.f).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('keeps opacity in range', () => {
    for (const r of all) {
      if (r.o === undefined) continue
      expect(r.o).toBeGreaterThan(0)
      expect(r.o).toBeLessThanOrEqual(1)
    }
  })

  it('keeps geometry near the canvas — nothing drawn far offscreen', () => {
    for (const r of all) {
      expect(r.x).toBeGreaterThan(-40)
      expect(r.x).toBeLessThan(scene.width + 40)
      expect(r.y).toBeGreaterThanOrEqual(-40)
      expect(r.y).toBeLessThan(scene.height + 40)
    }
  })

  it('only twinkles stars, and stagger offsets stay under one cycle', () => {
    const twinklers = all.filter(r => r.t !== undefined)
    expect(twinklers.length).toBeGreaterThan(0)
    for (const r of twinklers) {
      expect(r.w).toBe(1)
      expect(r.h).toBe(1)
      expect(r.t!).toBeGreaterThanOrEqual(0)
      expect(r.t!).toBeLessThan(4000)
    }
  })

  it('the quiet variant thins the foreground without touching the rest', () => {
    const quiet = buildQuietScene()
    expect(quiet.near.length).toBeLessThan(buildScene(77001).near.length)
    expect(quiet.far.length).toBe(buildScene(77001).far.length)
  })
})

describe('skyline and flight safety', () => {
  // A building: tall, narrower than the frame, and standing above the horizon.
  // Excludes the full-width road and ground slabs.
  const buildings = [...scene.mid, ...scene.near].filter(
    r => r.h > 6 && r.w < scene.width / 4 && r.y < HORIZON,
  )

  it('keeps every building below the published ceiling', () => {
    // SceneTraffic flies aircraft above SKYLINE_CEILING. If a building were
    // ever raised through it, a plane would cross in front of a tower — which
    // is exactly the image this scene must never produce.
    expect(buildings.length).toBeGreaterThan(0)
    for (const b of buildings) {
      expect(b.y).toBeGreaterThanOrEqual(SKYLINE_CEILING)
    }
  })

  it('leaves usable sky above the ceiling', () => {
    expect(SKYLINE_CEILING).toBeGreaterThan(20)
  })

  it('puts the road inside the frame, below the horizon', () => {
    expect(ROAD_Y).toBeGreaterThan(HORIZON)
    expect(ROAD_Y + 12).toBeLessThan(scene.height)
  })

  it('keeps the scene close to the hero shape, so cover barely crops it', () => {
    const ratio = scene.width / scene.height
    expect(ratio).toBeGreaterThan(2)
    expect(ratio).toBeLessThan(2.6)
  })

  it('leaves the launch lane clear of buildings', () => {
    // The ship stands at x=170..184; nothing built may occupy that column.
    const laneStart = 168
    const laneEnd = 188
    for (const b of buildings) {
      const overlaps = b.x < laneEnd && b.x + b.w > laneStart
      expect(overlaps).toBe(false)
    }
  })
})
