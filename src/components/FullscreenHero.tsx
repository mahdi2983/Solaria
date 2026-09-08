"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";

interface FullscreenHeroProps {
  isDusk: boolean;
}

export function FullscreenHero({ isDusk }: FullscreenHeroProps) {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[100dvh] w-full flex flex-col justify-between p-6 sm:p-12 md:p-16 overflow-hidden select-none"
    >
      {/* Full-bleed Background with Day/Dusk Crossfade */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Day Visual */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-luxury ${
            isDusk ? "opacity-0" : "opacity-100"
          }`}
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=2400&auto=format&fit=crop')",
          }}
        />

        {/* Dusk Visual */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-luxury ${
            isDusk ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=85&w=2400&auto=format&fit=crop')",
          }}
        />

        {/* Cinematic Shading */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/40 to-transparent" />
      </div>

      {/* Top Minimal Telemetry */}
      <div className="relative z-10 pt-16 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-white/70">
        <span>CAP D&apos;ANTIBES — 43°33&apos;N 7°07&apos;E</span>
        <span className="hidden sm:inline text-solaria-bronze">18 RESIDENCES</span>
      </div>

      {/* Center Cinematic Title */}
      <div className="relative z-10 my-auto max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(2.75rem,6.5vw,6.5rem)] font-light leading-[1.02] tracking-tight uppercase text-white drop-shadow-md"
        >
          Sculpted by light.
          <br />
          <span className="font-editorial italic font-normal text-solaria-bronze ml-1">
            Rooted in stone.
          </span>
        </motion.h1>

        {/* Single Refined CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8"
        >
          <a
            href="#residences"
            data-cursor="EXPLORE"
            className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-solaria-bronze text-[#0A0A0C] font-display text-xs font-semibold tracking-wider uppercase transition-all duration-500 hover:bg-[#cca87d] active:scale-95 shadow-lg"
          >
            <span>Discover The Residences</span>
            <span className="w-7 h-7 rounded-full bg-black/15 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight size={13} weight="bold" />
            </span>
          </a>
        </motion.div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
        <span>MMXXVI</span>
        <a
          href="#manifesto"
          data-cursor="SCROLL"
          className="group flex items-center gap-2 hover:text-solaria-bronze transition-colors"
        >
          <span>Scroll</span>
          <ArrowDown size={11} className="group-hover:translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
}
