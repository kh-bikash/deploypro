import Link from "next/link";
import CountUp from "./CountUp";
import { headlineResults } from "@/lib/content";

export default function Results() {
  return (
    <section className="results" id="results">
      <div className="container">
        <div className="reveal">
          <div className="kicker">Delivered work</div>
          <h2 className="section-title" style={{ marginTop: 16, maxWidth: 880 }}>
            Systems that went into real
            <br />
            operational use, <em>with the numbers.</em>
          </h2>
          <div className="rule-draw" />
        </div>

        <div className="results-grid reveal reveal-stagger">
          {headlineResults.map((item) => (
            <article className="result-card" key={item.label}>
              <span className="result-tagline">{item.tag}</span>
              <div className="result-figure">
                <CountUp target={item.value} />
                {item.suffix}
              </div>
              <div className="result-name">{item.label}</div>
              <p className="result-context">{item.context}</p>
            </article>
          ))}
        </div>

        <div className="results-foot reveal">
          <div>
            Every one of these ran against real data inside a real team&apos;s workflow — the only
            kind of proof that predicts whether the next build ships.
          </div>
          <Link className="primary" href="/proof">
            Read the case studies
          </Link>
        </div>
      </div>
    </section>
  );
}
