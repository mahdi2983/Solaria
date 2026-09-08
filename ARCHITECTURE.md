# SOLARIA — Architectural Engineering & Motion Specification

> **Document Version:** `1.0.0`  
> **Classification:** Technical Architecture Specification  
> **Project:** SOLARIA — Signature Monolithic Residences  
> **Location Provenance:** Cap d'Antibes, Côte d'Azur (43°33'12"N 7°07'48"E)

---

## Executive Summary

The **SOLARIA** architecture combines high-performance client rendering, mathematical audio synthesis, and inertial scroll physics into a continuous, single-page luxury monograph. This specification details the system design, motion choreography, sound engineering, cursor physics, and data architecture implemented across the application.

```mermaid
flowchart TD
    subgraph BrowserRuntime ["Browser Client Runtime"]
        DOM["DOM Viewport (100dvh)"]
        Lenis["Lenis Virtual Scroll Engine"]
        GSAPTicker["GSAP Global Ticker (lagSmoothing: 0)"]
        ScrollTrigger["GSAP ScrollTrigger Observer"]
        FramerSpring["Framer Motion Spring Solver"]
        WebAudio["Native Web Audio Context"]
    end

    subgraph ComponentLayer ["Fullscreen Component Hierarchy"]
        Preloader["ArchitecturalPreloader"]
        Cursor["CustomCursor (Z-Index 99999)"]
        Header["FullscreenHeader HUD"]
        Hero["Ch. 01: FullscreenHero"]
        Manifesto["Ch. 02: FullscreenManifesto"]
        Gallery["Ch. 03: FullscreenGalleryStack (Pinned)"]
        Residences["Ch. 04: FullscreenResidences"]
        Wellness["Ch. 05: FullscreenWellness (Horizontal)"]
        Acquisition["Ch. 06: FullscreenAcquisition"]
    end

    subgraph DataStore ["Typed Domain Models"]
        ResData["residencesData.ts (ResidenceLot[])"]
        AmenData["amenitiesData.ts (AmenitySpace[])"]
    end

    Lenis -->|Scroll Event| ScrollTrigger
    GSAPTicker -->|lenis.raf(time)| Lenis
    ScrollTrigger -->|Scrub & Pin| Gallery
    ScrollTrigger -->|Scrub & Pin| Wellness
    ScrollTrigger -->|Stagger Reveal| Manifesto
    FramerSpring -->|Spring Trajectory| Cursor
    WebAudio -->|Pink Noise & Low-Pass| Header
    ResData --> Residences
    AmenData --> Wellness
```

---

## 1. Fullscreen Viewport & Continuity Design System

The application eliminates conventional scrolling seams in favor of a **Continuous Fullscreen Viewport Stream**, where every section commands 100% of the active viewport (`min-h-[100dvh]` / `h-[100dvh]`).

### 1.1 Architectural HUD & Telemetry Observer

The navigation overlay ([`FullscreenHeader`](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/FullscreenHeader.tsx#L14-L218)) acts as a floating, non-intrusive Heads-Up Display (HUD) with four integrated sub-systems:

1. **Chapter Position Telemetry**: Tracks the user's position relative to the six chapters using a passive window scroll listener with a 40% vertical offset threshold:
   ```typescript
   // src/app/page.tsx
   const scrollPos = window.scrollY + window.innerHeight * 0.4;
   for (let i = sections.length - 1; i >= 0; i--) {
     const el = document.getElementById(sections[i].id);
     if (el && el.offsetTop <= scrollPos) {
       setCurrentChapter({ number: sections[i].number, title: sections[i].title });
       break;
     }
   }
   ```
2. **Right-Edge Progress Indicator Rail**: Calculates global scroll percentage `(scrollY / totalScroll) * 100` and translates it into an animated bronze vertical bar on the right screen border.
3. **Lighting Engine (Day / Dusk Toggle)**: Manages continuous ambient state (`isDusk: boolean`). Modifies hero imagery with a 1000ms crossfade (`cubic-bezier(0.32, 0.72, 0, 1)`) and adjusts component color accents between natural limestone daylight and midnight bronze twilight.
4. **Fullscreen Editorial Curtain Menu**: Staggered polygon clip-path reveal (`polygon(0 0, 100% 0, 100% 100%, 0 100%)`) with spring-eased navigational links that display geographic coordinates, lot programs, and confidential contact points.

### 1.2 Analog Film Grain Emulation

To soften digital rendering and evoke architectural photography prints, a persistent SVG procedural noise overlay is mounted at the root level ([`GrainOverlay`](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/GrainOverlay.tsx#L5-L25)):

```tsx
// src/components/GrainOverlay.tsx
export function GrainOverlay() {
  return (
    <div className="noise-overlay" aria-hidden="true">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
```

- **CSS Specs**: Fixed position, `width: 100vw`, `height: 100vh`, `pointer-events: none`, `z-index: 9999`, and `opacity: 0.035`.
- **GPU Acceleration**: Synthesized through the SVG filter engine, avoiding recurring network image fetches and preventing layout reflow.

### 1.3 Architectural Vault Preloader

The preloader ([`ArchitecturalPreloader`](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/ArchitecturalPreloader.tsx#L7-L150)) implements an animated Roman Arch SVG stroke that interpolates with integer loading percentage:

```
strokeDashoffset = 400 - (progress / 100) * 400
```

Upon reaching 100% progress, GSAP orchestrates an exit sequence:
1. Staggers typography upward and fades opacity (`y: -20, opacity: 0, duration: 0.5s`).
2. Expands the preloader mask with an elliptical clip-path (`clipPath: "ellipse(150% 150% at 50% 50%)"`, `duration: 1.1s`, `ease: "expo.inOut"`).
3. Executes a fail-safe unmount timeout (`1200ms`) guaranteeing no thread lock or blocking user interaction.

---

## 2. Motion Choreography & GSAP ScrollTrigger Physics

SOLARIA pairs **Lenis** momentum scrolling with **GSAP 3 ScrollTrigger** by uncoupling browser wheel events from the native rendering pipeline and driving them through a single clock.

```
[Hardware Mouse Wheel] 
         │
         ▼
[Lenis Virtual Scroll Accumulator]
         │ (Normalized delta)
         ▼
[GSAP Global Ticker (lenis.raf)] ───► [ScrollTrigger.update()]
                                              │
                         ┌────────────────────┴────────────────────┐
                         ▼                                         ▼
           [Pinned Gallery Stack]                    [Horizontal Wellness Track]
           (Opacity & Scale Scrub)                   (X-Axis Matrix Translation)
```

### 2.1 Virtual Momentum Clock Synchronization

The ticker synchronization is encapsulated within [`SmoothScroll`](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/SmoothScroll.tsx#L8-L39):

```typescript
// src/components/SmoothScroll.tsx
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.3,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential decay curve
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothWheel: true,
  wheelMultiplier: 0.85,
});

// Broadcast Lenis frame updates to ScrollTrigger
lenis.on("scroll", ScrollTrigger.update);

// Bind Lenis RAF directly to GSAP's optimized ticker
const updateLenis = (time: number) => {
  lenis.raf(time * 1000);
};

gsap.ticker.add(updateLenis);
gsap.ticker.lagSmoothing(0); // Disable lag smoothing to prevent stutter on frame dips
```

### 2.2 Pinned Stacking Mechanics (Chapter 03: Gallery of Materia)

In [`FullscreenGalleryStack`](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/FullscreenGalleryStack.tsx#L39-L133), full-bleed material studies are stacked atop one another using relative scroll extents:

```typescript
// src/components/FullscreenGalleryStack.tsx
const slides = containerRef.current.querySelectorAll(".gallery-slide-item");

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: containerRef.current,
    start: "top top",
    end: `+=${slides.length * 100}%`, // Pins container for N * 100vh of scroll distance
    pin: true,
    scrub: 1, // 1-second inertial lag for silky feel
    onUpdate: (self) => {
      const idx = Math.min(
        slides.length - 1,
        Math.floor(self.progress * slides.length)
      );
      setCurrentSlideIndex(idx);
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
```

- **Pinning Strategy**: Locks the section at `top top` while the user scrolls through `300%` viewport distance.
- **Visual Stacking**: Subsequent slides scale down from `1.05` to `1.0` while fading from `0` to `1` opacity, simulating monolithic stone slabs lowering into place.

### 2.3 Horizontal Scrub Suite (Chapter 05: Elemental Wellness)

In [`FullscreenWellness`](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/FullscreenWellness.tsx#L39-L138), vertical scroll input is translated into horizontal panoramic displacement:

```typescript
// src/components/FullscreenWellness.tsx
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
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  return () => {
    pinTimeline.kill();
  };
});
```

- **Responsive Isolation (`matchMedia`)**: Operates on viewports `≥ 1024px`. On smaller mobile screens, GSAP collapses cleanly into native CSS overflow scrolling (`overflow-x-auto` with `scrollbar-none`).
- **Precision Travel Calculation**: Computes exact track delta `scrollWidth - window.innerWidth + 80` to prevent over-scroll clipping.

---

## 3. Sound Engineering: Native Web Audio API Synthesis

SOLARIA integrates an architectural soundscape that requires **zero audio file downloads** (0 KB MP3/WAV payload). Ocean breezes and low-frequency marine tides are synthesized mathematically on the client using the browser's native **Web Audio API** ([`AmbientSound`](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/AmbientSound.tsx#L6-L107)).

```
┌─────────────────────────┐
│ White Noise Generator   │ Math.random() * 2 - 1
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Paul Kellet Pink Noise  │ 6-pole filter network
│ Buffer Source           │ (-3dB/octave slope)
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Biquad Low-Pass Filter  │ Cutoff: 320 Hz
│ (Deep Subterranean Tide)│
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ GainNode Ramping Engine │ Fade in: 0.01 ➔ 0.08 (2.0s)
│ (Click-free volume)     │ Fade out: 0.08 ➔ 0.0001 (0.5s)
└────────────┬────────────┘
             │
             ▼
[ctx.destination (Speakers)]
```

### 3.1 Paul Kellet Pink Noise Algorithm

Standard white noise contains equal energy per Hertz, resulting in harsh, hissing frequencies. Pink noise features equal energy per octave (-3dB/octave attenuation), closely mirroring natural ocean tides and ambient wind. 

A 2-second looped audio buffer is filled using Paul Kellet's filtered IIR algorithm:

```typescript
// src/components/AmbientSound.tsx
const bufferSize = 2 * ctx.sampleRate;
const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
const output = noiseBuffer.getChannelData(0);
let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

for (let i = 0; i < bufferSize; i++) {
  const white = Math.random() * 2 - 1;
  b0 = 0.99886 * b0 + white * 0.0555179;
  b1 = 0.99332 * b1 + white * 0.0750759;
  b2 = 0.969 * b2 + white * 0.153852;
  b3 = 0.8665 * b3 + white * 0.3104856;
  b4 = 0.55 * b4 + white * 0.5329522;
  b5 = -0.7616 * b5 - white * 0.016898;
  output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
  output[i] *= 0.035; // Gentle baseline acoustic gain
  b6 = white * 0.115926;
}
```

### 3.2 Biquad Low-Pass Filtering & Exponential Ramping

To recreate the resonance of waves crashing against submerged Cap d'Antibes cliffs:
1. **Low-Pass Filter**: A biquad filter is inserted with cutoff set at `320Hz`:
   ```typescript
   const filter = ctx.createBiquadFilter();
   filter.type = "lowpass";
   filter.frequency.setValueAtTime(320, ctx.currentTime);
   ```
2. **Exponential Gain Ramping**: Prevents audio pop/clicks during activation and deactivation:
   - **Fade In**: Ramps from `0.01` to `0.08` over 2 seconds (`gainNode.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2)`).
   - **Fade Out**: Drops to `0.0001` over 500ms before calling `ctx.close()`:
     ```typescript
     gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
     setTimeout(() => {
       ctx.close();
       setIsPlaying(false);
     }, 500);
     ```

---

## 4. Custom Magnetic Cursor Mechanics

The cursor ([`CustomCursor`](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/CustomCursor.tsx#L6-L96)) replaces default OS pointers on desktop devices with an animated dual-body spring physics system.

```
[Mouse Position (x, y)]
      │
      ├───────────────────────────────────────────┐
      ▼ (Spring: mass 0.5, damp 28, stiff 300)    ▼ (Spring: mass 0.2, damp 35, stiff 450)
┌─────────────────────────────────┐         ┌─────────────────────────────────┐
│      Outer Halo Ring            │         │      Center Micro-Dot           │
│  (Expands & Displays Badges)    │         │  (Pins tight to exact pointer)  │
└─────────────────────────────────┘         └─────────────────────────────────┘
```

### 4.1 Physics Configuration Matrix

| Element | Default Dimensions | Hovered Dimensions | Text Badge Dimensions | Spring Stiffness | Damping | Mass |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Outer Halo** | `24px × 24px` | `48px × 48px` | `80px × 80px` | `300` | `28` | `0.5` |
| **Inner Dot** | `6px × 6px` | Hidden when badge active | Hidden | `450` | `35` | `0.2` |

### 4.2 Declarative Target API

Any DOM element can trigger contextual cursor states through declarative `data-cursor` attributes:

```html
<!-- Triggers 80px halo containing bold uppercase label -->
<a href="#residences" data-cursor="EXPLORE">Discover</a>
<button data-cursor="PLAN">Blueprint</button>
<div data-cursor="PAN">Sanctuary Slide</div>
<button data-cursor="SOUND">Audio Toggle</button>
<button data-cursor="LIGHT">Day/Dusk Switch</button>
<button data-cursor="MENU">Index</button>
<button data-cursor="SUBMIT">Transmit</button>
```

### 4.3 Implementation Details
- **Passive Event Registration**: Registered on `window` with `mousemove`, `mouseleave`, and `mouseover`.
- **Target Delegation**: Uses `(e.target as HTMLElement).closest("[data-cursor]")` to traverse child nodes efficiently.
- **Safety Isolation**: Encapsulated in `pointer-events-none fixed inset-0 z-[99999]` with `hidden lg:block` to avoid touch screen conflicts.

---

## 5. Component Directory & Data Architecture

The project maintains strict separation between presentation components and typed architectural datasets.

### 5.1 Component Directory

| Component | File Path | Type | Key Dependencies | Primary Functionality |
| :--- | :--- | :--- | :--- | :--- |
| **ArchitecturalPreloader** | [`src/components/ArchitecturalPreloader.tsx`](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/ArchitecturalPreloader.tsx) | Client Component | `framer-motion`, `gsap` | Roman arch SVG progress animation & clip-path exit |
| **FullscreenHeader** | [`src/components/FullscreenHeader.tsx`](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/FullscreenHeader.tsx) | Client Component | `framer-motion`, `AmbientSound` | HUD bar, telemetry readout, curtain index navigation |
| **AmbientSound** | [`src/components/AmbientSound.tsx`](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/AmbientSound.tsx) | Client Component | Native Web Audio API | Procedural ocean wave pink noise synthesis |
| **CustomCursor** | [`src/components/CustomCursor.tsx`](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/CustomCursor.tsx) | Client Component | `framer-motion` | Spring-damped dual cursor with `data-cursor` badges |
| **FullscreenHero** | [`src/components/FullscreenHero.tsx`](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/FullscreenHero.tsx) | Client Component | `framer-motion` | Chapter 01: Hero with day/dusk illumination crossfade |
| **FullscreenManifesto** | [`src/components/FullscreenManifesto.tsx`](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/FullscreenManifesto.tsx) | Client Component | `gsap/ScrollTrigger` | Chapter 02: Scrubbed architectural manifesto reveal |
| **FullscreenGalleryStack**| [`src/components/FullscreenGalleryStack.tsx`](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/FullscreenGalleryStack.tsx)| Client Component | `gsap/ScrollTrigger` | Chapter 03: Pinned full-bleed Materia gallery cards |
| **FullscreenResidences** | [`src/components/FullscreenResidences.tsx`](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/FullscreenResidences.tsx) | Client Component | `framer-motion` | Chapter 04: The 18 Residences explorer & SVG blueprint |
| **FullscreenWellness** | [`src/components/FullscreenWellness.tsx`](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/FullscreenWellness.tsx) | Client Component | `gsap/ScrollTrigger` | Chapter 05: Horizontal panoramic wellness suite |
| **FullscreenAcquisition**| [`src/components/FullscreenAcquisition.tsx`](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/FullscreenAcquisition.tsx)| Client Component | `framer-motion` | Chapter 06: Private acquisition VIP consultation form |
| **GrainOverlay** | [`src/components/GrainOverlay.tsx`](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/GrainOverlay.tsx) | Pure Component | SVG `<feTurbulence>` | Hardware-accelerated film grain emulation |
| **SmoothScroll** | [`src/components/SmoothScroll.tsx`](file:///c:/Users/user/Downloads/Demo%20architecture/src/components/SmoothScroll.tsx) | Client Component | `lenis`, `gsap` | Lenis momentum scroll sync with GSAP ticker |

---

### 5.2 Data Architecture & Domain Contracts

#### 1. Residence Lot Contract ([`residencesData.ts`](file:///c:/Users/user/Downloads/Demo%20architecture/src/data/residencesData.ts#L1-L26))

```typescript
// src/data/residencesData.ts
export interface ResidenceLot {
  id: string;
  lotNumber: string;
  name: string;
  category: "garden" | "duplex" | "penthouse";
  level: string;
  interiorArea: number; // m²
  exteriorArea: number; // m²
  bedrooms: number;
  bathrooms: number;
  orientation: string;
  status: "Available" | "Reserved" | "Acquired";
  priceIndicator: string;
  pinCoordinates: { x: number; y: number }; // Percentage on facade elevation
  heroImage: string;
  duskImage: string;
  highlightFeatures: string[];
  floorplanSummary: {
    livingArea: number;
    masterSuite: number;
    guestSuites: number;
    terracePool: number;
    privateGarage: number;
  };
  architecturalNote: string;
}
```

- Encapsulates physical parameters (interior/exterior square meters, bedroom allocations).
- Contains architectural provenance (`architecturalNote`) and dual-mode photographic assets (`heroImage`, `duskImage`).
- Includes facade elevation coordinates (`pinCoordinates`) for interactive architectural elevation maps.

#### 2. Amenity Space Contract ([`amenitiesData.ts`](file:///c:/Users/user/Downloads/Demo%20architecture/src/data/amenitiesData.ts#L1-L10))

```typescript
// src/data/amenitiesData.ts
export interface AmenitySpace {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  stats: { label: string; value: string }[];
  tags: string[];
}
```

- Configures Chapter 05 resort spaces (*Cantilevered Marine Pool*, *Subterranean Thermal Vault*, *The Reserve Wine Chai*, *Bio-Optimization Studio*).
- Supplies technical telemetry (`stats`: temperatures, depths, capacities, material treatments).

---

## 6. Build Optimization & Production Performance

### 6.1 Bundle Topology
The production build output generated via `next build` reveals an ultra-lean footprint:

```
Route (app)                              Size     First Load JS
┌ ○ /                                    53.8 kB         186 kB
└ ○ /_not-found                          873 B          88.1 kB
+ First Load JS shared by all            87.2 kB
  ├ chunks/117-47081bae3d52cf93.js       31.7 kB
  ├ chunks/fd9d1056-6922f449a204c2cc.js  53.6 kB
  └ other shared chunks (total)          1.86 kB

○  (Static)  Prerendered as static content
```

### 6.2 Performance Directives
1. **Zero Runtime Asset Latency**: Procedural audio synthesis avoids media streaming delays.
2. **Non-Blocking Compositor Animations**: Parallax scales and pinned translations rely strictly on `transform: translate3d()` and `opacity` to maintain 60–120 FPS on high-refresh displays.
3. **Passive Touch Handling**: All window scroll and resize hooks pass `{ passive: true }` to eliminate main thread event jank.
4. **Lenis Lag Smoothing Zeroing**: `gsap.ticker.lagSmoothing(0)` prevents animation jumps after prolonged tab idling.

---
*SOLARIA Engineering Specification — Monolithic Digital Architecture Standards.*
