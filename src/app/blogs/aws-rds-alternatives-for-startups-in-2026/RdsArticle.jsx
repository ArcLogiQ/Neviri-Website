"use client";

import { useEffect } from "react";
import { Inter, IBM_Plex_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const SIGNUP_URL = "https://sng-central.neviri.com/signup";

const css = `
.rdsx{
  --bg:#FFFFFF;
  --surface:#FFFFFF;
  --surface-alt:#F6F9FC;
  --line:#E7E9EC;
  --ink:#11131A;
  --ink-soft:#5B6472;
  --ink-faint:#9098A8;
  --blue:#2F7FF5;
  --cyan:#22C1DC;
  --gradient:linear-gradient(100deg, var(--blue) 0%, var(--cyan) 100%);
  --black:#101114;
  --badge-bg:#EAF3FF;
  --badge-text:#2166D6;
  --radius:10px;
  --maxw:940px;
  background:var(--bg);
  color:var(--ink);
  font-family:var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif;
  line-height:1.65;
  -webkit-font-smoothing:antialiased;
}
.rdsx *{ box-sizing:border-box; }
.rdsx h1,.rdsx h2,.rdsx h3{ font-family:var(--font-inter), sans-serif; color:var(--ink); font-weight:800; margin:0 0 .4em; letter-spacing:-0.02em; line-height:1.15; }
.rdsx .mono{ font-family:var(--font-mono), monospace; }
.rdsx a{ color:inherit; }
.rdsx .wrap{ max-width:var(--maxw); margin:0 auto; padding:0 24px; }

/* hero */
.rdsx .hero{ max-width:1120px; margin:0 auto; padding:64px 24px 60px; display:grid; grid-template-columns:1.15fr .85fr; gap:48px; align-items:center; }
.rdsx .badge{ display:inline-block; background:var(--black); color:#fff; font-size:.7rem; letter-spacing:.1em; text-transform:uppercase; font-weight:700; padding:6px 12px; border-radius:5px; margin-bottom:22px; }
.rdsx .hero h1{ font-size:2.65rem; }
.rdsx .hl{ background:var(--gradient); color:#fff; padding:2px 10px; border-radius:4px; display:inline; box-decoration-break:clone; -webkit-box-decoration-break:clone; }
.rdsx .hero p.lede{ font-size:1.06rem; color:var(--ink-soft); max-width:48ch; margin:20px 0 30px; font-weight:400; }
.rdsx .cta-row{ display:flex; gap:14px; align-items:center; flex-wrap:wrap; }
.rdsx .btn-primary{ background:var(--gradient); color:#fff; border:none; padding:13px 22px; border-radius:9px; font-size:.92rem; font-weight:700; text-decoration:none; display:inline-block; }
.rdsx .cta-row .btn-outline{ border:1px solid var(--line); padding:12px 20px; border-radius:9px; font-size:.9rem; font-weight:600; text-decoration:none; color:var(--ink); }

.rdsx .snap-card{ background:var(--surface); border:1px solid var(--line); border-radius:16px; padding:22px 24px; box-shadow:0 20px 40px -28px rgba(20,30,50,.25); position:relative; overflow:hidden; }
.rdsx .snap-card::before{ content:""; position:absolute; inset:-1px; border-radius:17px; padding:1px; background:var(--gradient); -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite:xor; mask-composite:exclude; opacity:0; animation:glowPulse 3.2s ease-in-out 1.4s infinite; pointer-events:none; }
.rdsx .snap-top{ display:flex; align-items:center; justify-content:space-between; margin-bottom:18px; position:relative; z-index:1; }
.rdsx .snap-top .who{ display:flex; align-items:center; gap:12px; }
.rdsx .snap-top .label{ font-size:.68rem; letter-spacing:.08em; text-transform:uppercase; color:var(--ink-faint); font-weight:600; }
.rdsx .snap-top .name{ font-weight:700; font-size:.95rem; }
.rdsx .snap-icon{ width:38px; height:38px; border-radius:9px; background:var(--black); display:flex; align-items:center; justify-content:center; color:#fff; font-size:.8rem; font-weight:800; animation:iconFloat 3.6s ease-in-out infinite; }
.rdsx .snap-pill{ background:var(--badge-bg); color:var(--badge-text); font-size:.68rem; font-weight:700; letter-spacing:.04em; padding:5px 10px; border-radius:20px; display:inline-flex; align-items:center; gap:6px; animation:pillPulse 2.4s ease-in-out 1.2s infinite; }
.rdsx .snap-pill::before{ content:""; width:6px; height:6px; border-radius:50%; background:var(--badge-text); animation:pulseDot 1.6s ease-in-out infinite; }
.rdsx .snap-bar{ height:4px; border-radius:4px; background:var(--gradient); margin-bottom:22px; position:relative; z-index:1; overflow:hidden; }
.rdsx .snap-bar::after{ content:""; position:absolute; top:0; left:0; height:100%; width:40%; background:linear-gradient(90deg, transparent, rgba(255,255,255,.75), transparent); animation:shimmerSweep 2.4s ease-in-out 1.6s infinite; }
.rdsx .snap-stats{ display:flex; gap:36px; position:relative; z-index:1; }
.rdsx .snap-stats .item .k{ font-size:.68rem; letter-spacing:.08em; text-transform:uppercase; color:var(--ink-faint); font-weight:600; margin-bottom:4px; }
.rdsx .snap-stats .item .v{ font-size:1.15rem; font-weight:800; }

/* sections */
.rdsx section{ padding:56px 0; border-top:1px solid var(--line); }
.rdsx section:first-of-type{ border-top:none; }
.rdsx .eyebrow{ display:flex; align-items:center; gap:10px; margin-bottom:16px; }
.rdsx .eyebrow .bar{ width:26px; height:4px; border-radius:4px; background:var(--gradient); }
.rdsx .eyebrow span{ font-family:var(--font-mono),monospace; font-size:.7rem; letter-spacing:.14em; text-transform:uppercase; color:var(--ink-faint); font-weight:600; }
.rdsx h2{ font-size:1.7rem; margin-bottom:20px; }
.rdsx p{ color:var(--ink-soft); }
.rdsx strong{ color:var(--ink); font-weight:700; }
.rdsx ul.plain{ margin:14px 0 0; padding-left:20px; color:var(--ink-soft); }
.rdsx ul.plain li{ margin:5px 0; }
.rdsx .quick-answer{ background:var(--surface-alt); border:1px solid var(--line); border-radius:var(--radius); padding:30px 32px; }
.rdsx .quick-answer p:first-child{ color:var(--ink); }
.rdsx .credit-line{ margin-top:22px; display:flex; align-items:center; gap:14px; flex-wrap:wrap; }
.rdsx .credit-line .amt{ font-weight:800; font-size:1.3rem; background:var(--gradient); -webkit-background-clip:text; background-clip:text; color:transparent; }

/* platform */
.rdsx .platform{ padding:30px 0; border-top:1px solid var(--line); }
.rdsx .platform:first-of-type{ border-top:none; padding-top:6px; }
.rdsx .platform-head{ display:flex; align-items:center; gap:12px; margin-bottom:6px; flex-wrap:wrap; }
.rdsx .platform-num{ font-family:var(--font-mono),monospace; color:var(--ink-faint); font-size:.82rem; font-weight:600; }
.rdsx .platform h3{ font-size:1.35rem; margin:0; font-weight:700; }
.rdsx .platform.featured{ background:var(--surface-alt); margin:0 -28px; padding:30px 28px; border-radius:14px; border-top:1px solid var(--line); border-left:3px solid; border-image:var(--gradient) 1; }
.rdsx .featured-mark{ font-size:.66rem; letter-spacing:.06em; text-transform:uppercase; font-weight:700; color:#fff; background:var(--gradient); padding:4px 10px; border-radius:20px; }
.rdsx .platform-sub{ font-family:var(--font-mono),monospace; font-size:.78rem; color:var(--ink-faint); margin-bottom:14px; }
.rdsx .platform-cols{ display:grid; grid-template-columns:1fr 1fr; gap:28px; margin-top:16px; }
.rdsx .platform-cols h4{ font-family:var(--font-mono),monospace; font-size:.68rem; letter-spacing:.1em; text-transform:uppercase; color:var(--ink-faint); margin:0 0 8px; font-weight:600; }
.rdsx .platform-cols ul{ margin:0; padding-left:18px; color:var(--ink-soft); font-size:.92rem; }
.rdsx .platform-cols ul li{ margin:3px 0; }

/* comparison table */
.rdsx table.compare{ width:100%; border-collapse:collapse; font-size:.9rem; margin-top:10px; border:1px solid var(--line); border-radius:12px; overflow:hidden; }
.rdsx table.compare th{ text-align:left; padding:13px 16px; font-family:var(--font-mono),monospace; font-size:.68rem; letter-spacing:.08em; text-transform:uppercase; color:var(--ink-faint); background:var(--surface-alt); border-bottom:1px solid var(--line); font-weight:600; }
.rdsx table.compare td{ padding:15px 16px; border-bottom:1px solid var(--line); color:var(--ink-soft); }
.rdsx table.compare tr.featured td{ color:var(--ink); background:var(--badge-bg); font-weight:600; }
.rdsx table.compare tr.featured td:first-child{ border-left:3px solid var(--blue); }
.rdsx table.compare tr:last-child td{ border-bottom:none; }
.rdsx .cards-compare{ display:none; }

/* choose blocks */
.rdsx .choose-grid{ display:grid; gap:22px; margin-top:10px; }
.rdsx .choose-item{ border-left:2px solid var(--line); padding-left:20px; }
.rdsx .choose-item.featured{ border-image:var(--gradient) 1; border-left:3px solid; }
.rdsx .choose-item h3{ font-size:1.1rem; margin-bottom:8px; font-weight:700; }
.rdsx .choose-item ul{ margin:0; padding-left:18px; color:var(--ink-soft); font-size:.92rem; }

/* faq */
.rdsx .faq-item{ padding:20px 0; border-top:1px solid var(--line); }
.rdsx .faq-item:first-of-type{ border-top:none; }
.rdsx .faq-item h3{ font-size:1.02rem; margin-bottom:8px; font-weight:700; }
.rdsx .faq-item p{ margin:0; }

.rdsx .expert p{ font-size:1.08rem; line-height:1.75; color:var(--ink); }

.rdsx .final-cta{ text-align:center; padding:70px 24px; background:var(--black); border-radius:20px; color:#fff; }
.rdsx .final-cta h2{ color:#fff; font-size:2rem; margin-bottom:14px; }
.rdsx .final-cta p{ color:#AEB6C4; margin-bottom:30px; }

/* animation */
@keyframes gradientShift{ 0%{ background-position:0% 50%; } 50%{ background-position:100% 50%; } 100%{ background-position:0% 50%; } }
@keyframes fadeUp{ from{ opacity:0; transform:translateY(18px); } to{ opacity:1; transform:translateY(0); } }
@keyframes pulseDot{ 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.55; transform:scale(.85); } }
@keyframes fillBar{ from{ transform:scaleX(0); } to{ transform:scaleX(1); } }
@keyframes glowPulse{ 0%,100%{ opacity:0; } 50%{ opacity:.7; } }
@keyframes iconFloat{ 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-3px); } }
@keyframes pillPulse{ 0%,100%{ box-shadow:0 0 0 0 rgba(47,127,245,.28); } 50%{ box-shadow:0 0 0 6px rgba(47,127,245,0); } }
@keyframes shimmerSweep{ 0%{ left:-40%; } 100%{ left:110%; } }

.rdsx .hl, .rdsx .btn-primary, .rdsx .snap-bar{ background-size:200% 200%; animation:gradientShift 6s ease infinite; }
.rdsx .snap-bar{ transform-origin:left; animation:fillBar 1.1s cubic-bezier(.22,.61,.36,1) .3s both, gradientShift 6s ease infinite; }

.rdsx .badge, .rdsx .hero h1, .rdsx .hero p.lede, .rdsx .cta-row, .rdsx .snap-card{ opacity:0; animation:fadeUp .7s cubic-bezier(.22,.61,.36,1) forwards; }
.rdsx .badge{ animation-delay:.05s; }
.rdsx .hero h1{ animation-delay:.15s; }
.rdsx .hero p.lede{ animation-delay:.25s; }
.rdsx .cta-row{ animation-delay:.35s; }
.rdsx .snap-card{ animation-delay:.3s; }

.rdsx [data-reveal]{ opacity:0; transform:translateY(22px); transition:opacity .6s cubic-bezier(.22,.61,.36,1), transform .6s cubic-bezier(.22,.61,.36,1); }
.rdsx [data-reveal].is-visible{ opacity:1; transform:translateY(0); }

.rdsx .btn-primary, .rdsx .btn-black, .rdsx .btn-outline{ transition:transform .18s ease, box-shadow .18s ease, opacity .18s ease; }
.rdsx .btn-primary:hover, .rdsx .btn-black:hover{ transform:translateY(-2px); box-shadow:0 10px 22px -10px rgba(47,127,245,.45); }
.rdsx .btn-outline:hover{ transform:translateY(-2px); border-color:var(--blue); color:var(--blue); }

.rdsx .platform{ transition:background .25s ease; }
.rdsx .platform:not(.featured):hover{ background:var(--surface-alt); border-radius:12px; }
.rdsx .platform.featured{ transition:box-shadow .25s ease; }
.rdsx .platform.featured:hover{ box-shadow:0 16px 32px -22px rgba(47,127,245,.35); }

.rdsx table.compare tr{ transition:background .18s ease; }
.rdsx table.compare tbody tr:not(.featured):hover td{ background:var(--surface-alt); }

.rdsx .choose-item, .rdsx .cc-card, .rdsx .faq-item{ transition:transform .2s ease, box-shadow .2s ease; }
.rdsx .cc-card:hover{ transform:translateY(-2px); box-shadow:0 10px 22px -16px rgba(20,30,50,.25); }

@media (prefers-reduced-motion: reduce){
  .rdsx *, .rdsx *::before, .rdsx *::after{ animation-duration:.001ms !important; animation-iteration-count:1 !important; transition-duration:.001ms !important; }
  .rdsx [data-reveal]{ opacity:1; transform:none; }
}

@media (max-width:780px){
  .rdsx .hero{ grid-template-columns:1fr; padding-top:44px; }
  .rdsx .hero h1{ font-size:2.1rem; }
  .rdsx .platform-cols{ grid-template-columns:1fr; gap:16px; }
  .rdsx .platform.featured{ margin:0 -20px; padding:26px 20px; }
  .rdsx table.compare{ display:none; }
  .rdsx .cards-compare{ display:grid; gap:12px; }
  .rdsx .cc-card{ background:var(--surface); border:1px solid var(--line); border-radius:12px; padding:16px 18px; }
  .rdsx .cc-card.featured{ border-color:var(--blue); background:var(--badge-bg); }
  .rdsx .cc-card h4{ margin:0 0 8px; font-size:1.05rem; font-weight:700; }
  .rdsx .cc-row{ display:flex; justify-content:space-between; font-size:.82rem; padding:5px 0; border-top:1px solid var(--line); color:var(--ink-soft); }
  .rdsx .cc-row:first-of-type{ border-top:none; }
  .rdsx .cc-row span:first-child{ color:var(--ink-faint); }
}
`;

export default function RdsArticle() {
  useEffect(() => {
    const els = document.querySelectorAll(".rdsx [data-reveal]");
    let io;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
      );
      els.forEach((el) => io.observe(el));
    } else {
      els.forEach((el) => el.classList.add("is-visible"));
    }

    function countUp(el, end, opts = {}) {
      const duration = opts.duration || 1100;
      const suffix = opts.suffix || "";
      const prefix = opts.prefix || "";
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(end * eased);
        el.textContent = prefix + value + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = prefix + end + suffix;
      }
      requestAnimationFrame(tick);
    }

    const fitEl = document.querySelector(".rdsx [data-count-fit]");
    const creditEl = document.querySelector(".rdsx [data-count-credit]");
    const timer = setTimeout(() => {
      if (fitEl) countUp(fitEl, 5, { suffix: " / 5", duration: 900 });
      if (creditEl) countUp(creditEl, 100, { prefix: "$", duration: 1200 });
    }, 500);

    return () => {
      if (io) io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`rdsx ${inter.variable} ${plexMono.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="hero">
        <div>
          <span className="badge">Databases · 2026</span>
          <h1>
            AWS RDS Alternatives{" "}
            <span className="hl">for Startups in 2026</span>
          </h1>
          <p className="lede">
            Best Managed Databases for Faster Growth — if you&apos;re a startup
            in 2026, AWS RDS is no longer the default choice for every workload.
            Here are the managed database platforms that deliver better developer
            experience, simpler operations, and more predictable pricing.
          </p>
          <div className="cta-row">
            <a
              href={SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Claim $100 credit
            </a>
            <a href="#comparison" className="btn-outline">
              See comparison
            </a>
          </div>
        </div>

        <div className="snap-card">
          <div className="snap-top">
            <div className="who">
              <div className="snap-icon">N</div>
              <div>
                <div className="label">Recommended platform</div>
                <div className="name">Neviri Cloud</div>
              </div>
            </div>
            <span className="snap-pill">BEST FIT</span>
          </div>
          <div className="snap-bar"></div>
          <div className="snap-stats">
            <div className="item">
              <div className="k">Startup Fit</div>
              <div className="v" data-count-fit="">
                0 / 5
              </div>
            </div>
            <div className="item">
              <div className="k">Free Credit</div>
              <div className="v" data-count-credit="">
                $0
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <section data-reveal="">
          <div className="eyebrow">
            <span className="bar"></span>
            <span>Quick answer</span>
          </div>
          <div className="quick-answer">
            <p>
              If you&apos;re a startup in 2026, AWS RDS is no longer the default
              choice for every workload. For most startups, modern alternatives
              like:
            </p>
            <ul className="plain">
              <li>Neviri Cloud</li>
              <li>Neon</li>
              <li>Supabase</li>
              <li>PlanetScale</li>
              <li>Crunchy Bridge</li>
              <li>DigitalOcean Managed Databases</li>
            </ul>
            <p style={{ marginTop: "14px" }}>
              often provide better developer experience, lower operational
              complexity, more predictable pricing, and faster deployment than
              AWS RDS.
            </p>
            <div className="credit-line">
              <span className="amt">$100</span>
              <span>free cloud credit when you sign up for Neviri Cloud.</span>
              <a
                href={SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: "10px 18px", fontSize: ".85rem" }}
              >
                Claim your credit
              </a>
            </div>
          </div>
        </section>

        <section data-reveal="">
          <div className="eyebrow">
            <span className="bar"></span>
            <span>Context</span>
          </div>
          <h2>Why Startups Are Looking Beyond AWS RDS</h2>
          <p>
            AWS RDS remains a reliable managed database platform, but startups
            increasingly face challenges such as:
          </p>
          <ul className="plain">
            <li>Complex pricing</li>
            <li>AWS ecosystem lock-in</li>
            <li>Operational overhead</li>
            <li>Difficult cost forecasting</li>
            <li>Paying for idle resources</li>
            <li>Slower development workflows</li>
          </ul>
          <p style={{ marginTop: "16px" }}>
            Modern database platforms now focus on:
          </p>
          <ul className="plain">
            <li>Serverless scaling</li>
            <li>Database branching</li>
            <li>Built-in developer tooling</li>
            <li>Simplified operations</li>
            <li>Usage-based billing</li>
          </ul>
          <p style={{ marginTop: "16px" }}>
            These capabilities can significantly reduce infrastructure costs
            during early-stage growth.
          </p>
        </section>

        <section data-reveal="">
          <div className="eyebrow">
            <span className="bar"></span>
            <span>The list</span>
          </div>
          <h2>Top AWS RDS Alternatives for Startups in 2026</h2>

          <div className="platform featured" data-reveal="">
            <div className="platform-head">
              <span className="platform-num">01</span>
              <h3>Neviri Cloud</h3>
              <span className="featured-mark">Best budget-friendly</span>
            </div>
            <p>
              <strong>Why It Stands Out</strong> — for startups seeking managed
              databases without hyperscaler complexity, Neviri Cloud offers
              managed PostgreSQL, managed MySQL, managed MongoDB, automated
              backups, monitoring, high-availability infrastructure, and
              usage-based pricing. Neviri specifically targets startups, SaaS
              companies, and growing businesses that want production-ready
              infrastructure without large cloud bills.
            </p>
            <div className="platform-cols">
              <div>
                <h4>Best For</h4>
                <ul>
                  <li>SaaS startups</li>
                  <li>MVPs</li>
                  <li>Early-stage companies</li>
                  <li>Agencies</li>
                  <li>AI startups</li>
                </ul>
              </div>
              <div>
                <h4>Pros</h4>
                <ul>
                  <li>Fast deployment</li>
                  <li>Managed PostgreSQL, MySQL, MongoDB</li>
                  <li>Startup-friendly pricing</li>
                  <li>$100 free credits</li>
                  <li>Infrastructure and databases under one platform</li>
                </ul>
              </div>
            </div>
            <div className="credit-line">
              <span>Startup Bonus — new users receive</span>
              <span className="amt">$100</span>
              <span>free cloud credits when signing up.</span>
            </div>
          </div>

          <div className="platform" data-reveal="">
            <div className="platform-head">
              <span className="platform-num">02</span>
              <h3>Neon</h3>
            </div>
            <div className="platform-sub">
              Best Serverless PostgreSQL Alternative
            </div>
            <p>
              <strong>Why Developers Love It</strong> — Neon separates storage
              from compute and supports scale-to-zero, database branching,
              serverless PostgreSQL, and instant development environments. For
              startups with unpredictable traffic, Neon can be significantly
              cheaper than AWS RDS because idle compute isn&apos;t continuously
              billed.
            </p>
            <div className="platform-cols">
              <div>
                <h4>Best For</h4>
                <ul>
                  <li>AI applications</li>
                  <li>SaaS platforms</li>
                  <li>Agentic workflows</li>
                  <li>Startups using PostgreSQL</li>
                </ul>
              </div>
              <div>
                <h4>Notable Feature</h4>
                <ul>
                  <li>
                    Database branching works like Git branches for databases,
                    dramatically improving testing and deployment workflows.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="platform" data-reveal="">
            <div className="platform-head">
              <span className="platform-num">03</span>
              <h3>Supabase</h3>
            </div>
            <div className="platform-sub">Best Backend-as-a-Service</div>
            <p>
              <strong>Why It Wins</strong> — Supabase combines PostgreSQL,
              authentication, storage, realtime APIs, and edge functions.
              Instead of managing multiple services, startups can launch a
              complete backend from a single platform.
            </p>
            <div className="platform-cols">
              <div>
                <h4>Best For</h4>
                <ul>
                  <li>MVPs</li>
                  <li>Startup founders</li>
                  <li>Small engineering teams</li>
                  <li>Rapid product launches</li>
                </ul>
              </div>
              <div>
                <h4>Tradeoff</h4>
                <ul>
                  <li>
                    You gain speed but may sacrifice some infrastructure
                    flexibility later.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="platform" data-reveal="">
            <div className="platform-head">
              <span className="platform-num">04</span>
              <h3>PlanetScale</h3>
            </div>
            <div className="platform-sub">Best MySQL Alternative</div>
            <p>
              PlanetScale is built on Vitess, the technology originally developed
              at YouTube.
            </p>
            <div className="platform-cols">
              <div>
                <h4>Key Advantages</h4>
                <ul>
                  <li>Zero-downtime schema migrations</li>
                  <li>Horizontal scaling</li>
                  <li>Managed MySQL</li>
                  <li>High availability</li>
                </ul>
              </div>
              <div>
                <h4>Best For</h4>
                <ul>
                  <li>High-growth SaaS companies</li>
                  <li>E-commerce startups</li>
                  <li>MySQL-heavy applications</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="platform" data-reveal="">
            <div className="platform-head">
              <span className="platform-num">05</span>
              <h3>Crunchy Bridge</h3>
            </div>
            <div className="platform-sub">Best Enterprise PostgreSQL</div>
            <p>
              Crunchy Data employs PostgreSQL experts and contributors. Crunchy
              Bridge focuses on reliability, security, observability, and
              PostgreSQL best practices. If your startup is handling
              mission-critical workloads, Crunchy Bridge is one of the safest
              PostgreSQL choices available.
            </p>
            <div className="platform-cols">
              <div>
                <h4>Best For</h4>
                <ul>
                  <li>Fintech</li>
                  <li>Healthcare</li>
                  <li>Enterprise SaaS</li>
                  <li>Regulated industries</li>
                </ul>
              </div>
              <div></div>
            </div>
          </div>

          <div className="platform" data-reveal="">
            <div className="platform-head">
              <span className="platform-num">06</span>
              <h3>DigitalOcean Managed Databases</h3>
            </div>
            <p>
              DigitalOcean continues to attract startups through transparent
              pricing, simple UX, managed PostgreSQL, managed MySQL, and managed
              Redis. Many founders choose DigitalOcean specifically because it is
              easier to manage than AWS.
            </p>
          </div>

          <div className="credit-line" style={{ marginTop: "8px" }}>
            <a
              href={SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Start free with Neviri Cloud →
            </a>
          </div>
        </section>

        <section id="comparison" data-reveal="">
          <div className="eyebrow">
            <span className="bar"></span>
            <span>Side by side</span>
          </div>
          <h2>Comparison Table</h2>
          <table className="compare">
            <thead>
              <tr>
                <th>Platform</th>
                <th>Database Types</th>
                <th>Serverless</th>
                <th>Branching</th>
                <th>Startup Friendly</th>
                <th>Free Credits</th>
              </tr>
            </thead>
            <tbody>
              <tr className="featured">
                <td>Neviri Cloud</td>
                <td>PostgreSQL, MySQL, MongoDB</td>
                <td>No</td>
                <td>No</td>
                <td>5/5</td>
                <td>$100</td>
              </tr>
              <tr>
                <td>Neon</td>
                <td>PostgreSQL</td>
                <td>Yes</td>
                <td>Yes</td>
                <td>5/5</td>
                <td>Startup Program</td>
              </tr>
              <tr>
                <td>Supabase</td>
                <td>PostgreSQL + Backend Services</td>
                <td>Partial</td>
                <td>No</td>
                <td>5/5</td>
                <td>Free Tier</td>
              </tr>
              <tr>
                <td>PlanetScale</td>
                <td>MySQL</td>
                <td>Partial</td>
                <td>Yes</td>
                <td>4/5</td>
                <td>Free Tier</td>
              </tr>
              <tr>
                <td>Crunchy Bridge</td>
                <td>PostgreSQL</td>
                <td>No</td>
                <td>No</td>
                <td>4/5</td>
                <td>Limited</td>
              </tr>
              <tr>
                <td>DigitalOcean</td>
                <td>PostgreSQL, MySQL, Redis</td>
                <td>No</td>
                <td>No</td>
                <td>4/5</td>
                <td>Promotions</td>
              </tr>
            </tbody>
          </table>

          <div className="cards-compare">
            <div className="cc-card featured">
              <h4>Neviri Cloud</h4>
              <div className="cc-row">
                <span>Database Types</span>
                <span>PostgreSQL, MySQL, MongoDB</span>
              </div>
              <div className="cc-row">
                <span>Serverless</span>
                <span>No</span>
              </div>
              <div className="cc-row">
                <span>Branching</span>
                <span>No</span>
              </div>
              <div className="cc-row">
                <span>Startup Friendly</span>
                <span>5/5</span>
              </div>
              <div className="cc-row">
                <span>Free Credits</span>
                <span>$100</span>
              </div>
            </div>
            <div className="cc-card">
              <h4>Neon</h4>
              <div className="cc-row">
                <span>Database Types</span>
                <span>PostgreSQL</span>
              </div>
              <div className="cc-row">
                <span>Serverless</span>
                <span>Yes</span>
              </div>
              <div className="cc-row">
                <span>Branching</span>
                <span>Yes</span>
              </div>
              <div className="cc-row">
                <span>Startup Friendly</span>
                <span>5/5</span>
              </div>
              <div className="cc-row">
                <span>Free Credits</span>
                <span>Startup Program</span>
              </div>
            </div>
            <div className="cc-card">
              <h4>Supabase</h4>
              <div className="cc-row">
                <span>Database Types</span>
                <span>PostgreSQL + Backend Services</span>
              </div>
              <div className="cc-row">
                <span>Serverless</span>
                <span>Partial</span>
              </div>
              <div className="cc-row">
                <span>Branching</span>
                <span>No</span>
              </div>
              <div className="cc-row">
                <span>Startup Friendly</span>
                <span>5/5</span>
              </div>
              <div className="cc-row">
                <span>Free Credits</span>
                <span>Free Tier</span>
              </div>
            </div>
            <div className="cc-card">
              <h4>PlanetScale</h4>
              <div className="cc-row">
                <span>Database Types</span>
                <span>MySQL</span>
              </div>
              <div className="cc-row">
                <span>Serverless</span>
                <span>Partial</span>
              </div>
              <div className="cc-row">
                <span>Branching</span>
                <span>Yes</span>
              </div>
              <div className="cc-row">
                <span>Startup Friendly</span>
                <span>4/5</span>
              </div>
              <div className="cc-row">
                <span>Free Credits</span>
                <span>Free Tier</span>
              </div>
            </div>
            <div className="cc-card">
              <h4>Crunchy Bridge</h4>
              <div className="cc-row">
                <span>Database Types</span>
                <span>PostgreSQL</span>
              </div>
              <div className="cc-row">
                <span>Serverless</span>
                <span>No</span>
              </div>
              <div className="cc-row">
                <span>Branching</span>
                <span>No</span>
              </div>
              <div className="cc-row">
                <span>Startup Friendly</span>
                <span>4/5</span>
              </div>
              <div className="cc-row">
                <span>Free Credits</span>
                <span>Limited</span>
              </div>
            </div>
            <div className="cc-card">
              <h4>DigitalOcean</h4>
              <div className="cc-row">
                <span>Database Types</span>
                <span>PostgreSQL, MySQL, Redis</span>
              </div>
              <div className="cc-row">
                <span>Serverless</span>
                <span>No</span>
              </div>
              <div className="cc-row">
                <span>Branching</span>
                <span>No</span>
              </div>
              <div className="cc-row">
                <span>Startup Friendly</span>
                <span>4/5</span>
              </div>
              <div className="cc-row">
                <span>Free Credits</span>
                <span>Promotions</span>
              </div>
            </div>
          </div>
        </section>

        <section data-reveal="">
          <div className="eyebrow">
            <span className="bar"></span>
            <span>Decision guide</span>
          </div>
          <h2>Which Alternative Should You Choose?</h2>
          <div className="choose-grid">
            <div className="choose-item featured">
              <h3>Choose Neviri Cloud If:</h3>
              <ul>
                <li>You want managed databases and infrastructure together</li>
                <li>You need PostgreSQL, MySQL, or MongoDB</li>
                <li>You&apos;re building an MVP</li>
                <li>You want a startup-friendly platform</li>
                <li>You want $100 free cloud credits to get started</li>
              </ul>
            </div>
            <div className="choose-item">
              <h3>Choose Neon If:</h3>
              <ul>
                <li>You&apos;re building with PostgreSQL</li>
                <li>You want serverless architecture</li>
                <li>You need database branching</li>
                <li>Traffic is highly variable</li>
              </ul>
            </div>
            <div className="choose-item">
              <h3>Choose Supabase If:</h3>
              <ul>
                <li>You need a complete backend platform</li>
                <li>You want authentication and storage included</li>
                <li>Speed of development matters most</li>
              </ul>
            </div>
            <div className="choose-item">
              <h3>Choose PlanetScale If:</h3>
              <ul>
                <li>You&apos;re committed to MySQL</li>
                <li>You expect significant scale</li>
              </ul>
            </div>
            <div className="choose-item">
              <h3>Choose Crunchy Bridge If:</h3>
              <ul>
                <li>Reliability is more important than cost</li>
                <li>You run mission-critical workloads</li>
              </ul>
            </div>
          </div>
        </section>

        <section data-reveal="">
          <div className="eyebrow">
            <span className="bar"></span>
            <span>FAQ</span>
          </div>
          <h2>Frequently Asked Questions</h2>
          <div className="faq-item">
            <h3>Is AWS RDS still worth it in 2026?</h3>
            <p>
              Yes. AWS RDS remains a strong enterprise-grade managed database
              service, especially for organizations deeply integrated into AWS.
              However, startups often benefit from newer platforms that
              prioritize developer experience and cost efficiency.
            </p>
          </div>
          <div className="faq-item">
            <h3>What is the cheapest AWS RDS alternative?</h3>
            <p>
              For early-stage startups, Neviri Cloud, Neon, and Supabase
              typically offer lower entry costs than AWS RDS.
            </p>
          </div>
          <div className="faq-item">
            <h3>What is the best PostgreSQL alternative to AWS RDS?</h3>
            <p>
              Neon, Supabase, and Crunchy Bridge are among the strongest
              PostgreSQL-focused alternatives in 2026.
            </p>
          </div>
          <div className="faq-item">
            <h3>Which AWS RDS alternative is best for SaaS startups?</h3>
            <p>
              For most SaaS startups: Neviri Cloud, Neon, and Supabase. These
              platforms balance cost, scalability, and developer productivity
              particularly well.
            </p>
          </div>
        </section>

        <section className="expert" data-reveal="">
          <div className="eyebrow">
            <span className="bar"></span>
            <span>Expert insight</span>
          </div>
          <h2>Expert Insight</h2>
          <p>
            The biggest mistake startups make is optimizing for a hypothetical
            scale instead of actual growth.
          </p>
          <p>
            AWS RDS is excellent once infrastructure complexity becomes
            justified. Before that point, developer velocity and cost efficiency
            matter more than enterprise-grade feature depth.
          </p>
          <p>For most startups in 2026, the strongest strategy is:</p>
          <ul className="plain">
            <li>MVP → Neviri Cloud or Supabase</li>
            <li>Product-market fit → Neon or PlanetScale</li>
            <li>Enterprise scale → AWS RDS, Aurora, or Crunchy Bridge</li>
          </ul>
          <p>
            This progression minimizes infrastructure spending while maximizing
            development speed.
          </p>
        </section>

        <section style={{ borderTop: "none" }} data-reveal="">
          <div className="final-cta">
            <h2>Deploy your first database today</h2>
            <p>$100 in free cloud credit on Neviri Cloud.</p>
            <a
              href={SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Start free with Neviri Cloud →
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
