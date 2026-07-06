// Trinity landing page — central config & data.
// Change these per project to reuse the page for another launch.

import {
  Dumbbell, Sofa, Waves, Volleyball, Blocks, Flower2, Clapperboard, Flame, Library, Utensils,
  Baby, AirVent, Fingerprint, CookingPot, Shirt, Sun, Grid3x3, Sailboat,
  type LucideIcon,
} from "lucide-react";

export const CONFIG = {
  projectName: "Trinity",
  developer: "Eldeco Group",
  phone: "+912246181296",
  // set in .env.local as NEXT_PUBLIC_META_PIXEL_ID (leave empty to disable pixel)
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
};

// Google Maps embed (keyless) centred on the project location.
export const MAP_EMBED =
  "https://www.google.com/maps?q=Eldeco+Trinity,+Gomti+Nagar+Extension,+Lucknow,+Uttar+Pradesh+226002&z=14&output=embed";

// Project images — self-hosted in /public/img (developer's own renders).
export const LOGO_IMAGE = "/img/logo.png";

// Hero background slider (exterior renders)
export const HERO_IMAGES = [
  "/img/hero-aerial.jpg",
  "/img/hero-towers.jpg",
  "/img/hero-entrance.jpg",
];

// About section — first entry is the tall/portrait tile
export const ABOUT_IMAGES = [
  "/img/hero-portrait.jpg",
  "/img/balcony.jpg",
  "/img/retail.jpg",
];

// Glimpse gallery — first entry is the large tile
export const GALLERY_IMAGES = [
  "/img/living-a.jpg",
  "/img/living-b.jpg",
  "/img/cafe.jpg",
  "/img/kids.jpg",
  "/img/sports.jpg",
];

// RERA QR — hotlinked from the official site.
export const QR_IMAGE =
  "https://www.eldecotrinitylucknow.com/assets/img/qrcode/upreraprj-787868.webp";

// Master plan + floor-plan carousel. Each floor plan carries its unit type + area.
export const PLAN_IMAGES: {
  master: string;
  floor: { src: string; type: string; carpet: string; super: string }[];
} = {
  master: "/img/master-plan.webp",
  floor: [
    { src: "/img/floor-1.webp", type: "2 BHK + 2T", carpet: "1050 sq.ft.", super: "1833 sq.ft." },
    { src: "/img/floor-2.webp", type: "3 BHK + 3T", carpet: "1293 sq.ft.", super: "2245 sq.ft." },
    { src: "/img/floor-3.webp", type: "3 BHK + 3T + SER", carpet: "1348 sq.ft.", super: "2442 sq.ft." },
    { src: "/img/floor-4.webp", type: "3 BHK + Study + 4T + SER", carpet: "1615 sq.ft.", super: "2776 sq.ft." },
    { src: "/img/floor-5.webp", type: "4 BHK + 5T + SER", carpet: "1954 sq.ft.", super: "3461 sq.ft." },
    { src: "/img/floor-6.webp", type: "Penthouse · 4 BHK + 5T", carpet: "2095 sq.ft.", super: "3595 sq.ft." },
    { src: "/img/floor-7.webp", type: "Penthouse · 4 BHK + 5T", carpet: "2100 sq.ft.", super: "3688 sq.ft." },
    { src: "/img/floor-8.webp", type: "Penthouse · 4 BHK + Lounge", carpet: "2500 sq.ft.", super: "4303 sq.ft." },
    { src: "/img/floor-9.webp", type: "Penthouse · 5 BHK + Lounge", carpet: "3071 sq.ft.", super: "5438 sq.ft." },
  ],
};

// Amenities shown as a 2-page carousel. Page 1 = lifestyle, page 2 = home features.
// Icons are lucide-react components.
export const AMENITIES: { name: string; Icon: LucideIcon }[][] = [
  [
    { name: "Gymnasium", Icon: Dumbbell },
    { name: "Lifestyle Club", Icon: Sofa },
    { name: "Swimming Pool", Icon: Waves },
    { name: "Multipurpose Court", Icon: Volleyball },
    { name: "Kids Play Area", Icon: Blocks },
    { name: "Yoga & Meditation", Icon: Flower2 },
    { name: "Mini Theatre", Icon: Clapperboard },
    { name: "Sauna", Icon: Flame },
    { name: "Library", Icon: Library },
    { name: "Restaurant", Icon: Utensils },
  ],
  [
    { name: "Creche", Icon: Baby },
    { name: "VRV AC in All Rooms", Icon: AirVent },
    { name: "Digital Lock Entrance", Icon: Fingerprint },
    { name: "Modular Kitchen", Icon: CookingPot },
    { name: "Designer Wardrobes", Icon: Shirt },
    { name: "Large Terrace Balconies", Icon: Sun },
    { name: "Marble Stone Flooring", Icon: Grid3x3 },
    { name: "River View", Icon: Sailboat },
  ],
];
