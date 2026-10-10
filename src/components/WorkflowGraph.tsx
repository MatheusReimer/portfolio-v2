import type { WorkflowStage } from '@/data/workflow'

/**
 * The workflow loop as a ring: each stage feeds the next, the last feeds back
 * into the first, and I sit in the middle approving the plan and the lessons.
 * Server-rendered SVG, so it needs no JavaScript; the cards next to it carry
 * the full text, and this summarises them for screen readers in one label.
 */

const SIZE = 640
const CENTER = SIZE / 2
const RADIUS = 220
const NODE_W = 170
const NODE_H = 64
/** Degrees trimmed off each end of an arc so arrows start and stop clear of the boxes. */
const GAP = 21
/** Stages the human approves; they get a dashed line from the centre. */
const APPROVED = new Set(['plan', 'learn'])
const ME_R = 72

function point(deg: number, r = RADIUS) {
  const rad = (deg * Math.PI) / 180
  return { x: CENTER + r * Math.cos(rad), y: CENTER + r * Math.sin(rad) }
}

/** Clockwise arc on the ring from one angle to another. */
function arc(from: number, to: number) {
  const a = point(from)
  const b = point(to)
  return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} A ${RADIUS} ${RADIUS} 0 0 1 ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
}

export function WorkflowGraph({
  stages,
  label,
  me,
  approves,
}: {
  stages: WorkflowStage[]
  label: string
  me: string
  approves: string
}) {
  const step = 360 / stages.length
  const angle = (i: number) => -90 + i * step

  return (
    <figure className="flow-graph">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={label}>
        <defs>
          <marker id="flow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="flow-arrowhead" />
          </marker>
          <marker id="flow-arrow-return" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="flow-arrowhead is-return" />
          </marker>
        </defs>

        {stages.map((s, i) => {
          const last = i === stages.length - 1
          return (
            <path
              key={`arc-${s.id}`}
              d={arc(angle(i) + GAP, angle(i + 1) - GAP)}
              className={last ? 'flow-arc is-return' : 'flow-arc'}
              markerEnd={last ? 'url(#flow-arrow-return)' : 'url(#flow-arrow)'}
            />
          )
        })}

        {stages.map((s, i) => {
          if (!APPROVED.has(s.id)) return null
          const start = point(angle(i), ME_R + 4)
          const end = point(angle(i), RADIUS - NODE_H)
          return <line key={`ok-${s.id}`} x1={start.x} y1={start.y} x2={end.x} y2={end.y} className="flow-approve" />
        })}

        <circle cx={CENTER} cy={CENTER} r={ME_R} className="flow-me" />
        <text x={CENTER} y={CENTER - 4} className="flow-me-name">
          {me}
        </text>
        <text x={CENTER} y={CENTER + 24} className="flow-me-role">
          {approves}
        </text>

        {stages.map((s, i) => {
          const c = point(angle(i))
          return (
            <g key={s.id} className={`flow-node is-${s.origin}`}>
              <rect x={c.x - NODE_W / 2} y={c.y - NODE_H / 2} width={NODE_W} height={NODE_H} rx={10} />
              <text x={c.x} y={c.y - 4} className="flow-node-stage">
                <tspan className="flow-node-index">{String(i + 1).padStart(2, '0')}</tspan> {s.id}
              </text>
              <text x={c.x} y={c.y + 19} className="flow-node-tool">
                {s.tool}
              </text>
            </g>
          )
        })}
      </svg>
    </figure>
  )
}
