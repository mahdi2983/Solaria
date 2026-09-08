"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

export function ArchitecturalPreloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          triggerExitAnimation();
          return 100;
        }
        const increment = Math.floor(Math.random() * 12) + 8;
        return Math.min(100, prev + increment);
      });
    }, 20);

    // Hard safety timeout: preloader never blocks the user
    const safety = setTimeout(() => {
      setIsDone(true);
      onComplete?.();
    }, 1200);

    return () => {
      clearInterval(timer);
      clearTimeout(safety);
    };
  }, []);

  const triggerExitAnimation = () => {
    if (!containerRef.current) {
      setIsDone(true);
      onComplete?.();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsDone(true);
        onComplete?.();
      },
    });

    tl.to(".preloader-text", {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power3.inOut",
      stagger: 0.05,
    })
      .to(
        containerRef.current,
        {
          clipPath: "ellipse(150% 150% at 50% 50%)",
          opacity: 0,
          duration: 1.1,
          ease: "expo.inOut",
        },
        "-=0.2"
      );
  };

  if (isDone) return null;

  return (
    <AnimatePresence>
      <div
        ref={containerRef}
        onClick={() => {
          setIsDone(true);
          onComplete?.();
        }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-[#0A0A0C] text-[#EDEDF0] px-8 py-12 pointer-events-auto select-none cursor-pointer"
        style={{
          clipPath: "ellipse(100% 100% at 50% 50%)",
        }}
      >
        {/* Top telemetry */}
        <div className="w-full flex items-center justify-between preloader-text font-mono text-[11px] uppercase tracking-[0.25em] text-solaria-sandLight/70">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-solaria-bronze animate-pulse" />
            <span>SOLARIA ARCHITECTURAL FOUNDATION</span>
          </div>
          <span>43°33&apos;12&quot;N 7°07&apos;48&quot;E</span>
        </div>

        {/* Center Vault Mask Emblem & Counter */}
        <div className="flex flex-col items-center justify-center my-auto text-center">
          {/* Architectural Vault Outline */}
          <div className="relative w-28 h-40 mb-8 flex items-center justify-center">
            {/* SVG Vault Arch with animated drawing stroke */}
            <svg
              viewBox="0 0 100 150"
              className="absolute inset-0 w-full h-full stroke-solaria-bronze/40 fill-none"
              strokeWidth="1.5"
            >
              <path
                d="M 10,140 L 10,60 A 40,40 0 0,1 90,60 L 90,140 Z"
                strokeDasharray="400"
                strokeDashoffset={400 - (progress / 100) * 400}
                style={{ transition: "stroke-dashoffset 0.1s linear" }}
              />
              <line
                x1="10"
                y1="140"
                x2="90"
                y2="140"
                stroke="currentColor"
                strokeWidth="1"
                className="opacity-50"
              />
              <circle
                cx="50"
                cy="60"
                r="12"
                stroke="currentColor"
                strokeWidth="1"
                className="opacity-60"
              />
            </svg>
            <span className="font-mono text-xl font-light tracking-tight text-solaria-bronzeLight">
              {progress.toString().padStart(2, "0")}%
            </span>
          </div>

          <h1 className="preloader-text font-display text-2xl md:text-3xl tracking-[0.3em] uppercase text-solaria-basaltLight font-light">
            SOLARIA
          </h1>
          <p className="preloader-text font-editorial italic text-solaria-bronze text-sm md:text-base mt-2 tracking-wide">
            Signature Monolithic Residences
          </p>
        </div>

        {/* Bottom index */}
        <div className="w-full flex items-center justify-between preloader-text font-mono text-[10px] uppercase tracking-[0.2em] text-solaria-sandLight/50">
          <span>18 CLIFFSIDE LOTS — CÔTE D&apos;AZUR</span>
          <span>EST. MMXXVI</span>
        </div>
      </div>
    </AnimatePresence>
  );
}
