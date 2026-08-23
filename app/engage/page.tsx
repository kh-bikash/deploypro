import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHead from "@/components/PageHead";
import { fitCriteria, notAFit, objections, offers } from "@/lib/content";

export const metadata: Metadata = {
  title: "How we engage",
  description:
    "The DEPLOY offer ladder — diagnostic sprint, focused build, cross-functional build, expansion and reliability retainer — plus who the program is for and who it is not for.",
};

export default function EngagePage() {
  return (
    <>
      <PageHead
        kicker="How we engage"
        title={
          <>
            Priced against the responsibility
            <br />
            we take on. <em>Not against hours.</em>
          </>
        }
        lead="You are buying specialist execution, lower coordination cost, production discipline and a business outcome. So the commercial shape follows the scope of the workflow, the systems it touches and the controls it needs."
        cta={{ href: "#start", label: "Scope a build with us" }}
        secondary={{ href: "/process", label: "See the process →" }}
      />

      <section className="section" id="offers">
        <div className="container">
          <div className="block-head reveal">
            <div className="kicker">The offer ladder</div>
            <h2>
              Six ways in, depending on
              <br />
              <em>how clear the workflow already is.</em>
            </h2>
          </div>

          <div className="offer-list">
            {offers.map((offer, i) => (
              <article className={offer.lead ? "offer lead reveal" : "offer reveal"} key={offer.name}>
                <div className="offer-num">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3>{offer.name}</h3>
                  {offer.flag ? <span className="offer-flag">{offer.flag}</span> : null}
                </div>
                <div>
                  <p>{offer.body}</p>
                  <ul>
                    {offer.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <p className="pricing-note reveal">
            <b>On pricing.</b> Every engagement is scoped to one named workflow, so the fee follows
            the systems, controls and acceptance criteria involved rather than a rate card. We share
            exact numbers on the diagnosis call, once we both know what the first build actually is.
            What is worth knowing up front: a pod costs less than the senior AI hire it replaces,
            starts in days rather than months, and leaves behind a shipped system plus a trained
            team.
          </p>
        </div>
      </section>

      <section className="section soft" id="fit">
        <div className="container">
          <div className="block-head reveal">
            <div className="kicker">Who it is for</div>
            <h2>
              Our best engagements start with a real team,
              <br />
              <em>real systems and a real business problem.</em>
            </h2>
            <p>
              What is missing is specialist AI capacity to solve the workflow properly. If that
              describes you, the first conversation is worth having.
            </p>
          </div>

          <div className="fit-grid reveal">
            <div className="fit-card">
              <h3>Strong fit</h3>
              <p>What we look for before we agree to scope a build.</p>
              <div className="fit-rows">
                {fitCriteria.map((item) => (
                  <div className="fit-row" key={item.term}>
                    <b>{item.term}</b>
                    <span>{item.def}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="fit-card no">
              <h3>Not the right fit</h3>
              <p>We would rather say so early than scope around it.</p>
              <ul>
                {notAFit.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="questions">
        <div className="container">
          <div className="block-head reveal">
            <div className="kicker">Straight answers</div>
            <h2>
              The four questions <em>every buyer asks.</em>
            </h2>
          </div>

          <div className="qa-list reveal">
            {objections.map((item) => (
              <article className="qa" key={item.q}>
                <b>{item.q}</b>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        kicker="Start a conversation"
        title={
          <>
            One workflow, honestly scoped.
            <br />
            <em>Including when the answer is no.</em>
          </>
        }
        lead="Tell us the process, who owns it and what it costs you today. If it is not a good first build we will say so — that is part of the positioning, not a courtesy."
        source="engage"
        submitLabel="Scope a build"
      />
    </>
  );
}
