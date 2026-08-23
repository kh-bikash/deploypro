import Link from "next/link";
import Nav from "./Nav";

type Props = {
  kicker: string;
  title: React.ReactNode;
  lead: string;
  cta?: { href: string; label: string };
  secondary?: { href: string; label: string };
};

export default function PageHead({ kicker, title, lead, cta, secondary }: Props) {
  return (
    <>
      <Nav />
      <header className="page-head">
        <div className="container page-head-inner">
          <div className="kicker">{kicker}</div>
          <h1>{title}</h1>
          <p>{lead}</p>
          {cta ? (
            <div className="hero-actions">
              <Link className="primary" href={cta.href}>
                {cta.label}
              </Link>
              {secondary ? (
                <Link className="text-link" href={secondary.href}>
                  {secondary.label}
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </header>
    </>
  );
}
