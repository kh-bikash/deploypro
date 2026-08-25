"use client";

import { useEffect, useRef } from "react";
import styles from "./DotMark.module.css";

type Props = {
  /** the letter to build the lattice from */
  glyph?: string;
  /** lattice pitch in px — larger reads as coarser dots */
  gap?: number;
  /** dot radius in px */
  dot?: number;
  /** glyph height as a share of the hero */
  scale?: number;
};

type Dot = { x: number; y: number; phase: number; accent: boolean };

const ACCENT = "59, 130, 246";
const INK = "243, 240, 232";

export default function DotMark({ glyph = "D", gap = 13, dot = 1.7, scale = 0.72 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dots: Dot[] = [];
    /* cached from build() — reading layout inside the frame loop would force a
       reflow sixty times a second for a value that only changes on resize */
    let hostW = 0;
    let hostH = 0;
    let raf = 0;
    let visible = true;
    let stale = false;

    /* Rasterise the letter once, then sample it on a fixed lattice — following
       the real outline is what keeps it looking like the wordmark rather than
       like a traced shape. */
    const build = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (rect.width < 2 || rect.height < 2) return;

      hostW = rect.width;
      hostH = rect.height;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const size = Math.min(rect.height * scale, rect.width * 0.86);
      const mask = document.createElement("canvas");
      mask.width = Math.ceil(size);
      mask.height = Math.ceil(size * 1.25);
      const mctx = mask.getContext("2d", { willReadFrequently: true });
      if (!mctx) return;

      /* ctx.font cannot resolve a CSS custom property — var(--font-display)
         is rejected outright and the context silently stays at 10px sans.
         Resolve the family off the cascade first. */
      const family =
        getComputedStyle(document.documentElement).getPropertyValue("--font-display").trim() ||
        "Inter";

      mctx.font = `600 ${Math.round(size)}px ${family}, Inter, sans-serif`;
      mctx.textAlign = "center";
      mctx.textBaseline = "middle";
      mctx.fillStyle = "#fff";
      mctx.fillText(glyph, mask.width / 2, mask.height / 2);

      const data = mctx.getImageData(0, 0, mask.width, mask.height).data;
      const next: Dot[] = [];
      let minX = mask.width;
      let maxX = 0;
      let minY = mask.height;
      let maxY = 0;

      for (let y = 0; y < mask.height; y += gap) {
        for (let x = 0; x < mask.width; x += gap) {
          if (data[(y * mask.width + x) * 4 + 3] < 128) continue;
          next.push({
            x,
            y,
            phase: (x * 0.06 + y * 0.045) % (Math.PI * 2),
            accent: next.length % 11 === 0,
          });
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }

      // centre on the inked bounds, not the mask, so the glyph sits true
      const offsetX = hostW / 2 - (minX + maxX) / 2;
      const offsetY = hostH / 2 - (minY + maxY) / 2;
      dots = next.map((d) => ({ ...d, x: d.x + offsetX, y: d.y + offsetY }));
    };

    const paint = (t: number) => {
      ctx.clearRect(0, 0, hostW, hostH);
      for (const d of dots) {
        const breathe = reduced ? 0.62 : 0.62 + Math.sin(t / 1400 + d.phase) * 0.3;
        ctx.fillStyle = `rgba(${d.accent ? ACCENT : INK}, ${breathe.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, dot, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = (t: number) => {
      paint(t);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf || !visible || document.visibilityState === "hidden") return;
      if (reduced) {
        paint(0);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    build();
    start();

    // the font may land after the first paint — rebuild once it has
    document.fonts?.ready.then(() => {
      if (stale) return;
      build();
      if (reduced) paint(0);
    });

    const io = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(host);

    const ro = new ResizeObserver(() => {
      build();
      if (reduced) paint(0);
    });
    ro.observe(host);

    const onVisibility = () => (document.visibilityState === "hidden" ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stale = true;
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [glyph, gap, dot, scale]);

  return <canvas ref={ref} className={styles.mark} aria-hidden="true" />;
}
