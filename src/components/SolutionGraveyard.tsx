"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Solution } from "@/data/solutions";
import { SolutionCard } from "./GameCard";

interface Props {
  accepted: Solution[];
  onFocus: (id: string) => void;
}

export function SolutionGraveyard({ accepted, onFocus }: Props) {
  const [open, setOpen] = useState(false);
  const count = accepted.length;
  const isEmpty = count === 0;

  return (
    <>
      <button
        onClick={() => !isEmpty && setOpen(true)}
        className="flex flex-col items-center gap-1.5 select-none transition-opacity"
        style={{ opacity: isEmpty ? 0.3 : 1, cursor: isEmpty ? "default" : "pointer" }}
        aria-label="Open solution archive"
      >
        {/* Stacked card pile */}
        <div className="relative" style={{ width: 120, height: 162 }}>
          {isEmpty ? (
            <div
              className="absolute inset-0 rounded"
              style={{
                border: "1.5px dashed rgba(251,43,126,0.22)",
                background: "rgba(251,43,126,0.03)",
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
                      "linear-gradient(145deg, #fb2b7e 0%, #5a0030 40%, #fb2b7ebb 70%, #5a0030 100%)",
                    boxShadow: "0 4px 18px rgba(251,43,126,0.22)",
                    borderRadius: 8,
                    zIndex: offset === 0 ? 3 : offset === 1 ? 2 : 1,
                    opacity: 0.5 + offset * 0.25,
                  }}
                >
                  <div
                    className="w-full h-full rounded"
                    style={{
                      borderRadius: 5,
                      background: "linear-gradient(145deg, #1e0014 0%, #09000a 100%)",
                      backgroundImage:
                        "repeating-linear-gradient(45deg, rgba(251,43,126,0.07) 0px, rgba(251,43,126,0.07) 1px, transparent 1px, transparent 10px)",
                    }}
                  />
                </div>
              ) : null
            )
          )}
          {count > 0 && (
            <div
              className="absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center font-bold font-mono z-10"
              style={{ background: "#fb2b7e", color: "#fff", fontSize: 12 }}
            >
              {count}
            </div>
          )}
        </div>
        <span
          className="font-mono uppercase tracking-widest mt-1"
          style={{ fontSize: 9, color: "rgba(251,43,126,0.45)" }}
        >
          Archive
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
                background: "rgba(10,8,14,1)",
                border: "1px solid rgba(251,43,126,0.2)",
                maxWidth: 680,
                width: "90vw",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p
                    className="font-mono uppercase tracking-widest mb-0.5"
                    style={{ fontSize: 8, color: "rgba(251,43,126,0.4)" }}
                  >
                    Response Archive
                  </p>
                  <p className="text-sm font-bold font-mono" style={{ color: "rgba(251,43,126,0.85)" }}>
                    {count} Solution{count !== 1 ? "s" : ""} Reviewed
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 flex items-center justify-center rounded"
                  style={{ background: "rgba(30,8,20,1)", color: "rgba(255,255,255,0.4)" }}
                >
                  <X size={13} />
                </button>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                {accepted.map((card) => (
                  <div
                    key={card.id}
                    style={{ zoom: 0.72, cursor: "pointer" }}
                    onClick={() => {
                      onFocus(card.id);
                      setOpen(false);
                    }}
                  >
                    <SolutionCard card={card} onClick={() => {}} />
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
