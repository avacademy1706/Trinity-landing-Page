// Trinity landing page — central config & data.
// Change these per project to reuse the page for another launch.

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

// RERA QR — still hotlinked from the official site. Drop a local file at
// /public/img/rera-qr.png and swap this to "/img/rera-qr.png" for a fully
// self-contained page.
export const QR_IMAGE =
  "https://www.eldecotrinitylucknow.com/assets/img/qrcode/upreraprj-787868.webp";

// Master / Floor plan cards use renders as stand-ins (real plans are enquiry-gated).
export const PLAN_IMAGES = {
  master: "/img/hero-aerial.jpg",
  floor: "/img/int-tall-1.jpg",
};

// [label, svg path-d]  — simple line icons
export const AMENITIES: [string, string][] = [
  ["Cafe", "M3 8h14v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8zM17 9h2a2 2 0 0 1 0 4h-2M5 2v2M9 2v2M13 2v2"],
  ["Clubhouse", "M3 21V9l9-6 9 6v12M9 21v-6h6v6"],
  ["Gymnasium", "M6 7v10M18 7v10M4 9v6M20 9v6M6 12h12"],
  ["Indoor Badminton", "M12 3v18M5 8l14 6M19 8L5 14"],
  ["Kids Play Area", "M12 4a2 2 0 1 0 0-4M8 20l4-8 4 8M6 12h12"],
  ["Library", "M4 4h6v16H4zM10 4h6v16h-6zM16 6l4 1-3 14-4-1"],
  ["Mini Theatre", "M4 5h16v11H4zM8 20h8M12 16v4"],
  ["Pickleball", "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM6 6l12 12"],
  ["Spa & Sauna", "M12 12c2-3 0-6 0-9 0 3-4 6 0 9zM6 16c2-2 1-4 1-6M18 16c-2-2-1-4-1-6M3 20h18"],
  ["Swimming Pool", "M2 16c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2M6 12V5a2 2 0 0 1 4 0M14 12V5a2 2 0 0 1 4 0"],
];
