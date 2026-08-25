import { site } from "@/lib/site";
import styles from "./BookCta.module.css";

// One call, one button. Until the scheduler is wired up this falls back to a
// pre-filled email so the button never points at a dead URL.
const href = site.schedulingUrl
  ? site.schedulingUrl
  : `mailto:${site.contactEmail}?subject=${encodeURIComponent(
      "Scoping call - DEPLOY",
    )}&body=${encodeURIComponent(
      "Company:\nRole:\nThe workflow we want to fix:\n\nTwo or three times that work for you:",
    )}`;

export default function BookCta() {
  return (
    <section className={styles.section} id="book">
      <div className={styles.glow} aria-hidden="true" />

      <div className={`${styles.inner} reveal`}>
        <div className={styles.kicker}>Start with one workflow</div>

        {/* outlined line above, solid below — the contrast carries the emphasis
            here instead of a colour change */}
        <h2 className={styles.title}>
          <span className={styles.ghost}>Bring us</span>
          <span className={styles.solid}>the bottleneck.</span>
        </h2>

        <p className={styles.lead}>
          Show us the workflow you want AI to run. We will scope it with you in thirty minutes,
          and tell you honestly if it is not a fit.
        </p>

        <a className={`${styles.cta} btn-chase`} href={href}>
          Book a 30-minute call
        </a>

        <p className={styles.fine}>
          Prefer email? <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
        </p>
      </div>
    </section>
  );
}
