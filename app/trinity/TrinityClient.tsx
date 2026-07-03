"use client";

import { useEffect, useState } from "react";
import { CONFIG, AMENITIES, HERO_IMAGES, ABOUT_IMAGES, GALLERY_IMAGES, QR_IMAGE, PLAN_IMAGES, MAP_EMBED, LOGO_IMAGE } from "./data";

/* ------------------------------------------------------------------ */
/* Reusable lead form (used in hero + modal)                          */
/* ------------------------------------------------------------------ */
function LeadForm({
  heading,
  sub,
  source,
}: {
  heading: string;
  sub: string;
  source: string;
}) {
  const [data, setData] = useState({
    name: "",
    email: "",
    code: "+91",
    phone: "",
    config: "",
  });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const upd = (k: keyof typeof data, v: string) =>
    setData((s) => ({ ...s, [k]: v }));

  async function submit() {
    if (!data.name || !data.phone) {
      alert("Please enter your name and mobile number.");
      return;
    }
    setLoading(true);
    try {
      await fetch("/api/leads-trinity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: `${data.code} ${data.phone}`.trim(),
          config: data.config,
          source,
        }),
      });
    } catch (err) {
      console.error("Lead submit error:", err);
    }
    // Meta Pixel Lead event (fires if pixel is loaded)
    const w = window as unknown as { fbq?: (...a: unknown[]) => void };
    if (CONFIG.metaPixelId && w.fbq) {
      w.fbq("track", "Lead", { content_name: CONFIG.projectName });
    }
    setLoading(false);
    setDone(true);
  }

  return (
    <div className="lead-card">
      <div className="lc-head">
        <h3>{heading}</h3>
        <p>{sub}</p>
      </div>

      {done ? (
        <div className="form-done show">
          <div className="ok">✓</div>
          <h3 style={{ color: "var(--green)", fontSize: 24 }}>Thank you!</h3>
          <p style={{ color: "var(--muted)", fontSize: 14, margin: "6px 0 0" }}>
            Our team will call you back shortly.
          </p>
        </div>
      ) : (
        <div className="lead-body">
          <div className="field">
            <input
              type="text"
              placeholder="Full Name*"
              value={data.name}
              onChange={(e) => upd("name", e.target.value)}
            />
          </div>
          <div className="field">
            <input
              type="email"
              placeholder="Email Address*"
              value={data.email}
              onChange={(e) => upd("email", e.target.value)}
            />
          </div>
          <div className="field phone-row">
            <select value={data.code} onChange={(e) => upd("code", e.target.value)}>
              <option>+91</option>
              <option>+1</option>
              <option>+44</option>
              <option>+971</option>
            </select>
            <input
              type="tel"
              placeholder="Mobile Number*"
              value={data.phone}
              onChange={(e) => upd("phone", e.target.value)}
            />
          </div>
          <div className="field">
            <select value={data.config} onChange={(e) => upd("config", e.target.value)}>
              <option value="">Configuration of interest</option>
              <option>3 BHK</option>
              <option>4 BHK</option>
              <option>Penthouse</option>
            </select>
          </div>
          <button className="btn btn-gold" disabled={loading} onClick={submit}>
            {loading ? "Submitting…" : "Get Instant Call Back"}
          </button>
          <p className="consent">
            By submitting, you authorise us to call, SMS or email you regarding
            this project.
          </p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main page                                                          */
/* ------------------------------------------------------------------ */
export default function TrinityClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [heroIdx, setHeroIdx] = useState(0);
  const openModal = () => setModalOpen(true);

  // Hero background slider
  useEffect(() => {
    if (HERO_IMAGES.length < 2) return;
    const t = setInterval(
      () => setHeroIdx((i) => (i + 1) % HERO_IMAGES.length),
      5000
    );
    return () => clearInterval(t);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    const els = document.querySelectorAll(
      ".trinity section:not(.hero) .eyebrow, .trinity section:not(.hero) .sec-title, .trinity .about .imgs, .trinity .ptable, .trinity .plan-card, .trinity .amen-card, .trinity .gal-grid .ph, .trinity .acct, .trinity .loc-cat, .trinity .loc-map"
    );
    els.forEach((el, i) => {
      el.classList.add("reveal");
      (el as HTMLElement).style.transitionDelay = `${(i % 5) * 0.05}s`;
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Meta Pixel (optional)
  useEffect(() => {
    const id = CONFIG.metaPixelId;
    const w = window as unknown as {
      fbq?: ((...a: unknown[]) => void) & { q?: unknown[] };
    };
    if (!id || w.fbq) return;
    const fbq = ((...args: unknown[]) => {
      (fbq.q = fbq.q || []).push(args);
    }) as ((...a: unknown[]) => void) & { q?: unknown[] };
    w.fbq = fbq;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(s);
    w.fbq("init", id);
    w.fbq("track", "PageView");
  }, []);

  const tel = `tel:${CONFIG.phone}`;

  return (
    <>
      {/* TOP BAR */}
      <div className="topbar">
        <div className="wrap">
          <div className="tb-l">
            Possession: Sep 2028
          </div>
          <div className="tb-r">
            RERA: <span className="dotgold">UPRERAPRJ787868</span>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header>
        <div className="wrap nav">
          <a className="brand" href="#home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="logo-img" src={LOGO_IMAGE} alt="Eldeco Trinity" />
          </a>
          <ul className={`menu ${menuOpen ? "open" : ""}`}>
            {[
              ["Home", "#home"],
              ["Price", "#pricing"],
              ["Floor Plan", "#plans"],
              ["Amenities", "#amenities"],
              ["Gallery", "#gallery"],
              ["Location", "#location"],
            ].map(([label, href]) => (
              <li key={href}>
                <a href={href} onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          {/* <a
            className="btn btn-gold"
            href="#"
            onClick={(e) => { e.preventDefault(); openModal(); }}
          >
            Download Brochure
          </a> */}
          <button
            className="burger"
            aria-label="Menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="bg">
          {HERO_IMAGES.map((src, i) => (
            <div className={`slide ${i === heroIdx ? "active" : ""}`} key={src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Trinity ${i + 1}`} />
            </div>
          ))}
        </div>

        {/* RERA — top-right corner */}
        <div className="rera-badge">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={QR_IMAGE} alt="UP RERA QR code" />
          <div className="rb-txt">
            <small>UP RERA Reg. No.</small>
            <b>UPRERAPRJ787868</b>
            <span>up-rera.in</span>
          </div>
        </div>

        <span className="hero-art">Artistic View</span>

        <div className="wrap">
          <div className="hero-left">
            <div className="badge-open">
              <span className="pulse"></span>Booking Open · Limited Time Only
            </div>
            <h1>Trinity</h1>
            <p className="sub">At Gomti Nagar Extension, Lucknow</p>

            <div className="review">
              <span className="stars">★★★★★</span> <b>4.7</b> · 125 Google Reviews
            </div>

            <div className="statstrip">
              <div className="st"><small>Land Parcel</small><b>3.11 Acres</b></div>
              <div className="st"><small>Floors</small><b>G + 24</b></div>
              <div className="st"><small>Possession</small><b>Sep 2028</b></div>
            </div>

            <ul className="offers">
              <li>Modular kitchen with appliances</li>
              <li>No bandha charges applicable</li>
              <li>Exclusive designer wardrobes</li>
            </ul>

            <p className="price-line">
              Luxurious 3 &amp; 4 BHK <b>₹ 2.69 Cr* Onwards</b>
            </p>
          </div>

          <LeadForm
            heading="Register Your Interest"
            sub="Avail the best launch offers"
            source="hero_form"
          />
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="highlights">
        <div className="wrap">
          <div className="hl-grid">
            <div className="hl"><small>Land Parcel</small><b>3.11 Acres</b></div>
            <div className="hl"><small>Structure</small><b>G + 24</b></div>
            <div className="hl"><small>Configurations</small><b>3 &amp; 4 BHK</b></div>
            <div className="hl"><small>Carpet Area</small><b>2245–3595 ft²</b></div>
            <div className="hl"><small>Starting Price</small><b>₹ 2.69 Cr*</b></div>
            <div className="hl"><small>Possession</small><b>Sep 2028</b></div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="wrap about-grid">
          <div>
            <span className="eyebrow">Welcome to Trinity</span>
            <h2 className="sec-title">An affluent address in Gomti Nagar Extension</h2>
            <p>
              Trinity is a premium residential community offering thoughtfully
              designed 3 &amp; 4 BHK apartments and penthouses. Every home is
              generously spacious, finely detailed and well-ventilated, with
              seamless layouts and unstinted views across the gated community.
            </p>
            <p>
              The neighbourhood is backed by robust infrastructure — leading
              schools, super-speciality hospitals, Janeshwar Mishra Park, Phoenix
              Palassio, Ekana Stadium and more, all minutes away. Amar Shaheed
              Path, the Outer Ring Road and Gomti Nagar Railway Station ensure
              effortless connectivity.
            </p>
            <a
              className="btn btn-ghost"
              href="#"
              onClick={(e) => { e.preventDefault(); openModal(); }}
            >
              Download Brochure
            </a>
          </div>
          <div className="imgs">
            {/* eslint-disable @next/next/no-img-element */}
            <div className="ph tall"><img src={ABOUT_IMAGES[0]} alt="Trinity tower" /></div>
            <div className="ph"><img src={ABOUT_IMAGES[1]} alt="Trinity balcony view" /></div>
            <div className="ph"><img src={ABOUT_IMAGES[2]} alt="Trinity retail promenade" /></div>
            {/* eslint-enable @next/next/no-img-element */}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing" id="pricing">
        <div className="wrap">
          <span className="eyebrow">Pricing &amp; Carpet Area</span>
          <h2 className="sec-title">Trinity Price List</h2>
          <table className="ptable">
            <thead>
              <tr><th>Type</th><th>Carpet Area</th><th>Price</th><th></th></tr>
            </thead>
            <tbody>
              {[
                ["3 BHK", "2245 Sq.Ft.", "₹ 2.69 Cr* Onwards"],
                ["4 BHK", "3461 Sq.Ft.", "₹ 3.80 Cr* Onwards"],
                ["Penthouse", "3595 Sq.Ft.", "₹ 3.86 Cr* Onwards"],
              ].map(([t, a, p]) => (
                <tr key={t}>
                  <td className="type">{t}</td>
                  <td>{a}</td>
                  <td className="price">{p}</td>
                  <td>
                    <span className="lnk" onClick={openModal}>Price Breakup</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="pnote">
            *Prices are subject to change without prior notice. Carpet area as per
            RERA.
          </p>
          <div style={{ marginTop: 22 }}>
            <a
              className="btn btn-gold"
              href="#"
              onClick={(e) => { e.preventDefault(); openModal(); }}
            >
              Enquire for Costing Details
            </a>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section id="plans">
        <div className="wrap">
          <span className="eyebrow">Layouts</span>
          <h2 className="sec-title">Master Plan &amp; Floor Plan</h2>
          <div className="plans">
            {/* eslint-disable @next/next/no-img-element */}
            <div className="plan-card">
              <div className="ph"><img src={PLAN_IMAGES.master} alt="Trinity master plan" /></div>
              <div className="pc-foot">
                <h3>Master Plan</h3>
                <a className="btn btn-gold" href="#home">Enquire Now</a>
              </div>
            </div>
            <div className="plan-card">
              <div className="ph"><img src={PLAN_IMAGES.floor} alt="Trinity floor plan" /></div>
              <div className="pc-foot">
                <h3>Floor Plan</h3>
                <a className="btn btn-gold" href="#home">Enquire Now</a>
              </div>
            </div>
            {/* eslint-enable @next/next/no-img-element */}
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section className="amen" id="amenities">
        <div className="wrap">
          <span className="eyebrow">Lifestyle</span>
          <h2 className="sec-title">Amenities at Trinity</h2>
          <div className="amen-grid">
            {AMENITIES.map(([name]) => (
              <div className="amen-card" key={name}>
                <span>{name}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 30 }}>
            <a className="btn btn-ghost" href="#" onClick={(e) => { e.preventDefault(); openModal(); }}>
              Download Amenities List
            </a>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery">
        <div className="wrap">
          <span className="eyebrow">Gallery</span>
          <h2 className="sec-title">A Glimpse of Trinity</h2>
          <div className="gal-grid">
            {/* eslint-disable @next/next/no-img-element */}
            <div className="ph big"><img src={GALLERY_IMAGES[0]} alt="Trinity penthouse living room" /></div>
            <div className="ph"><img src={GALLERY_IMAGES[1]} alt="Trinity duplex living room" /></div>
            <div className="ph"><img src={GALLERY_IMAGES[2]} alt="Trinity cafe" /></div>
            <div className="ph"><img src={GALLERY_IMAGES[3]} alt="Trinity kids play area" /></div>
            <div className="ph"><img src={GALLERY_IMAGES[4]} alt="Trinity multipurpose court" /></div>
            {/* eslint-enable @next/next/no-img-element */}
          </div>
        </div>
      </section>

      {/* LOCATION ADVANTAGES */}
      <section className="loc" id="location">
        <div className="wrap">
          <span className="eyebrow">Connectivity</span>
          <h2 className="sec-title">Location Advantages</h2>
          <p className="lead">
            Trinity sits in Gomti Nagar Extension — surrounded by leading schools,
            hospitals and lifestyle destinations, with seamless access to Amar
            Shaheed Path and the Outer Ring Road.
          </p>
          <div className="loc-grid">
            <div className="ph loc-map">
              <iframe
                src={MAP_EMBED}
                title="Eldeco Trinity location map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="loc-cats">
              <div className="loc-cat">
                <h4>🎓 Education</h4>
                <ul>
                  <li>Delhi Public School, Gomti Nagar</li>
                  <li>Jagran Public School</li>
                  <li>G.D. Goenka Public School</li>
                  <li>VIBGYOR High School</li>
                </ul>
              </div>
              <div className="loc-cat">
                <h4>🏥 Healthcare</h4>
                <ul>
                  <li>Medanta Hospital, Amar Shaheed Path</li>
                  <li>Sahara Hospital</li>
                  <li>Dr. RMLIMS, Vibhuti Khand</li>
                  <li>Apollomedics Super Speciality</li>
                </ul>
              </div>
              <div className="loc-cat">
                <h4>🛍 Lifestyle &amp; Leisure</h4>
                <ul>
                  <li>Phoenix Palassio</li>
                  <li>Janeshwar Mishra Park</li>
                  <li>Ekana Stadium</li>
                  <li>Lucknow Zoo</li>
                </ul>
              </div>
              <div className="loc-cat">
                <h4>🚉 Connectivity</h4>
                <ul>
                  <li>Amar Shaheed Path</li>
                  <li>Lucknow Outer Ring Road</li>
                  <li>Gomti Nagar Railway Station</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENQUIRY CTA BAND */}
      <section className="ctaband">
        <div className="wrap">
          <h2>Interested in Trinity?</h2>
          <p>
            Get the price sheet, floor plans and exclusive launch offers — instant
            call back.
          </p>
          <a className="btn btn-gold" href="#" onClick={(e) => { e.preventDefault(); openModal(); }}>
            Enquire Now
          </a>
        </div>
      </section>

      {/* DEVELOPER */}
      <section id="developer">
        <div className="wrap dev-grid">
          <div className="dev">
            <span className="eyebrow">The Developer</span>
            <h2 className="sec-title">About Eldeco Group</h2>
            <p>
              Eldeco Group has led real estate development in North India since
              1985, known for timely delivery and quality. With 200+ successfully
              delivered projects, the group spans residential, commercial,
              industrial and retail developments.
            </p>
            <div className="rera">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="ph qr"><img src={QR_IMAGE} alt="RERA QR code" /></div>
              <small>
                <b>RERA:</b> UPRERAPRJ787868
                <br />
                Website: www.up-rera.in &nbsp;·&nbsp; Launch Date: 10th Jan 2024
                <br />
                Registered under the RERA Act 2016, Govt. of India, on the UP
                Government RERA portal under registered projects.
              </small>
            </div>
          </div>
          <div className="acct">
            <h3>Collection A/C Details</h3>
            <ul>
              <li><span>Account Name</span><b>Eldeco Inception Buildtech Private Limited</b></li>
              <li><span>Account No.</span><b>50200084181792</b></li>
              <li><span>Bank</span><b>HDFC Bank</b></li>
              <li><span>Branch</span><b>Lucknow — Pranay Towers</b></li>
              <li><span>IFSC</span><b>HDFC0000594</b></li>
              <li style={{ border: 0 }}><span>Site Address</span><b>Gomti Nagar, Lucknow 226002</b></li>
            </ul>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="logo-img" src={LOGO_IMAGE} alt="Eldeco Trinity" />
          </div>
          <div className="disc">
            <b style={{ color: "#e9e3d4" }}>Disclaimer:</b> We are an authorised
            marketing partner for this project. Content is provided by respective
            owners and is for information purposes only; it does not constitute an
            offer to avail any service. Prices are subject to change without prior
            notice and properties are subject to availability. You may receive a
            call, SMS or email on the details registered with us.
            <br />
            <br />
            RERA Project Registration No.: UPRERAPRJ787868 · Authorised
            Advertiser: Home Bazaar Services Pvt Ltd, Reg. No. UPRERAAGT22169,
            CIN U45400MH2013PTC242930.
          </div>
          <div className="fbot">
            <span>© 2026 Trinity · All rights reserved</span>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE BAR */}
      <div className="mbar">
        <a className="call" href={tel}>📞 Call Now</a>
        <button className="enq" onClick={openModal}>✉ Enquire</button>
      </div>

      {/* MODAL */}
      <div
        className={`modal ${modalOpen ? "show" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setModalOpen(false);
        }}
      >
        <button className="close" onClick={() => setModalOpen(false)}>×</button>
        <LeadForm
          heading="Register Here"
          sub="Avail the best offers — instant call back"
          source="modal_form"
        />
      </div>
    </>
  );
}
