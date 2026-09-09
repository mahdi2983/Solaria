"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function FullscreenManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!textRef.current || !sectionRef.current) return;

    const lines = textRef.current.querySelectorAll(".manifesto-line");
    gsap.fromTo(
      lines,
      { opacity: 0.15, y: 15 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 75%",
          end: "bottom 40%",
          scrub: true,
        },
      }
    );

    if (bgRef.current) {
      gsap.fromTo(
        bgRef.current,
        { scale: 1.0 },
        {
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center px-6 sm:px-12 md:px-20 overflow-hidden select-none bg-[#0A0A0C] text-white text-center"
    >
      {/* Subtle Slow-Parallax Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=85&w=2400&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C] via-transparent to-[#0A0A0C]" />
      </div>

      {/* Center Poetic Statement */}
      <div ref={textRef} className="relative z-10 max-w-4xl mx-auto space-y-6">
        <span className="manifesto-line font-mono text-[10px] sm:text-xs text-solaria-bronze uppercase tracking-[0.35em] block">
          PHILOSOPHY
        </span>

        <h2 className="manifesto-line font-display text-3xl sm:text-5xl md:text-6xl font-light uppercase tracking-tight text-white leading-[1.1]">
          Where monolithic stone meets the Mediterranean light.
        </h2>

        <p className="manifesto-line font-editorial italic text-solaria-bronzeLight text-lg sm:text-2xl md:text-3xl font-normal max-w-2xl mx-auto leading-relaxed">
          Eighteen private sanctuaries sculpted directly into the ancient Cap d&apos;Antibes cliff face.
        </p>
      </div>
    </section>
  );
}
