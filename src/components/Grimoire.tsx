"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { challenges } from "@/data/challenges";
import { solutions } from "@/data/solutions";
import { ChallengeCard, SolutionCard } from "./GameCard";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function Grimoire({ open, onClose }: Props) {
  const [tab, setTab] = useState<"challenges" | "solutions">("challenges");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 overflow-y-auto"
          style={{ background: "rgba(4,3,8,0.96)" }}
          onClick={onClose}
        >
          <div
            className="min-h-full flex flex-col items-center py-8 px-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between w-full max-w-5xl mb-6">
              <div>
                <p
                  className="font-mono uppercase tracking-widest mb-1"
                  style={{ fontSize: 9, color: "rgba(255,255,255,0.22)" }}
                >
                  Field Grimoire
                </p>
                <h2 className="text-xl font-bold font-mono" style={{ color: "rgba(251,168,43,0.9)" }}>
                  Card Catalog
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded"
                style={{ background: "rgba(20,14,8,1)", color: "rgba(255,255,255,0.4)" }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Tabs */}
            <div
              className="flex gap-1 mb-8 rounded-md p-1"
              style={{
                background: "rgba(20,14,18,1)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {(["challenges", "solutions"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="px-8 py-1.5 font-mono uppercase tracking-wider rounded transition-all"
                  style={
                    tab === t
                      ? {
                          background: t === "challenges" ? "#fba82b" : "#fb2b7e",
                          color: "#06080f",
                          fontWeight: 700,
                          fontSize: 10,
                        }
                      : { color: "rgba(255,255,255,0.35)", fontSize: 10 }
                  }
                >
                  {t === "challenges"
                    ? `Challenges (${challenges.length})`
                    : `Solutions (${solutions.length})`}
                </button>
              ))}
            </div>

            {/* Card grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.16 }}
                className="flex flex-wrap gap-5 justify-center pb-10"
                style={{ zoom: 0.75 }}
              >
                {tab === "challenges"
                  ? challenges.map((card) => (
                      <ChallengeCard key={card.id} card={card} inArena onClick={() => {}} />
                    ))
                  : solutions.map((card) => (
                      <SolutionCard key={card.id} card={card} onClick={() => {}} />
                    ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
