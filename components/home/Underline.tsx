"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Underline.module.css";

/**
 * Emphasis by annotation rather than colour — the text stays in the normal ink
 * and gets a hand-drawn rule underneath, which draws itself once the phrase
 * scrolls into view. Safe to wrap across lines; see the stylesheet.
 */
export default function Underline({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setDrawn(true);
        observer.disconnect();
      },
      { threshold: 0.6 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <em className={drawn ? `${styles.wrap} ${styles.drawn}` : styles.wrap} ref={ref}>
      {children}
    </em>
  );
}
