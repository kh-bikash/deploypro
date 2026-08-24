import React from "react";
import styles from "./EvaluationFlywheel.module.css";

type Props = {
  standalone?: boolean;
};

export default function EvaluationFlywheel({ standalone = false }: Props) {
  return (
    <div className={`${styles.container} ${standalone ? styles.standalone : ""}`}>
      <div className={styles.header}>
        <span className={styles.kicker}>Continuous Testing</span>
        <h3 className={styles.title}>The Continuous Evaluation Flywheel</h3>
        <p className={styles.subtitle}>
          Measuring final business answer correctness rather than query execution. A compact offline
          evaluation suite acts as a regression gate before every release.
        </p>
      </div>

      <div className={styles.flywheelGrid}>
        {/* Core Metric Card */}
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Controlled Evaluation Benchmark</span>
          <strong className={styles.metricVal}>~95%</strong>
          <span className={styles.metricSub}>End-to-End Correctness</span>
        </div>

        {/* 4 Loop Steps */}
        <div className={styles.stepsGrid}>
          <div className={styles.stepCard}>
            <span className={styles.stepNum}>01</span>
            <div className={styles.stepInfo}>
              <strong className={styles.stepTitle}>Production Questions</strong>
              <span className={styles.stepDesc}>Real-world analytical requests and edge cases</span>
            </div>
          </div>

          <div className={styles.stepCard}>
            <span className={styles.stepNum}>02</span>
            <div className={styles.stepInfo}>
              <strong className={styles.stepTitle}>Final Answer Verification</strong>
              <span className={styles.stepDesc}>Ground truth comparison, not SQL syntax</span>
            </div>
          </div>

          <div className={styles.stepCard}>
            <span className={styles.stepNum}>03</span>
            <div className={styles.stepInfo}>
              <strong className={styles.stepTitle}>9-Category Taxonomy</strong>
              <span className={styles.stepDesc}>Classifies business interpretation &amp; temporal drift</span>
            </div>
          </div>

          <div className={styles.stepCard}>
            <span className={styles.stepNum}>04</span>
            <div className={styles.stepInfo}>
              <strong className={styles.stepTitle}>Regression Gate</strong>
              <span className={styles.stepDesc}>Automated pre-deploy checks prevent regressions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
