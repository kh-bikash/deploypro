export const site = {
  name: "DEPLOY",
  parent: "Build Fast with AI",
  parentUrl: "https://www.buildfastwithai.com",
  url: "https://deploypro-khbikash18-gmailcoms-projects.vercel.app",
  contactEmail: "deploy@buildfastwithai.com",
  /**
   * Calendly (or any scheduler) link for the booking CTA. Leave empty until the
   * real event types exist — the CTA falls back to a pre-filled email so the
   * button never points at a dead URL.
   */
  schedulingUrl: "",
  tagline: "Deployed, not demoed.",
  description:
    "Two forward-deployed engineers embed with your team and turn one business workflow into a deployed, measurable production system — then coach your team to own it.",
};

/** Taken from the live Build Fast with AI site, not guessed. */
export const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/build-fast-with-ai/" },
  { name: "X", href: "https://x.com/BuildFastWithAI" },
  { name: "Instagram", href: "https://www.instagram.com/buildfastwithai/" },
  { name: "GitHub", href: "https://github.com/satvik314" },
];

export type NavLink = {
  href?: string;
  label: string;
  children?: { href: string; label: string; description?: string }[];
};

export const nav: NavLink[] = [
  { href: "/process", label: "Process" },
  { href: "/proof", label: "Proof" },
  { href: "/engage", label: "How we engage" },
  { href: "/masterclass", label: "Masterclass" },
];
