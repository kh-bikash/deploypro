import { studioBlocks } from "@/lib/content";

export default function Studio() {
  return (
    <section className="studio" id="studio">
      <div className="container">
        <div className="reveal">
          <div className="kicker">DEPLOY Studio</div>
          <h2>
            We do not start from an empty repository.
            <br />
            <span>We start from what already shipped.</span>
          </h2>
          <p className="studio-lead">
            Eight reusable capability blocks — agent harnesses, integrations, retrieval patterns and
            evaluation suites — built across hundreds of AI applications and consulting programs.
            Your first build inherits all of it.
          </p>
        </div>

        <div className="studio-grid reveal reveal-stagger">
          {studioBlocks.map((block) => (
            <article className="studio-block" key={block.name}>
              <b>{block.name}</b>
              <span>{block.body}</span>
            </article>
          ))}
        </div>

        <p className="studio-note reveal">
          <b>This is the whole reason a two-person pod out-ships a ten-person consultancy.</b> The
          hard parts — permissioned tool use, retrieval that cites correctly, evaluation harnesses,
          retries that do not corrupt state — are already solved and already tested. What is left is
          your workflow, which is the only part that was ever unique.
        </p>
      </div>
    </section>
  );
}
