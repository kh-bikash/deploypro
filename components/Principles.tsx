import { useLessAI } from "@/lib/content";

export default function Principles() {
  return (
    <section className="principles" id="principles">
      <div className="container">
        <div className="principles-head reveal">
          <div>
            <div className="kicker">Engineering position</div>
            <h2>
              Use <em>less</em> AI.
            </h2>
            <div className="rule-draw" />
          </div>
          <p>
            The counterintuitive rule behind every system of ours that is still running a year
            later. Most AI projects fail because a model was handed work that code should have
            done — and then nobody could test it, explain it to an auditor, or fix it at 2am.
          </p>
        </div>

        <div className="principle-grid reveal reveal-stagger">
          {useLessAI.map((item, i) => (
            <article className="principle" key={item.title}>
              <span className="principle-num">{String(i + 1).padStart(2, "0")}</span>
              <b>{item.title}</b>
              <span>{item.body}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
