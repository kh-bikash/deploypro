import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHead from "@/components/PageHead";
import {
  bothSides,
  deliverables,
  deploySteps,
  productionStandard,
  scopeDiscipline,
  whereItApplies,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "The DEPLOY process",
  description:
    "Detect, Enrich, Plan, Link, Operate, Yield — how a forward-deployed pod takes one workflow from trigger to a measured production result, and what production actually means.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHead
        kicker="How the work runs"
        title={
          <>
            Detect → Enrich → Plan →<br />
            Link → Operate → <em>Yield.</em>
          </>
        }
        lead="We show the process, because trust matters more than novelty here. At every stage you should know what problem is being solved, what the system is doing, which systems it touches, and where people stay in control."
        cta={{ href: "#start", label: "Bring us a workflow" }}
        secondary={{ href: "/proof", label: "See what we have shipped →" }}
      />

      <section className="section">
        <div className="container">
          <div className="process-rail">
            {deploySteps.map((step) => (
              <article className="process-step reveal" key={step.word}>
                <div className="process-num">{step.num}</div>
                <div className="process-word">
                  <b>{step.word}</b>
                  <span>{step.label}</span>
                </div>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft" id="deliverables">
        <div className="container">
          <div className="block-head reveal">
            <div className="kicker">What you receive</div>
            <h2>
              Five things, and none of them is <em>a slide deck.</em>
            </h2>
            <p>
              Every engagement ends with the same artefacts, so the value does not walk out of the
              door when we do.
            </p>
          </div>

          <dl className="def-list reveal">
            {deliverables.map((item) => (
              <div className="def-row" key={item.term}>
                <dt>{item.term}</dt>
                <dd>{item.def}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section" id="standard">
        <div className="container">
          <div className="block-head reveal">
            <div className="kicker">What production means here</div>
            <h2>
              A demo proves a model can respond.
              <br />
              <em>It does not prove a workflow can operate.</em>
            </h2>
            <p>
              Production quality is part of the offer, not a later phase. These are the layers that
              separate the two.
            </p>
          </div>

          <div className="standard-grid reveal">
            {productionStandard.map((item) => (
              <div className="standard-item" key={item.term}>
                <b>{item.term}</b>
                <span>{item.def}</span>
              </div>
            ))}
          </div>

          <p className="standard-note reveal">
            <b>Our standard:</b> if the system cannot be trusted, operated, inspected and handed
            over, it is still a POC — and we do not call it done.
          </p>
        </div>
      </section>

      <section className="section soft" id="applies">
        <div className="container">
          <div className="block-head reveal">
            <div className="kicker">Where it applies</div>
            <h2>
              The best first project is not the most futuristic idea.
              <br />
              <em>It is a repeated workflow that already hurts.</em>
            </h2>
            <p>
              Pain, frequency, system access, a clear human control boundary, a measurable result,
              and a team that will actually use it. That is what makes a strong first use case.
            </p>
          </div>

          <div className="card-grid three reveal">
            {whereItApplies.map((item) => (
              <article className="flat-card" key={item.fn}>
                <span className="eyebrow-mini">{item.fn}</span>
                <h3>{item.example}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="scope">
        <div className="container">
          <div className="card-grid two">
            <div className="reveal">
              <div className="block-head" style={{ marginBottom: 24 }}>
                <div className="kicker">Scope discipline</div>
                <h2>What keeps an engagement from drifting.</h2>
              </div>
              <dl className="def-list">
                {scopeDiscipline.map((rule, i) => (
                  <div className="def-row" key={rule}>
                    <dt>{String(i + 1).padStart(2, "0")}</dt>
                    <dd>{rule}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="reveal">
              <div className="block-head" style={{ marginBottom: 24 }}>
                <div className="kicker">What each side brings</div>
                <h2>The engagement depends on both sides showing up.</h2>
              </div>
              <dl className="def-list">
                {bothSides.map((row) => (
                  <div className="def-row" key={row.us}>
                    <dt>{row.us}</dt>
                    <dd>{row.you}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        kicker="Start a conversation"
        title={
          <>
            Bring us one workflow.
            <br />
            <em>We will map it with you.</em>
          </>
        }
        lead="The first conversation is a diagnosis, not a demo call. Tell us the process that is slow, repetitive or hard to scale, and we will tell you honestly whether it is a good first build."
        source="process"
      />
    </>
  );
}
