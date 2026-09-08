"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Eye } from "@phosphor-icons/react";

interface ResidenceType {
  id: string;
  name: string;
  category: string;
  area: string;
  terrace: string;
  feature: string;
  image: string;
  description: string;
}

const RESIDENCES: ResidenceType[] = [
  {
    id: "garden",
    name: "Villa Terra Nova",
    category: "Garden Villa",
    area: "410 m²",
    terrace: "280 m²",
    feature: "14m Saltwater Plunge Pool",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=2400&auto=format&fit=crop",
    description: "Sculpted into the lower cliffside with private olive groves and sunken limestone lounge.",
  },
  {
    id: "duplex",
    name: "Duplex Horizon Azur",
    category: "Duplex Horizon",
    area: "490 m²",
    terrace: "240 m²",
    feature: "6.8m Cathedral Glass Salon",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=85&w=2400&auto=format&fit=crop",
    description: "Suspended mid-cliff cantilevers overlooking a 220° unobstructed Mediterranean horizon.",
  },
  {
    id: "penthouse",
    name: "The Solarium Penthouse",
    category: "Sky Penthouse",
    area: "720 m²",
    terrace: "480 m²",
    feature: "22m Glass-Bottom Sky Pool",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=85&w=2400&auto=format&fit=crop",
    description: "The crown monolithic rooftop sanctuary with 360° panoramas and direct helipad access.",
  },
];

export function FullscreenResidences() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const activeUnit = RESIDENCES[activeIndex];

  return (
    <section
      id="residences"
      className="relative min-h-[100dvh] w-full flex flex-col justify-between p-6 sm:p-12 md:p-16 overflow-hidden select-none bg-[#0A0A0C] text-white"
    >
      {/* Background Image Crossfade */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeUnit.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${activeUnit.image}')` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-black/35 to-black/35" />
      </div>

      {/* Top minimal header */}
      <div className="relative z-20 pt-16 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
        <span>THE 18 RESIDENCES</span>
        <span className="text-solaria-bronze">{activeUnit.category}</span>
      </div>

      {/* Center Narrative Focus */}
      <div className="relative z-20 my-auto max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeUnit.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light uppercase tracking-tight text-white leading-none">
              {activeUnit.name}
            </h2>
            <p className="mt-3 max-w-lg text-sm sm:text-base text-white/80 font-editorial italic">
              {activeUnit.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Minimalist Switcher Pills */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {RESIDENCES.map((unit, i) => (
            <button
              key={unit.id}
              onClick={() => setActiveIndex(i)}
              data-cursor="SELECT"
              className={`px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all duration-300 ${
                activeIndex === i
                  ? "bg-solaria-bronze text-[#0A0A0C] font-semibold"
                  : "bg-black/40 hover:bg-black/60 text-white/60 border border-white/10"
              }`}
            >
              {unit.category}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Minimal Specs & Clean Action */}
      <div className="relative z-20 w-full flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-8 font-mono text-xs">
          <div>
            <span className="text-solaria-bronze block text-[9px] uppercase tracking-widest">
              INTERIOR
            </span>
            <span className="text-white text-base font-light">{activeUnit.area}</span>
          </div>
          <div>
            <span className="text-solaria-bronze block text-[9px] uppercase tracking-widest">
              TERRACE
            </span>
            <span className="text-white text-base font-light">{activeUnit.terrace}</span>
          </div>
          <div className="hidden md:block">
            <span className="text-solaria-bronze block text-[9px] uppercase tracking-widest">
              FEATURE
            </span>
            <span className="text-white text-base font-light">{activeUnit.feature}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowModal(true)}
            data-cursor="PLAN"
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 font-mono text-xs text-white uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <Eye size={13} />
            <span>Blueprint</span>
          </button>

          <a
            href="#acquisition"
            data-cursor="INQUIRE"
            className="group pl-5 pr-2 py-2 rounded-full bg-solaria-bronze text-[#0A0A0C] font-display text-xs font-semibold uppercase tracking-wider transition-all duration-400 hover:bg-[#cca87d] flex items-center gap-2"
          >
            <span>Inquire</span>
            <span className="w-5 h-5 rounded-full bg-black/15 flex items-center justify-center">
              <ArrowUpRight size={11} weight="bold" />
            </span>
          </a>
        </div>
      </div>

      {/* Clean Blueprint Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12 bg-black/85 backdrop-blur-2xl"
          >
            <div className="relative w-full max-w-3xl p-8 rounded-3xl bg-[#0E0E12] border border-white/15 text-white">
              <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-6 font-mono text-xs">
                <span className="text-solaria-bronze uppercase tracking-widest">
                  {activeUnit.name} • {activeUnit.area}
                </span>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white/60 hover:text-white uppercase tracking-widest"
                >
                  [ CLOSE ]
                </button>
              </div>

              {/* Minimal SVG Layout */}
              <div className="h-56 sm:h-72 w-full rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center p-4">
                <svg viewBox="0 0 600 350" className="w-full h-full stroke-solaria-bronze fill-none">
                  <rect x="20" y="20" width="560" height="310" strokeWidth="1.5" strokeDasharray="3,3" />
                  <rect x="40" y="40" width="300" height="180" strokeWidth="1.5" className="fill-solaria-bronze/15" />
                  <text x="190" y="135" fill="white" textAnchor="middle" className="font-mono text-xs tracking-widest">
                    LIVING SALON
                  </text>
                  <rect x="360" y="40" width="200" height="130" strokeWidth="1.5" className="fill-white/5" />
                  <text x="460" y="110" fill="white" textAnchor="middle" className="font-mono text-xs tracking-widest">
                    MASTER SUITE
                  </text>
                  <rect x="40" y="240" width="520" height="70" strokeWidth="1.5" className="fill-cyan-500/10 stroke-cyan-400/50" />
                  <text x="300" y="280" fill="white" textAnchor="middle" className="font-mono text-xs tracking-widest">
                    INFINITY TERRACE &amp; POOL
                  </text>
                </svg>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
