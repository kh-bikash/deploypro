import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHead from "@/components/PageHead";
import { caseStudies, credentials, proofTypes, sectorProof } from "@/lib/content";

export const metadata: Metadata = {
  title: "Proof",
  description:
    "Deployed systems, measured results and the sector-by-sector evidence that AI works in Indian companies — plus what we can walk you through on a call.",
};

export default function ProofPage() {
  return (
    <>
      <PageHead
        kicker="What we have shipped"
        title={
          <>
            We would rather show
            <br />
            <em>engineering than logos.</em>
          </>
        }
        lead="On a call we walk through the work that matches your workflow rather than sending a general portfolio. These are the systems behind that conversation."
        cta={{ href: "#start", label: "Ask for the walkthrough" }}
        secondary={{ href: "/process", label: "How the work runs →" }}
      />

      <section className="section">
        <div className="container">
          <div className="cred-strip reveal" style={{ marginBottom: 54 }}>
            {credentials.map((item) => (
              <div className="cred" key={item.label}>
                <strong>{item.figure}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="block-head reveal">
            <div className="kicker">Delivered work</div>
            <h2>
              Systems that went into <em>real operational use.</em>
            </h2>
            <p>
              Each of these ran against real data, inside a real team&apos;s workflow — which is the
              only kind of proof that predicts whether the next build will ship.
            </p>
          </div>

          <div>
            {caseStudies.map((study) => (
              <article className="case reveal" key={study.title}>
                <div>
                  <span className="eyebrow-mini">{study.sector}</span>
                  <h3>{study.title}</h3>
                  <div className="case-metric">
                    <strong>{study.metric}</strong>
                    <span>{study.metricLabel}</span>
                  </div>
                </div>
                <div>
                  {study.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <div className="case-relevance">
                    <b>Why it matters for a DEPLOY build</b>
                    {study.relevance}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft" id="sectors">
        <div className="container">
          <div className="block-head reveal">
            <div className="kicker">Sector evidence</div>
            <h2>
              Every sector already has a name getting results.
              <br />
              <em>Usually with a team you cannot hire.</em>
            </h2>
            <p>
              The large players built in-house AI teams to get these numbers. The point of a
              forward-deployed pod is to reach the same class of outcome without building that team
              first.
            </p>
          </div>

          <div className="sector-grid reveal">
            {sectorProof.map((item) => (
              <article className="sector" key={item.sector}>
                <div className="sector-top">
                  <b>{item.sector}</b>
                  <span>{item.tag}</span>
                </div>
                <p className="sector-proof">{item.proof}</p>
                <div className="sector-angle">
                  <b>Where we start:</b> {item.angle}
                  <br />
                  <span style={{ color: "#8a8a90" }}>{item.source}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="show">
        <div className="container">
          <div className="block-head reveal">
            <div className="kicker">What we can show you</div>
            <h2>
              Chosen to match your workflow, <em>not sent as a brochure.</em>
            </h2>
          </div>

          <dl className="def-list reveal">
            {proofTypes.map((item) => (
              <div className="def-row" key={item.term}>
                <dt>{item.term}</dt>
                <dd>{item.def}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand
        kicker="Start a conversation"
        title={
          <>
            Tell us the workflow.
            <br />
            <em>We will show you the closest build.</em>
          </>
        }
        lead="Describe the process you want fixed and we will walk you through the system we have shipped that most resembles it — architecture, controls, result and all."
        source="proof"
        submitLabel="Request the walkthrough"
      />
    </>
  );
}
