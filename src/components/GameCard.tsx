"use client";

import { motion } from "framer-motion";
import {
  Zap, Gauge, Bug, Network, Plug,
  Swords, Shield, Sparkles, AlertOctagon,
  type LucideIcon,
} from "lucide-react";
import { Challenge, ChallengeSubtype } from "@/data/challenges";
import { Solution, SolutionType } from "@/data/solutions";

import hydraImg   from "@/assets/hydra.png";
import lavaImg    from "@/assets/lava.png";
import ruinedKing from "@/assets/ruined-king.png";
import pagesImg   from "@/assets/pages.png";
import golemImg   from "@/assets/golem.png";
import elfImg     from "@/assets/elf.png";
import warriorImg from "@/assets/warrior.png";
import womanImg   from "@/assets/woman.png";
import samuraiImg from "@/assets/samurai.png";
import mageImg    from "@/assets/mage.png";

const CARD_ART: Record<string, string> = {
  // Challenges
  "seo-translation":   pagesImg.src,
  "marketing-scale":   hydraImg.src,
  "search-limitations": lavaImg.src,
  "deadline-migration": ruinedKing.src,
  "data-chaos":        golemImg.src,
  // Solutions
  "gemini-translation":  mageImg.src,
  "json-prefetch-platform": warriorImg.src,
  "algolia-search":      elfImg.src,
  "ai-sprint-delivery":  samuraiImg.src,
  "data-normalization":  womanImg.src,
};

function CardArt({ id, Icon }: { id: string; Icon: LucideIcon }) {
  const src = CARD_ART[id];
  if (!src) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black/40">
        <Icon size={32} style={{ opacity: 0.5, color: "white" }} />
      </div>
    );
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}

// ─── Themes ───────────────────────────────────────────────────────────────────

type ChallengeTheme = { Icon: LucideIcon; typeLabel: string; statLabel: string };
type SolutionTheme  = { Icon: LucideIcon; typeLabel: string; statLabel: string };

const CHALLENGE_THEME: Record<ChallengeSubtype, ChallengeTheme> = {
  traffic:      { Icon: Zap,     typeLabel: "Traffic",      statLabel: "ATK" },
  performance:  { Icon: Gauge,   typeLabel: "Performance",  statLabel: "ATK" },
  legacy:       { Icon: Bug,     typeLabel: "Legacy",       statLabel: "ATK" },
  architecture: { Icon: Network, typeLabel: "Architecture", statLabel: "ATK" },
  integration:  { Icon: Plug,    typeLabel: "Integration",  statLabel: "ATK" },
};

const SOLUTION_THEME: Record<SolutionType, SolutionTheme> = {
  attack:  { Icon: Swords,       typeLabel: "Attack",  statLabel: "ATK" },
  defense: { Icon: Shield,       typeLabel: "Defense", statLabel: "DEF" },
  spell:   { Icon: Sparkles,     typeLabel: "Spell",   statLabel: "MAG" },
  trap:    { Icon: AlertOctagon, typeLabel: "Trap",    statLabel: "TRP" },
};

// ─── Shared card shell (gradient metallic border) ─────────────────────────────

interface ShellProps {
  accent: string;
  frameDark: string;
  isFocused?: boolean;
  sizeClass: string;
  onClick: () => void;
  children: React.ReactNode;
  overlay?: React.ReactNode;
}

function CardShell({ accent, frameDark, isFocused, sizeClass, onClick, children, overlay }: ShellProps) {
  return (
    <div
      onClick={onClick}
      className={["relative cursor-pointer select-none transition-all duration-200 rounded-[6px]", sizeClass].join(" ")}
      style={{
        padding: "2.5px",
        background: `linear-gradient(145deg, ${accent} 0%, ${frameDark} 40%, ${accent}bb 70%, ${frameDark} 100%)`,
        boxShadow: isFocused
          ? `0 0 0 2px ${accent}, 0 6px 32px ${accent}55`
          : `0 3px 16px ${accent}30, 0 1px 0 ${accent}20`,
      }}
    >
      <div
        className="w-full h-full flex flex-col overflow-hidden rounded-[4px]"
        style={{ background: "linear-gradient(165deg, #1c1108 0%, #130d04 50%, #0a0700 100%)" }}
      >
        {children}
      </div>
      {overlay}
    </div>
  );
}

// ─── Inner sections ───────────────────────────────────────────────────────────

function NameBanner({ title, subtitle, Icon, accent, large }: { title: string; subtitle: string; Icon: LucideIcon; accent: string; large?: boolean }) {
  return (
    <div
      className="flex items-start justify-between px-2 pt-1.5 pb-1 shrink-0 gap-1"
      style={{
        background: `linear-gradient(to right, ${accent}22, ${accent}08)`,
        borderBottom: `1px solid ${accent}30`,
      }}
    >
      <div className="min-w-0">
        <p className="text-white font-bold leading-tight truncate" style={{ fontSize: large ? 13 : 10.5 }}>{title}</p>
        <p className="leading-tight truncate" style={{ fontSize: large ? 9.5 : 7.5, color: `${accent}aa` }}>{subtitle}</p>
      </div>
      <Icon size={large ? 16 : 13} color={accent} style={{ opacity: 0.85, flexShrink: 0, marginTop: 2 }} />
    </div>
  );
}

function ArtWindow({ id, Icon, accent, height, large }: { id: string; Icon: LucideIcon; accent: string; height: number; large?: boolean }) {
  return (
    <div
      className="mx-[5px] mt-1 overflow-hidden shrink-0"
      style={{
        height,
        border: `${large ? 2 : 1.5}px solid ${accent}50`,
        borderRadius: 3,
        boxShadow: `inset 0 0 ${large ? 20 : 12}px rgba(0,0,0,0.7), 0 0 4px ${accent}18`,
      }}
    >
      <CardArt id={id} Icon={Icon} />
    </div>
  );
}

function TypeBar({ label, accent, large }: { label: string; accent: string; large?: boolean }) {
  return (
    <div
      className="mx-[5px] mt-[3px] px-1.5 py-px flex items-center shrink-0"
      style={{ background: `${accent}14`, border: `1px solid ${accent}28`, borderRadius: 2 }}
    >
      <span className="font-mono uppercase tracking-widest" style={{ fontSize: large ? 8.5 : 7, color: "rgba(255,255,255,0.4)" }}>
        {label}
      </span>
    </div>
  );
}

function EffectBox({ text, large }: { text: string; large?: boolean }) {
  return (
    <div
      className="flex-1 mx-[5px] mt-[3px] px-[6px] py-[4px] overflow-hidden"
      style={{ background: "rgba(0,0,0,0.38)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 2 }}
    >
      <p className="leading-relaxed line-clamp-4" style={{ fontSize: large ? 9.5 : 7.5, color: "rgba(255,255,255,0.52)" }}>
        {text}
      </p>
    </div>
  );
}

function StatBar({ label, power, accent, large }: { label: string; power: number; accent: string; large?: boolean }) {
  return (
    <div
      className="mx-[5px] mt-[3px] mb-[5px] px-2 py-[3px] flex items-center justify-between shrink-0"
      style={{ background: "rgba(0,0,0,0.4)", border: `1px solid ${accent}22`, borderRadius: 2 }}
    >
      <span className="font-mono font-bold uppercase tracking-wider" style={{ fontSize: large ? 10 : 8, color: `${accent}88` }}>{label}</span>
      <span className="font-mono font-bold tabular-nums" style={{ fontSize: large ? 15 : 12, color: accent }}>{power.toLocaleString()}</span>
    </div>
  );
}

// ─── Challenge Card ───────────────────────────────────────────────────────────

export function ChallengeCard({ card, inArena, isFocused, onClick }: {
  card: Challenge; inArena?: boolean; isFocused?: boolean; onClick: () => void;
}) {
  const t = CHALLENGE_THEME[card.subtype];
  const accent = "#fba82b";
  const artH = inArena ? 110 : 230;
  const sizeClass = inArena ? "w-44 h-[260px]" : "w-[250px] h-[400px]";

  return (
    <CardShell
      accent={accent}
      frameDark="#5a3200"
      isFocused={isFocused}
      sizeClass={sizeClass}
      onClick={onClick}
    >
      <NameBanner title={card.title} subtitle={card.subtitle} Icon={t.Icon} accent={accent} large={!inArena} />
      <ArtWindow id={card.id} Icon={t.Icon} accent={accent} height={artH} large={!inArena} />
      <TypeBar label={`${t.typeLabel} · Challenge`} accent={accent} large={!inArena} />
      <EffectBox text={card.brief} large={!inArena} />
      <StatBar label={t.statLabel} power={card.power} accent={accent} large={!inArena} />
    </CardShell>
  );
}

// ─── Solution Card ────────────────────────────────────────────────────────────

export function SolutionCard({ card, isFocused, onClick }: {
  card: Solution; isFocused?: boolean; onClick: () => void;
}) {
  const t = SOLUTION_THEME[card.type];
  const accent = "#fb2b7e";

  return (
    <CardShell
      accent={accent}
      frameDark="#5a0030"
      isFocused={isFocused}
      sizeClass="w-44 h-[260px]"
      onClick={onClick}
    >
      <NameBanner title={card.title} subtitle={card.subtitle} Icon={t.Icon} accent={accent} />
      <ArtWindow id={card.id} Icon={t.Icon} accent={accent} height={110} />
      <TypeBar label={`${t.typeLabel} · Solution`} accent={accent} />
      <EffectBox text={card.brief} />
      <StatBar label={t.statLabel} power={card.power} accent={accent} />
    </CardShell>
  );
}

// ─── Face-Down Card ───────────────────────────────────────────────────────────

export function FaceDownCard({ index = 0 }: { index?: number }) {
  return (
    <motion.div
      initial={{ y: -24, opacity: 0, rotateX: 20 }}
      animate={{ y: 0, opacity: 1, rotateX: 0 }}
      exit={{ y: -16, opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 280, damping: 26 }}
      className="relative select-none flex-shrink-0 rounded-[6px]"
      style={{
        width: 176,
        height: 260,
        padding: "2.5px",
        background: "linear-gradient(145deg, #fb2b7e 0%, #5a0030 40%, #fb2b7ebb 70%, #5a0030 100%)",
        boxShadow: "0 3px 16px rgba(251,43,126,0.25)",
      }}
    >
      <div
        className="w-full h-full overflow-hidden rounded-[4px] relative"
        style={{ background: "linear-gradient(145deg, #1e0014 0%, #12000c 50%, #09000a 100%)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, rgba(251,43,126,0.1) 0px, rgba(251,43,126,0.1) 1px, transparent 1px, transparent 14px),
              repeating-linear-gradient(-45deg, rgba(251,43,126,0.1) 0px, rgba(251,43,126,0.1) 1px, transparent 1px, transparent 14px)
            `,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-10 h-10 flex items-center justify-center"
              style={{ border: "1px solid rgba(251,43,126,0.45)", transform: "rotate(45deg)" }}
            >
              <div style={{ width: 16, height: 16, border: "1px solid rgba(251,43,126,0.3)" }} />
            </div>
            <span className="font-mono tracking-widest uppercase" style={{ fontSize: 8, color: "rgba(251,43,126,0.4)" }}>???</span>
          </div>
        </div>
        <div className="absolute inset-0 rounded-[4px]" style={{ boxShadow: "inset 0 0 24px rgba(251,43,126,0.08)" }} />
      </div>
    </motion.div>
  );
}
