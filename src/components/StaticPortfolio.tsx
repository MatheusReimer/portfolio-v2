"use client";

import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/profile";
import { Mail, X, MapPin, ExternalLink, Printer } from "lucide-react";

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

interface Props {
  open: boolean;
  onClose: () => void;
}

export function StaticPortfolio({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto no-print-backdrop"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            id="portfolio-print-root"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="max-w-3xl mx-auto my-8 rounded-lg overflow-hidden"
            style={{ background: "rgba(8,6,12,1)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-8 pb-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <div>
                <p className="text-[9px] font-mono tracking-[0.3em] uppercase mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Full Portfolio
                </p>
                <h1
                  className="text-3xl font-black mb-1"
                  style={{ fontFamily: "var(--font-cinzel), serif", color: "#fba82b" }}
                >
                  {profile.name}
                </h1>
                <p className="text-[13px] font-mono mb-1" style={{ color: "rgba(251,168,43,0.9)" }}>
                  {profile.role}
                </p>
                <div className="flex items-center gap-1 mb-4">
                  <MapPin size={10} style={{ color: "rgba(255,255,255,0.5)" }} />
                  <p className="text-[11px] font-mono" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {profile.location}
                  </p>
                </div>
                <p className="text-[13px] leading-relaxed max-w-lg mb-5" style={{ color: "rgba(255,255,255,1)" }}>
                  {profile.summary}
                </p>
                <div className="flex gap-4">
                  <a href={profile.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] font-mono transition-colors hover:opacity-80"
                    style={{ color: "rgba(255,255,255,0.75)" }}>
                    <GithubIcon size={12} /> GitHub
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] font-mono transition-colors hover:opacity-80"
                    style={{ color: "rgba(255,255,255,0.75)" }}>
                    <LinkedinIcon size={12} /> LinkedIn
                  </a>
                  <a href={`mailto:${profile.email}`}
                    className="flex items-center gap-1.5 text-[11px] font-mono transition-colors hover:opacity-80"
                    style={{ color: "rgba(255,255,255,0.75)" }}>
                    <Mail size={12} /> {profile.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2 no-print">
                <button
                  onClick={() => {
                    const card = document.getElementById("portfolio-print-root");
                    if (!card) return;
                    const parent = card.parentElement;
                    const next = card.nextSibling;
                    if (!parent) return;
                    document.body.appendChild(card);
                    const restore = () => {
                      try { parent.insertBefore(card, next); } catch { parent.appendChild(card); }
                      window.removeEventListener("afterprint", restore);
                    };
                    window.addEventListener("afterprint", restore);
                    window.print();
                  }}
                  className="transition-colors hover:opacity-70 p-1"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                  title="Print / Save as PDF"
                >
                  <Printer size={16} />
                </button>
                <button onClick={onClose} className="transition-colors hover:opacity-70 p-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="p-8 space-y-10">

              {/* Key numbers */}
              <div className="grid grid-cols-4 gap-3">
                {profile.stats.map((s) => (
                  <div key={s.label} className="p-4 rounded text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <p className="font-bold text-xl font-mono" style={{ color: "#fba82b" }}>{s.value}</p>
                    <p className="text-[9px] font-mono mt-1 uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.65)" }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Professional Summary */}
              <section>
                <SectionLabel>About</SectionLabel>
                <div className="mt-4 space-y-3">
                  <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.95)" }}>{profile.about}</p>
                  <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>{profile.background}</p>
                </div>
              </section>

              {/* Experience */}
              <section>
                <SectionLabel>Experience</SectionLabel>
                <div className="mt-4 space-y-1">
                  {profile.experience.map((e, i) => (
                    <div key={e.company}>
                      <div
                        className="p-5 rounded-lg"
                        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                      >
                        {/* Role + period */}
                        <div className="flex items-start justify-between gap-4 mb-1">
                          <div>
                            <p className="font-semibold text-[14px]" style={{ color: "rgba(255,255,255,1)" }}>{e.role}</p>
                            <p className="text-[11px] font-mono" style={{ color: "rgba(251,168,43,0.7)" }}>{e.company}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.65)" }}>{e.period}</p>
                            <p className="text-[9px] font-mono mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>{e.location}</p>
                          </div>
                        </div>

                        {/* Stack pills */}
                        <div className="flex flex-wrap gap-1.5 my-3">
                          {e.stack.map((t) => (
                            <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded-sm"
                              style={{ background: "rgba(251,168,43,0.08)", color: "rgba(251,168,43,0.8)", border: "1px solid rgba(251,168,43,0.2)" }}>
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Summary line */}
                        <p className="text-[12px] leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.9)" }}>{e.highlight}</p>

                        {/* Bullets */}
                        <div className="space-y-1.5">
                          {e.bullets.map((b) => (
                            <div key={b.text} className="flex items-start gap-2.5">
                              <span className="mt-2 shrink-0 w-1 h-1 rounded-full" style={{ background: "rgba(251,168,43,0.5)" }} />
                              <p className="text-[11.5px] leading-relaxed" style={{ color: "rgba(255,255,255,0.9)" }}>
                                {b.text}
                                {b.url && (
                                  <a
                                    href={b.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 ml-2 transition-opacity hover:opacity-80"
                                    style={{ color: "rgba(251,168,43,0.75)", fontSize: 10, verticalAlign: "middle" }}
                                    onClick={(ev) => ev.stopPropagation()}
                                  >
                                    <ExternalLink size={10} />
                                    {new URL(b.url).hostname.replace("www.", "")}
                                  </a>
                                )}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      {i < profile.experience.length - 1 && (
                        <div className="ml-6 w-px h-3" style={{ background: "rgba(255,255,255,0.06)" }} />
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Technical Skills */}
              <section>
                <SectionLabel>Technical Skills</SectionLabel>
                <div className="mt-4 space-y-4">
                  {[
                    {
                      label: "Front-End",
                      items: ["Vue.js", "Nuxt.js", "Angular", "TypeScript", "JavaScript (ES6+)", "React", "HTML5", "SCSS / CSS3"],
                    },
                    {
                      label: "Back-End",
                      items: ["C#", ".NET", "Node.js", "Python (Django)", "REST API development & integration"],
                    },
                    {
                      label: "Architecture",
                      items: ["SSR", "SSG", "SPA", "Prefetching strategies", "Component-driven design", "State management"],
                    },
                    {
                      label: "Tools & Workflow",
                      items: ["Git", "GitHub", "npm", "VS Code", "Agile / Scrum", "Deployment & hosting"],
                    },
                  ].map((group) => (
                    <div key={group.label} className="flex gap-4">
                      <p className="text-[10px] font-mono uppercase tracking-widest shrink-0 w-28 pt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>
                        {group.label}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <span key={item} className="text-[10px] font-mono px-2 py-0.5 rounded-sm"
                            style={{ background: "rgba(251,168,43,0.08)", color: "rgba(251,168,43,0.85)", border: "1px solid rgba(251,168,43,0.2)" }}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Key Achievements */}
              <section>
                <SectionLabel>Key Achievements</SectionLabel>
                <div className="mt-4 space-y-2.5">
                  {[
                    "Independently built a prefetched Nuxt.js platform from scratch, achieving Lighthouse 90+ across 13,000+ pages on a live production system.",
                    "Contributed to a platform handling 400k+ unique monthly visitors and 35M+ monthly requests.",
                    "Designed and shipped an AI-powered CMS translation pipeline using Google Gemini — clearing a translation backlog in days.",
                    "Led a 2-person team to deliver a full CMS redesign and migration (40 pages) in 21 days — 9 days ahead of a hard deadline.",
                    "Delivered full projects end-to-end as a freelancer before entering the industry professionally.",
                    "Worked across multiple tech stacks (Nuxt/Vue, Angular, C# / .NET, Python / Django, Node.js) across different roles and companies.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: "#fba82b" }} />
                      <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.9)" }}>{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Languages */}
              <section>
                <SectionLabel>Languages</SectionLabel>
                <div className="mt-4 flex gap-6">
                  {profile.languages.map((l) => (
                    <div key={l.name} className="flex items-center gap-3">
                      <p className="text-[13px] font-semibold" style={{ color: "rgba(255,255,255,1)" }}>{l.name}</p>
                      <p className="text-[10px] font-mono px-2 py-0.5 rounded-sm"
                        style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.15)" }}>
                        {l.level}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Contact */}
              <section>
                <SectionLabel>Contact</SectionLabel>
                <div className="flex gap-3 mt-4">
                  <a href={`mailto:${profile.email}`}
                    className="flex items-center gap-2 px-5 py-2.5 text-[12px] font-mono font-semibold rounded transition-all hover:opacity-85"
                    style={{ background: "#fba82b", color: "#06080f" }}>
                    <Mail size={13} /> Send Email
                  </a>
                  <a href={profile.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 text-[12px] font-mono rounded transition-all hover:opacity-80"
                    style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.15)" }}>
                    <GithubIcon size={13} /> GitHub
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 text-[12px] font-mono rounded transition-all hover:opacity-80"
                    style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.15)" }}>
                    <LinkedinIcon size={13} /> LinkedIn
                  </a>
                </div>
              </section>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="text-[10px] font-mono tracking-widest uppercase"
        style={{ fontFamily: "var(--font-cinzel), serif", color: "rgba(255,255,255,0.65)" }}
      >
        {children}
      </span>
      <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
    </div>
  );
}
