"use client";

import { useEffect, useRef } from "react";
import styles from "./OptionWheel.module.css";

type Props = {
  items: string[];
  value: number;
  onChange: (index: number) => void;
  /** label size in rem */
  fontSize?: number;
  /** row gap as a multiple of the label size */
  spacing?: number;
  /** how far the wheel bows away from the anchored edge; 0 flattens it to a list */
  curve?: number;
  /** degrees between neighbouring rows */
  tilt?: number;
  /** blur in px added per step away from the middle */
  blur?: number;
  /** opacity lost per step away from the middle */
  fade?: number;
  minOpacity?: number;
  /** easing time constant in ms — higher feels heavier */
  smoothing?: number;
  height?: number;
  /** colour the centred row settles on; the rest fade toward grey */
  activeColor?: Rgb;
  /**
   * Live fractional row position when something else drives the wheel. Passing
   * a ref (rather than a value) keeps scroll updates out of React's render
   * path — the rAF loop reads it directly. Dragging is disabled while set.
   */
  positionRef?: { current: number };
};

type Rgb = [number, number, number];

const INK: Rgb = [243, 240, 232];
const DIM: Rgb = [107, 107, 109];

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const mix = (a: Rgb, b: Rgb, t: number) =>
  `rgb(${a.map((c, i) => Math.round(c + (b[i] - c) * t)).join(",")})`;

export default function OptionWheel({
  items,
  value,
  onChange,
  fontSize = 2.6,
  spacing = 1.55,
  curve = 1,
  tilt = 13,
  blur = 1.6,
  fade = 0.3,
  minOpacity = 0.12,
  smoothing = 190,
  height = 360,
  positionRef,
  activeColor = INK,
}: Props) {
  const wheelRef = useRef<HTMLDivElement>(null);
  const scrollDriven = !!positionRef;

  // Live animation state kept in refs — this loop must never re-render React.
  const pos = useRef(positionRef ? positionRef.current : value);
  const target = useRef(positionRef ? positionRef.current : value);
  const dragging = useRef(false);
  const dragFrom = useRef({ y: 0, pos: 0, moved: false });

  useEffect(() => {
    if (!positionRef) target.current = value;
  }, [value, positionRef]);

  useEffect(() => {
    const wheel = wheelRef.current;
    if (!wheel) return;

    const rows = Array.from(wheel.querySelectorAll<HTMLElement>("[data-opt]"));
    if (!rows.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = fontSize * 16 * spacing;
    const radius = step * 6;

    let raf = 0;
    let last = performance.now();

    const paint = () => {
      rows.forEach((node, i) => {
        const d = i - pos.current;
        const abs = Math.abs(d);
        const rad = (d * tilt * Math.PI) / 180;

        const x = curve * radius * (1 - Math.cos(rad));
        const y = d * step;
        const z = -radius * Math.abs(Math.sin(rad)) * 0.75;

        node.style.transform =
          `translate3d(${x.toFixed(2)}px, calc(-50% + ${y.toFixed(2)}px), ${z.toFixed(2)}px) ` +
          `rotateX(${(-d * tilt).toFixed(2)}deg)`;
        node.style.opacity = String(Math.max(minOpacity, 1 - abs * fade));
        node.style.filter = abs < 0.05 ? "none" : `blur(${Math.min(abs * blur, 6).toFixed(2)}px)`;
        node.style.color = mix(activeColor, DIM, clamp(abs, 0, 1));
        node.style.zIndex = String(100 - Math.round(abs * 10));
      });
    };

    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;

      if (positionRef) target.current = positionRef.current;

      if (!dragging.current) {
        const k = reduced ? 1 : 1 - Math.exp(-dt / smoothing);
        pos.current += (target.current - pos.current) * k;
        if (Math.abs(target.current - pos.current) < 0.0005) pos.current = target.current;
      }

      paint();
      raf = requestAnimationFrame(tick);
    };

    paint();
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    }, [items, fontSize, spacing, curve, tilt, blur, fade, minOpacity, smoothing, positionRef,
      activeColor[0], activeColor[1], activeColor[2]]);

  const settle = () => {
    const next = clamp(Math.round(pos.current), 0, items.length - 1);
    target.current = next;
    if (next !== value) onChange(next);
  };

  return (
    <div
      className={styles.wheel}
      ref={wheelRef}
      data-scroll-driven={scrollDriven ? "" : undefined}
      style={{ height, fontSize: `${fontSize}rem` }}
      role="listbox"
      tabIndex={0}
      aria-label="Sprint stages"
      aria-activedescendant={`wheel-opt-${value}`}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
          event.preventDefault();
          onChange(clamp(value + 1, 0, items.length - 1));
        }
        if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
          event.preventDefault();
          onChange(clamp(value - 1, 0, items.length - 1));
        }
      }}
      onPointerDown={(event) => {
        if (scrollDriven) return;
        (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
        dragging.current = true;
        dragFrom.current = { y: event.clientY, pos: pos.current, moved: false };
      }}
      onPointerMove={(event) => {
        if (!dragging.current) return;
        const dy = event.clientY - dragFrom.current.y;
        if (Math.abs(dy) > 3) dragFrom.current.moved = true;
        pos.current = clamp(
          dragFrom.current.pos - dy / (fontSize * 16 * spacing),
          -0.4,
          items.length - 0.6,
        );
      }}
      onPointerUp={(event) => {
        if (scrollDriven) return;
        (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
        dragging.current = false;
        settle();
      }}
      onPointerCancel={() => {
        if (scrollDriven) return;
        dragging.current = false;
        settle();
      }}
    >
      <div className={styles.rail} aria-hidden="true" />
      <div className={styles.stack}>
        {items.map((item, i) => (
          <button
            key={item}
            id={`wheel-opt-${i}`}
            data-opt=""
            type="button"
            role="option"
            aria-selected={i === value}
            className={styles.item}
            onClick={() => {
              if (dragFrom.current.moved) return;
              onChange(i);
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
