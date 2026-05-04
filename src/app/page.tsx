"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameState } from "@/hooks/useGameState";
import { CardHand } from "@/components/CardHand";
import { BattleArena } from "@/components/BattleArena";
import { CardLightbox } from "@/components/CardLightbox";
import { StaticPortfolio } from "@/components/StaticPortfolio";
import { IntroMenu } from "@/components/IntroMenu";
import { profile } from "@/data/profile";
import { playCardReveal, playVictory } from "@/utils/sounds";
import { Grimoire } from "@/components/Grimoire";
import { SolutionGraveyard } from "@/components/SolutionGraveyard";
import { BookOpen } from "lucide-react";

// ─── Inline SVG icons (lucide doesn't export these in this version) ───────────

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ─── LP Bar ───────────────────────────────────────────────────────────────────

function LPBar({
  name,
  lp,
  avatar,
  isOpponent,
}: {
  name: string;
  lp: number;
  avatar: string;
  isOpponent: boolean;
}) {
  const LP_MAX = 8000;
  const pct = Math.max(0, lp / LP_MAX);
  const barColor =
    pct > 0.6 ? "#4ade80" : pct > 0.35 ? "#fbbf24" : "#f87171";

  const accentColor = isOpponent ? "#fb2b7e" : "#fba82b";

  return (
    <div
      className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
      style={{
        background: "rgba(8,5,10,0.8)",
        backdropFilter: "blur(10px)",
        border: `1px solid ${accentColor}28`,
        minWidth: 210,
      }}
    >
      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
        style={
          isOpponent
            ? { background: "linear-gradient(135deg, #8b0040, #4a0025)", border: "1px solid rgba(251,43,126,0.4)", color: "#fb2b7e" }
            : { background: "linear-gradient(135deg, #7a4800, #3d2400)", border: "1px solid rgba(251,168,43,0.4)", color: "#fba82b" }
        }
      >
        {avatar}
      </div>

      {/* Name + bar */}
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold leading-none truncate mb-1.5" style={{ color: "rgba(255,255,255,0.8)" }}>
          {name}
        </p>
        <div className="flex items-center gap-1.5">
          <span className="text-[8px] font-mono shrink-0" style={{ color: `${accentColor}70` }}>LP</span>
          <div className="flex-1 rounded-full overflow-hidden" style={{ height: 5, background: "rgba(255,255,255,0.07)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: barColor }}
              animate={{ width: `${pct * 100}%` }}
              transition={{ type: "spring", stiffness: 70, damping: 18 }}
            />
          </div>
          <span className="text-[10px] font-mono font-bold tabular-nums shrink-0" style={{ color: accentColor }}>
            {lp.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const {
    state,
    played,
    activeSolutions,
    combo,
    acceptedChallenges,
    acceptedSolutions,
    play,
    accept,
    focus,
    blur,
    setDepth,
    reset,
    togglePortfolio,
  } = useGameState();

  const arenaRef = useRef<HTMLDivElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showGrimoire, setShowGrimoire] = useState(false);

  // Auto-open lightbox + play reveal sounds after cards flip onto board
  const autoOpenedKey = useRef("");
  const playedKey = state.playedIds.join(",");
  useEffect(() => {
    if (!playedKey) { autoOpenedKey.current = ""; return; }
    if (playedKey === autoOpenedKey.current) return;
    if (activeSolutions.length === 0) return;
    autoOpenedKey.current = playedKey;
    // Step 1: show the yellow challenge card immediately in the lightbox
    const lastPlayedId = state.playedIds[state.playedIds.length - 1];
    focus(lastPlayedId, "challenge");
    // Single bip when the last solution card lands
    const lastCardDelay = 400 + (activeSolutions.length - 1) * 380;
    setTimeout(() => playCardReveal(0), lastCardDelay);
    // Sounds only — user navigates manually from yellow to pink via lightbox button
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playedKey]);

  // Victory sound
  const prevLP = useRef(state.lpOpponent);
  useEffect(() => {
    if (state.lpOpponent === 0 && prevLP.current > 0) {
      playVictory();
    }
    prevLP.current = state.lpOpponent;
  }, [state.lpOpponent]);

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden"
      style={{ background: "#06080f" }}
    >
      {/* ── Header ───────────────────────────────────────────────── */}
      <header
        className="shrink-0 h-11 flex items-center justify-between px-5 z-20"
        style={{
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <span className="text-[10px] font-mono tracking-[0.2em] text-white/18 uppercase">
          Duel Portfolio
        </span>
        <div className="flex items-center gap-1">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-white/28 hover:text-white/60 transition-colors text-[11px] font-mono"
          >
            <GithubIcon size={12} /> GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-white/28 hover:text-white/60 transition-colors text-[11px] font-mono"
          >
            <LinkedinIcon size={12} /> LinkedIn
          </a>
          <div className="w-px h-3.5 bg-white/10 mx-1" />
          <button
            onClick={() => setShowGrimoire(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono font-semibold rounded transition-all hover:opacity-85"
            style={{ background: "rgba(251,168,43,0.15)", color: "rgba(251,168,43,0.85)", border: "1px solid rgba(251,168,43,0.3)" }}
          >
            <BookOpen size={12} /> Grimoire
          </button>
          <button
            onClick={togglePortfolio}
            className="px-3 py-1.5 text-[11px] font-mono font-semibold rounded transition-all hover:opacity-85"
            style={{ background: "#fb2b7e", color: "#fff" }}
          >
            View Full Portfolio
          </button>
        </div>
      </header>

      {/* ── Battle arena ─────────────────────────────────────────── */}
      <div ref={arenaRef} className="flex-1 relative overflow-hidden">
        {/* Opponent LP — top left */}
        <div className="absolute top-3 left-3 z-10">
          <LPBar
            name={profile.name}
            lp={state.lpOpponent}
            avatar="MR"
            isOpponent={true}
          />
        </div>

        {/* Solution archive — top right (Matheus's side) */}
        <div className="absolute top-3 right-3 z-10">
          <SolutionGraveyard
            accepted={acceptedSolutions}
            onFocus={(id) => focus(id, "solution")}
          />
        </div>

        {/* Player LP — bottom right */}
        <div className="absolute bottom-3 right-3 z-10">
          <LPBar name="Challenger" lp={8000} avatar="?" isOpponent={false} />
        </div>

        <BattleArena
          played={played}
          solutions={activeSolutions}
          combo={combo}
          focusedId={state.focusedId}
          isDragActive={isDragActive}
          onFocusSolution={(id) => focus(id, "solution")}
          onReset={reset}
        />

        {/* ── Victory overlay ──────────────────────────── */}
        {state.lpOpponent === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-20 flex items-center justify-center"
            style={{ background: "rgba(6,8,15,0.92)" }}
          >
            <div className="text-center">
              <motion.p
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[10px] font-mono tracking-[0.3em] uppercase mb-3"
                style={{ color: "rgba(251,168,43,0.55)" }}
              >
                All Challenges Overcome
              </motion.p>
              <motion.p
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.35, type: "spring", stiffness: 260, damping: 20 }}
                className="text-5xl font-bold font-mono tracking-widest"
                style={{ color: "#fba82b" }}
              >
                VICTORY
              </motion.p>
              <motion.button
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={reset}
                className="mt-8 px-8 py-3 text-[11px] font-mono font-bold rounded tracking-widest transition-all hover:opacity-85"
                style={{ background: "#fb2b7e", color: "#fff" }}
              >
                NEW DUEL
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>

      {/* ── Card hand ────────────────────────────────────────────── */}
      <div
        className="shrink-0 h-[430px] relative z-20"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <CardHand
          playedIds={state.playedIds}
          acceptedIds={state.acceptedIds}
          played={acceptedChallenges}
          onPlay={play}
          onFocus={(id) => focus(id, "challenge")}
          arenaRef={arenaRef}
          onDragStart={() => setIsDragActive(true)}
          onDragEnd={() => setIsDragActive(false)}
        />
      </div>

      {/* ── Card lightbox (click to zoom / auto-reveal) ────────── */}
      <CardLightbox
        focusedId={state.focusedId}
        focusedKind={state.focusedKind}
        depth={state.depth}
        onDepth={setDepth}
        onAccept={() => { accept(); blur(); }}
        activeSolutions={activeSolutions}
        onFocusSolution={(id) => focus(id, "solution")}
      />

      {/* ── Full portfolio modal ──────────────────────────────── */}
      <StaticPortfolio open={state.showPortfolio} onClose={togglePortfolio} />

      {/* ── Grimoire ─────────────────────────────────────────── */}
      <Grimoire open={showGrimoire} onClose={() => setShowGrimoire(false)} />

      {/* ── Intro menu ───────────────────────────────────────── */}
      <AnimatePresence>
        {showIntro && (
          <IntroMenu
            onStart={() => setShowIntro(false)}
            onPortfolio={() => { setShowIntro(false); togglePortfolio(); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
