import Link from "next/link";
import { faviconUrl } from "@/lib/integrations";
import { workClients, workProjects } from "@/lib/home";
import styles from "./Work.module.css";

type Props = {
  /** the standalone route already has a heading above it */
  showHead?: boolean;
  showCta?: boolean;
};

export default function Work({ showHead = true, showCta = true }: Props) {
  return (
    <section className={styles.section} id="work">
      <div className={styles.inner}>
        {showHead && (
          <div className={`${styles.head} reveal`}>
            <div className={styles.kicker}>Our work</div>
            <h2 className={styles.title}>Teams we have built AI into.</h2>
            <p className={styles.lead}>
              Systems that went into real operational use — not pilots, and not slideware.
            </p>
          </div>
        )}

        <div className={`${styles.clients} reveal`}>
          {workClients.map((client) => (
            <div className={styles.client} key={client.name}>
              {/* a local asset when we have a crisp one, otherwise straight off
                  the web — so adding a client stays a one-line change */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={client.file ? `/logos/${client.file}.png` : faviconUrl(client.domain)}
                alt=""
                width={40}
                height={40}
                loading="lazy"
                aria-hidden="true"
              />
              <span>{client.name}</span>
            </div>
          ))}
        </div>

        <div className={`${styles.grid} reveal reveal-stagger`}>
          {workProjects.map((project) => (
            <article className={styles.card} key={project.title}>
              <div className={styles.sector}>{project.sector}</div>
              <div className={styles.metric}>{project.metric}</div>
              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.blurb}>{project.blurb}</p>
            </article>
          ))}
        </div>

        {showCta && (
          <div className={`${styles.foot} reveal`}>
            <Link className={styles.cta} href="/proof#case-studies">
              See our case studies
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
