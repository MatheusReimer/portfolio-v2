"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/profile";

type View = "main" | "manual" | "links" | "about";

interface Props {
  onStart: () => void;
  onPortfolio: () => void;
}

export function IntroMenu({ onStart, onPortfolio }: Props) {
  const [view, setView] = useState<View>("main");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: "#06080f" }}
    >
      {/* Arena-style background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0" style={{ height: "55%", background: "radial-gradient(ellipse 90% 70% at 50% -10%, rgba(251,43,126,0.18) 0%, transparent 70%)" }} />
        <div className="absolute inset-x-0 bottom-0" style={{ height: "55%", background: "radial-gradient(ellipse 90% 70% at 50% 110%, rgba(251,168,43,0.18) 0%, transparent 70%)" }} />
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.013) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.013) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />
        <div className="absolute inset-x-0" style={{ top: "50%", height: 1, background: "linear-gradient(to right, transparent 0%, #fb2b7e 30%, #fba82b 70%, transparent 100%)", opacity: 0.35 }} />
      </div>

      <div className={`relative z-10 w-full px-4 transition-all duration-300 ${view === "about" ? "max-w-2xl" : "max-w-xs"}`}>
        <div className="rounded-2xl px-7 py-6" style={{ background: "rgba(7,5,11,1)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 0 80px rgba(0,0,0,0.8)" }}>
        <AnimatePresence mode="wait">

          {view === "main" && (
            <motion.div
              key="main"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center mb-10"
              >
                <p className="text-[9px] font-mono tracking-[0.45em] uppercase mb-3" style={{ color: "rgba(255,255,255,0.18)" }}>
                  Portfolio — Card Game
                </p>
                <h1
                  className="text-6xl font-black tracking-tight leading-none"
                  style={{ fontFamily: "var(--font-cinzel), serif", color: "#fba82b", textShadow: "0 0 60px rgba(251,168,43,0.5), 0 0 120px rgba(251,168,43,0.2)" }}
                >
                  DUEL<br />PORTFOLIO
                </h1>
                <p className="text-[11px] font-mono tracking-[0.25em] uppercase mt-5" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {profile.name}
                </p>
              </motion.div>

              <div className="flex flex-col gap-2 w-full">
                {[
                  { label: "START DUEL", primary: true,  onClick: onStart },
                  { label: "HOW TO PLAY",               onClick: () => setView("manual") },
                  { label: "LINKS",                      onClick: () => setView("links") },
                  { label: "FULL CURRICULUM",            onClick: onPortfolio },
                  { label: "ABOUT ME",                   onClick: () => setView("about") },
                ].map(({ label, primary, onClick }, i) => (
                  <motion.button
                    key={label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.18 + i * 0.07 }}
                    onClick={onClick}
                    className="w-full py-3 font-mono font-bold text-[11px] tracking-[0.18em] rounded transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={primary
                      ? { background: "linear-gradient(to right, #c07820, #fba82b)", color: "#06080f", boxShadow: "0 4px 24px rgba(251,168,43,0.4)" }
                      : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.09)" }
                    }
                  >
                    {label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {view === "manual" && (
            <motion.div key="manual" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <SubHeader title="HOW TO PLAY" onBack={() => setView("main")} />
              <div className="space-y-5 mt-6">
                {([
                  ["You are the Challenger", "Drag challenge cards from your hand into the battle arena. Each card represents a real engineering problem."],
                  ["Matheus responds", "After you play a card, Matheus answers with solution cards drawn from actual experience."],
                  ["Read the cards", "Click any card to zoom in and read the full technical story at three depths: Overview, Technical, and Deep Dive."],
                  ["Win the duel", "Each challenge reduces Matheus's LP. Play all 5 to bring LP to 0 and win."],
                ] as [string, string][]).map(([title, body]) => (
                  <div key={title}>
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider mb-1" style={{ color: "#fba82b" }}>{title}</p>
                    <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.48)" }}>{body}</p>
                  </div>
                ))}
              </div>
              <BackButton onBack={() => setView("main")} />
            </motion.div>
          )}

          {view === "links" && (
            <motion.div key="links" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <SubHeader title="LINKS" onBack={() => setView("main")} />
              <div className="space-y-3 mt-6">
                <LinkRow label="GitHub"   href={profile.github} />
                <LinkRow label="LinkedIn" href={profile.linkedin} />
                <LinkRow label="Email"    href={`mailto:${profile.email}`} />
              </div>
              <BackButton onBack={() => setView("main")} />
            </motion.div>
          )}

          {view === "about" && (
            <motion.div key="about" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <SubHeader title="ABOUT ME" onBack={() => setView("main")} />
              <div className="mt-5 space-y-5 overflow-y-auto pr-1" style={{ maxHeight: "68vh" }}>

                {/* Bio */}
                <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>
                  {profile.about}
                </p>
                <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.68)" }}>
                  {profile.background}
                </p>

                {/* Personality */}
                <div className="p-3.5 rounded-lg" style={{ background: "rgba(251,168,43,0.06)", border: "1px solid rgba(251,168,43,0.18)" }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-cinzel), serif", color: "rgba(251,168,43,0.8)" }}>
                    How I Work
                  </p>
                  <p className="text-[12.5px] leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                    {profile.personality}
                  </p>
                </div>

                {/* Why a card game */}
                <div className="p-3.5 rounded-lg" style={{ background: "rgba(251,43,126,0.06)", border: "1px solid rgba(251,43,126,0.2)" }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-cinzel), serif", color: "rgba(251,43,126,0.8)" }}>
                    Why a Card Game?
                  </p>
                  <p className="text-[12.5px] leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                    {profile.whyCardGame}
                  </p>
                </div>

                {/* Key stats */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ fontFamily: "var(--font-cinzel), serif", color: "rgba(255,255,255,0.5)" }}>By the Numbers</p>
                  <div className="grid grid-cols-4 gap-2">
                    {profile.stats.map((s) => (
                      <div key={s.label} className="p-2.5 rounded" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
                        <p className="font-mono font-bold text-[17px]" style={{ color: "#fba82b" }}>{s.value}</p>
                        <p className="text-[9px] font-mono mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ fontFamily: "var(--font-cinzel), serif", color: "rgba(255,255,255,0.5)" }}>Experience</p>
                  <div className="grid grid-cols-2 gap-3">
                    {profile.experience.map((e) => (
                      <div key={e.company} className="p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div>
                            <p className="text-[11.5px] font-semibold" style={{ color: "rgba(255,255,255,0.88)" }}>{e.role}</p>
                            <p className="text-[10px] font-mono" style={{ color: "rgba(251,168,43,0.7)" }}>{e.company}</p>
                          </div>
                          <p className="text-[9px] font-mono shrink-0 mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{e.period}</p>
                        </div>
                        <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{e.highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stack */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-2.5" style={{ fontFamily: "var(--font-cinzel), serif", color: "rgba(255,255,255,0.5)" }}>Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.stack.map((t) => (
                      <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded-sm"
                        style={{ background: "rgba(251,168,43,0.1)", color: "rgba(251,168,43,0.85)", border: "1px solid rgba(251,168,43,0.25)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-2.5" style={{ fontFamily: "var(--font-cinzel), serif", color: "rgba(255,255,255,0.5)" }}>Outside the Terminal</p>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.interests.map((interest) => (
                      <span key={interest} className="text-[9px] font-mono px-2 py-0.5 rounded-sm"
                        style={{ background: "rgba(251,43,126,0.09)", color: "rgba(251,43,126,0.82)", border: "1px solid rgba(251,43,126,0.22)" }}>
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages + location */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-2.5" style={{ fontFamily: "var(--font-cinzel), serif", color: "rgba(255,255,255,0.5)" }}>Languages</p>
                  <div className="flex items-end justify-between">
                    <div className="flex gap-6">
                      {profile.languages.map((l) => (
                        <div key={l.name}>
                          <p className="text-[12px] font-semibold" style={{ color: "rgba(255,255,255,0.82)" }}>{l.name}</p>
                          <p className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.42)" }}>{l.level}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.38)" }}>Blumenau, Brazil</p>
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-3 pb-2">
                  <a href={profile.github} target="_blank" rel="noopener noreferrer"
                    className="flex-1 py-2 text-center text-[11px] font-mono rounded transition-all hover:opacity-80"
                    style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    GitHub
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                    className="flex-1 py-2 text-center text-[11px] font-mono rounded transition-all hover:opacity-80"
                    style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    LinkedIn
                  </a>
                  <a href={`mailto:${profile.email}`}
                    className="flex-1 py-2 text-center text-[11px] font-mono rounded transition-all hover:opacity-85"
                    style={{ background: "#fba82b", color: "#06080f", fontWeight: 700 }}>
                    Email
                  </a>
                </div>
              </div>
              <BackButton onBack={() => setView("main")} />
            </motion.div>
          )}

        </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function SubHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-[9px] font-mono tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.28)" }}>{title}</p>
      <button onClick={onBack} className="text-[11px] font-mono transition-colors hover:text-white/60" style={{ color: "rgba(255,255,255,0.28)" }}>
        Back
      </button>
    </div>
  );
}

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      onClick={onBack}
      className="mt-8 w-full py-2.5 text-[11px] font-mono rounded transition-all hover:opacity-80"
      style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.38)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      Back to Menu
    </button>
  );
}

function LinkRow({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="flex items-center justify-between w-full py-3 px-4 rounded transition-all hover:opacity-80"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.65)", fontSize: 12, fontFamily: "monospace" }}
    >
      <span>{label}</span>
      <span style={{ color: "#fba82b" }}>→</span>
    </a>
  );
}
