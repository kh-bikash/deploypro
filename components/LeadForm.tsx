"use client";

import { useState } from "react";
import { site } from "@/lib/site";

type Props = {
  source: string;
  submitLabel?: string;
  workflowLabel?: string;
  workflowPlaceholder?: string;
};

const AI_STATUS = [
  "We have an AI mandate but no shipped system",
  "We have a POC that has not reached production",
  "We have an agent initiative underway",
  "We have obvious manual workflow pain",
  "Just exploring",
];

export default function LeadForm({
  source,
  submitLabel = "Request a consultation",
  workflowLabel = "The workflow you want to fix",
  workflowPlaceholder = "Which repeated process is slow, manual or hard to scale? Who owns it, and which systems does it touch?",
}: Props) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError("");

    const data = Object.fromEntries(new FormData(event.currentTarget).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source }),
      });
      if (!response.ok) throw new Error(await response.text());
      setState("done");
    } catch {
      setState("idle");
      setError(
        `Something went wrong sending that. Please email ${site.contactEmail} and we will pick it up from there.`,
      );
    }
  }

  if (state === "done") {
    return (
      <div className="lead-form form-done">
        <strong>Thank you — that is enough to start.</strong>
        <p>
          We answer every inbound within 24 hours. The first conversation is a diagnosis of one
          workflow, not a capabilities presentation.
        </p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <div className="lead-grid">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" required autoComplete="name" placeholder="Your name" />
        </div>
        <div className="field">
          <label htmlFor="email">Work email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
          />
        </div>
        <div className="field">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" required autoComplete="organization" placeholder="Company name" />
        </div>
        <div className="field">
          <label htmlFor="role">Role</label>
          <input id="role" name="role" autoComplete="organization-title" placeholder="CTO, VP Engineering, founder…" />
        </div>
        <div className="field full">
          <label htmlFor="status">Where your AI work stands today</label>
          <select id="status" name="status" defaultValue={AI_STATUS[0]}>
            {AI_STATUS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="field full">
          <label htmlFor="workflow">{workflowLabel}</label>
          <textarea id="workflow" name="workflow" placeholder={workflowPlaceholder} />
        </div>
      </div>

      <button className="primary" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : submitLabel}
      </button>

      {error ? <div className="form-status err">{error}</div> : null}

      <p className="form-foot">
        We reply within 24 hours. Prefer email? <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
      </p>
    </form>
  );
}
