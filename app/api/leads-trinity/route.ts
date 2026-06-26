import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const lead = await req.json().catch(() => ({}));
  const payload = {
    ...lead,
    project: "Trinity",
    ts: new Date().toISOString(),
  };

  // ---- 1) Google Sheets (Apps Script webhook) — independent ----
  try {
    const url = process.env.TRINITY_SHEET_WEBHOOK;
    if (url) {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
  } catch (err) {
    console.error("Trinity → Sheets error:", err);
  }

  // ---- 2) HubSpot Forms API — independent ----
  try {
    const portal = process.env.HUBSPOT_PORTAL_ID;
    const form = process.env.HUBSPOT_FORM_GUID;
    if (portal && form) {
      await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portal}/${form}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: [
              { name: "firstname", value: lead.name || "" },
              { name: "email", value: lead.email || "" },
              { name: "phone", value: lead.phone || "" },
            ],
            context: { pageName: "Trinity Landing Page" },
          }),
        }
      );
    }
  } catch (err) {
    console.error("Trinity → HubSpot error:", err);
  }

  return NextResponse.json({ ok: true });
}
