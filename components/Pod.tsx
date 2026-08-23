import Link from "next/link";
import { podRoles } from "@/lib/content";

export default function Pod() {
  return (
    <section className="section soft" id="pod">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="kicker">The two-FDE model</div>
            <p className="section-lead">
              We work inside your stack and alongside your team rather than beside it — taking
              ownership of the workflow instead of adding another side project to a roadmap that is
              already full.
            </p>
          </div>
          <h2 className="section-title">
            Two engineers who
            <br />
            <em>own the whole thing.</em>
          </h2>
        </div>

        <div className="sketch-frame reveal">
          <div className="sketch-bar" aria-hidden="true">
            <span />
            <span />
            <span />
            <em>deploy · the forward-deployed model</em>
          </div>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Animated sketch of the forward-deployed model: two engineers embedded inside your environment, the systems they connect, the DEPLOY loop, and a deployed system measured on your baseline."
            src="/media/fde-sketch.mp4"
          />
        </div>

        <div className="pod-roles reveal reveal-stagger">
          {podRoles.map((role) => (
            <article className="pod-role" key={role.tag}>
              <span className="role-tag">{role.tag}</span>
              <h3>{role.title}</h3>
              <p>{role.body}</p>
            </article>
          ))}
        </div>

        <div className="worked-foot reveal">
          <Link className="text-link" href="/process">
            See how the work runs →
          </Link>
        </div>
      </div>
    </section>
  );
}
