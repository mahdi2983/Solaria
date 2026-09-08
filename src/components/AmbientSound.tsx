"use client";

import React, { useState, useRef } from "react";
import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";

export function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioNode | null>(null);

  const toggleAudio = () => {
    if (!isPlaying) {
      // Start calm ocean/ambient generator
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Pink noise buffer for soothing sea breeze
        const bufferSize = 2 * ctx.sampleRate;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0,
          b1 = 0,
          b2 = 0,
          b3 = 0,
          b4 = 0,
          b5 = 0,
          b6 = 0;

        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.969 * b2 + white * 0.153852;
          b3 = 0.8665 * b3 + white * 0.3104856;
          b4 = 0.55 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.016898;
          output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          output[i] *= 0.035; // gentle ambient volume
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Low-pass filter for deep soothing sound
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2);

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        whiteNoise.start(0);
        noiseSourceRef.current = whiteNoise;
        gainNodeRef.current = gainNode;

        setIsPlaying(true);
      } catch (err) {
        console.error("Audio could not start:", err);
      }
    } else {
      // Fade out and close
      if (gainNodeRef.current && audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
        setTimeout(() => {
          ctx.close();
          setIsPlaying(false);
        }, 500);
      } else {
        setIsPlaying(false);
      }
    }
  };

  return (
    <button
      onClick={toggleAudio}
      aria-label={isPlaying ? "Mute Ambient Soundscape" : "Play Ambient Soundscape"}
      data-cursor="SOUND"
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 text-solaria-bronzeLight border border-white/10 backdrop-blur-md font-mono text-[10px] uppercase tracking-widest transition-all duration-300"
    >
      {isPlaying ? (
        <>
          <SpeakerHigh size={13} weight="fill" className="text-solaria-bronze animate-pulse" />
          <span className="hidden sm:inline">Sound / On</span>
        </>
      ) : (
        <>
          <SpeakerSlash size={13} className="text-solaria-sand" />
          <span className="hidden sm:inline">Sound / Off</span>
        </>
      )}
    </button>
  );
}
