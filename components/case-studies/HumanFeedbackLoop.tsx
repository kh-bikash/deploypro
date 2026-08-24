import React from "react";
import styles from "./HumanFeedbackLoop.module.css";

type Props = {
  standalone?: boolean;
};

export default function HumanFeedbackLoop({ standalone = false }: Props) {
  return (
    <div className={`${styles.container} ${standalone ? styles.standalone : ""}`}>
      <div className={styles.header}>
        <span className={styles.kicker}>Continuous Alignment</span>
        <h3 className={styles.title}>Human Feedback &amp; RLHF-Inspired Improvement</h3>
        <p className={styles.subtitle}>
          Treating feedback as evaluation data first and training data second. Raw ratings are
          curated by domain experts before informing prompts, routing, or fine-tuning.
        </p>
      </div>

      <div className={styles.flowStages}>
        {/* Stage 1: Production Input & Answer */}
        <div className={styles.flowCard}>
          <span className={styles.flowStep}>01 / Production Signal</span>
          <strong className={styles.flowHeading}>User Query &amp; Grounded Answer</strong>
          <span className={styles.flowSub}>Logs full assumption trace and user rating</span>
        </div>

        <div className={styles.arrow}>↓</div>

        {/* Stage 2: Triage & Curation */}
        <div className={`${styles.flowCard} ${styles.flowCardActive}`}>
          <span className={styles.flowStepActive}>02 / Expert Triage Gate</span>
          <strong className={styles.flowHeading}>Human Review &amp; Taxonomy Classification</strong>
          <div className={styles.tagsRow}>
            <span>Filter Mismatch</span>
            <span>Glossary Ambiguity</span>
            <span>Temporal Scope</span>
          </div>
        </div>

        <div className={styles.arrow}>↓</div>

        {/* Stage 3: Downstream Impact */}
        <div className={styles.splitGrid}>
          <div className={styles.splitCard}>
            <span className={styles.splitTag}>Automated Evals</span>
            <strong className={styles.splitTitle}>Promoted to Regression Suite</strong>
            <span className={styles.splitDesc}>Guards against silent future regressions</span>
          </div>

          <div className={styles.splitCard}>
            <span className={styles.splitTag}>System Alignment</span>
            <strong className={styles.splitTitle}>Preference Optimization (DPO)</strong>
            <span className={styles.splitDesc}>Curated pairs improve routing &amp; fine-tuning</span>
          </div>
        </div>
      </div>
    </div>
  );
}
