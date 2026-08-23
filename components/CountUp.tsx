"use client";

import { useEffect, useRef } from "react";

type Props = {
  target: number;
  duration?: number;
  className?: string;
};

/**
 * Renders the real figure during SSR so crawlers and no-JS visitors see it,
 * then counts up from zero once the element scrolls into view.
 */
/** Deterministic grouping — Intl would risk a server/client locale mismatch. */
function format(value: number) {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CountUp({ target, duration = 1200, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const run = () => {
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        el.textContent = format(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    // Already on screen at load: leave the number as rendered, no reset flash.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    el.textContent = "0";
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        run();
      },
      { threshold: 0.32 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {format(target)}
    </span>
  );
}
