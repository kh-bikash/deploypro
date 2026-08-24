import type { Metadata } from "next";
import Link from "next/link";
import SqlRagProblemVisual from "@/components/case-studies/SqlRagProblemVisual";
import CostPerCorrectAnswerVisual from "@/components/case-studies/CostPerCorrectAnswerVisual";
import EvaluationFlywheel from "@/components/case-studies/EvaluationFlywheel";
import HumanFeedbackLoop from "@/components/case-studies/HumanFeedbackLoop";
import shell from "../../../home.module.css";
import styles from "./visuals.module.css";

export const metadata: Metadata = {
  title: "SQL RAG Technical Visuals (16:9 Export Mode)",
  description: "Standalone 1600x900 coded technical visual exports for publications, LinkedIn, and presentations.",
  robots: { index: false, follow: false },
};

export default function VisualsExportPage() {
  return (
    <main className={shell.shell}>
      <div className={styles.workbench}>
        <div className={styles.topBar}>
          <div className={styles.topInfo}>
            <Link href="/case-studies/sql-rag" className={styles.backLink}>
              ← Back to Case Study
            </Link>
            <h1 className={styles.heading}>Visual Assets &amp; Architecture Diagrams</h1>
            <p className={styles.subheading}>
              16:9 High-Resolution Coded Frames (1600 × 900 target). Ready for capture or export.
            </p>
          </div>
        </div>

        {/* Visual 1 */}
        <section className={styles.exportItem}>
          <div className={styles.itemHeader}>
            <span className={styles.itemTag}>Asset 01 / 04</span>
            <span className={styles.itemTitle}>The Core Problem &amp; Semantic Gap</span>
            <span className={styles.itemRatio}>1600 × 900 · 16:9</span>
          </div>
          <div className={styles.stageFrame}>
            <SqlRagProblemVisual standalone={true} />
          </div>
        </section>

        {/* Visual 2 */}
        <section className={styles.exportItem}>
          <div className={styles.itemHeader}>
            <span className={styles.itemTag}>Asset 02 / 04</span>
            <span className={styles.itemTitle}>Cost per Correct Answer Orchestration</span>
            <span className={styles.itemRatio}>1600 × 900 · 16:9</span>
          </div>
          <div className={styles.stageFrame}>
            <CostPerCorrectAnswerVisual standalone={true} />
          </div>
        </section>

        {/* Visual 3 */}
        <section className={styles.exportItem}>
          <div className={styles.itemHeader}>
            <span className={styles.itemTag}>Asset 03 / 04</span>
            <span className={styles.itemTitle}>Continuous Evaluation Flywheel (~95% Benchmark)</span>
            <span className={styles.itemRatio}>1600 × 900 · 16:9</span>
          </div>
          <div className={styles.stageFrame}>
            <EvaluationFlywheel standalone={true} />
          </div>
        </section>

        {/* Visual 4 */}
        <section className={styles.exportItem}>
          <div className={styles.itemHeader}>
            <span className={styles.itemTag}>Asset 04 / 04</span>
            <span className={styles.itemTitle}>Curated RLHF-Inspired Human Feedback Loop</span>
            <span className={styles.itemRatio}>1600 × 900 · 16:9</span>
          </div>
          <div className={styles.stageFrame}>
            <HumanFeedbackLoop standalone={true} />
          </div>
        </section>
      </div>
    </main>
  );
}
