# SOLARIA — Signature Monolithic Residences

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?style=flat-square&logo=greensock)](https://gsap.com/)
[![License](https://img.shields.io/badge/License-Proprietary-BFA175?style=flat-square)](file:///c:/Users/user/Downloads/Demo%20architecture/README.md)

> **Architectural Geographic Coordinates:** `43°33'12"N 7°07'48"E` — Cap d'Antibes, Côte d'Azur, France  
> **Program:** 18 Cliffside Monolithic Sanctuaries (*Pleine Propriété*)  
> **Aesthetic Directive:** Mineral Editorial Luxury, Brutalist Massing, Mediterranean Light & Void

---

## Table of Contents

- [1. Project Vision \& Aesthetic Directive](#1-project-vision--aesthetic-directive)
- [2. Tech Stack \& Libraries](#2-tech-stack--libraries)
- [3. Dual-Mode Architecture](#3-dual-mode-architecture)
- [4. Interactive Chapters Breakdown](#4-interactive-chapters-breakdown)
- [5. Setup \& Quickstart Guide](#5-setup--quickstart-guide)
- [6. Engineering Standards \& Conventions](#6-engineering-standards--conventions)
- [7. Project Directory Map](#7-project-directory-map)

---

## 1. Project Vision & Aesthetic Directive

**SOLARIA** is a hyper-luxury digital architectural monograph inspired by the brutalist elegance of **ERA Residence** and Mediterranean modernism. The site presents eighteen monolithic cliffside residences sculpted into the granitic cliffs of Cap d'Antibes.

### Core Aesthetic Pillars

1. **Mineral Editorial Luxury**: Architectural brutalism balanced with high-fashion typography, deep basalt shadows, and warm travertine textures.
2. **Material Authenticity**: Structural materials—fluted Roman travertine, bush-hammered raw basalt, post-tensioned limestone, brushed marine bronze, and frameless structural glass.
3. **Lighting Continuity (Day / Dusk Engine)**: Instantaneous luminescent state shifts between radiant Côte d'Azur afternoon sun and cinematic Mediterranean twilight.
4. **Subtle Tactility**: Film-grade SVG fractal noise grain overlay ([`GrainOverlay`](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/GrainOverlay.tsx#L5-L25)) and double-bezel chamfered hardware borders mimicking precision-milled architectural models.

### Typographic Palette

| Font Family | Application | CSS Variable / Utility | Optical Role |
| :--- | :--- | :--- | :--- |
| **Syne** | Hero & Section Headings | `font-display` (`var(--font-display)`) | Geometric, architectural monumental display |
| **Playfair Display** | Editorial Vignettes & Subtitles | `font-editorial` (`var(--font-editorial)`) | High-fashion italic serif, literary warmth |
| **JetBrains Mono** | Coordinates & Engineering Specs | `font-mono` (`var(--font-mono)`) | Mathematical precision, technical provenance |
| **Cinzel** | Monumental Roman Inscriptions | `var(--font-cinzel)` | Classical Mediterranean stone masonry |

### Chromatic System

```
Obsidian (Dark Canvas)  : #0A0A0C  ████
Travertine Surface     : #141417  ████  (Dark mode) / #F1EFEA (Light mode)
Solaria Bronze Accent   : #BFA175  ████  (Base) / #D9C3A3 (Light) / #8E724B (Dark)
Basalt Light Text       : #EDEDF0  ████
Sand Telemetry Muted    : #787571  ████
```

---

## 2. Tech Stack & Libraries

The project leverages modern front-end performance libraries synchronized through a single animation clock:

| Layer | Package / Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | [Next.js](file:///c:/Users/user/Downloads/Demo%20architecture/package.json#L18) | `14.2.15` | App Router, static generation, React Server Components base |
| **Runtime** | [React](file:///c:/Users/user/Downloads/Demo%20architecture/package.json#L19) / [ReactDOM](file:///c:/Users/user/Downloads/Demo%20architecture/package.json#L20) | `18.3.1` | Client-side reactive views and component tree |
| **Language** | [TypeScript](file:///c:/Users/user/Downloads/Demo%20architecture/package.json#L30) | `5.6.3` | End-to-end static typing and data modeling |
| **Styling** | [Tailwind CSS](file:///c:/Users/user/Downloads/Demo%20architecture/package.json#L29) | `3.4.14` | Bespoke color tokens, custom easing, and bezel shadows |
| **Motion Physics** | [GSAP](file:///c:/Users/user/Downloads/Demo%20architecture/package.json#L16) | `3.12.5` | Timeline sequencing, scroll pinning, and horizontal scrub |
| **Scroll Trigger** | `gsap/ScrollTrigger` | `3.12.5` | Viewport collision detection and scroll-bound animations |
| **Smooth Scroll** | [Lenis](file:///c:/Users/user/Downloads/Demo%20architecture/package.json#L17) | `1.1.14` | Inertial momentum scrolling connected to GSAP ticker |
| **Spring Motion** | [Framer Motion](file:///c:/Users/user/Downloads/Demo%20architecture/package.json#L15) | `11.11.11` | Magnetic cursor spring physics, modal layout transitions |
| **Sound Synthesis** | [Web Audio API](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/AmbientSound.tsx#L16-L84) | Native | 100% code-generated pink noise ocean swell generator |
| **Iconography** | [@phosphor-icons/react](file:///c:/Users/user/Downloads/Demo%20architecture/package.json#L13) | `2.1.7` | Minimalist architectural glyphs |

---

## 3. Dual-Mode Architecture

SOLARIA is engineered with a **Dual-Mode Architecture** offering full parity between a modular Next.js application and a zero-dependency standalone production single-file artifact:

```
                                 ┌──────────────────────────────────┐
                                 │   SOLARIA Digital Experience     │
                                 └─────────────────┬────────────────┘
                                                   │
                 ┌─────────────────────────────────┴─────────────────────────────────┐
                 ▼                                                                   ▼
┌─────────────────────────────────┐                               ┌─────────────────────────────────┐
│     Next.js 14 App Router       │                               │   Standalone Single-File Mode   │
│     (src/app/ & src/components) │                               │           (index.html)          │
├─────────────────────────────────┤                               ├─────────────────────────────────┤
│ • Modular React 18 Components   │                               │ • Zero Node.js runtime needed   │
│ • TypeScript Strict Typings     │                               │ • Embedded Tailwind & GSAP CDN  │
│ • Production Static Bundling    │                               │ • Double-click local execution  │
│ • Enterprise extensibility      │                               │ • Self-contained asset fallbacks│
└─────────────────────────────────┘                               └─────────────────────────────────┘
```

### Architectural Parity Matrix

| Capability | Next.js App Router ([`src/`](file:///c:/Users/user/Downloads/Demo%20architecture/src)) | Standalone File ([`index.html`](file:///c:/Users/user/Downloads/Demo%20architecture/index.html)) |
| :--- | :--- | :--- |
| **Execution Environment** | Node.js 18+ / Vercel / Cloudflare | Any Web Browser (Local or Remote) |
| **Compilation Requirement** | `npm run build` | None (Direct file open) |
| **Smooth Momentum Scroll** | [Lenis](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/SmoothScroll.tsx#L14-L21) + GSAP Ticker | [Lenis CDN](file:///c:/Users/user/Downloads/Demo%20architecture/index.html#L54) + GSAP Ticker |
| **Scroll Pinning & Scrub** | GSAP 3 + ScrollTrigger | GSAP 3 + ScrollTrigger CDN |
| **Magnetic Cursor** | Framer Motion Spring Engine | Native Vanilla JS Pointer Interpolation |
| **Procedural Ocean Sound** | Native Web Audio API | Native Web Audio API |
| **Day / Dusk Crossfade** | React State Crossfade | Vanilla DOM Class & Style Switcher |
| **Blueprint Modal** | Framer Motion `AnimatePresence` | Vanilla CSS Modal Overlay |

---

## 4. Interactive Chapters Breakdown

The SOLARIA monograph is structured into six seamless, continuous fullscreen chapters:

```
[01: THE ENCLAVE] ➔ [02: MANIFESTO] ➔ [03: GALLERY OF MATERIA] ➔ [04: THE 18 RESIDENCES] ➔ [05: ELEMENTAL WELLNESS] ➔ [06: PRIVATE ACQUISITION]
```

### Chapter 01: The Enclave (`#hero`)
- **Component**: [`FullscreenHero`](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/FullscreenHero.tsx#L11-L103)
- **Mechanics**: Full-bleed cinematic background with a 1000ms cubic-bezier transition between day sunlight and dusk illumination. Top telemetry bar reveals real-time GPS coordinates (`43°33'N 7°07'E`) and cliffside provenance.

### Chapter 02: Manifesto (`#manifesto`)
- **Component**: [`FullscreenManifesto`](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/FullscreenManifesto.tsx#L7-L88)
- **Mechanics**: Architectural treatise scrubbed via GSAP ScrollTrigger. Staggered line opacity transforms from `0.15` to `1.0` as the user scrolls, paired with slow scale-up parallax on the cliffside background.

### Chapter 03: Gallery of Materia (`#gallery`)
- **Component**: [`FullscreenGalleryStack`](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/FullscreenGalleryStack.tsx#L39-L133)
- **Mechanics**: GSAP pinned card stack across 300% scroll distance. Three full-bleed material slides (*The Cliffside Monolith*, *Guillotine Glass*, *Suspended Cantilevers*) crossfade with scale compression (`1.05` to `1.0`) while progress dots update synchronously.

### Chapter 04: The 18 Residences (`#residences`)
- **Component**: [`FullscreenResidences`](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/FullscreenResidences.tsx#L51-L213)
- **Data Source**: [`RESIDENCES_DATA`](file:///c:/Users/user/Downloads/Demo%20architecture/src/data/residencesData.ts#L35-L196)
- **Mechanics**: Interactive residence category explorer (*Garden Villas*, *Duplex Horizon*, *Sky Penthouses*). Features instant image crossfade, architectural metric readout (interior/exterior area, features), and an interactive SVG architectural blueprint modal.

### Chapter 05: Elemental Wellness (`#wellness`)
- **Component**: [`FullscreenWellness`](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/FullscreenWellness.tsx#L39-L138)
- **Data Source**: [`AMENITIES_DATA`](file:///c:/Users/user/Downloads/Demo%20architecture/src/data/amenitiesData.ts#L12-L77)
- **Mechanics**: Horizontal panoramic scrub. Converts vertical wheel scroll into horizontal track movement on desktop (`min-width: 1024px`) pinning the viewport while gliding through 4 resort spaces.

### Chapter 06: Private Acquisition (`#acquisition`)
- **Component**: [`FullscreenAcquisition`](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/FullscreenAcquisition.tsx#L7-L169)
- **Mechanics**: Swiss NDA-standard confidential acquisition inquiry form. Upon transmission, generates an encrypted verification dossier identifier (e.g., `SOL-MMXXVI-8492`) with Framer Motion confirmation layout transitions.

---

## 5. Setup & Quickstart Guide

### Prerequisites
- **Node.js**: `18.17.0` or later
- **Package Manager**: `npm` (v9+), `pnpm`, or `yarn`

### Installation

```bash
# 1. Clone or navigate to the project directory
cd "c:\Users\user\Downloads\Demo architecture"

# 2. Install all production and development dependencies
npm install
```

### Development Server

```bash
# Launch the Next.js local development server with Fast Refresh
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### Production Compilation

```bash
# Type check and build optimized static production bundle
npm run build

# Preview the production build locally
npm start
```

### Standalone Browser Usage (Zero Installation)

To run the standalone single-file distribution without Node.js or any build tools:
1. Navigate to the project root directory.
2. Double click [`index.html`](file:///c:/Users/user/Downloads/Demo%20architecture/index.html) to open directly in Chrome, Safari, Firefox, or Edge.
3. Or serve with any static web server:
   ```bash
   npx serve .
   # or via Python 3:
   python -m http.server 8080
   ```

---

## 6. Engineering Standards & Conventions

### TypeScript Type-Safety
- Strict null checks enabled in [`tsconfig.json`](file:///c:/Users/user/Downloads/Demo%20architecture/tsconfig.json).
- Zero `any` policy across core component props and data entities.
- Run type verification anytime with:
  ```bash
  npx tsc --noEmit
  ```

### Conventional Commits
All repository commits follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<optional scope>): <description>

[optional body]

[optional footer(s)]
```

| Commit Type | Usage | Example |
| :--- | :--- | :--- |
| `feat` | New feature or architectural module | `feat(audio): implement biquad lowpass filter for ambient waves` |
| `fix` | Bug fix in visual or interactive behavior | `fix(cursor): prevent magnetic halo jump on window blur` |
| `docs` | Documentation additions or revisions | `docs(readme): document GSAP ScrollTrigger timeline physics` |
| `style` | Code formatting or cosmetic CSS touchups | `style(tokens): adjust travertine hex values for dusk mode` |
| `refactor`| Code restructuring without behavioral change | `refactor(wellness): extract horizontal scroll calculation into helper`|
| `perf` | Performance optimizations | `perf(preloader): hardware-accelerate svg dashoffset transitions`|
| `chore` | Dependency upgrades or build tool changes | `chore(deps): bump gsap to 3.12.5` |

### ChernyCode Workflow Principles
1. **Planning First**: Formulate explicit animation timings and data models prior to code changes.
2. **Deterministic Verification**: Verify code integrity with `npx tsc --noEmit` and `npm run build`.
3. **Continuous Memory**: Maintain documentation in [`README.md`](file:///c:/Users/user/Downloads/Demo%20architecture/README.md) and [`ARCHITECTURE.md`](file:///c:/Users/user/Downloads/Demo%20architecture/ARCHITECTURE.md) to preserve architectural knowledge.

---

## 7. Project Directory Map

```
Demo architecture/
├── index.html                      # Standalone zero-dependency single-file monograph
├── package.json                    # Node dependencies and build scripts
├── tsconfig.json                   # TypeScript compiler configuration
├── tailwind.config.ts              # Tailwind design tokens, typography, and easings
├── next.config.mjs                 # Next.js optimization and remote image domains
├── README.md                       # Comprehensive project documentation
├── ARCHITECTURE.md                 # In-depth technical and animation architecture
└── src/
    ├── app/
    │   ├── globals.css             # CSS custom properties, Lenis overrides, bezel styles
    │   ├── layout.tsx              # Root HTML structure, preconnect fonts, metadata
    │   └── page.tsx                # Main view orchestrating the 6 fullscreen chapters
    ├── components/
    │   ├── AmbientSound.tsx         # Procedural pink noise audio synthesis via Web Audio API
    │   ├── ArchitecturalPreloader.tsx# Roman vault SVG animation & GSAP clip-path exit
    │   ├── CustomCursor.tsx        # Framer Motion magnetic cursor with context badges
    │   ├── FullscreenAcquisition.tsx# Chapter 06: Private Acquisition consultation form
    │   ├── FullscreenGalleryStack.tsx# Chapter 03: Pinned full-bleed Materia gallery
    │   ├── FullscreenHeader.tsx    # Floating HUD header, dusk toggle, curtain index
    │   ├── FullscreenHero.tsx      # Chapter 01: Hero attention with day/dusk crossfade
    │   ├── FullscreenManifesto.tsx # Chapter 02: Architectural manifesto scrub reveal
    │   ├── FullscreenResidences.tsx# Chapter 04: The 18 Residences matrix & blueprint modal
    │   ├── FullscreenWellness.tsx  # Chapter 05: Horizontal panoramic wellness suite
    │   ├── GrainOverlay.tsx        # Hardware-accelerated SVG fractal noise film grain
    │   └── SmoothScroll.tsx        # Lenis smooth scroll ticker synced to GSAP
    ├── data/
    │   ├── amenitiesData.ts        # Typed records for wellness spaces & thermal facilities
    │   └── residencesData.ts       # Typed records for 18 residences, areas, & specifications
    └── lib/
        └── utils.ts                # Class name merging utility (clsx + twMerge)
```

---
*SOLARIA Monolithic Residences — Developed for Côte d'Antibes Vanguard Architecture.*
