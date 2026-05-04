"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Challenge } from "@/data/challenges";
import { Solution, Combo } from "@/data/solutions";
import { ChallengeCard, SolutionCard, FaceDownCard } from "./GameCard";

interface Props {
  played: Challenge[];
  solutions: Solution[];
  combo: Combo | null;
  focusedId: string | null;
  isDragActive: boolean;
  onFocusSolution: (id: string) => void;
  onReset: () => void;
}

export function BattleArena({
  played,
  solutions,
  combo,
  focusedId,
  isDragActive,
  onFocusSolution,
  onReset,
}: Props) {
  // Show pink solution cards only after yellow challenge cards have landed
  const [solutionsVisible, setSolutionsVisible] = useState(false);
  useEffect(() => {
    if (played.length > 0 && solutions.length > 0) {
      const t = setTimeout(() => setSolutionsVisible(true), 700);
      return () => clearTimeout(t);
    } else {
      setSolutionsVisible(false);
    }
  }, [played.length, solutions.length]);

  const visibleSolutions = solutionsVisible ? solutions : [];

  return (
    <div className="flex flex-col h-full relative">
      <BattleMatBg isDragActive={isDragActive} />

      {/* ── Opponent zone — pink / top ────────────────────────── */}
      <div className="flex-1 flex items-center justify-center relative z-10 pt-14">
        <AnimatePresence mode="popLayout">
          {visibleSolutions.length > 0 ? (
            <div
              key="solutions"
              className="flex items-center gap-4 flex-wrap justify-center"
              style={{ perspective: "900px" }}
            >
              {visibleSolutions.map((card, i) => (
                <motion.div
                  key={card.id}
                  initial={{ y: -40, opacity: 0, scale: 0.8, rotateY: 90 }}
                  animate={{ y: 0, opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ y: -24, opacity: 0, scale: 0.88 }}
                  transition={{ delay: i * 0.38, type: "spring", stiffness: 240, damping: 24 }}
                >
                  <SolutionCard
                    card={card}
                    isFocused={focusedId === card.id}
                    onClick={() => onFocusSolution(card.id)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              key="face-down-hand"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              {[0, 1, 2, 3].map((i) => (
                <FaceDownCard key={i} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Center divider ───────────────────────────────────── */}
      <div className="relative z-10 flex items-center gap-4 px-8 py-2 shrink-0">
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
        <AnimatePresence mode="wait">
          {combo ? (
            <motion.div
              key="combo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="px-3 py-1 rounded"
              style={{ background: "rgba(251,43,126,0.15)", border: "1px solid rgba(251,43,126,0.4)" }}
            >
              <span className="text-[9px] font-mono tracking-widest uppercase" style={{ color: "#fb2b7e" }}>
                Combo — {combo.label}
              </span>
            </motion.div>
          ) : played.length > 0 ? (
            <motion.span
              key="vs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[11px] font-mono tracking-widest font-bold"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              VS
            </motion.span>
          ) : (
            <span className="text-[10px] font-mono tracking-widest" style={{ color: "rgba(255,255,255,0.1)" }}>
              ·
            </span>
          )}
        </AnimatePresence>
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
        {played.length > 0 && (
          <button
            onClick={onReset}
            className="text-[9px] font-mono uppercase tracking-widest px-2 py-1 rounded transition-all"
            style={{ background: "rgba(30,18,8,1)", color: "rgba(251,168,43,0.6)" }}
          >
            ↺ Reset
          </button>
        )}
      </div>

      {/* ── Player zone — amber / bottom ─────────────────────── */}
      <div className="flex-1 flex items-center justify-center relative z-10 pb-10">
        <AnimatePresence mode="popLayout">
          {played.length > 0 && (
            <div key="challenges" className="flex items-center gap-4 flex-wrap justify-center">
              {played.map((card, i) => (
                <motion.div
                  key={card.id}
                  initial={{ y: 48, opacity: 0, scale: 0.82 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 24, opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.06, type: "spring", stiffness: 360, damping: 28 }}
                >
                  <ChallengeCard card={card} inArena isFocused={focusedId === card.id} onClick={() => {}} />
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Battle mat background ────────────────────────────────────────────────────

function BattleMatBg({ isDragActive }: { isDragActive: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Opponent zone — dark pink base */}
      <div
        className="absolute inset-x-0 top-0 bottom-1/2"
        style={{ background: "linear-gradient(to bottom, #100008 0%, #0d0007 65%, #09000a 100%)" }}
      />
      {/* Player zone — dark amber base */}
      <div
        className="absolute inset-x-0 top-1/2 bottom-0"
        style={{ background: "linear-gradient(to bottom, #0e0800 0%, #0c0700 65%, #080500 100%)" }}
      />
      {/* Opponent radial glow — pink */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: "55%",
          background: "radial-gradient(ellipse 90% 70% at 50% -10%, rgba(251,43,126,0.22) 0%, transparent 70%)",
        }}
      />
      {/* Player radial glow — amber */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "55%",
          background: "radial-gradient(ellipse 90% 70% at 50% 110%, rgba(251,168,43,0.22) 0%, transparent 70%)",
        }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      {/* Center line — pink → amber gradient */}
      <div
        className="absolute inset-x-0"
        style={{
          top: "calc(50% - 0.5px)",
          height: "1px",
          background: "linear-gradient(to right, transparent 0%, #fb2b7e 30%, #fba82b 70%, transparent 100%)",
          boxShadow: "0 0 16px rgba(251,168,43,0.15), 0 0 16px rgba(251,43,126,0.15)",
        }}
      />
      {/* Corner brackets — opponent (pink) */}
      <div className="absolute top-0 left-0 w-14 h-14 opacity-25"
        style={{ borderRight: "1px solid #fb2b7e", borderBottom: "1px solid #fb2b7e" }} />
      <div className="absolute top-0 right-0 w-14 h-14 opacity-25"
        style={{ borderLeft: "1px solid #fb2b7e", borderBottom: "1px solid #fb2b7e" }} />
      {/* Corner brackets — player (amber) */}
      <div className="absolute bottom-0 left-0 w-14 h-14 opacity-25"
        style={{ borderRight: "1px solid #fba82b", borderTop: "1px solid #fba82b" }} />
      <div className="absolute bottom-0 right-0 w-14 h-14 opacity-25"
        style={{ borderLeft: "1px solid #fba82b", borderTop: "1px solid #fba82b" }} />

      {/* Drop zone — amber dashed highlight */}
      <AnimatePresence>
        {isDragActive && (
          <motion.div
            key="drop-zone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-x-8 rounded-lg"
            style={{
              top: "calc(50% + 10px)",
              bottom: "10px",
              border: "2px dashed rgba(251,168,43,0.55)",
              background: "rgba(251,168,43,0.06)",
              boxShadow: "0 0 28px rgba(251,168,43,0.05) inset",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
