import Link from "next/link";
import { credentials } from "@/lib/content";

const partners = [
  { name: "Google", file: "google" },
  { name: "AWS", file: "aws" },
  { name: "BCG", file: "bcg" },
  { name: "Wispr Flow", file: "wisprflow" },
];

export default function BrandFilm() {
  return (
    <section className="brand-film" id="model">
      <div className="container">
        <div className="worked-head reveal">
          <div>
            <div className="kicker">Worked with</div>
            <h2>
              We have built and deployed agentic systems with industry leaders like{" "}
              <span>Google, AWS, and Wispr Flow.</span>
            </h2>
          </div>
          <p>
            Not an agency retainer and not a discovery phase. A forward-deployed pod works inside
            your stack, owns one named workflow end to end, and leaves behind a system your team can
            operate — with the documentation and evaluations to keep operating it.
          </p>
        </div>

        <div className="partner-row reveal reveal-stagger">
          {partners.map((partner) => (
            <div className="partner" key={partner.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/logos/${partner.file}.png`}
                alt=""
                width={44}
                height={44}
                loading="lazy"
              />
              <span>{partner.name}</span>
            </div>
          ))}
        </div>

        <div className="cred-strip reveal reveal-stagger">
          {credentials.map((item) => (
            <div className="cred" key={item.label}>
              <strong>{item.figure}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div className="worked-foot reveal">
          <Link className="text-link" href="/proof">
            See the delivered work →
          </Link>
        </div>
      </div>
    </section>
  );
}
