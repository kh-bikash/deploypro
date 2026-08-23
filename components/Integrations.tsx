"use client";

import { useEffect, useRef, useState } from "react";
import { featuredIntegrations, integrations, faviconUrl, initials } from "@/lib/integrations";

const CAPTIONS = [
  "01 · CRM + collaboration",
  "02 · communication + growth",
  "03 · knowledge + engineering",
  "04 · files + payments",
  "8 featured connections · 1,000+ available",
];

const featured = featuredIntegrations
  .map((name) => integrations.find((app) => app.name === name))
  .filter((app): app is NonNullable<typeof app> => Boolean(app));

function AppLogo({ name, domain }: { name: string; domain: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <>
      <div className="app-badge">
        {failed ? (
          <span className="logo-fallback" style={{ display: "grid" }}>
            {initials(name)}
          </span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="logo-img"
            src={faviconUrl(domain)}
            alt=""
            loading="lazy"
            width={34}
            height={34}
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <div className="app-name">{name}</div>
    </>
  );
}

function MarqueeRow({ apps, reverse }: { apps: typeof integrations; reverse?: boolean }) {
  return (
    <div className={reverse ? "marquee reverse" : "marquee"} aria-hidden="true">
      <div className="marquee-track">
        {[...apps, ...apps].map((app, i) => (
          <div className="marquee-item" key={`${app.name}-${i}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={faviconUrl(app.domain)} alt="" loading="lazy" width={26} height={26} />
            <span>{app.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Integrations() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const appRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const update = () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      const hub = hubRef.current;
      const caption = captionRef.current;
      if (!section || !stage || !hub || !caption) return;

      const rect = section.getBoundingClientRect();
      const travel = section.offsetHeight - window.innerHeight;
      const p = reduced ? 1 : Math.max(0, Math.min(1, -rect.top / Math.max(1, travel)));

      const w = stage.clientWidth;
      const h = stage.clientHeight;
      const cx = w * 0.5;
      const cy = h * 0.65;
      const mobile = w < 760;
      const xLeft = mobile ? w * 0.17 : w * 0.18;
      const xRight = mobile ? w * 0.83 : w * 0.82;
      // Kept clear of the headline block, which occupies the top third of the stage.
      const ys = mobile ? [h * 0.44, h * 0.56, h * 0.72, h * 0.84] : [h * 0.45, h * 0.57, h * 0.73, h * 0.85];

      const pairProgress = [0.03, 0.24, 0.45, 0.66].map((start) =>
        Math.max(0, Math.min(1, (p - start) / 0.18)),
      );

      const hubIn = Math.max(0, Math.min(1, p / 0.18));
      hub.style.opacity = String(0.22 + hubIn * 0.78);
      hub.style.transform = `translate(-50%,-50%) scale(${0.88 + hubIn * 0.12})`;

      appRefs.current.forEach((node, i) => {
        const line = lineRefs.current[i];
        if (!node || !line) return;

        const pair = Math.floor(i / 2);
        const sideLeft = i % 2 === 0;
        const q = pairProgress[pair] ?? 0;

        const targetX = sideLeft ? xLeft : xRight;
        const startX = sideLeft ? -120 : w + 120;
        const ease = 1 - Math.pow(1 - q, 3);
        const x = startX + (targetX - startX) * ease;
        const y = ys[pair];

        node.style.left = `${x}px`;
        node.style.top = `${y}px`;
        node.style.opacity = String(q);
        node.style.transform = `translate(-50%,-50%) scale(${0.9 + q * 0.1})`;

        const dx = cx - x;
        const dy = cy - y;
        const len = Math.sqrt(dx * dx + dy * dy);
        line.style.left = `${x}px`;
        line.style.top = `${y}px`;
        line.style.width = `${Math.max(0, len - 68)}px`;
        line.style.transform = `rotate(${(Math.atan2(dy, dx) * 180) / Math.PI}deg)`;
        line.style.opacity = String(q * 0.72);
        line.classList.toggle("active", q > 0.72);
      });

      const captionIndex = p < 0.2 ? 0 : p < 0.41 ? 1 : p < 0.62 ? 2 : p < 0.84 ? 3 : 4;
      caption.textContent = CAPTIONS[captionIndex];
      caption.style.opacity = String(0.45 + Math.min(1, p * 2) * 0.4);
    };

    update();
    const raf = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="integrations" id="integrations" ref={sectionRef}>
      <div className="integrations-sticky">
        <div className="int-stage" ref={stageRef}>
          <div className="int-copy">
            <h2>
              Nothing <span>gets migrated.</span>
            </h2>
            <div className="int-side">
              <b>The workflow comes to your systems.</b> It reaches into the CRM, the inbox, the
              documents and the internal APIs you already run — under your permissions, with the
              actions each step genuinely needs and nothing more.
            </div>
          </div>

          <div className="integration-orbit">
            <div className="hub" ref={hubRef}>
              <div>
                <div className="hub-mark" aria-hidden="true">
                  D
                </div>
                <strong>DEPLOY</strong>
                <small>business operating layer</small>
              </div>
            </div>

            {featured.map((app, i) => (
              <div
                className="orbit-app"
                key={app.name}
                ref={(el) => {
                  appRefs.current[i] = el;
                }}
              >
                <AppLogo name={app.name} domain={app.domain} />
              </div>
            ))}

            {featured.map((app, i) => (
              <div
                className="connector-line"
                key={`line-${app.name}`}
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
              />
            ))}
          </div>

          <div className="int-caption" ref={captionRef}>
            Scroll to connect your stack
          </div>
        </div>
      </div>

      <div className="integrations-wall">
        <div className="container">
          <div className="wall-head reveal">
            <h3>Your stack, without rebuilding your stack.</h3>
            <p>
              CRM, collaboration, finance, product, support and internal tools all become part of the
              workflow — with review points wherever a human should stay in control, and a full trace
              of every action taken.
            </p>
          </div>

          <div className="reveal">
            <MarqueeRow apps={integrations.slice(0, 14)} />
            <MarqueeRow apps={integrations.slice(14)} reverse />
          </div>

          <div className="flow-rail reveal">
            <div className="flow-step">
              <span>01 · SIGNAL</span>
              <b>Discover</b>
            </div>
            <div className="flow-step">
              <span>02 · CONTEXT</span>
              <b>Connect</b>
            </div>
            <div className="flow-step">
              <span>03 · ACTION</span>
              <b>Execute</b>
            </div>
            <div className="flow-step">
              <span>04 · CONTROL</span>
              <b>Approve</b>
            </div>
            <div className="flow-step">
              <span>05 · OUTCOME</span>
              <b>Measure</b>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
