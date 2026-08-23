import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="deploy-footer">
      <div className="deploy-footer-mark" aria-hidden="true">
        DEPLOY
      </div>

      <div className="container">
        <div className="footer-top">
          <div>
            <div className="footer-brand-lockup">
              <div className="footer-brand-icon" aria-hidden="true">
                D
              </div>
              <div>
                <strong>DEPLOY</strong>
                <span>by {site.parent}</span>
              </div>
            </div>
            <p className="footer-about">
              Two forward-deployed engineers, one business workflow, taken from idea to a deployed
              production system — then handed over to the team that runs it.
            </p>
          </div>

          <div className="footer-col">
            <b>Program</b>
            <Link href="/process">The DEPLOY process</Link>
            <Link href="/engage">How we engage</Link>
            <Link href="/engage#fit">Who it is for</Link>
            <Link href="/process#standard">Production standard</Link>
          </div>

          <div className="footer-col">
            <b>Proof</b>
            <Link href="/proof">Case studies</Link>
            <Link href="/proof#sectors">Sector evidence</Link>
            <Link href="/#how">Inside a live workflow</Link>
            <Link href="/proof#show">What we can show you</Link>
          </div>

          <div className="footer-col">
            <b>Contact</b>
            <Link href="/#start">Start a conversation</Link>
            <Link href="/masterclass">FDE Masterclass</Link>
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </div>
        </div>

        <div className="footer-inner">
          <div className="footer-legal">
            {site.parent} · Founded by IIT Delhi alumni · Deployed, not demoed.
          </div>
          <div className="footer-legal">© {new Date().getFullYear()} {site.parent}</div>
        </div>
      </div>
    </footer>
  );
}
