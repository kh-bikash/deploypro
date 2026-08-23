import LeadForm from "./LeadForm";
import { diagnosisQuestions } from "@/lib/content";

export default function FinalCta() {
  return (
    <section className="final" id="start">
      <div className="container reveal">
        <h2>
          Bring one painful workflow.
          <br />
          Leave with a <span>deployed product.</span>
        </h2>
        <p>
          The first conversation is a diagnosis, not a demo call. We would rather understand one
          workflow properly than present capabilities broadly — these are the questions we will work
          through with you.
        </p>

        <div
          className="agent-system-chips"
          style={{ justifyContent: "center", margin: "26px auto 38px", maxWidth: 860 }}
        >
          {diagnosisQuestions.map((question) => (
            <span className="agent-system-chip" key={question}>
              {question}
            </span>
          ))}
        </div>

        <LeadForm source="home" />
      </div>
    </section>
  );
}
