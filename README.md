# DEPLOY — web app

Marketing site for DEPLOY by Build Fast with AI. Next.js 15 (App Router), TypeScript, no UI framework.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start
npm run typecheck
```

## Before launch

Two values in `lib/site.ts` are placeholders and must be confirmed:

| Field | Current | Why it matters |
| --- | --- | --- |
| `url` | `https://deploypro-khbikash18-gmailcoms-projects.vercel.app` | Canonical URL, OG tags, `sitemap.xml`, `robots.txt` |
| `contactEmail` | `deploy@buildfastwithai.com` | Footer link and the lead-form fallback |

Set `DEPLOY_LEAD_WEBHOOK` to receive enquiries. Without it, `POST /api/contact` validates
the submission and logs it to the server console — fine for a smoke test, not for real leads.
Any endpoint accepting a JSON POST works (Zapier, Make, Slack workflow, a CRM webhook).

```bash
DEPLOY_LEAD_WEBHOOK="https://hooks.example.com/deploy-leads"
```

## Routes

| Route | Contents |
| --- | --- |
| `/` | Hero, the execution-gap evidence, the two-FDE model, integrations, the three build phases, the agent loop, an orchestration board, 24 interactive use cases, lead form |
| `/process` | Detect → Yield in detail, deliverables, the production standard, where it applies, scope discipline |
| `/proof` | Case studies, sector-by-sector evidence, what we can walk you through |
| `/engage` | The offer ladder, fit criteria, objection handling |
| `/masterclass` | Format, minute-by-minute agenda, registration |

Copy is centralised in `lib/content.ts`, the 24 use cases in `lib/agents.ts`, and the
connector list in `lib/integrations.ts` — edit those rather than the components.

Pricing is deliberately absent: the offer ladder describes each engagement without figures,
and `/engage` explains that numbers are shared on the diagnosis call. No timeline claim
("3 weeks", "4–8 weeks") appears anywhere on the site.

## The sketch animations

`public/media/*.mp4` are generated, not stock footage:

- `fde-sketch.mp4` — the forward-deployed model drawn out (used on the home page)
- `hero-loop.mp4` — an ambient team-at-work scene behind the hero copy

Both come from one script and have no audio:

```bash
python tools/generate_sketch_video.py     # needs Pillow, numpy, ffmpeg on PATH
```

Edit `draw_scene` (explainer) or `draw_hero_scene` (hero) to change them. Alpha, duration and
drift are arguments to `render()` in `main()`. The script reads fonts from `C:\Windows\Fonts`;
change `FONT_DIR` to render on another OS.
