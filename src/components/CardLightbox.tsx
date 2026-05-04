"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { challenges, Challenge } from "@/data/challenges";
import { solutions, Solution } from "@/data/solutions";
import { Depth, FocusKind } from "@/hooks/useGameState";
import { ChallengeCard, SolutionCard } from "./GameCard";

// #fba82b amber — challenges / player
// #fb2b7e pink  — solutions  / opponent

interface Props {
  focusedId: string | null;
  focusedKind: FocusKind | null;
  depth: Depth;
  onDepth: (d: Depth) => void;
  onAccept: () => void;
  activeSolutions: Solution[];
  onFocusSolution: (id: string) => void;
}

export function CardLightbox({
  focusedId,
  focusedKind,
  depth,
  onDepth,
  onAccept,
  activeSolutions,
  onFocusSolution,
}: Props) {
  const challenge =
    focusedKind === "challenge"
      ? (challenges.find((c) => c.id === focusedId) ?? null)
      : null;
  const solution =
    focusedKind === "solution"
      ? (solutions.find((s) => s.id === focusedId) ?? null)
      : null;
  const isOpen = !!(challenge || solution);

  const currentIdx =
    solution && activeSolutions.length > 0
      ? activeSolutions.findIndex((s) => s.id === focusedId)
      : -1;
  const hasPrev = currentIdx > 0;
  const hasNext = currentIdx >= 0 && currentIdx < activeSolutions.length - 1;
  const isMulti = activeSolutions.length > 1 && focusedKind === "solution";

  const slideDir = useRef<1 | -1>(1);

  function goNext() {
    slideDir.current = 1;
    onFocusSolution(activeSolutions[currentIdx + 1].id);
  }
  function goPrev() {
    slideDir.current = -1;
    onFocusSolution(activeSolutions[currentIdx - 1].id);
  }

  // accent color depends on card type
  const accent = focusedKind === "solution" ? "#fb2b7e" : "#fba82b";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 overflow-y-auto"
          style={{ background: "rgb(4,3,8)" }}
          onClick={onAccept}
        >
          <div
            className="min-h-full flex flex-col items-center justify-start py-4 px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top row: counter + close */}
            <div className="flex items-center justify-between w-full max-w-md mb-4">
              {isMulti ? (
                <span className="text-[10px] font-mono" style={{ color: "rgba(251,43,126,0.6)" }}>
                  Response {currentIdx + 1} of {activeSolutions.length}
                </span>
              ) : (
                <span />
              )}
              <button
                onClick={onAccept}
                className="w-8 h-8 flex items-center justify-center rounded transition-all"
                style={{ background: "rgba(30,15,20,1)", color: "rgba(255,255,255,0.45)" }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Sliding card + content */}
            <AnimatePresence mode="wait" custom={slideDir.current}>
              <motion.div
                key={focusedId}
                custom={slideDir.current}
                variants={{
                  enter: (dir: number) => ({ x: dir * 80, opacity: 0, scale: 0.93 }),
                  center: { x: 0, opacity: 1, scale: 1 },
                  exit: (dir: number) => ({ x: -dir * 80, opacity: 0, scale: 0.93 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
                className="flex flex-col items-center w-full max-w-md"
              >
                {/* Zoomed card */}
                <div className="mb-6" style={{ zoom: 1.8 }}>
                  {challenge && <ChallengeCard card={challenge} inArena onClick={() => {}} />}
                  {solution && <SolutionCard card={solution} onClick={() => {}} />}
                </div>

                {/* Depth tabs — 2 tabs only */}
                <div className="flex gap-1 w-full rounded-md p-1 mb-4"
                  style={{ background: "rgba(20,14,18,1)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  {([{ label: "Overview", d: 2 }, { label: "Deep Dive", d: 3 }] as { label: string; d: Depth }[]).map(({ label, d }) => (
                    <button
                      key={d}
                      onClick={() => onDepth(d)}
                      className="flex-1 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded transition-all"
                      style={
                        (d === 2 ? depth < 3 : depth === 3)
                          ? { background: accent, color: "#06080f", fontWeight: 700 }
                          : { background: "rgba(30,18,24,1)", color: "rgba(255,255,255,0.45)" }
                      }
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Content */}
                <div className="w-full space-y-4 pb-2">
                  {challenge && <ChallengeContent card={challenge} depth={depth} />}
                  {solution && <SolutionContent card={solution} depth={depth} />}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation / close — solid buttons */}
            <div className="w-full max-w-lg pb-10">
              {isMulti ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={goPrev}
                    disabled={!hasPrev}
                    className="flex-1 py-2.5 rounded text-[11px] font-mono transition-all"
                    style={
                      hasPrev
                        ? { background: "rgba(35,20,28,1)", color: "rgba(255,255,255,0.55)" }
                        : { background: "rgba(22,14,18,1)", color: "rgba(255,255,255,0.18)", cursor: "default" }
                    }
                  >
                    ← Back
                  </button>
                  {hasNext ? (
                    <button
                      onClick={goNext}
                      className="flex-[2] py-2.5 rounded text-[11px] font-mono font-semibold transition-all hover:opacity-90"
                      style={{ background: "#fba82b", color: "#06080f" }}
                    >
                      Next response →
                    </button>
                  ) : (
                    <button
                      onClick={onAccept}
                      className="flex-[2] py-2.5 rounded text-[11px] font-mono font-semibold transition-all hover:opacity-90"
                      style={{ background: "#fb2b7e", color: "#fff" }}
                    >
                      Got it ✓
                    </button>
                  )}
                </div>
              ) : focusedKind === "challenge" && activeSolutions.length > 0 ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={onAccept}
                    className="flex-1 py-2.5 rounded text-[11px] font-mono transition-all"
                    style={{ background: "rgba(35,20,12,1)", color: "rgba(255,255,255,0.4)" }}
                  >
                    Skip
                  </button>
                  <button
                    onClick={() => onFocusSolution(activeSolutions[0].id)}
                    className="flex-[2] py-2.5 rounded text-[11px] font-mono font-semibold transition-all hover:opacity-90"
                    style={{ background: "#fb2b7e", color: "#fff" }}
                  >
                    See responses →
                  </button>
                </div>
              ) : (
                <button
                  onClick={onAccept}
                  className="w-full py-2.5 rounded text-[11px] font-mono font-semibold transition-all hover:opacity-90"
                  style={{ background: accent, color: accent === "#fba82b" ? "#06080f" : "#fff" }}
                >
                  Got it ✓
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

function Section({
  label,
  text,
  show = true,
  color = "rgba(255,255,255,0.92)",
}: {
  label: string;
  text: string;
  show?: boolean;
  color?: string;
}) {
  if (!show) return null;
  return (
    <div>
      <p className="text-[14px] font-mono tracking-widest uppercase mb-1.5"
        style={{ color: "rgba(255,255,255,0.4)" }}>
        {label}
      </p>
      <p className="text-[18px] leading-relaxed" style={{ color }}>{text}</p>
    </div>
  );
}

// ─── Challenge content ────────────────────────────────────────────────────────

function ChallengeContent({ card, depth }: { card: Challenge; depth: Depth }) {
  return (
    <>
      <div className="flex flex-wrap gap-1.5">
        {card.tags.map((tag) => (
          <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded-sm"
            style={{ background: "rgba(251,168,43,0.12)", color: "rgba(251,168,43,0.8)", border: "1px solid rgba(251,168,43,0.22)" }}>
            {tag}
          </span>
        ))}
      </div>
      <Section label="The Problem" text={card.brief} show={depth >= 1} />
      <Section label="Context" text={card.context} show={depth >= 2} />
      <Section label="Stakes" text={card.impact} show={depth >= 3} color="rgba(255,160,160,0.95)" />
      <Section label="Root Cause" text={card.rootCause} show={depth >= 3} />
      <Section label="Constraints" text={card.constraints} show={depth >= 3} color="rgba(255,200,100,0.9)" />
      {depth < 3 && (
        <p className="text-[14px] font-mono italic" style={{ color: "rgba(255,255,255,0.3)" }}>
          Switch to "Deep Dive" for more depth →
        </p>
      )}
      <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>Power Level</span>
        <span className="font-mono text-base font-bold" style={{ color: "#fba82b" }}>{card.power.toLocaleString()}</span>
      </div>
    </>
  );
}

// ─── Solution content ─────────────────────────────────────────────────────────

function SolutionContent({ card, depth }: { card: Solution; depth: Depth }) {
  return (
    <>
      <div className="flex flex-wrap gap-1.5">
        {card.tech.map((t) => (
          <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded-sm"
            style={{ background: "rgba(251,43,126,0.12)", color: "rgba(251,43,126,0.8)", border: "1px solid rgba(251,43,126,0.22)" }}>
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
            <div className="p-3 rounded" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
              <p className="text-[10px] font-mono tracking-widest uppercase mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>Impact</p>
              <p className="text-[18px] leading-relaxed" style={{ color: "rgba(255,255,255,0.92)" }}>{card.metrics}</p>
            </div>
          )}
        </>
      )}
      {depth < 3 && (
        <p className="text-[10px] font-mono italic" style={{ color: "rgba(255,255,255,0.3)" }}>
          Switch to "Deep Dive" for more depth →
        </p>
      )}
      <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>Power</span>
        <span className="font-mono text-base font-bold" style={{ color: "#fb2b7e" }}>{card.power.toLocaleString()}</span>
      </div>
    </>
  );
}
