"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle, ShieldCheck } from "@phosphor-icons/react";

export function FullscreenAcquisition() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    residenceInterest: "all",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `SOL-MMXXVI-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(generatedRef);
    setIsSubmitted(true);
  };

  return (
    <section
      id="acquisition"
      className="relative min-h-[100dvh] w-full flex flex-col justify-between p-6 sm:p-12 md:p-16 overflow-hidden select-none bg-[#0A0A0C] text-white"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-solaria-bronze/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Telemetry */}
      <div className="relative z-20 pt-16 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
        <span>CONFIDENTIAL ACQUISITION</span>
        <span>SWISS NDA STANDARD</span>
      </div>

      {/* Center Refined Form */}
      <div className="relative z-20 my-auto max-w-2xl w-full mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl sm:text-5xl font-light uppercase tracking-tight text-white leading-none">
            Private Consultation
          </h2>
          <p className="mt-2 text-sm text-white/70 font-editorial italic">
            Direct coordination with the Principal Architect.
          </p>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-[#111116] border border-white/10 shadow-2xl">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="font-mono text-[10px] uppercase tracking-widest text-solaria-bronze block mb-1.5"
                  >
                    Principal Name / Family Office *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                    }
                    placeholder="Lord Alexander Sinclair"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-solaria-bronze focus:outline-none font-display text-xs text-white placeholder:text-white/30 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="font-mono text-[10px] uppercase tracking-widest text-solaria-bronze block mb-1.5"
                    >
                      Confidential Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder="principal@familyoffice.ch"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-solaria-bronze focus:outline-none font-display text-xs text-white placeholder:text-white/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="font-mono text-[10px] uppercase tracking-widest text-solaria-bronze block mb-1.5"
                    >
                      Encrypted Phone / Signal
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      placeholder="+41 22 819 00 00"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-solaria-bronze focus:outline-none font-display text-xs text-white placeholder:text-white/30 transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-white/60">
                  <div className="flex items-center gap-1.5 text-solaria-bronze">
                    <ShieldCheck size={14} weight="fill" />
                    <span>Non-Disclosure Assurance</span>
                  </div>
                  <span>Strict Swiss Escrow</span>
                </div>

                <div className="pt-4 flex justify-center">
                  <button
                    type="submit"
                    data-cursor="SUBMIT"
                    className="group inline-flex items-center gap-3 pl-8 pr-2.5 py-2.5 rounded-full bg-solaria-bronze text-[#0A0A0C] font-display text-xs font-semibold tracking-wider uppercase transition-all duration-500 hover:bg-[#cca87d] active:scale-95 shadow-lg"
                  >
                    <span>Transmit Confidential Request</span>
                    <span className="w-7 h-7 rounded-full bg-black/15 flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight size={13} weight="bold" />
                    </span>
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-3"
              >
                <div className="w-10 h-10 rounded-full bg-solaria-bronze/20 text-solaria-bronze mx-auto flex items-center justify-center border border-solaria-bronze/40">
                  <CheckCircle size={22} weight="fill" />
                </div>
                <div>
                  <span className="font-mono text-xs text-solaria-bronze tracking-widest uppercase">
                    CONFIRMED • REF: {bookingRef}
                  </span>
                  <h3 className="font-display text-xl uppercase font-light text-white mt-1">
                    Dossier Dispatched
                  </h3>
                </div>
                <p className="text-xs text-white/70 font-light leading-relaxed max-w-sm mx-auto">
                  Thank you, {formData.fullName || "Principal"}. Your confidential dossier transmission is being processed.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Legal Index */}
      <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t border-white/10 font-mono text-[9px] uppercase tracking-widest text-white/40">
        <div>© MMXXVI SOLARIA RESIDENCES • CAP D&apos;ANTIBES</div>
        <div>STRICT DISCRETION GUARANTEED</div>
      </div>
    </section>
  );
}
