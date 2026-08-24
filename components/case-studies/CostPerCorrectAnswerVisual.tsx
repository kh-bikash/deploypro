import React from "react";
import styles from "./CostPerCorrectAnswerVisual.module.css";

type Props = {
  standalone?: boolean;
};

export default function CostPerCorrectAnswerVisual({ standalone = false }: Props) {
  return (
    <div className={`${styles.container} ${standalone ? styles.standalone : ""}`}>
      <div className={styles.header}>
        <span className={styles.kicker}>Model Economics</span>
        <h3 className={styles.title}>Cost per Correct Answer vs. Cost per LLM Call</h3>
        <p className={styles.subtitle}>
          Cost optimization was not about finding a cheaper model. It was about spending model
          intelligence only where it changed the analytical outcome.
        </p>
      </div>

      <div className={styles.compareGrid}>
        {/* Naive Approach */}
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <span className={styles.badgeMuted}>Unoptimized Prototype</span>
            <span className={styles.tokenStat}>~60k tokens</span>
          </div>

          <div className={styles.stepsList}>
            <div className={styles.step}>
              <strong>1. Unfiltered Context</strong>
              <span>Full schema &amp; DDL catalog passed to prompt (~45k tokens)</span>
            </div>
            <div className={styles.step}>
              <strong>2. Frontier Model for Everything</strong>
              <span>Flagship LLM called for simple normalization and formatting</span>
            </div>
            <div className={styles.step}>
              <strong>3. High Compounding Error Rate</strong>
              <span>Semantic drift leads to repeated user clarification turns</span>
            </div>
          </div>

          <div className={styles.cardFoot}>
            <span>Cost profile:</span>
            <strong className={styles.footMuted}>High cost per successful answer</strong>
          </div>
        </div>

        {/* Optimized Approach */}
        <div className={`${styles.card} ${styles.cardActive}`}>
          <div className={styles.cardTop}>
            <span className={styles.badgeActive}>Cost-Aware Routing</span>
            <span className={styles.tokenStatActive}>~3.2k tokens</span>
          </div>

          <div className={styles.stepsList}>
            <div className={styles.stepActive}>
              <strong>1. Pruned Context &amp; Caching</strong>
              <span>Only relevant entities and glossary definitions passed to model</span>
            </div>
            <div className={styles.stepActive}>
              <strong>2. Tiered Model Dispatch</strong>
              <span>Lightweight models format; deep reasoning only for ambiguity</span>
            </div>
            <div className={styles.stepActive}>
              <strong>3. Deterministic Validation</strong>
              <span>Guards against hallucinated fields prior to execution</span>
            </div>
          </div>

          <div className={styles.cardFootActive}>
            <span>Efficiency gain:</span>
            <strong className={styles.footGreen}>85%+ token reduction · ~95% accuracy</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
