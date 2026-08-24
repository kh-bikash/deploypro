import type { Metadata } from "next";
import BookCta from "@/components/home/BookCta";
import HomeNav from "@/components/home/HomeNav";
import Work from "@/components/home/Work";
import { caseStudies } from "@/lib/content";
import shell from "../home.module.css";
import styles from "./proof.module.css";

export const metadata: Metadata = {
  title: "Proof",
  description:
    "Deployed systems and measured results — the AI work we have shipped into real operational use with client teams.",
};

export default function ProofPage() {
  return (
    <div className={shell.shell}>
      <HomeNav />

      <header className={shell.routeTop}>
        <div className={styles.head}>
          <div className={styles.kicker}>Proof</div>
          <h1 className={styles.title}>The work, and what it moved.</h1>
          <p className={styles.lead}>
            Every one of these ran against real data inside a real team&apos;s workflow — the only
            kind of proof that predicts whether the next build ships.
          </p>
        </div>
      </header>

      {/* the client row and project grid, without repeating the heading above */}
      <Work showHead={false} showCta={false} />

      <section className={styles.detail}>
        <div className={styles.inner}>
          <div className={styles.kicker}>Case studies</div>
          <div className={styles.list}>
            {caseStudies.map((study) => (
              <article className={styles.case} key={study.title}>
                <div className={styles.caseAside}>
                  <span className={styles.caseSector}>{study.sector}</span>
                  <strong className={styles.caseMetric}>{study.metric}</strong>
                  <span className={styles.caseMetricLabel}>{study.metricLabel}</span>
                </div>
                <div className={styles.caseBody}>
                  <h2>{study.title}</h2>
                  {study.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <div className={styles.caseWhy}>
                    <span>Why it matters for a DEPLOY build</span>
                    {study.relevance}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BookCta />
    </div>
  );
}
