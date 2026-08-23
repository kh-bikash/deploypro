const beats = [
  { no: "01", title: "It starts itself", body: "A real business event fires the workflow — no one has to notice and remember." },
  { no: "02", title: "It gathers its own context", body: "Reads the records, documents and history the decision actually depends on." },
  { no: "03", title: "It stops where it should", body: "Sensitive actions wait for a named person, every time, by design." },
  { no: "04", title: "It proves what it did", body: "Every input, decision, tool call and error stays inspectable afterwards." },
];

export default function HowItWorks() {
  return (
    <section className="section walkthrough" id="how">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="kicker">See it end to end</div>
            <p className="section-lead">
              This is one delivered workflow, drawn out: the trigger that starts it, the systems it
              reads from and writes to, the point where a person stays in control, and the number it
              moves on your baseline.
            </p>
          </div>
          <h2 className="section-title">
            Inside a live
            <br />
            <em>workflow.</em>
          </h2>
        </div>

        <div className="sketch-frame reveal">
          <div className="sketch-bar" aria-hidden="true">
            <span />
            <span />
            <span />
            <em>deploy · live workflow</em>
          </div>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Animated walkthrough of a live DEPLOY workflow: a trigger, the systems it reads from and writes to, the human approval boundary, and the measured result."
            src="/media/delivery-sketch.mp4"
          />
        </div>

        <div className="walkthrough-beats reveal reveal-stagger">
          {beats.map((beat) => (
            <article key={beat.no}>
              <span>{beat.no}</span>
              <b>{beat.title}</b>
              <p>{beat.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
