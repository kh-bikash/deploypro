"use client";

import { useId, useState } from "react";
import { faqs } from "@/lib/home";
import styles from "./Faq.module.css";

export default function Faq() {
  // everything starts closed — the list reads as a scannable index
  const [open, setOpen] = useState<number | null>(null);
  const uid = useId();

  return (
    <section className={styles.section} id="faq">
      <div className={styles.inner}>
        <div className="reveal">
          <div className={styles.kicker}>FAQ</div>
          <h2 className={styles.title}>
            Straight <em>answers.</em>
          </h2>
        </div>

        <div className={`${styles.list} reveal`}>
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div className={isOpen ? `${styles.item} ${styles.open}` : styles.item} key={item.q}>
                <button
                  className={styles.q}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${uid}-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  {item.q}
                  <span className={styles.sign} aria-hidden="true" />
                </button>
                <div className={styles.body} id={`${uid}-panel-${i}`}>
                  <div className={styles.bodyInner}>
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
