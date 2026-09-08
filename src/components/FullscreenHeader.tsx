"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, ArrowUpRight } from "@phosphor-icons/react";
import { AmbientSound } from "@/components/AmbientSound";

interface FullscreenHeaderProps {
  isDusk: boolean;
  setIsDusk: React.Dispatch<React.SetStateAction<boolean>>;
  currentChapter: { number: string; title: string };
}

export function FullscreenHeader({
  isDusk,
  setIsDusk,
  currentChapter,
}: FullscreenHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollPercent(Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const chapters = [
    { num: "01", name: "The Enclave", href: "#hero", subtitle: "Rooted in Cliffside Bedrock" },
    { num: "02", name: "Manifesto", href: "#manifesto", subtitle: "Light, Travertine & Void" },
    { num: "03", name: "Gallery of Materia", href: "#gallery", subtitle: "Architectural Immersion" },
    { num: "04", name: "The 18 Residences", href: "#residences", subtitle: "Living Matrix & Blueprints" },
    { num: "05", name: "Elemental Wellness", href: "#wellness", subtitle: "Horizontal Sanctuary Suite" },
    { num: "06", name: "Private Acquisition", href: "#acquisition", subtitle: "Confidential Consultation" },
  ];

  return (
    <>
      {/* Top Floating Minimalist Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 md:px-14 py-6 pointer-events-none text-white select-none">
        {/* Left: Brand Logo */}
        <a
          href="#hero"
          className="pointer-events-auto flex items-center gap-3 group focus:outline-none"
          aria-label="SOLARIA - Return to start"
        >
          <div className="w-8 h-8 rounded-full border border-solaria-bronze/50 bg-black/40 backdrop-blur-md flex items-center justify-center text-solaria-bronze font-mono text-xs font-semibold transition-transform duration-500 group-hover:scale-105">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-display tracking-[0.25em] text-xs sm:text-sm font-semibold uppercase text-white drop-shadow-sm">
              SOLARIA
            </span>
            <span className="font-mono text-[8px] tracking-[0.2em] text-solaria-bronze hidden sm:block">
              CAP D&apos;ANTIBES • MMXXVI
            </span>
          </div>
        </a>

        {/* Center: Live Chapter Telemetry Indicator */}
        <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 font-mono text-[10px] uppercase tracking-[0.2em] text-white/90">
          <span className="w-1.5 h-1.5 rounded-full bg-solaria-bronze animate-pulse" />
          <span className="text-solaria-bronze">{currentChapter.number}</span>
          <span className="text-white/30">—</span>
          <span>{currentChapter.title}</span>
        </div>

        {/* Right Controls: Ambient Sound + Dusk Mode + Inquire CTA + Minimalist Hamburger */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          {/* Ambient Soundscape */}
          <AmbientSound />

          {/* Day / Dusk Lighting Toggle */}
          <button
            onClick={() => setIsDusk((prev) => !prev)}
            aria-label={isDusk ? "Switch to Day Light" : "Switch to Dusk Light"}
            data-cursor="LIGHT"
            className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 backdrop-blur-md flex items-center gap-1.5 text-solaria-bronzeLight font-mono text-[10px] uppercase tracking-wider transition-all duration-300"
          >
            {isDusk ? (
              <>
                <Moon size={13} weight="fill" className="text-solaria-bronze" />
                <span className="hidden sm:inline">Dusk</span>
              </>
            ) : (
              <>
                <Sun size={13} weight="bold" className="text-solaria-bronze" />
                <span className="hidden sm:inline">Day</span>
              </>
            )}
          </button>

          {/* Quick Acquisition CTA */}
          <a
            href="#acquisition"
            data-cursor="INQUIRE"
            className="hidden sm:inline-flex items-center gap-2 pl-3.5 pr-1.5 py-1.5 rounded-full bg-solaria-bronze text-[#0A0A0C] font-display text-[11px] font-semibold tracking-wider uppercase transition-all duration-500 hover:bg-[#cca87d] active:scale-95 shadow-sm"
          >
            <span>Inquire</span>
            <span className="w-5 h-5 rounded-full bg-black/15 flex items-center justify-center">
              <ArrowUpRight size={10} weight="bold" />
            </span>
          </a>

          {/* Minimalist Menu Toggle Button */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle Fullscreen Index"
            data-cursor="MENU"
            className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center gap-1.5 focus:outline-none transition-colors"
          >
            <span
              className={`w-4 h-[1.5px] bg-white transition-all duration-500 ${
                isMenuOpen ? "rotate-45 translate-y-[4.5px] bg-solaria-bronze" : ""
              }`}
            />
            <span
              className={`w-4 h-[1.5px] bg-white transition-all duration-500 ${
                isMenuOpen ? "-rotate-45 -translate-y-[4.5px] bg-solaria-bronze" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Right Screen Edge Scroll Progress Indicator */}
      <div className="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-2 pointer-events-none">
        <div className="w-[2px] h-28 bg-white/10 rounded-full overflow-hidden">
          <div
            className="w-full bg-solaria-bronze transition-all duration-150 ease-out rounded-full"
            style={{ height: `${scrollPercent}%` }}
          />
        </div>
        <span className="font-mono text-[8px] text-solaria-bronze/80 tracking-widest uppercase rotate-90 mt-2">
          {Math.round(scrollPercent)}%
        </span>
      </div>

      {/* Full-Screen Pure Luxury Editorial Curtain Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-between p-8 sm:p-14 md:p-20 bg-[#0A0A0C] text-[#EDEDF0] backdrop-blur-3xl overflow-y-auto"
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div className="font-mono text-xs text-solaria-bronze tracking-[0.25em] uppercase">
                SOLARIA ARCHITECTURAL INDEX
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="font-mono text-xs uppercase tracking-widest text-white/70 hover:text-solaria-bronze transition-colors"
              >
                [ CLOSE INDEX ]
              </button>
            </div>

            {/* Staggered Navigation Chapters */}
            <div className="flex flex-col gap-6 my-auto py-8">
              {chapters.map((chap, idx) => (
                <motion.div
                  key={chap.num}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 + idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col md:flex-row md:items-baseline justify-between border-b border-white/5 pb-4 cursor-pointer"
                >
                  <a
                    href={chap.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-baseline gap-4 md:gap-8"
                  >
                    <span className="font-mono text-xs sm:text-sm text-solaria-bronze font-light">
                      {chap.num}
                    </span>
                    <span className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-tight text-white group-hover:text-solaria-bronze transition-colors duration-400">
                      {chap.name}
                    </span>
                  </a>
                  <span className="font-mono text-xs text-solaria-sand group-hover:text-solaria-bronzeLight transition-colors mt-2 md:mt-0 tracking-wider">
                    {chap.subtitle}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Bottom Menu Provenance */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10 font-mono text-[11px] text-solaria-sand">
              <div>
                <span className="text-solaria-bronze block mb-1">LOCATION</span>
                Cap d&apos;Antibes, French Riviera (43°33&apos;12&quot;N 7°07&apos;48&quot;E)
              </div>
              <div>
                <span className="text-solaria-bronze block mb-1">PROGRAM</span>
                18 Cliffside Monolithic Residences (Pleine Propriété)
              </div>
              <div>
                <span className="text-solaria-bronze block mb-1">DIRECT CONTACT</span>
                concierge@solaria-residences.com
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
