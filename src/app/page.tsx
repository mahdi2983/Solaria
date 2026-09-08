"use client";

import React, { useState, useEffect } from "react";
import { ArchitecturalPreloader } from "@/components/ArchitecturalPreloader";
import { FullscreenHeader } from "@/components/FullscreenHeader";
import { FullscreenHero } from "@/components/FullscreenHero";
import { FullscreenManifesto } from "@/components/FullscreenManifesto";
import { FullscreenGalleryStack } from "@/components/FullscreenGalleryStack";
import { FullscreenResidences } from "@/components/FullscreenResidences";
import { FullscreenWellness } from "@/components/FullscreenWellness";
import { FullscreenAcquisition } from "@/components/FullscreenAcquisition";
import { CustomCursor } from "@/components/CustomCursor";

export default function Home() {
  const [isDusk, setIsDusk] = useState(true);
  const [currentChapter, setCurrentChapter] = useState({
    number: "01",
    title: "THE ENCLAVE",
  });

  // Track active chapter on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "hero", number: "01", title: "THE ENCLAVE" },
        { id: "manifesto", number: "02", title: "MANIFESTO" },
        { id: "gallery", number: "03", title: "GALLERY OF MATERIA" },
        { id: "residences", number: "04", title: "THE 18 RESIDENCES" },
        { id: "wellness", number: "05", title: "ELEMENTAL WELLNESS" },
        { id: "acquisition", number: "06", title: "PRIVATE ACQUISITION" },
      ];

      const scrollPos = window.scrollY + window.innerHeight * 0.4;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setCurrentChapter({
            number: sections[i].number,
            title: sections[i].title,
          });
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Bespoke Luxury Magnetic Cursor */}
      <CustomCursor />

      {/* Architectural SVG Vault Preloader */}
      <ArchitecturalPreloader />

      {/* Minimalist Floating Fullscreen HUD Header */}
      <FullscreenHeader
        isDusk={isDusk}
        setIsDusk={setIsDusk}
        currentChapter={currentChapter}
      />

      {/* Continuous Fullscreen Viewport Stream */}
      <main className="w-full max-w-full overflow-x-hidden bg-[#0A0A0C]">
        {/* Chapter 01: Hero Attention */}
        <FullscreenHero isDusk={isDusk} />

        {/* Chapter 02: Architectural Manifesto */}
        <FullscreenManifesto />

        {/* Chapter 03: Pinned Full-bleed Materia Gallery */}
        <FullscreenGalleryStack />

        {/* Chapter 04: The 18 Residences Full-bleed Explorer */}
        <FullscreenResidences />

        {/* Chapter 05: Elemental Wellness Horizontal Panoramic Suite */}
        <FullscreenWellness />

        {/* Chapter 06: Private Acquisition & Concierge */}
        <FullscreenAcquisition />
      </main>
    </>
  );
}
