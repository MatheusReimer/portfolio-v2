"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Challenge } from "@/data/challenges";
import { ChallengeCard } from "./GameCard";

interface Props {
  played: Challenge[];
  onFocus: (id: string) => void;
}

export function Graveyard({ played, onFocus }: Props) {
  const [open, setOpen] = useState(false);
  const count = played.length;
  const isEmpty = count === 0;

  return (
    <>
      <button
        onClick={() => !isEmpty && setOpen(true)}
        className="flex flex-col items-center gap-1.5 select-none transition-opacity"
        style={{ opacity: isEmpty ? 0.3 : 1, cursor: isEmpty ? "default" : "pointer" }}
        aria-label="Open graveyard"
      >
        {/* Stacked card pile */}
        <div className="relative" style={{ width: 120, height: 162 }}>
          {isEmpty ? (
            <div
              className="absolute inset-0 rounded"
              style={{
                border: "1.5px dashed rgba(251,168,43,0.22)",
                background: "rgba(251,168,43,0.03)",
                borderRadius: 8,
              }}
            />
          ) : (
            [2, 1, 0].map((offset) =>
              offset < count ? (
                <div
                  key={offset}
                  className="absolute rounded"
                  style={{
                    width: 104,
                    height: 148,
                    top: (2 - offset) * 5,
                    left: (2 - offset) * 5,
                    padding: "3px",
                    background:
                      "linear-gradient(145deg, #fba82b 0%, #5a3200 40%, #fba82bbb 70%, #5a3200 100%)",
                    boxShadow: "0 4px 18px rgba(251,168,43,0.22)",
                    borderRadius: 8,
                    zIndex: offset === 0 ? 3 : offset === 1 ? 2 : 1,
                    opacity: 0.5 + offset * 0.25,
                  }}
                >
                  <div
                    className="w-full h-full rounded"
                    style={{
                      borderRadius: 5,
                      background: "linear-gradient(145deg, #1c1108 0%, #0a0700 100%)",
                      backgroundImage:
                        "repeating-linear-gradient(45deg, rgba(251,168,43,0.07) 0px, rgba(251,168,43,0.07) 1px, transparent 1px, transparent 10px)",
                    }}
                  />
                </div>
              ) : null
            )
          )}
          {count > 0 && (
            <div
              className="absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center font-bold font-mono z-10"
              style={{ background: "#fba82b", color: "#06080f", fontSize: 12 }}
            >
              {count}
            </div>
          )}
        </div>
        <span
          className="font-mono uppercase tracking-widest mt-1"
          style={{ fontSize: 9, color: "rgba(251,168,43,0.45)" }}
        >
          Graveyard
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(4,3,8,0.93)" }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="rounded-lg p-6"
              style={{
                background: "rgba(14,10,8,1)",
                border: "1px solid rgba(251,168,43,0.2)",
                maxWidth: 680,
                width: "90vw",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p
                    className="font-mono uppercase tracking-widest mb-0.5"
                    style={{ fontSize: 8, color: "rgba(251,168,43,0.4)" }}
                  >
                    Field Graveyard
                  </p>
                  <p className="text-sm font-bold font-mono" style={{ color: "rgba(251,168,43,0.85)" }}>
                    {count} Card{count !== 1 ? "s" : ""} Played
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 flex items-center justify-center rounded"
                  style={{ background: "rgba(30,18,8,1)", color: "rgba(255,255,255,0.4)" }}
                >
                  <X size={13} />
                </button>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                {played.map((card) => (
                  <div
                    key={card.id}
                    style={{ zoom: 0.72, cursor: "pointer" }}
                    onClick={() => {
                      onFocus(card.id);
                      setOpen(false);
                    }}
                  >
                    <ChallengeCard card={card} inArena onClick={() => {}} />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
