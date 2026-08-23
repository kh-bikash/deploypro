export type App = { name: string; domain: string };

export const integrations: App[] = [
  { name: "HubSpot", domain: "hubspot.com" },
  { name: "Salesforce", domain: "salesforce.com" },
  { name: "Slack", domain: "slack.com" },
  { name: "Gmail", domain: "gmail.com" },
  { name: "Google Sheets", domain: "docs.google.com" },
  { name: "LinkedIn", domain: "linkedin.com" },
  { name: "Notion", domain: "notion.so" },
  { name: "Asana", domain: "asana.com" },
  { name: "Microsoft", domain: "microsoft.com" },
  { name: "Freshdesk", domain: "freshdesk.com" },
  { name: "Databricks", domain: "databricks.com" },
  { name: "Snowflake", domain: "snowflake.com" },
  { name: "Twilio", domain: "twilio.com" },
  { name: "Workday", domain: "workday.com" },
  { name: "WhatsApp", domain: "whatsapp.com" },
  { name: "Airtable", domain: "airtable.com" },
  { name: "Zapier", domain: "zapier.com" },
  { name: "Ahrefs", domain: "ahrefs.com" },
  { name: "GitHub", domain: "github.com" },
  { name: "Canva", domain: "canva.com" },
  { name: "Intercom", domain: "intercom.com" },
  { name: "Google Drive", domain: "drive.google.com" },
  { name: "Clerk", domain: "clerk.com" },
  { name: "Zendesk", domain: "zendesk.com" },
  { name: "Stripe", domain: "stripe.com" },
  { name: "Jira", domain: "atlassian.com" },
  { name: "Segment", domain: "segment.com" },
  { name: "Dropbox", domain: "dropbox.com" },
];

export const featuredIntegrations = [
  "Salesforce",
  "Slack",
  "Gmail",
  "HubSpot",
  "Notion",
  "GitHub",
  "Google Drive",
  "Stripe",
];

export function faviconUrl(domain: string, size = 128) {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=${size}`;
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2);
}

const systemLogoMap: Record<string, App> = {
  crm: { name: "Salesforce", domain: "salesforce.com" },
  "web signals": { name: "Google", domain: "google.com" },
  email: { name: "Gmail", domain: "gmail.com" },
  docs: { name: "Google Drive", domain: "drive.google.com" },
  "policy library": { name: "Notion", domain: "notion.so" },
  "proposal template": { name: "Canva", domain: "canva.com" },
  "company site": { name: "Google", domain: "google.com" },
  "meeting notes": { name: "Notion", domain: "notion.so" },
  slack: { name: "Slack", domain: "slack.com" },
  "project tracker": { name: "Asana", domain: "asana.com" },
  calendar: { name: "Google Calendar", domain: "calendar.google.com" },
  "approval system": { name: "Workday", domain: "workday.com" },
  "vendor db": { name: "Airtable", domain: "airtable.com" },
  monitoring: { name: "Datadog", domain: "datadoghq.com" },
  logs: { name: "Datadog", domain: "datadoghq.com" },
  erp: { name: "Stripe", domain: "stripe.com" },
  "expense system": { name: "Stripe", domain: "stripe.com" },
  ocr: { name: "Google Cloud", domain: "cloud.google.com" },
  "contract db": { name: "Google Drive", domain: "drive.google.com" },
  hris: { name: "Workday", domain: "workday.com" },
  identity: { name: "Clerk", domain: "clerk.com" },
  lms: { name: "Google Classroom", domain: "classroom.google.com" },
  support: { name: "Zendesk", domain: "zendesk.com" },
  repository: { name: "GitHub", domain: "github.com" },
  tests: { name: "GitHub", domain: "github.com" },
  "ci/cd": { name: "GitHub", domain: "github.com" },
  analytics: { name: "Google Analytics", domain: "analytics.google.com" },
  "privacy portal": { name: "Google", domain: "google.com" },
  "data catalog": { name: "Snowflake", domain: "snowflake.com" },
  ticketing: { name: "Freshdesk", domain: "freshdesk.com" },
  "audit store": { name: "AWS", domain: "aws.amazon.com" },
};

const mapKeys = Object.keys(systemLogoMap);

export function systemsToLogos(systems: string, limit = 5): App[] {
  const seen = new Set<string>();
  const logos: App[] = [];

  for (const token of systems.split(" · ").map((t) => t.trim()).filter(Boolean)) {
    const key = token.toLowerCase();
    const matched = mapKeys.find((k) => key === k || key.includes(k));
    const app = matched ? systemLogoMap[matched] : { name: token, domain: "google.com" };
    if (!seen.has(app.name)) {
      seen.add(app.name);
      logos.push(app);
    }
  }

  for (const filler of [
    { name: "Google", domain: "google.com" },
    { name: "AWS", domain: "aws.amazon.com" },
  ]) {
    if (logos.length < limit && !seen.has(filler.name)) {
      seen.add(filler.name);
      logos.push(filler);
    }
  }

  return logos.slice(0, limit);
}
