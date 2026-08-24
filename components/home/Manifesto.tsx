"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { manifesto } from "@/lib/home";
import styles from "./Manifesto.module.css";

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

function Column({
  side,
  data,
  markChar,
}: {
  side: "before" | "after";
  data: { label: string; items: string[] };
  markChar: string;
}) {
  return (
    <div className={`${styles.layer} ${styles[side]}`}>
      <div className={styles.head}>
        <span className={styles.headLabel}>{data.label}</span>
      </div>
      {data.items.map((item) => (
        <div className={styles.row} key={item}>
          <span className={styles.mark} aria-hidden="true">
            {markChar}
          </span>
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
}

export default function Manifesto() {
  const compareRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(50);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = compareRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    setX(clamp(((clientX - rect.left) / rect.width) * 100, 3, 97));
  }, []);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (!dragging.current) return;
      event.preventDefault();
      setFromClientX(event.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [setFromClientX]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const step = event.shiftKey ? 10 : 4;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setX((v) => clamp(v - step, 3, 97));
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setX((v) => clamp(v + step, 3, 97));
    }
  };

  return (
    <section className={styles.section} id="why">
      <div className={`${styles.card} reveal`}>
        <div className={styles.kicker}>The model has changed</div>
        <h2 className={styles.title}>
          The models work. <em>Your deployment doesn&apos;t.</em>
        </h2>

        <div
          className={styles.compare}
          ref={compareRef}
          style={{ "--x": `${x}%` } as React.CSSProperties}
          onPointerDown={(event) => {
            dragging.current = true;
            setFromClientX(event.clientX);
          }}
        >
          {/* base — what you get with us */}
          <Column side="after" data={manifesto.after} markChar="→" />

          {/* wiped over the top — what the market sold you */}
          <div className={styles.overlay}>
            <Column side="before" data={manifesto.before} markChar="✕" />
          </div>

          <div className={styles.handle}>
            <div
              className={styles.grip}
              role="slider"
              tabIndex={0}
              aria-label="Compare the old way with the forward-deployed way"
              aria-valuemin={3}
              aria-valuemax={97}
              aria-valuenow={Math.round(x)}
              onKeyDown={onKeyDown}
            >
              <span aria-hidden="true">◄►</span>
            </div>
          </div>
        </div>

        <div className={styles.hint}>
          <i aria-hidden="true" />
          Drag to compare
        </div>
      </div>
    </section>
  );
}
