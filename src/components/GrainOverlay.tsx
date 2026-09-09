"use client";

import React from "react";

/**
 * Ultra-lightweight GPU-composited film grain overlay.
 * Uses a tiled hardware-accelerated texture pattern to achieve the cinematic
 * editorial aesthetic with 0ms rasterization overhead during scroll.
 */
export function GrainOverlay() {
  return (
    <div
      className="noise-overlay pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    />
  );
}
