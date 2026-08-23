import Link from "next/link";
import { versusInHouse } from "@/lib/content";

export default function Versus() {
  return (
    <section className="section" id="versus">
      <div className="container">
        <div className="block-head reveal" style={{ maxWidth: 800 }}>
          <div className="kicker">The real alternative</div>
          <h2>
            You are not choosing between us and nothing.
            <br />
            <em>You are choosing between us and next quarter.</em>
          </h2>
          <p>
            Most teams default to building it in-house. That is a legitimate choice — and it is
            still the goal, which is why every engagement ends in a handover. This is the honest
            comparison of the two paths.
          </p>
        </div>

        <div className="versus reveal">
          <div className="versus-head">
            <div>Dimension</div>
            <div>Building it in-house</div>
            <div className="is-deploy">With a DEPLOY pod</div>
          </div>
          {versusInHouse.map((row) => (
            <div className="versus-row" key={row.dimension}>
              <div className="dimension">{row.dimension}</div>
              <div>{row.inhouse}</div>
              <div className="is-deploy">{row.deploy}</div>
            </div>
          ))}
        </div>

        <div className="results-foot reveal" style={{ marginTop: 20 }}>
          <div>
            The goal is not dependency. We ship the first system and coach your team through it, so
            the second one is yours.
          </div>
          <Link className="primary" href="/engage">
            See how we engage
          </Link>
        </div>
      </div>
    </section>
  );
}
