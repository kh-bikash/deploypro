import { problemStats } from "@/lib/content";
import styles from "./Gap.module.css";

export default function Gap() {
  return (
    <section className={styles.section} id="gap">
      <div className={styles.inner}>
        <div className="reveal">
          <div className={styles.kicker}>The execution gap</div>
          <h2 className={styles.title}>
            Not an access problem. <em>An execution problem.</em>
          </h2>
          <p className={styles.lead}>
            Everyone can reach a model. The work still lands on teams who already have a roadmap,
            so demos stay demos and nothing changes in the business.
          </p>
        </div>

        <div className={`${styles.grid} reveal reveal-stagger`}>
          {problemStats.map((stat) => (
            <article className={styles.cell} key={stat.figure}>
              <div className={styles.figure}>{stat.figure}</div>
              <p className={styles.claim}>{stat.claim}</p>
              <cite className={styles.source}>{stat.source}</cite>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
