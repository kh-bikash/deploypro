import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHead from "@/components/PageHead";
import { masterclass } from "@/lib/content";

export const metadata: Metadata = {
  title: "FDE Masterclass",
  description:
    "Deployed, Not Demoed — a free monthly session teaching CTOs and technical founders how to use the forward-deployed engineering model to actually ship AI.",
};

export default function MasterclassPage() {
  return (
    <>
      <PageHead
        kicker="Free monthly session"
        title={
          <>
            Deployed,
            <br />
            <em>Not Demoed.</em>
          </>
        }
        lead={`${masterclass.subtitle}. Most FDE masterclasses teach engineers how to become forward-deployed engineers. This one flips the audience: it teaches the people who buy and sponsor AI work how to get it into production.`}
        cta={{ href: "#start", label: "Register for the next session" }}
        secondary={{ href: "/process", label: "See the process it teaches →" }}
      />

      <section className="section">
        <div className="container">
          <div className="card-grid three reveal" style={{ marginBottom: 54 }}>
            <div className="flat-card">
              <span className="eyebrow-mini">Format</span>
              <p style={{ marginTop: 0 }}>{masterclass.format}</p>
            </div>
            <div className="flat-card">
              <span className="eyebrow-mini">Who it is for</span>
              <p style={{ marginTop: 0 }}>{masterclass.audience}</p>
            </div>
            <div className="flat-card">
              <span className="eyebrow-mini">When</span>
              <p style={{ marginTop: 0 }}>{masterclass.cadence}</p>
            </div>
          </div>

          <div className="block-head reveal">
            <div className="kicker">The agenda</div>
            <h2>
              Sixty-five minutes, <em>minute by minute.</em>
            </h2>
            <p>
              No code on screen. This is the business side of shipping AI — the decisions that
              determine whether a workflow ever reaches production.
            </p>
          </div>

          <div className="agenda reveal">
            {masterclass.agenda.map((row) => (
              <article className="agenda-row" key={row.time}>
                <div className="agenda-time">{row.time}</div>
                <b>{row.segment}</b>
                <p>{row.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <div className="block-head reveal">
            <div className="kicker">Different by design</div>
            <h2>
              Buyer education, <em>not a course upsell.</em>
            </h2>
          </div>

          <div className="card-grid three reveal">
            {masterclass.difference.map((item, i) => (
              <article className="flat-card" key={item}>
                <span className="eyebrow-mini">{String(i + 1).padStart(2, "0")}</span>
                <p style={{ marginTop: 0 }}>{item}</p>
              </article>
            ))}
          </div>

          <p className="standard-note reveal" style={{ marginTop: 20 }}>
            <b>What you leave with:</b> a way to pick your first workflow, set the human approval
            boundary and measure ROI on your own baseline — usable whether or not you ever work with
            us. Every attendee also gets the case-study one-pager for their sector within 48 hours.
          </p>
        </div>
      </section>

      <CtaBand
        kicker="Register"
        title={
          <>
            Save your seat for
            <br />
            <em>the next session.</em>
          </>
        }
        lead="Free to attend, live, with the recording sent afterwards. Tell us where your AI work stands and we will tailor the walkthrough segment toward the situations the room is actually in."
        source="masterclass"
        submitLabel="Register for the masterclass"
        workflowLabel="What would make this session worth your hour?"
        workflowPlaceholder="The workflow you are trying to automate, the POC that stalled, or the question you want answered in the Q&A."
      />
    </>
  );
}
