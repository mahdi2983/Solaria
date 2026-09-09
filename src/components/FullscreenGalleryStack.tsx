"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface GallerySlide {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  image: string;
}

const GALLERY_SLIDES: GallerySlide[] = [
  {
    id: "slide-1",
    number: "01 / 03",
    title: "The Cliffside Monolith",
    subtitle: "Carved directly into Cap d'Antibes granitic bedrock.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=2400&auto=format&fit=crop",
  },
  {
    id: "slide-2",
    number: "02 / 03",
    title: "Guillotine Glass",
    subtitle: "6.8-meter hydraulic panels sliding into subterranean stone.",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=85&w=2400&auto=format&fit=crop",
  },
  {
    id: "slide-3",
    number: "03 / 03",
    title: "Suspended Cantilevers",
    subtitle: "Fourteen meters of post-tensioned stone projecting over the sea.",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=85&w=2400&auto=format&fit=crop",
  },
];

export function FullscreenGalleryStack() {
  const containerRef = useRef<HTMLElement>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const slides = containerRef.current.querySelectorAll(".gallery-slide-item");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${slides.length * 100}%`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const idx = Math.min(
            slides.length - 1,
            Math.floor(self.progress * slides.length)
          );
          setCurrentSlideIndex((prev) => (prev === idx ? prev : idx));
        },
      },
    });

    slides.forEach((slide, i) => {
      if (i > 0) {
        tl.fromTo(
          slide,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1.0, duration: 1, ease: "power2.inOut" }
        );
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative h-[100dvh] w-full overflow-hidden select-none bg-[#0A0A0C] text-white"
    >
      {GALLERY_SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`gallery-slide-item absolute inset-0 w-full h-full flex flex-col justify-between p-6 sm:p-12 md:p-16 ${
            idx === 0 ? "z-10 opacity-100" : `z-${(idx + 1) * 10} opacity-0`
          }`}
        >
          {/* Background Full-bleed */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-black/30 to-black/30" />

          {/* Top minimal number */}
          <div className="relative z-20 pt-16 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
            <span>MATERIA</span>
            <span className="text-solaria-bronze">{slide.number}</span>
          </div>

          {/* Center Editorial Title */}
          <div className="relative z-20 my-auto max-w-3xl">
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light uppercase tracking-tight text-white leading-none">
              {slide.title}
            </h2>
            <p className="font-editorial italic text-solaria-bronzeLight text-base sm:text-xl md:text-2xl mt-4 max-w-xl font-normal leading-relaxed">
              {slide.subtitle}
            </p>
          </div>

          {/* Bottom simple dots */}
          <div className="relative z-20 flex items-center gap-2">
            {GALLERY_SLIDES.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-400 ${
                  currentSlideIndex === i ? "w-8 bg-solaria-bronze" : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
