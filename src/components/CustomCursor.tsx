"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Watch for custom cursor attributes
    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (target) {
        setIsHovered(true);
        setCursorText(target.getAttribute("data-cursor") || "");
      } else {
        const isClickable = (e.target as HTMLElement).closest(
          "button, a, input, select, textarea, [role='button']"
        );
        if (isClickable) {
          setIsHovered(true);
          setCursorText("");
        } else {
          setIsHovered(false);
          setCursorText("");
        }
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Outer Circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center border border-solaria-bronze/60 bg-solaria-bronze/10 backdrop-blur-[2px]"
        animate={{
          x: mousePosition.x - (isHovered ? (cursorText ? 40 : 24) : 12),
          y: mousePosition.y - (isHovered ? (cursorText ? 40 : 24) : 12),
          width: isHovered ? (cursorText ? 80 : 48) : 24,
          height: isHovered ? (cursorText ? 80 : 48) : 24,
        }}
        transition={{
          type: "spring",
          damping: 28,
          stiffness: 300,
          mass: 0.5,
        }}
      >
        {cursorText && (
          <span className="font-mono text-[9px] uppercase tracking-widest text-solaria-bronze font-bold select-none text-center px-1">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center Micro Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-solaria-bronze"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          opacity: cursorText ? 0 : 1,
        }}
        transition={{
          type: "spring",
          damping: 35,
          stiffness: 450,
          mass: 0.2,
        }}
      />
    </div>
  );
}
