import CountUp from "@/components/CountUp";
import { impact } from "@/lib/home";
import styles from "./Impact.module.css";

export default function Impact() {
  return (
    <section className={styles.section} id="impact">
      <div className={styles.inner}>
        <div className={`${styles.head} reveal`}>
          <div>
            <div className={styles.kicker}>Impact</div>
            <h2 className={styles.title}>
              Numbers their teams <em>measured themselves.</em>
            </h2>
          </div>
          <p className={styles.note}>
            Three builds, each running against live data inside an existing workflow — not a
            benchmark, not a demo environment.
          </p>
        </div>

        <div className={`${styles.grid} reveal reveal-stagger`}>
          {impact.map((item) => (
            <article className={styles.item} key={item.metric}>
              <div className={styles.sector}>{item.sector}</div>
              <div className={styles.figure}>
                <CountUp target={item.value} />
                {item.suffix}
              </div>
              <div className={styles.metric}>{item.metric}</div>
              <p className={styles.context}>{item.context}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
