import Link from "next/link";
import { credentials } from "@/lib/content";

export default function BrandFilm() {
  return (
    <section className="brand-film" id="model">
      <div className="container brand-film-wrap reveal">
        <div className="brand-copy">
          <div className="kicker">Worked with</div>
          <h2>
            We have built and deployed agentic systems with industry leaders like{" "}
            <span>Google, AWS, and Wispr Flow.</span>
          </h2>
          <p>
            Not an agency retainer and not a discovery phase. A forward-deployed pod works inside
            your stack, owns one named workflow end to end, and leaves behind a system your team can
            operate — with the documentation and evaluations to keep operating it.
          </p>
          <div className="logo-badges">
            <div>Google</div>
            <div>AWS</div>
            <div>BCG</div>
            <div>Wispr Flow</div>
          </div>
          <div className="hero-actions" style={{ marginTop: 26 }}>
            <Link className="text-link" href="/process">
              Walk through the six steps →
            </Link>
          </div>
        </div>

        <div className="brand-video">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Animated sketch of the forward-deployed model: two engineers embedded inside your environment, connected systems, the DEPLOY loop, and a human approval gate."
            src="/media/fde-sketch.mp4"
          />
        </div>
      </div>

      <div className="container" style={{ marginTop: 46 }}>
        <div className="cred-strip reveal">
          {credentials.map((item) => (
            <div className="cred" key={item.label}>
              <strong>{item.figure}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
