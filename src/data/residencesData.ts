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
  pinCoordinates: { x: number; y: number }; // percentage on facade
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

export const RESIDENCE_CATEGORIES = [
  { id: "all", label: "All Residences (18 Lots)" },
  { id: "garden", label: "Garden Villas (Lots 01–06)" },
  { id: "duplex", label: "Duplex Horizon (Lots 07–14)" },
  { id: "penthouse", label: "Penthouse Solarium (Lots 15–18)" },
] as const;

export const RESIDENCES_DATA: ResidenceLot[] = [
  {
    id: "lot-03",
    lotNumber: "LOT 03",
    name: "Villa Terra Nova",
    category: "garden",
    level: "Tier 1 — Cliffside Garden Level",
    interiorArea: 410,
    exteriorArea: 280,
    bedrooms: 4,
    bathrooms: 5,
    orientation: "South / South-West",
    status: "Available",
    priceIndicator: "Price on Application",
    pinCoordinates: { x: 26, y: 76 },
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    duskImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",
    highlightFeatures: [
      "Sunken Limestone Lounge & Firepit",
      "14m Travertine Saltwater Plunge Pool",
      "Private Mediterranean Olive & Cypress Grove",
      "Direct Cliff Access Path to Shoreline",
    ],
    floorplanSummary: {
      livingArea: 165,
      masterSuite: 78,
      guestSuites: 95,
      terracePool: 120,
      privateGarage: 45,
    },
    architecturalNote:
      "Integrated into the natural topography with reinforced rammed earth and monolithic limestone columns, offering supreme acoustic seclusion and thermal inertia.",
  },
  {
    id: "lot-05",
    lotNumber: "LOT 05",
    name: "Villa Silex",
    category: "garden",
    level: "Tier 1 — Cliffside Garden Level",
    interiorArea: 445,
    exteriorArea: 310,
    bedrooms: 4,
    bathrooms: 5,
    orientation: "South-West",
    status: "Reserved",
    priceIndicator: "Price on Application",
    pinCoordinates: { x: 68, y: 74 },
    heroImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
    duskImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
    highlightFeatures: [
      "Subterranean Wine Cellar carved in Bedrock",
      "16m Infinity Edge Mineral Pool",
      "Private Zen Courtyard with Japanese Water Basin",
      "Triple Subterranean Parking with Lift",
    ],
    floorplanSummary: {
      livingArea: 180,
      masterSuite: 85,
      guestSuites: 110,
      terracePool: 145,
      privateGarage: 60,
    },
    architecturalNote:
      "Sculpted directly into the bedrock with monumental fluted travertine shear walls that frame uninterrupted sea horizons.",
  },
  {
    id: "lot-09",
    lotNumber: "LOT 09",
    name: "Duplex Horizon Azur",
    category: "duplex",
    level: "Tiers 2 & 3 — Suspended Cantilever",
    interiorArea: 490,
    exteriorArea: 240,
    bedrooms: 4,
    bathrooms: 6,
    orientation: "Full South 220° Open Sea",
    status: "Available",
    priceIndicator: "Price on Application",
    pinCoordinates: { x: 38, y: 46 },
    heroImage: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1600&auto=format&fit=crop",
    duskImage: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop",
    highlightFeatures: [
      "6.8m Double-Height Cathedral Glass Salon",
      "Cantilevered Heated Lap Pool suspended over Void",
      "Motorized Bronze Brise-Soleil Facade",
      "Private Panoramic Steam Suite & Cold Plunge",
    ],
    floorplanSummary: {
      livingArea: 210,
      masterSuite: 95,
      guestSuites: 125,
      terracePool: 110,
      privateGarage: 50,
    },
    architecturalNote:
      "A dramatic engineering feat: a 12-meter post-tensioned concrete cantilever extending towards the open sea, blurring the boundary between indoor sanctuary and marine expanse.",
  },
  {
    id: "lot-12",
    lotNumber: "LOT 12",
    name: "Duplex Horizon Zenith",
    category: "duplex",
    level: "Tiers 2 & 3 — Suspended Cantilever",
    interiorArea: 520,
    exteriorArea: 260,
    bedrooms: 5,
    bathrooms: 6,
    orientation: "South / South-East",
    status: "Available",
    priceIndicator: "Price on Application",
    pinCoordinates: { x: 74, y: 44 },
    heroImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop",
    duskImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop",
    highlightFeatures: [
      "Dual Master Suites with Private Sun Decks",
      "Frameless Floor-to-Ceiling Guillotine Windows",
      "Architectural Travertine Floating Staircase",
      "Smart Sommelier Room with Degustation Bar",
    ],
    floorplanSummary: {
      livingArea: 230,
      masterSuite: 105,
      guestSuites: 130,
      terracePool: 125,
      privateGarage: 55,
    },
    architecturalNote:
      "Dual-level spatial choreography featuring acoustic timber ceilings, micro-cement finishes, and bronze-accented architectural lighting designed for golden hour radiance.",
  },
  {
    id: "lot-16",
    lotNumber: "LOT 16",
    name: "The Solarium Penthouse",
    category: "penthouse",
    level: "Tier 4 — Crown Sky Villa",
    interiorArea: 720,
    exteriorArea: 480,
    bedrooms: 5,
    bathrooms: 7,
    orientation: "360° Unobstructed Mediterranean & Alpine Panorama",
    status: "Available",
    priceIndicator: "Price on Application",
    pinCoordinates: { x: 50, y: 18 },
    heroImage: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1600&auto=format&fit=crop",
    duskImage: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=1600&auto=format&fit=crop",
    highlightFeatures: [
      "22m Glass-Bottom Rooftop Cantilevered Sky Pool",
      "Private Helipad Priority & Direct Secure Elevator",
      "Private 12-Seat Dolby Atmos Cinema Suite",
      "Complete Spa Sanctuary with Caldarium & Ice Fountain",
    ],
    floorplanSummary: {
      livingArea: 320,
      masterSuite: 140,
      guestSuites: 180,
      terracePool: 240,
      privateGarage: 80,
    },
    architecturalNote:
      "The pinnacle of Mediterranean architectural modernism. A monolithic crown hovering over the sea, engineered with ultra-high performance basalt concrete and frameless structural glass.",
  },
];
