import Link from "next/link";
import styles from "./ArticleCta.module.css";

/** Mid-article booking prompt — these reads run long, so the CTA at the very
 *  bottom is a lot of scrolling away. */
export default function ArticleCta({
  line = "Got a workflow that looks like this one? We will scope it with you in 30 minutes.",
}: {
  line?: string;
}) {
  return (
    <aside className={styles.cta}>
      <div className={styles.copy}>
        <div className={styles.kicker}>Book a call</div>
        <p className={styles.line}>{line}</p>
      </div>
      <Link className={`${styles.button} btn-chase`} href="/#book">
        Book a call <span aria-hidden="true">→</span>
      </Link>
    </aside>
  );
}
