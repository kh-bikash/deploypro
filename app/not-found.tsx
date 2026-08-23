import Link from "next/link";
import PageHead from "@/components/PageHead";

export default function NotFound() {
  return (
    <>
      <PageHead
        kicker="404"
        title={
          <>
            That page is not
            <br />
            <em>deployed.</em>
          </>
        }
        lead="The link may be out of date. Everything about the program is one of the four places below."
      />
      <section className="section">
        <div className="container card-grid three">
          <Link className="flat-card" href="/process">
            <span className="eyebrow-mini">Program</span>
            <h3>The DEPLOY process</h3>
            <p>Detect through Yield, and what production actually means.</p>
          </Link>
          <Link className="flat-card" href="/proof">
            <span className="eyebrow-mini">Proof</span>
            <h3>What we have shipped</h3>
            <p>Deployed systems, measured results and sector evidence.</p>
          </Link>
          <Link className="flat-card" href="/engage">
            <span className="eyebrow-mini">Commercials</span>
            <h3>How we engage</h3>
            <p>The offer ladder, who it is for, and who it is not for.</p>
          </Link>
        </div>
      </section>
    </>
  );
}
