import type { Metadata } from "next";
import "./globals.css";
import { GrainOverlay } from "@/components/GrainOverlay";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "SOLARIA — Signature Monolithic Residences | French Riviera",
  description:
    "An exclusive cliffside enclave of 18 monolithic architectural residences cast in travertine, raw basalt and bronze overlooking the Mediterranean Sea at Cap d'Antibes.",
  keywords: [
    "Solaria",
    "Monolithic Residences",
    "Luxury Real Estate",
    "French Riviera",
    "Cap d'Antibes",
    "Architectural Sanctuary",
    "Travertine Villa",
  ],
  authors: [{ name: "Solaria Architectural Vanguard" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0A0A0C] text-[#EDEDF0] selection:bg-solaria-bronze selection:text-[#0A0A0C] antialiased">
        <GrainOverlay />
        <SmoothScroll>
          <div className="relative flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
