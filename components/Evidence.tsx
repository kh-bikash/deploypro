import { problemStats } from "@/lib/content";

export default function Evidence() {
  return (
    <section className="evidence" id="problem">
      <div className="container">
        <div className="reveal">
          <div className="kicker">The execution gap</div>
          <h2>
            Most companies do not have an AI access problem.
            <br />
            <span>They have an execution problem.</span>
          </h2>
          <p className="evidence-lead">
            Engineers can experiment with models. But the AI work lands on teams who already have a
            roadmap, demos stay demos, and leadership cannot point to what changed in the business.
          </p>
        </div>

        <div className="evidence-grid reveal">
          {problemStats.map((stat) => (
            <div className="evidence-cell" key={stat.figure + stat.source}>
              <strong>{stat.figure}</strong>
              <p>{stat.claim}</p>
              <cite>{stat.source}</cite>
            </div>
          ))}
        </div>

        <p className="evidence-note reveal">
          <b>The pattern is always the same.</b> AI adoption races ahead, but most mid-market
          companies have dev teams, not AI teams. So the initiative lands on engineers learning
          retrieval and agents from scratch, it takes months, and it produces a demo that never
          ships. DEPLOY exists for exactly that gap.
        </p>
      </div>
    </section>
  );
}
