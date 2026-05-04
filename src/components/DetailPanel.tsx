"use client";

import { motion, AnimatePresence } from "framer-motion";
import { challenges, Challenge } from "@/data/challenges";
import { solutions, Solution } from "@/data/solutions";
import { Depth, FocusKind } from "@/hooks/useGameState";

interface Props {
  focusedId: string | null;
  focusedKind: FocusKind | null;
  depth: Depth;
  onDepth: (d: Depth) => void;
  onClose: () => void;
}

export function DetailPanel({ focusedId, focusedKind, depth, onDepth, onClose }: Props) {
  const isOpen = !!focusedId;

  const challenge = focusedKind === "challenge"
    ? challenges.find((c) => c.id === focusedId) ?? null
    : null;
  const solution = focusedKind === "solution"
    ? solutions.find((s) => s.id === focusedId) ?? null
    : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          key="detail"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 34 }}
          className="fixed right-0 top-14 bottom-0 w-80 xl:w-96 bg-gray-950/95 border-l border-white/8 backdrop-blur-md z-30 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
            <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase">
              {focusedKind === "challenge" ? "Challenge" : "Solution"} Detail
            </span>
            <button
              onClick={onClose}
              className="text-white/30 hover:text-white/70 transition-colors text-lg leading-none"
              aria-label="Close detail"
            >
              ×
            </button>
          </div>

          {/* Depth selector */}
          <div className="flex gap-1 px-5 py-3 border-b border-white/6">
            {([1, 2, 3] as Depth[]).map((d) => (
              <button
                key={d}
                onClick={() => onDepth(d)}
                className={[
                  "flex-1 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded transition-all",
                  depth === d
                    ? "bg-white/10 text-white"
                    : "text-white/25 hover:text-white/50",
                ].join(" ")}
              >
                {d === 1 ? "Overview" : d === 2 ? "Technical" : "Deep Dive"}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              {challenge && (
                <ChallengeDetail key={`c-${depth}`} card={challenge} depth={depth} />
              )}
              {solution && (
                <SolutionDetail key={`s-${depth}`} card={solution} depth={depth} />
              )}
            </AnimatePresence>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

// ─── Challenge detail ─────────────────────────────────────────────────────────

function ChallengeDetail({ card, depth }: { card: Challenge; depth: Depth }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
      className="px-5 py-4 space-y-5"
    >
      <div>
        <p className="text-[9px] font-mono tracking-widest text-amber-400/60 uppercase mb-1">
          Challenge · {card.subtype}
        </p>
        <h2 className="text-white font-bold text-lg leading-tight">{card.title}</h2>
        <p className="text-amber-300/60 text-[11px] font-mono mt-0.5">{card.subtitle}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {card.tags.map((tag) => (
          <span
            key={tag}
            className="text-[9px] font-mono px-2 py-0.5 bg-amber-900/30 text-amber-300/70 border border-amber-500/20 rounded-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      <Section label="The Problem" text={card.brief} show={depth >= 1} />
      <Section label="Context" text={card.context} show={depth >= 2} />
      <Section label="Stakes" text={card.impact} show={depth >= 3} accent="text-red-300/80" />

      {depth < 3 && (
        <p className="text-[9px] font-mono text-white/20 italic">
          Switch to {depth === 1 ? '"Technical"' : '"Deep Dive"'} for more depth →
        </p>
      )}

      <PowerBadge label="Power Level" value={card.power} />
    </motion.div>
  );
}

// ─── Solution detail ──────────────────────────────────────────────────────────

function SolutionDetail({ card, depth }: { card: Solution; depth: Depth }) {
  const typeColor: Record<string, string> = {
    attack: "text-red-300",
    defense: "text-blue-300",
    spell: "text-purple-300",
    trap: "text-orange-300",
  };
  const tagColor: Record<string, string> = {
    attack: "bg-red-900/30 text-red-300/70 border-red-500/20",
    defense: "bg-blue-900/30 text-blue-300/70 border-blue-500/20",
    spell: "bg-purple-900/30 text-purple-300/70 border-purple-500/20",
    trap: "bg-orange-900/30 text-orange-300/70 border-orange-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
      className="px-5 py-4 space-y-5"
    >
      <div>
        <p className={`text-[9px] font-mono tracking-widest uppercase mb-1 ${typeColor[card.type]} opacity-60`}>
          Solution · {card.type}
        </p>
        <h2 className="text-white font-bold text-lg leading-tight">{card.title}</h2>
        <p className={`text-[11px] font-mono mt-0.5 ${typeColor[card.type]} opacity-60`}>
          {card.subtitle}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {card.tech.map((t) => (
          <span
            key={t}
            className={`text-[9px] font-mono px-2 py-0.5 border rounded-sm ${tagColor[card.type]}`}
          >
            {t}
          </span>
        ))}
      </div>

      <Section label="What it does" text={card.brief} show={depth >= 1} />
      <Section label="How it works" text={card.explanation} show={depth >= 2} />

      {depth >= 3 && (
        <>
          <Section label="Architecture" text={card.architecture} />
          <Section label="Tradeoffs" text={card.tradeoffs} />
          {card.metrics && (
            <div className="p-3 bg-white/3 border border-white/8 rounded space-y-1">
              <p className="text-[9px] font-mono tracking-widest text-white/30 uppercase">Impact</p>
              <p className="text-white/80 text-[11px] leading-relaxed">{card.metrics}</p>
            </div>
          )}
        </>
      )}

      {depth < 3 && (
        <p className="text-[9px] font-mono text-white/20 italic">
          Switch to {depth === 1 ? '"Technical"' : '"Deep Dive"'} for more depth →
        </p>
      )}

      <PowerBadge label="Power" value={card.power} />
    </motion.div>
  );
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function Section({
  label,
  text,
  show = true,
  accent = "text-white/65",
}: {
  label: string;
  text: string;
  show?: boolean;
  accent?: string;
}) {
  if (!show) return null;
  return (
    <div>
      <p className="text-[9px] font-mono tracking-widest text-white/25 uppercase mb-1.5">
        {label}
      </p>
      <p className={`text-[12px] leading-relaxed ${accent}`}>{text}</p>
    </div>
  );
}

function PowerBadge({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between pt-3 border-t border-white/6">
      <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{label}</span>
      <span className="text-white/60 font-mono text-sm font-bold">
        {value.toLocaleString()}
      </span>
    </div>
  );
}
