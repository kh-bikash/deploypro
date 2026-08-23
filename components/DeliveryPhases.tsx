const phases = [
  {
    no: "01",
    label: "Discover",
    title: "Find the highest-leverage workflow.",
    body: "We map the current process, identify the repeated decisions, agree the baseline we will be measured against, and prove the core loop with a working prototype on your data.",
    items: ["Workflow map", "Working prototype", "Agreed success metric"],
  },
  {
    no: "02",
    label: "Integrate",
    title: "Connect the real systems.",
    body: "We add your APIs, data and permissions, define the human approval boundary, and put observability and evaluation around the prototype so it can be trusted in production.",
    items: ["Tool integrations", "Human approval boundary", "Evaluation suite"],
  },
  {
    no: "03",
    label: "Deploy",
    title: "Put it into real work.",
    body: "We deploy into your environment, onboard the people who will use it, measure the result against the baseline, and hand over a system your team can keep operating.",
    items: ["Production release", "User onboarding", "Measured handover"],
  },
];

export default function DeliveryPhases() {
  return (
    <section className="section soft" id="delivery">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="kicker">How a build runs</div>
            <p className="section-lead">
              No discovery theatre and no status decks. Each phase ends with something you can open,
              test and put in front of the people who will actually use it.
            </p>
          </div>
          <h2 className="section-title">
            Three phases.
            <br />
            <em>One shipped product.</em>
          </h2>
        </div>

        <ol className="phase-rail">
          {phases.map((phase) => (
            <li className="phase-item reveal" key={phase.no}>
              <div className="phase-marker" aria-hidden="true">
                <span>{phase.no}</span>
              </div>

              <article className="phase-card">
                <div className="phase-head">
                  <h3>{phase.title}</h3>
                  <span className="phase-label">{phase.label}</span>
                </div>
                <p>{phase.body}</p>
                <div className="phase-out">
                  {phase.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
