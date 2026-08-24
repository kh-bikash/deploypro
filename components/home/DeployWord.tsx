"use client";

import { useEffect, useState } from "react";
import { deploySteps } from "@/lib/content";
import styles from "./DeployWord.module.css";

const CYCLE_MS = 2300;

export default function DeployWord({ titleClassName }: { titleClassName?: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setActive((prev) => (prev + 1) % deploySteps.length),
      CYCLE_MS,
    );
    return () => window.clearInterval(timer);
  }, [paused]);

  const step = deploySteps[active];

  return (
    <div className={styles.wrap}>
      {/* The heading reads as one stable string; the letters are decoration. */}
      <h1 className={titleClassName ? `${titleClassName} ${styles.title}` : styles.title}>
        <span className={styles.srOnly}>
          DEPLOY - {deploySteps.map((s) => s.word).join(", ")}
        </span>

        <span className={styles.word} aria-hidden="true" onMouseLeave={() => setPaused(false)}>
          {deploySteps.map((item, i) => (
            <button
              key={item.word}
              type="button"
              tabIndex={-1}
              className={i === active ? `${styles.letter} ${styles.on}` : styles.letter}
              onMouseEnter={() => {
                setPaused(true);
                setActive(i);
              }}
              onClick={() => setActive(i)}
            >
              <span className={styles.glyph}>
                <span>{item.word[0]}</span>
              </span>
            </button>
          ))}

          <span
            className={styles.rule}
            style={{ transform: `translateX(${active * 100}%) scaleX(.62)` }}
          />
        </span>
      </h1>

      {/* Not aria-live — it changes every couple of seconds and would just
          interrupt. The heading above already names all six steps. */}
      <div className={styles.caption}>
        <div className={styles.step} key={step.word}>
          <b>{step.word}</b>
          <i aria-hidden="true">-</i>
          <span>{step.short}</span>
        </div>
      </div>
    </div>
  );
}
