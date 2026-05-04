"use client";

import { useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import { challenges, Challenge } from "@/data/challenges";
import { ChallengeCard } from "./GameCard";
import { Graveyard } from "./Graveyard";

interface HandCardProps {
  card: Challenge;
  index: number;
  isPlayed: boolean; // currently in arena awaiting acceptance
  arenaRef: React.RefObject<HTMLDivElement | null>;
  onPlay: (id: string) => void;
  onFocus: (id: string) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}

function HandCard({
  card,
  index,
  isPlayed,
  arenaRef,
  onPlay,
  onFocus,
  onDragStart,
  onDragEnd,
}: HandCardProps) {
  const didDragRef = useRef(false);

  function handleDragStart() {
    didDragRef.current = false;
    onDragStart();
  }

  function handleDrag(_: unknown, info: PanInfo) {
    if (Math.abs(info.offset.y) > 8 || Math.abs(info.offset.x) > 8) {
      didDragRef.current = true;
    }
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (didDragRef.current && !isPlayed) {
      const rect = arenaRef.current?.getBoundingClientRect();
      if (
        rect &&
        info.point.y > rect.top &&
        info.point.y < rect.bottom &&
        info.point.x > rect.left &&
        info.point.x < rect.right
      ) {
        onPlay(card.id);
      }
    }
    onDragEnd();
  }

  function handleClick() {
    if (!didDragRef.current) {
      onFocus(card.id);
    }
  }

  const floatDelay = index * 0.45;

  return (
    <motion.div
      animate={{
        rotate: (index - 2) * 2.5,
        opacity: isPlayed ? 0.45 : 1,
        y: isPlayed ? 8 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      drag={!isPlayed}
      dragSnapToOrigin
      dragElastic={0.12}
      dragMomentum={false}
      whileHover={!isPlayed ? { y: -18, scale: 1.03 } : undefined}
      whileDrag={!isPlayed ? { rotate: 0, scale: 1.06, zIndex: 50 } : undefined}
      style={{ zIndex: index, cursor: isPlayed ? "default" : "grab" }}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
    >
      <motion.div
        animate={!isPlayed ? {
          y: [0, -6, -2, -8, 0, -4, 0],
          x: [0, 1.5, 0, -1.5, 0, 2, 0],
        } : { y: 0, x: 0 }}
        transition={!isPlayed ? {
          y: { duration: 4.2 + index * 0.4, repeat: Infinity, ease: "easeInOut", delay: floatDelay },
          x: { duration: 6.1 + index * 0.3, repeat: Infinity, ease: "easeInOut", delay: floatDelay + 0.5 },
        } : { duration: 0.2 }}
        style={{ position: "relative" }}
      >
        <ChallengeCard card={card} onClick={() => {}} />
        {/* "In Play" overlay while card is on the arena awaiting acceptance */}
        {isPlayed && (
          <div
            className="absolute inset-0 rounded-[6px] flex items-end justify-center pb-3"
            style={{ background: "rgba(0,0,0,0.45)" }}
          >
            <span
              className="font-mono uppercase tracking-widest"
              style={{ fontSize: 8, color: "rgba(251,168,43,0.55)" }}
            >
              In Arena
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

interface Props {
  playedIds: string[];
  acceptedIds: string[];
  played: Challenge[];
  onPlay: (id: string) => void;
  onFocus: (id: string) => void;
  arenaRef: React.RefObject<HTMLDivElement | null>;
  onDragStart: () => void;
  onDragEnd: () => void;
}

export function CardHand({
  playedIds,
  acceptedIds,
  played,
  onPlay,
  onFocus,
  arenaRef,
  onDragStart,
  onDragEnd,
}: Props) {
  // Cards leave the hand only when fully accepted into the graveyard
  const visibleCards = challenges.filter((c) => !acceptedIds.includes(c.id));

  return (
    <div className="w-full h-full flex">
      {/* ── Graveyard sidebar — left (amber / player challenges) ── */}
      <div
        className="shrink-0 flex flex-col items-center justify-center"
        style={{ width: 150, borderRight: "1px solid rgba(255,255,255,0.04)" }}
      >
        <Graveyard played={played} onFocus={onFocus} />
      </div>

      {/* ── Card area — center ───────────────────────────────── */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-3 px-6 py-1.5 shrink-0">
          <div className="h-px flex-1 bg-white/5" />
          <span className="text-[10px] font-mono tracking-widest text-white/20 uppercase">
            Your Hand — Drag to Arena
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        <div className="flex-1 flex items-end justify-center gap-3 pb-3">
          {visibleCards.map((card, i) => {
            const isPlayed = playedIds.includes(card.id);
            return (
              <HandCard
                key={card.id}
                card={card}
                index={i}
                isPlayed={isPlayed}
                arenaRef={arenaRef}
                onPlay={onPlay}
                onFocus={onFocus}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
              />
            );
          })}
          {visibleCards.length === 0 && (
            <div className="flex flex-col items-center gap-2 pb-8" style={{ opacity: 0.2 }}>
              <div className="w-16 h-24 rounded" style={{ border: "1.5px dashed rgba(251,168,43,0.4)" }} />
              <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: "rgba(251,168,43,0.6)" }}>
                All Played
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Right spacer for visual balance ─────────────────── */}
      <div className="shrink-0" style={{ width: 150 }} />
    </div>
  );
}
