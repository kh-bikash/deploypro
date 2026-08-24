/**
 * Homepage copy. Adapted from the DEPLOY / Forge messaging doc — the voice is
 * deliberately flat and concrete: no adjectives the work does not earn.
 */

export const heroStats = [
  { headline: "2 FDEs", label: "embedded in your team, not advising from outside" },
  { headline: "14 days", label: "median time to first production deploy" },
  { headline: "Zero decks", label: "we hand over systems, not recommendations" },
];

/**
 * Both columns render in the same grid, so the rows must stay roughly the same
 * length — the wipe slider lines them up row for row.
 */
export const manifesto = {
  before: {
    label: "The old way (consulting)",
    items: [
      "A 40-page strategy deck, delivered in month three",
      "A pilot that demos well and dies before production",
      "Advice billed by the hour, owned by no one",
      "A handoff of code your team never built",
    ],
  },
  after: {
    label: "The forward-deployed way",
    items: [
      "Engineers inside your team from day one",
      "A system in production, measured on your baseline",
      "One workflow, fixed scope, end-to-end accountability",
      "Your team ships alongside us and keeps the capability",
    ],
  },
};

export const impact = [
  {
    value: 80,
    suffix: "%",
    metric: "less processing time",
    context: "Document extraction and verification across invoices, contracts and reports.",
    sector: "Back office",
  },
  {
    value: 60,
    suffix: "%",
    metric: "less manual interview time",
    context: "An AI interviewer that automates screening and evaluation end to end.",
    sector: "Hiring",
  },
  {
    value: 45,
    suffix: "%",
    metric: "more student engagement",
    context: "An adaptive learning platform that personalises to each learner's pace.",
    sector: "Education",
  },
];

export const sprintStages = [
  {
    no: "01",
    title: "Embed & scope",
    days: "Days 0–3",
    body: "Three days inside the real work — your Slack, your standups. We leave with one workflow picked and a number to beat.",
    marksLabel: "What lands",
    marks: ["The workflow, chosen and scoped", "A baseline everyone agreed to", "Systems and data access in place"],
    need: "A problem owner who knows the workflow, and someone who can grant access.",
  },
  {
    no: "02",
    title: "Build against reality",
    days: "Days 4–10",
    body: "We build on your real data and the edge cases your pilot skipped. You see it running at the end of every day.",
    marksLabel: "What lands",
    marks: ["A working system, not a prototype", "Live integrations to your stack", "A build you can open every day"],
    need: "Sample data, API access, and twenty minutes a day from the owner.",
  },
  {
    no: "03",
    title: "Deploy to production",
    days: "Days 11–14",
    body: "It goes live alongside your current process, so you can compare the two before anything depends on it.",
    marksLabel: "What lands",
    marks: ["Running in your environment", "Human approval on the risky steps", "Measured against the baseline"],
    need: "A sign-off on where the system may act alone.",
  },
  {
    no: "04",
    title: "Hand over & train",
    days: "Day 15+",
    body: "We document it, sit with the people who will run it, and get out of the way. You keep the code and the capability.",
    marksLabel: "What you keep",
    marks: ["Documentation and playbooks", "Your team trained to extend it", "Full ownership of the code"],
    need: "Two or three engineers who want to own it after we leave.",
  },
];

export const faqs = [
  {
    q: "What exactly is a forward-deployed engineer?",
    a: "An engineer who works inside your business — your tools, your data, your team — and ships production systems, not prototypes. Palantir invented the model; OpenAI, Anthropic and AWS have since committed billions to it. It is the opposite of a consultant who advises from a distance.",
  },
  {
    q: "How is this different from consulting?",
    a: "Consulting tells you what to build. We build it, deploy it, and stay until the number moves. The deliverable is a changed operation with a measurable before and after — not a recommendation.",
  },
  {
    q: "What does a sprint cost?",
    a: "Sprints are fixed-scope and priced per engagement after a 30-minute scoping call, because the honest answer depends on the project. What we can tell you: it is scoped to be a fraction of one hire's annual cost — and the system running in production is how you judge the return.",
  },
  {
    q: "Which models and tools do you use?",
    a: "We are vendor-neutral. Every new model resets what is possible — your operations should not have to reset with it. We pick whatever ships fastest and runs cheapest for your workflow, and we build for model portability so you are never locked in.",
  },
  {
    q: "Who actually does the work?",
    a: "Senior builders from Build Fast with AI — the same people who teach hundreds of builders to ship AI systems in our programs. We build for a living and we teach it; the sprint is where both meet your business.",
  },
  {
    q: "What happens after the sprint ends?",
    a: "Your team runs the system — capability transfer is part of the sprint, not an add-on. If you want us to stay and keep shipping workflows, that is the FDE Pod.",
  },
];

/**
 * Companies this site already claims work with. Icons come from the web at
 * render time, so adding a client is one line here — no asset to commit.
 * Only add names there is a real engagement behind.
 */
export const workClients = [
  // `file` points at /public/logos when we have a crisp asset; everything else
  // falls back to a favicon fetched from the web at render time.
  { name: "Accel", domain: "accel.com" },
  { name: "Wispr Flow", domain: "wisprflow.ai", file: "wisprflow" },
  { name: "BCG", domain: "bcg.com", file: "bcg" },
  { name: "Google", domain: "google.com", file: "google" },
  { name: "mem0", domain: "mem0.ai" },
];

/** Condensed from the full case studies in lib/content.ts. */
export const workProjects = [
  {
    sector: "Food services",
    metric: "Multi-agent",
    title: "BI over live sales data",
    blurb: "Natural-language questions answered straight from the systems of record.",
  },
  {
    sector: "Back office",
    metric: "80%",
    title: "Document processing pipeline",
    blurb: "Extraction and verification across invoices, contracts and reports.",
  },
  {
    sector: "Hiring",
    metric: "60%",
    title: "AI interviewer",
    blurb: "Screening and evaluation automated end to end, bias included.",
  },
  {
    sector: "Education",
    metric: "45%",
    title: "Adaptive learning tutor",
    blurb: "A quiz platform that moves at each student's pace.",
  },
];

export const homeNav = [
  { href: "/#why", label: "Why" },
  { href: "/#sprint", label: "Sprint" },
  { href: "/impact", label: "Impact" },
  { href: "/proof", label: "Proof" },
];
