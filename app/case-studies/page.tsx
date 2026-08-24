import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookCta from "@/components/home/BookCta";
import HomeNav from "@/components/home/HomeNav";
import { caseStudyArticles } from "@/lib/caseStudies";
import shell from "../home.module.css";
import styles from "./case-studies.module.css";

export const metadata: Metadata = {
  title: "Case Studies · DEPLOY",
  description:
    "Real production AI systems we built: architectural decisions, evaluation strategies, cost optimization, and lessons learned from deployment.",
  openGraph: {
    title: "Case Studies · DEPLOY",
    description:
      "Real production AI systems we built: architectural decisions, evaluation strategies, and lessons from deployment.",
    images: ["/case-studies/sql-rag-thumbnail.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies · DEPLOY",
    description:
      "Real production AI systems we built: architectural decisions, evaluation strategies, and lessons from deployment.",
    images: ["/case-studies/sql-rag-thumbnail.png"],
  },
};

export default function CaseStudiesPage() {
  return (
    <div className={shell.shell}>
      <HomeNav />

      <header className={shell.routeTop}>
        <div className={styles.head}>
          <div className={styles.kicker}>Resources · Case Studies</div>
          <h1 className={styles.title}>Real systems we built in production.</h1>
          <p className={styles.lead}>
            In-depth breakdowns of real production AI systems: architecture, evaluation harnesses,
            cost optimization, and lessons learned from deployment.
          </p>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.cardGrid}>
            {caseStudyArticles.map((study) => (
              <article key={study.slug} className={styles.card}>
                <Link href={study.href} className={styles.mediaLink} tabIndex={-1}>
                  <div className={styles.thumbnailBox}>
                    <Image
                      src={study.thumbnail}
                      alt={study.title}
                      width={1200}
                      height={675}
                      priority
                      className={styles.thumbnailImg}
                    />
                  </div>
                </Link>

                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span className={styles.categoryPill}>{study.category}</span>
                    <span className={styles.metaTime}>{study.readTime}</span>
                  </div>

                  <h2 className={styles.cardHeading}>
                    <Link href={study.href} className={styles.titleLink}>
                      {study.title}
                    </Link>
                  </h2>

                  <p className={styles.cardExcerpt}>{study.description}</p>

                  <div className={styles.cardFoot}>
                    <Link href={study.href} className={styles.readMoreBtn}>
                      <span>Read case study</span>
                      <span className={styles.arrowIcon} aria-hidden="true">
                        →
                      </span>
                    </Link>
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
