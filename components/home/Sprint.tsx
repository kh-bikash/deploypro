"use client";

import { useEffect, useRef, useState } from "react";
import OptionWheel from "./OptionWheel";
import { sprintStages } from "@/lib/home";
import styles from "./Sprint.module.css";

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

/** Mirrors --v2-accent (#3b82f6) — the wheel blends in rgb, so it needs numbers. */
const ACCENT: [number, number, number] = [59, 130, 246];

/**
 * Pinning is a question of vertical room, not width — phones get the same
 * scroll-driven wheel, just on the stacked layout below.
 */
const PIN_QUERY = "(min-height: 600px)";
/** Short-but-still-pinnable viewports get a tighter card and a shorter wheel. */
const COMPACT_QUERY = "(max-height: 900px)";
/** Below this the wheel sits above the card instead of beside it. */
const NARROW_QUERY = "(max-width: 980px)";
/** Phones shrink the wheel again — a tablet has room for a much bigger label. */
const PHONE_QUERY = "(max-width: 640px)";

export default function Sprint() {
  const trackRef = useRef<HTMLDivElement>(null);
  /** live fractional position — read by the wheel's rAF loop, never rendered */
  const posRef = useRef(0);

  const [pinned, setPinned] = useState(true);
  const [compact, setCompact] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const [phone, setPhone] = useState(false);
  const [active, setActive] = useState(0);
  const last = sprintStages.length - 1;

  // One source of truth for pinning: this state also drives the CSS through
  // data-pinned, so the layout and the scroll maths can never disagree.
  useEffect(() => {
    const queries = [PIN_QUERY, COMPACT_QUERY, NARROW_QUERY, PHONE_QUERY].map((q) =>
      window.matchMedia(q),
    );
    const [pinMq, shortMq, narrowMq, phoneMq] = queries;
    const sync = () => {
      setPinned(pinMq.matches);
      setCompact(shortMq.matches);
      setNarrow(narrowMq.matches);
      setPhone(phoneMq.matches);
    };
    sync();
    queries.forEach((mq) => mq.addEventListener("change", sync));
    window.addEventListener("resize", sync, { passive: true });
    return () => {
      queries.forEach((mq) => mq.removeEventListener("change", sync));
      window.removeEventListener("resize", sync);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !pinned) return;

    // Scroll writes to a ref; React only re-renders when the rounded stage
    // changes, so dragging the page stays cheap.
    const measure = () => {
      const travel = track.offsetHeight - window.innerHeight;
      if (travel <= 0) return;
      const p = clamp(-track.getBoundingClientRect().top / travel, 0, 1);
      // hold on the first and last stage for a beat instead of racing past them
      const next = clamp(p * (last + 0.7) - 0.35, 0, last);
      posRef.current = next;
      setActive((current) => {
        const rounded = clamp(Math.round(next), 0, last);
        return rounded === current ? current : rounded;
      });
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [last, pinned]);

  const stage = sprintStages[active];

  // when pinned, picking a row scrolls the track to where that stage is centred
  const goTo = (index: number) => {
    const track = trackRef.current;
    const travel = track ? track.offsetHeight - window.innerHeight : 0;
    if (!pinned || !track || travel <= 0) {
      posRef.current = index;
      setActive(index);
      return;
    }
    const p = (index + 0.35) / (last + 0.7);
    const top = track.getBoundingClientRect().top + window.scrollY + travel * p;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section
      className={styles.section}
      id="sprint"
      data-pinned={pinned ? "true" : "false"}
      data-compact={compact ? "true" : "false"}
      data-narrow={narrow ? "true" : "false"}
      data-phone={phone ? "true" : "false"}
    >
      <div className={styles.track} ref={trackRef}>
        <div className={styles.sticky}>
          <div className={styles.inner}>
            <div className={styles.head}>
              <div className={styles.kicker}>The deployment sprint</div>
              <h2 className={styles.title}>
                One workflow, live in fifteen days.
              </h2>
              <p className={styles.lead}>
                No discovery phase. Every stage ends in something you can open and use.
              </p>
            </div>

            <div className={styles.stage}>
              <OptionWheel
                items={sprintStages.map((item) => item.title)}
                value={active}
                onChange={goTo}
                positionRef={pinned ? posRef : undefined}
                fontSize={phone ? 1.5 : narrow ? 2.15 : 2.7}
                spacing={narrow ? 1.55 : 1.45}
                curve={narrow ? 0.45 : 1}
                tilt={narrow ? 9 : 11}
                blur={narrow ? 0.7 : 0.9}
                fade={0.26}
                minOpacity={0.26}
                smoothing={260}
                height={phone ? 168 : narrow ? 250 : compact ? 350 : 430}
                activeColor={ACCENT}
              />

              <div className={styles.detail}>
                <div className={styles.swap} key={stage.no}>
                  <div className={styles.days}>{stage.days}</div>
                  <p className={styles.body}>{stage.body}</p>

                  <div className={styles.block}>
                    <span className={styles.blockLabel}>{stage.marksLabel}</span>
                    <ul className={styles.marks}>
                      {stage.marks.map((mark) => (
                        <li key={mark}>{mark}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.need}>
                    <span className={styles.blockLabel}>What we need from you</span>
                    <p>{stage.need}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
