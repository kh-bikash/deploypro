import Aurora from "./Aurora";
import DeployWord from "./DeployWord";
import HomeNav from "./HomeNav";
import { heroStats } from "@/lib/home";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <>
      <HomeNav />

      <section className={styles.hero} id="top">
        <div className={styles.glow} aria-hidden="true" />
        <Aurora />
        <div className={styles.grid} aria-hidden="true" />

        <div className={styles.inner}>
          <DeployWord titleClassName={styles.title} />

          <p className={styles.lead}>
            We integrate our FDE pod into your team and take one real workflow from idea to
            production in 14 days. No pilots, no decks - <b>we deploy fast.</b>
          </p>

          <div className={styles.actions}>
            <a className={`${styles.primary} btn-chase`} href="#book">
              Book a call
            </a>
            <a className={`${styles.ghost} btn-chase`} href="#sprint">
              See the sprint
            </a>
          </div>
        </div>

        <div className={styles.stats}>
          {heroStats.map((stat) => (
            <div className={styles.stat} key={stat.label}>
              <strong>{stat.headline}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

      </section>
    </>
  );
}
