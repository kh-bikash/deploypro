export const problemStats = [
  {
    figure: "95%",
    claim: "of enterprise GenAI pilots deliver no measurable P&L impact.",
    source: "MIT, State of AI in Business, 2025",
  },
  {
    figure: "1 in 10",
    claim: "In India, fewer than one in ten GenAI POCs ever reach production.",
    source: "EY–CII, AIdea of India, 2025",
  },
  {
    figure: "42%",
    claim: "of companies abandoned most of their AI initiatives in 2025 — up from 17% the year before.",
    source: "S&P Global, 2025",
  },
  {
    figure: "40%+",
    claim: "of agentic AI projects will be cancelled by 2027 — cost, unclear value, weak controls.",
    source: "Gartner, June 2025",
  },
  {
    figure: "27%",
    claim: "of Indian enterprises have AI agents in production; 31% are still stuck at the POC stage.",
    source: "NASSCOM, 2025",
  },
  {
    figure: "1M",
    claim: "AI professionals short: India needs ~2.3M by 2027 against a supply of ~1.25M.",
    source: "NASSCOM–Deloitte, 2025",
  },
];

export const podRoles = [
  {
    tag: "FDE 1",
    title: "Product / Workflow",
    body: "Owns the business process, the users, the decision points, the interface and the acceptance criteria. Talks to your team daily.",
  },
  {
    tag: "FDE 2",
    title: "Engineering / AI",
    body: "Owns integrations, orchestration, agents, retrieval, models, evaluations, permissions, reliability and observability. Builds live.",
  },
];

export const deploySteps = [
  {
    num: "1",
    word: "Detect",
    short: "Find the signal",
    label: "Trigger",
    body: "We identify the event or business situation that should start the workflow — the signal that today depends on somebody noticing it.",
  },
  {
    num: "2",
    word: "Enrich",
    short: "Add the right context",
    label: "Context",
    body: "We collect the context, data, history, documents and rules needed to make the decision properly.",
  },
  {
    num: "3",
    word: "Plan",
    short: "Choose the next action",
    label: "Decision",
    body: "We decide the next action and define the human approval boundary — what the system may do alone, and what always goes to a person.",
  },
  {
    num: "4",
    word: "Link",
    short: "Connect the right tools",
    label: "Systems",
    body: "We connect the APIs, databases, tools and internal systems the workflow actually requires.",
  },
  {
    num: "5",
    word: "Operate",
    short: "Execute with control",
    label: "Production",
    body: "We execute safely, with logging, evaluations, fallbacks, retries and human control in place.",
  },
  {
    num: "6",
    word: "Yield",
    short: "Measure the outcome",
    label: "Result",
    body: "We show the result against the business problem we started with, measured on your baseline.",
  },
];

export const deliverables = [
  {
    term: "Blueprint",
    def: "The workflow we picked, the data it needs, and what success looks like against your own baseline.",
  },
  { term: "Working system", def: "The actual product, running against real data inside your environment." },
  { term: "Integration map", def: "How it plugs into the systems you already run." },
  { term: "Impact report", def: "Before and after, on your numbers — time, cost, throughput, errors." },
  {
    term: "Transfer pack + coaching",
    def: "Documentation, evaluation suites and handover sessions so your team owns and extends it.",
  },
];

export const productionStandard = [
  { term: "Authentication & permissions", def: "Users and agents get only the access they need." },
  { term: "Human approval", def: "Sensitive actions stay visible and controlled." },
  {
    term: "Evaluations",
    def: "The workflow can be tested systematically instead of resting on one good demo.",
  },
  { term: "Observability", def: "Inputs, decisions, tool calls, errors and outcomes can be inspected." },
  {
    term: "Retries & failure handling",
    def: "Temporary model, API or system failures do not destroy the workflow.",
  },
  { term: "Data handling", def: "Inputs, outputs and client data follow agreed boundaries." },
  {
    term: "Documentation",
    def: "The architecture, systems, controls and operating behaviour are understandable.",
  },
  { term: "Coaching", def: "Your team is not dependent on us for every future change." },
];

export const fitCriteria = [
  { term: "Buyer", def: "CTO, CIO, COO, VP Product or Head of Engineering." },
  { term: "Company", def: "Mid-to-large company with multiple systems, teams and repeated workflows." },
  {
    term: "AI situation",
    def: "An AI mandate, a POC backlog, an agent initiative, or obvious manual workflow pain.",
  },
  {
    term: "Team",
    def: "Existing product, engineering or operations teams — but no dedicated AI capability, or not enough capacity.",
  },
  { term: "Problem owner", def: "A person who knows the workflow and cares about the result." },
  {
    term: "Access",
    def: "The data, APIs, tools or representative inputs needed to understand the workflow can be made available.",
  },
  {
    term: "Measurement",
    def: "A visible baseline exists: time, cost, throughput, errors, risk, revenue or SLA.",
  },
];

export const notAFit = [
  "Open-ended research projects with no defined business outcome.",
  "Engagements with no business owner attached to the workflow.",
  "Work where system and data access cannot be arranged.",
  "Requests that are only asking for some AI ideas.",
];

export const offers = [
  {
    name: "AI Diagnostic Sprint",
    flag: "Start here",
    lead: true,
    body: "Paid discovery for when the workflow is not yet clear enough to scope responsibly. We map the process, choose the workflow and prove the core loop.",
    points: [
      "5-Whys process mapping across the real workflow",
      "Workflow selection against your own baseline",
      "A working prototype on your data",
      "Production roadmap and ROI model",
    ],
  },
  {
    name: "Focused DEPLOY build",
    flag: "Core offer",
    lead: false,
    body: "A 2-FDE pod embedded on one named workflow, taken from prototype to a deployed production system, with coaching and handover.",
    points: [
      "Fixed scope tied to defined systems and controls",
      "Explicit acceptance criteria agreed up front",
      "Production standard applied, not promised later",
      "Transfer pack so your team owns the result",
    ],
  },
  {
    name: "Cross-functional build",
    flag: "",
    lead: false,
    body: "For workflows that cross more teams, systems, approvals, security constraints or production risk.",
    points: [
      "Multi-team process and approval mapping",
      "Tighter security and data boundaries",
      "Shared components across the workflows in scope",
    ],
  },
  {
    name: "Expansion",
    flag: "",
    lead: false,
    body: "The next workflow or department, reusing the components already proven in the first build — which makes round two faster and cheaper than round one.",
    points: [
      "Reuses agent harnesses, integrations and eval suites",
      "Shorter discovery because the baseline is known",
      "Same production standard, less new engineering",
    ],
  },
  {
    name: "Reliability retainer",
    flag: "Ongoing",
    lead: false,
    body: "Keeping a deployed system healthy as models, APIs and business rules change around it.",
    points: [
      "Evaluation and regression runs",
      "Model upgrades and token/cost optimisation",
      "SLA support on the deployed workflow",
    ],
  },
  {
    name: "GenAI Accelerator",
    flag: "Training",
    lead: false,
    body: "Corporate training and coaching for your own developers — standalone, or bundled with a build so the handover lands properly.",
    points: [
      "Hands-on with the patterns we ship in production",
      "Built on the GenAI Launchpad curriculum",
      "Runs against your stack, not a generic sandbox",
    ],
  },
];

export const whereItApplies = [
  {
    fn: "Sales & Growth",
    example: "Lead Revival",
    body: "Detect fresh buying intent, research the account, draft outreach, update the CRM and ask for seller approval.",
  },
  {
    fn: "Operations",
    example: "Approval Router",
    body: "Reconcile approval status across systems, answer context questions and nudge only the outstanding decision.",
  },
  {
    fn: "Finance",
    example: "Cash Collection",
    body: "Prioritise overdue invoices, understand account context and prepare account-specific collection actions.",
  },
  {
    fn: "People",
    example: "Employee Onboarding",
    body: "Create role-based onboarding tasks, provision baseline access and verify readiness.",
  },
  {
    fn: "Engineering",
    example: "Release Readiness",
    body: "Check tests, CI/CD, migrations, approvals and incidents before a production release.",
  },
  {
    fn: "Risk & Compliance",
    example: "Evidence Pack",
    body: "Collect evidence, validate coverage, flag gaps and prepare a reviewable audit package.",
  },
];

export const caseStudies = [
  {
    sector: "Food services",
    title: "AI-powered business intelligence over live sales data",
    metric: "Multi-agent",
    metricLabel: "RAG architecture in a live operational workflow",
    body: [
      "Built a multi-agent RAG architecture enabling natural language queries over sales data, with a modular agent framework for data retrieval, analysis and insight generation.",
      "Streamlined operational decision-making through a conversational analytics interface used by the operating team, not a demo audience.",
    ],
    relevance:
      "Enterprise data integration, multi-agent architecture and deployment into a live operational workflow — a textbook production deployment and our strongest proof asset for AI analytics engagements.",
  },
  {
    sector: "Back office",
    title: "Intelligent document processing & verification pipeline",
    metric: "80%",
    metricLabel: "reduction in processing time",
    body: [
      "Automated extraction and verification across invoices, contracts and reports, covering contract analysis, invoice processing, automated compliance checks and R&D knowledge base construction.",
    ],
    relevance:
      "Regulated, high-volume back-office workflows with compliance constraints — the highest-value and most defensible category, and directly reusable as a productised accelerator.",
  },
  {
    sector: "Hiring",
    title: "AI interviewer that automates screening",
    metric: "60%",
    metricLabel: "less manual interview time",
    body: [
      "Developed an AI interviewer that automates screening and evaluation, reducing manual effort and bias across the hiring funnel.",
    ],
    relevance:
      "Workflow replacement with a hard, measurable business metric — exactly the outcome language enterprise buyers require before funding a production rollout.",
  },
  {
    sector: "Education",
    title: "Personalised AI tutor for adaptive learning",
    metric: "45%",
    metricLabel: "increase in student engagement",
    body: [
      "Built an intelligent quiz platform that adapts to each student's pace, personalises questions, provides instant feedback and drives outcomes through data-driven insight.",
    ],
    relevance:
      "Product co-development with a client, with adoption measured post-launch — proof that we deliver against outcome metrics, not just deliverables.",
  },
  {
    sector: "Developer relations",
    title: "DevRel for the SUTRA LLM launch",
    metric: "1,000+",
    metricLabel: "developers engaged during launch week",
    body: [
      "Led developer relations for a new LLM family: community building, technical documentation and demo integrations through the launch window.",
    ],
    relevance:
      "Proves the hardest and least-teachable forward-deployed skill — customer-facing technical communication. Most engineering firms cannot demonstrate it.",
  },
];

export const sectorProof = [
  {
    sector: "Fintech / NBFC",
    tag: "Underwriting",
    proof:
      "Bajaj Finance: AI underwriting improved approval accuracy 30–35%, and AI-driven calling drove roughly ₹1,600 Cr in disbursements. Yet 74% of Indian financial firms have GenAI POCs and only 11% are in production.",
    source: "Deloitte, 2025 · EY India, 2025",
    angle: "AI underwriting, collections and KYC-triage teardowns.",
  },
  {
    sector: "Logistics",
    tag: "Documents",
    proof:
      "Delhivery's AI RTO predictor cuts returns by up to 20% for 4,800+ brands, and its GenAI address system cut model-serving costs by roughly 80%.",
    source: "Delhivery, 2024 · AWS case study, 2024",
    angle: "Document extraction and returns-prediction breakdowns.",
  },
  {
    sector: "Manufacturing",
    tag: "Uptime",
    proof:
      "Indian WEF Lighthouse factories report up to 43% cost improvement from AI and 4IR technology; Tata Steel Kalinganagar cut time-to-market by 50%.",
    source: "WEF/NASSCOM · Tata/WEF",
    angle: "Predictive-maintenance ROI math and downtime economics.",
  },
  {
    sector: "Retail / D2C",
    tag: "Support",
    proof:
      "Meesho's GenAI voice bot handles ~60,000 calls a day with some support costs cut 75%. Nykaa's AI support handled 1.6M conversations in 30 days at 90%+ satisfaction.",
    source: "Meesho, 2025 · IndiaAI.gov.in",
    angle: "Support-automation before/after stories.",
  },
  {
    sector: "B2B SaaS",
    tag: "Deflection",
    proof:
      "Freshworks Freddy AI deflects 65.7% of tickets, saving 431,000+ agent-hours. Indian IT teams hit 82% first-contact resolution — the best globally.",
    source: "Freshworks Benchmark, 2025",
    angle: "Ticket-deflection and AI-feature benchmarks.",
  },
  {
    sector: "Healthcare",
    tag: "Clinician time",
    proof:
      "Narayana Health returned ~25,000 clinician hours, cut length of stay from 4.5 to 3.5 days and saved $38M+. Apollo targets freeing 2–3 hours a day per doctor.",
    source: "Narayana Health, 2025 · Reuters, 2025",
    angle: "Clinical documentation and staff-hours ROI.",
  },
];

export const credentials = [
  { figure: "500+", label: "AI applications launched" },
  { figure: "150+", label: "consulting programs delivered" },
  { figure: "15,000+", label: "professionals trained" },
  { figure: "40,000+", label: "strong practitioner community" },
];

export const proofTypes = [
  {
    term: "Real use cases",
    def: "An interactive example with a trigger, context, actions, connected systems, approval and result.",
  },
  {
    term: "Project portfolio",
    def: "Complete product interfaces and workflows, showing capability beyond prompts.",
  },
  {
    term: "Architecture proof",
    def: "How data, models, APIs, permissions, evaluations, logging and human controls fit together.",
  },
  {
    term: "Case detail",
    def: "The original problem, what changed, the operating result and what the team learned.",
  },
  {
    term: "Reference conversations",
    def: "A client or operator explaining how we actually worked with their team.",
  },
];

export const objections = [
  {
    q: "We'll build it in-house.",
    a: "Great — that's the goal. We get you your first shipped system and train your team on the way. In-house from scratch typically means months of learning-by-failing against a 46% POC death rate.",
  },
  {
    q: "How are you different from an AI agency?",
    a: "Agencies bill hours and hand over code. We embed in your team, own one workflow end to end, and are accountable for a deployed system measured on your baseline.",
  },
  {
    q: "Why not a big consultancy?",
    a: "They sell slide decks and long discovery phases. Our discovery is a working prototype on your data.",
  },
  {
    q: "Is our data safe?",
    a: "We work inside your environment and your permissions, with agreed data boundaries and human-approval controls. Nothing leaves your stack.",
  },
];

export const bothSides = [
  { us: "AI and forward-deployed engineering capacity", you: "The business problem and operating context" },
  { us: "System architecture and production engineering", you: "System access, policies and technical SMEs" },
  { us: "Agent, retrieval, data and integration expertise", you: "Users who know the real workflow" },
  { us: "Evaluation, observability and failure handling", you: "Acceptance criteria and risk boundaries" },
  { us: "Product thinking and usable interfaces", you: "Feedback from the team that will use it" },
  { us: "Documentation and coaching", you: "Internal owners who will continue the capability" },
];

export const scopeDiscipline = [
  "One named workflow at a time.",
  "Clear systems and data boundaries.",
  "Clear human approval boundaries.",
  "Explicit acceptance criteria.",
  "New workflows become new scope, not hidden additions.",
];

export const diagnosisQuestions = [
  "What business problem are we solving?",
  "Who owns it?",
  "Which systems and people does it touch?",
  "What must remain human-controlled?",
  "What result will make this worth doing?",
];

export const masterclass = {
  title: "Deployed, Not Demoed",
  subtitle: "The FDE playbook for shipping AI in Indian companies",
  format:
    "A 60–75 minute live session: a 45-minute talk, a short segment on how DEPLOY works, then live Q&A. Recorded and published afterwards.",
  audience:
    "CTOs, VPs of Engineering and technical founders of mid-market companies. Free to attend.",
  cadence: "Monthly, live. The recording stays available here afterwards.",
  difference: [
    "No code on screen — this is the business side of shipping AI.",
    "India data and Indian case walkthroughs, not US enterprise anecdotes.",
    "It ends in an offer, not a course upsell.",
  ],
  agenda: [
    {
      time: "00–08",
      segment: "The POC graveyard",
      body: "Nine out of ten Indian AI POCs never ship. The data, and the six demo-killers behind it. The goal is that you recognise your own project.",
    },
    {
      time: "08–18",
      segment: "The FDE model",
      body: "The three-in-one role — product, engineer, platform — and why a two-person embedded pod out-ships a ten-person consultancy.",
    },
    {
      time: "18–33",
      segment: "Anatomy of one deployed workflow",
      body: "One real system walked end to end: trigger, context, the human-approval boundary, integrations, and the measured result.",
    },
    {
      time: "33–45",
      segment: "The buyer's playbook",
      body: "How to pick your first workflow, set the approval boundary and measure ROI on your own baseline — usable whether or not you ever work with us.",
    },
    {
      time: "45–50",
      segment: "What production actually means",
      body: "The production checklist, and the only pitch of the session.",
    },
    {
      time: "50–65",
      segment: "Q&A",
      body: "Live only. The best questions become the next month's material.",
    },
  ],
};

export const headlineResults = [
  {
    value: 80,
    suffix: "%",
    label: "less processing time",
    context: "Document extraction and verification across invoices, contracts and reports.",
    tag: "Document processing",
  },
  {
    value: 60,
    suffix: "%",
    label: "less manual interview time",
    context: "An AI interviewer that automates screening and evaluation end to end.",
    tag: "Hiring",
  },
  {
    value: 45,
    suffix: "%",
    label: "more student engagement",
    context: "An adaptive learning platform that personalises to each learner's pace.",
    tag: "Education",
  },
  {
    value: 1000,
    suffix: "+",
    label: "developers engaged at launch",
    context: "Developer relations for a new LLM family, through the launch window.",
    tag: "DevRel",
  },
];

export const studioBlocks = [
  {
    name: "Document Processing",
    body: "Extraction, verification and compliance checks across invoices, contracts, claims and reports.",
  },
  {
    name: "Knowledge Management",
    body: "Retrieval over policies, manuals and internal history, with citations and access rules that hold.",
  },
  {
    name: "AI Analytics",
    body: "Natural-language questions over operational data, answered from the systems of record.",
  },
  {
    name: "Process Automation",
    body: "Multi-step business processes that cross systems and stop at the right human checkpoints.",
  },
  {
    name: "GenAI Interfaces",
    body: "Drafting, summarising and generation built into the tools your team already works in.",
  },
  {
    name: "AI Automation",
    body: "Event-driven workflows that trigger themselves instead of waiting for someone to notice.",
  },
  {
    name: "AI Agents",
    body: "Agent harnesses with tool permissions, evaluation suites, retries and full execution traces.",
  },
  {
    name: "MCP & Integrations",
    body: "Model Context Protocol servers and connectors that expose your systems to agents safely.",
  },
];

export const useLessAI = [
  {
    title: "A status lookup is a query, not a prompt",
    body: "If the answer lives in a database row, we read the row. Asking a model to guess at data you already hold is slower, costlier and wrong often enough to matter.",
  },
  {
    title: "Rules that are written down stay code",
    body: "Approval thresholds, routing logic, SLA windows, tax rules — these are policy, not judgment. Code makes them auditable, testable and changeable without a prompt rewrite.",
  },
  {
    title: "Models handle the genuinely ambiguous part",
    body: "Reading intent from a customer email. Weighing conflicting context. Drafting language a person will actually send. That is where a model earns its cost, and nowhere else.",
  },
  {
    title: "Every model call ships with its evaluation",
    body: "If we cannot test it systematically, we cannot claim it works. Eval suites are written alongside the workflow, so a model upgrade is a test run rather than a leap of faith.",
  },
];

export const versusInHouse = [
  {
    dimension: "Starting point",
    inhouse: "Engineers learning retrieval, agents and evaluation from scratch, on top of a full roadmap.",
    deploy: "Patterns already shipped across hundreds of AI applications, reused from engagement one.",
  },
  {
    dimension: "The people",
    inhouse: "Hiring a senior AI engineer into a market short around a million professionals.",
    deploy: "A pod that starts on your workflow immediately, from a bench we already trained.",
  },
  {
    dimension: "What gets built",
    inhouse: "A demo that proves the model can respond, and usually stops there.",
    deploy: "A system with auth, approvals, evals, observability and failure handling.",
  },
  {
    dimension: "Accountability",
    inhouse: "Split across a team that also owns the product roadmap.",
    deploy: "Two people accountable for one named workflow, measured on your baseline.",
  },
  {
    dimension: "What is left behind",
    inhouse: "Knowledge that lives in one engineer's head until they change teams.",
    deploy: "Documentation, evaluations, a transfer pack and a team coached to extend it.",
  },
];
