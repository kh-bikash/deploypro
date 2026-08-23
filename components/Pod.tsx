import Link from "next/link";
import { podRoles } from "@/lib/content";

export default function Pod() {
  return (
    <section className="section soft" id="pod">
      <div className="container">
        <div className="pod-panel reveal">
          <div>
            <div className="kicker">The two-FDE model</div>
            <h2
              className="section-title"
              style={{ marginTop: 16, fontSize: "clamp(40px,4.6vw,64px)" }}
            >
              Two engineers who
              <br />
              <em>own the whole thing.</em>
            </h2>
            <p className="section-lead" style={{ maxWidth: 470 }}>
              We work inside your stack and alongside your team rather than beside it. That means we
              take ownership of the AI workflow instead of adding another side project to a roadmap
              that is already full — and we bring current AI engineering patterns without requiring
              your whole team to become specialists first.
            </p>
            <div className="hero-actions" style={{ marginTop: 26 }}>
              <Link className="text-link" href="/process">
                See how the work runs →
              </Link>
            </div>
          </div>

          <div className="pod-roles">
            {podRoles.map((role) => (
              <article className="pod-role" key={role.tag}>
                <span className="role-tag">{role.tag}</span>
                <h3>{role.title}</h3>
                <p>{role.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
