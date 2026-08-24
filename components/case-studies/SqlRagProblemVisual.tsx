import React from "react";
import styles from "./SqlRagProblemVisual.module.css";

type Props = {
  standalone?: boolean;
};

export default function SqlRagProblemVisual({ standalone = false }: Props) {
  return (
    <div className={`${styles.container} ${standalone ? styles.standalone : ""}`}>
      <div className={styles.header}>
        <span className={styles.kicker}>Semantic Disambiguation</span>
        <h3 className={styles.title}>The Semantic Ambiguity Gap</h3>
        <p className={styles.subtitle}>
          Valid SQL syntax does not guarantee analytical correctness. The failure mode in
          production is a query that executes successfully on the wrong business assumption.
        </p>
      </div>

      <div className={styles.visualGrid}>
        {/* Left: Raw User Input */}
        <div className={styles.card}>
          <span className={styles.cardTag}>User Question</span>
          <div className={styles.queryBox}>
            &ldquo;Which accounts performed best this quarter?&rdquo;
          </div>
          <span className={styles.cardSubtext}>Natural language intent</span>
        </div>

        {/* Middle: Ambiguity Fork */}
        <div className={styles.forkCard}>
          <span className={styles.forkTag}>Possible Interpretations</span>
          <div className={styles.forkOptions}>
            <div className={`${styles.forkItem} ${styles.forkMuted}`}>
              <span className={styles.forkDotRed} />
              <span>Revenue Volume</span>
              <span className={styles.forkStatus}>Valid SQL · Wrong intent</span>
            </div>
            <div className={`${styles.forkItem} ${styles.forkMuted}`}>
              <span className={styles.forkDotRed} />
              <span>Conversion Rate</span>
              <span className={styles.forkStatus}>Valid SQL · Wrong intent</span>
            </div>
            <div className={`${styles.forkItem} ${styles.forkActive}`}>
              <span className={styles.forkDotGreen} />
              <span>Gross Margin Delta</span>
              <span className={styles.forkStatusGreen}>Approved Business Metric ✓</span>
            </div>
          </div>
        </div>

        {/* Right: Grounded Output */}
        <div className={styles.cardOutput}>
          <span className={styles.outputTag}>Grounded Result</span>
          <div className={styles.outputContent}>
            <div className={styles.outputRow}>
              <span>01. Enterprise Energy</span>
              <strong className={styles.outputVal}>+34.2%</strong>
            </div>
            <div className={styles.outputRow}>
              <span>02. Cloud Infrastructure</span>
              <strong className={styles.outputVal}>+28.7%</strong>
            </div>
            <div className={styles.outputRow}>
              <span>03. Logistics Systems</span>
              <strong className={styles.outputVal}>+19.4%</strong>
            </div>
          </div>
          <span className={styles.outputMeta}>Zero ungrounded assumptions</span>
        </div>
      </div>
    </div>
  );
}
