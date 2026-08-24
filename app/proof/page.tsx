import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookCta from "@/components/home/BookCta";
import HomeNav from "@/components/home/HomeNav";
import Work from "@/components/home/Work";
import { caseStudyArticles } from "@/lib/caseStudies";
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

      {/* the long-form breakdowns that used to sit behind Resources → Blogs */}
      <section className={styles.reads} id="case-studies">
        <div className={styles.inner}>
          <div className={styles.kicker}>Engineering breakdowns</div>
          <h2 className={styles.readsTitle}>How these systems were actually built.</h2>

          <div className={styles.readGrid}>
            {caseStudyArticles.map((article) => (
              <article className={styles.read} key={article.slug}>
                <Link className={styles.readMedia} href={article.href} tabIndex={-1}>
                  <Image
                    src={article.thumbnail}
                    alt=""
                    width={1200}
                    height={675}
                    className={styles.readThumb}
                  />
                </Link>
                <div className={styles.readBody}>
                  <div className={styles.readMeta}>
                    <span className={styles.readPill}>{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className={styles.readHeading}>
                    <Link href={article.href}>{article.title}</Link>
                  </h3>
                  <p className={styles.readExcerpt}>{article.description}</p>
                  <Link className={styles.readMore} href={article.href}>
                    Read case study <span aria-hidden="true">→</span>
                  </Link>
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
