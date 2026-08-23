"use client";

import { useEffect } from "react";

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

function sectionProgress(el: HTMLElement | null, start = 0.82, end = 0.18) {
  if (!el) return 0;
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const startPx = vh * start;
  const endPx = vh * end;
  return clamp01((startPx - rect.top) / (startPx - endPx + rect.height * 0.28));
}


export default function HomeMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const update = () => {
      const rail = document.querySelector<HTMLElement>(".phase-rail");
      const items = Array.from(document.querySelectorAll<HTMLElement>(".phase-item"));
      if (rail && items.length) {
        // The rail fills to whichever phase marker the reader has reached.
        const anchor = window.innerHeight * 0.46;
        const railTop = rail.getBoundingClientRect().top;
        let active = -1;

        items.forEach((item, i) => {
          const marker = item.getBoundingClientRect();
          if (marker.top <= anchor) active = i;
        });

        const last = items[Math.max(0, active)].getBoundingClientRect();
        const filled = active < 0 ? 0 : last.top - railTop + last.height * 0.5;
        rail.style.setProperty("--phase-progress", `${Math.max(0, filled)}px`);

        items.forEach((item, i) => item.classList.toggle("is-active", i === active));
      }

      const final = document.querySelector<HTMLElement>(".final");
      if (final) {
        const p = sectionProgress(final, 0.9, 0.18);
        final.style.setProperty("--final-orb", String(0.55 + p * 0.65));
        const inner = final.querySelector<HTMLElement>(".container");
        if (inner) {
          inner.style.transform = `translateY(${36 * (1 - p)}px) scale(${0.965 + p * 0.035})`;
          inner.style.opacity = String(0.38 + p * 0.62);
        }
      }
    };

    const raf = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return null;
}
