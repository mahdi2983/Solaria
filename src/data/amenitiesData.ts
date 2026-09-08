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

export const AMENITIES_DATA: AmenitySpace[] = [
  {
    id: "amenity-pool",
    number: "01 / 04",
    title: "Cantilevered Marine Pool",
    subtitle: "SUSPENDED HORIZON BASIN",
    description:
      "A 45-meter monolithic infinity basin of micro-pebble travertine that projects 14 meters over the cliff edge. Filtered natural Mediterranean saltwater heated year-round with invisible submerged acoustic audio transducers.",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1600&auto=format&fit=crop",
    stats: [
      { label: "Length", value: "45 Meters" },
      { label: "Overhang", value: "14m Cantilever" },
      { label: "Water", value: "Saltwater Osmosis" },
      { label: "Temp", value: "28°C Constant" },
    ],
    tags: ["Underwater Soundscape", "Private Cabanas", "Sunset Orientation"],
  },
  {
    id: "amenity-spa",
    number: "02 / 04",
    title: "Subterranean Thermal Vault",
    subtitle: "ROMAN ARCHITECTURAL SPA",
    description:
      "Carved directly into the subterranean granitic bedrock, this sensory sanctuary draws inspiration from ancient Roman thermal baths. Features monolithic basalt caldarium, ice fountain, Finnish cedar sauna, and magnesium hydrotherapy pools.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop",
    stats: [
      { label: "Depth", value: "12m Underground" },
      { label: "Zones", value: "6 Thermal Circuits" },
      { label: "Material", value: "Fluted Basalt & Travertine" },
      { label: "Acoustics", value: "Silent Resonance" },
    ],
    tags: ["Caldarium & Tepidarium", "Cryo Therapy", "Private Treatment Suites"],
  },
  {
    id: "amenity-cellar",
    number: "03 / 04",
    title: "The Reserve Wine Chai",
    subtitle: "SOMMELIER PRIVATE VAULT",
    description:
      "A climate-controlled geological sanctuary housing 6,000 rare grand crus. Each residence possesses an assigned private bronze-latticed vault with biometric access and a master sommelier tasting salon sculpted from solid Saint-Laurent black marble.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1600&auto=format&fit=crop",
    stats: [
      { label: "Capacity", value: "6,000 Bottles" },
      { label: "Climate", value: "13°C / 72% Humidity" },
      { label: "Access", value: "Biometric Key" },
      { label: "Curator", value: "Master Sommelier" },
    ],
    tags: ["Personal Lockers", "Bespoke Degustation", "En Primeur Allocation"],
  },
  {
    id: "amenity-fitness",
    number: "04 / 04",
    title: "Bio-Optimization Studio",
    subtitle: "PANORAMIC ATHLETIC PAVILION",
    description:
      "An ethereal glass pavilion jutting toward the sea, outfitted with custom Technogym Biostrength AI-driven equipment, private reformer Pilates studio, hyperbaric oxygen chambers, and an open-air cliffside sunrise yoga deck.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop",
    stats: [
      { label: "Surface", value: "540 m²" },
      { label: "Equipment", value: "Technogym AI Biostrength" },
      { label: "Recovery", value: "Hyperbaric & Infrared" },
      { label: "Panorama", value: "270° Ocean View" },
    ],
    tags: ["Private Coaching", "Reformer Studio", "Cliffside Yoga Terrace"],
  },
];
