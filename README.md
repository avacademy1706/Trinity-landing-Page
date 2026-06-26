# Trinity — Next.js Landing Page

## Run

```bash
npm install
cp .env.local.example .env.local   # phir values bhar do
npm run dev
```

Open http://localhost:3000 — root automatically `/trinity` pe redirect ho jata hai.

## Structure

```
app/
├── layout.tsx              root layout
├── page.tsx                "/" → redirect to /trinity
├── globals.css             tiny reset
├── trinity/
│   ├── page.tsx            server: metadata + next/font
│   ├── TrinityClient.tsx   client: full layout + LeadForm
│   ├── trinity.css         all styles (namespaced under .trinity)
│   └── data.ts             CONFIG + amenities
└── api/
    └── leads-trinity/
        └── route.ts        Google Sheets + HubSpot (separate try/catch)
```

## Setup

1. **`.env.local`** banao (rename mat karna), values daalo:
   ```
   TRINITY_SHEET_WEBHOOK=https://script.google.com/macros/s/.../exec
   HUBSPOT_PORTAL_ID=246429564
   HUBSPOT_FORM_GUID=54a9ef53-d74c-4058-8483-5391a731ac5e
   NEXT_PUBLIC_META_PIXEL_ID=2069518343650122
   ```
   `.env` change ke baad dev server **restart** karo.

2. **Hero image**: image ko `public/` mein rakho (e.g. `public/hero.jpg`), phir
   `app/trinity/TrinityClient.tsx` mein `<img className="hero-img" src="/hero.jpg" />` set karo.

3. Baaki placeholders (gallery, master plan, QR, map) `.ph` divs hain — apni
   images/embed se replace kar dena.

## Reuse for another project

`app/trinity/data.ts` ka `CONFIG` aur text content badal do — design same rahega.
