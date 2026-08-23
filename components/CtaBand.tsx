import LeadForm from "./LeadForm";

type Props = {
  kicker: string;
  title: React.ReactNode;
  lead: string;
  source: string;
  submitLabel?: string;
  workflowLabel?: string;
  workflowPlaceholder?: string;
};

export default function CtaBand({
  kicker,
  title,
  lead,
  source,
  submitLabel,
  workflowLabel,
  workflowPlaceholder,
}: Props) {
  return (
    <section className="cta-band" id="start">
      <div className="container">
        <div className="block-head reveal">
          <div className="kicker">{kicker}</div>
          <h2>{title}</h2>
          <p>{lead}</p>
        </div>
        <div className="reveal">
          <LeadForm
            source={source}
            submitLabel={submitLabel}
            workflowLabel={workflowLabel}
            workflowPlaceholder={workflowPlaceholder}
          />
        </div>
      </div>
    </section>
  );
}
