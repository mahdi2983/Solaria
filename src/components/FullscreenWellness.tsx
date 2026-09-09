"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "@phosphor-icons/react";

const WELLNESS_SPACES = [
  {
    id: "pool",
    number: "01 / 04",
    title: "Cantilevered Marine Pool",
    subtitle: "A 45-meter saltwater basin suspended over the open Mediterranean sea.",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=85&w=2000&auto=format&fit=crop",
  },
  {
    id: "spa",
    number: "02 / 04",
    title: "Roman Thermal Vault",
    subtitle: "Subterranean basalt caldarium and sensory hydrotherapy carved in bedrock.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=85&w=2000&auto=format&fit=crop",
  },
  {
    id: "cellar",
    number: "03 / 04",
    title: "Private Sommelier Chai",
    subtitle: "A geological climate-controlled vault housing 6,000 rare grand crus.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=85&w=2000&auto=format&fit=crop",
  },
  {
    id: "fitness",
    number: "04 / 04",
    title: "Bio-Optimization Studio",
    subtitle: "Panoramic athletic pavilion with Technogym Biostrength and sunrise yoga deck.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=85&w=2000&auto=format&fit=crop",
  },
];

export function FullscreenWellness() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !trackRef.current || !triggerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      if (!track) return;

      const scrollLength = track.scrollWidth - window.innerWidth + 80;

      const pinTimeline = gsap.to(track, {
        x: -scrollLength,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: () => `+=${scrollLength * 1.1}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        pinTimeline.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section id="wellness" ref={sectionRef} className="relative overflow-hidden bg-[#0A0A0C] text-white">
      <div ref={triggerRef} className="h-[100dvh] flex flex-col justify-between p-6 sm:p-12 md:p-16 select-none">
        {/* Top Header */}
        <div className="pt-16 flex items-center justify-between w-full font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
          <span>ELEMENTAL WELLNESS</span>
          <span>4 PRIVATE RESORT SPACES</span>
        </div>

        {/* Horizontal Clean Track */}
        <div className="w-full overflow-x-auto lg:overflow-x-visible scrollbar-none my-auto">
          <div
            ref={trackRef}
            className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full lg:w-max items-center"
          >
            {WELLNESS_SPACES.map((item) => (
              <div
                key={item.id}
                data-cursor="PAN"
                className="w-full lg:w-[75vw] max-w-5xl h-[55vh] lg:h-[60vh] flex-shrink-0 relative rounded-3xl overflow-hidden border border-white/10 group shadow-xl"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-black/30 to-black/30" />

                <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between">
                  <span className="font-mono text-sm text-solaria-bronze font-light">
                    {item.number}
                  </span>

                  <div className="max-w-xl">
                    <h3 className="font-display text-2xl sm:text-4xl md:text-5xl uppercase font-light text-white tracking-tight leading-none mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-base text-white/80 font-editorial italic">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom minimal note */}
        <div className="w-full flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 pt-4 border-t border-white/10">
          <span>EXCLUSIVELY FOR RESIDENTS</span>
          <div className="hidden lg:flex items-center gap-2 text-solaria-bronze">
            <span>Scroll vertically to pan</span>
            <ArrowRight size={11} />
          </div>
        </div>
      </div>
    </section>
  );
}
