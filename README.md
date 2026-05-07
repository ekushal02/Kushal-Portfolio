# Kushal Erramilli — Portfolio

A production-grade personal portfolio for an AI Engineer / Data Scientist. Built with Next.js 14 App Router, TypeScript, Tailwind, Framer Motion, and Three.js. The AI Playground is powered by **Groq** (free tier, no credit card required).

---

## ✦ Features

- **Three.js hero** — wireframe icosahedron + 1,200-particle field reacting to cursor
- **Custom cursor** with magnetic ring expansion on hoverable elements
- **⌘K command palette** for keyboard navigation
- **Konami code easter egg** (↑↑↓↓←→←→BA) → hidden developer terminal with live commands
- **AI Playground** — real LLM (via Groq) primed on Kushal's resume + projects
- **Boot sequence** loading screen
- **Scroll progress bar** + scroll-triggered section reveals
- **Magnetic CTA buttons** with cursor tracking
- **Filterable project grid** + cinematic case-study modals
- **Skills** with proficiency dots, animated radar chart, and "currently exploring" section
- **Certifications** with status badges (active / in-progress)
- Fully responsive (desktop, tablet, mobile)
- WCAG-conscious (focus states, reduced-motion respected, semantic HTML)
- SEO-ready (metadata, OG, sitemap-friendly)

---

## ✦ Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Motion | Framer Motion + CSS |
| 3D | Three.js (lazy-loaded) |
| Icons | Lucide React |
| AI | Groq SDK (free tier) |
| Hosting | Vercel (recommended) |

---

## ✦ Quick Start

### Prerequisites

- Node.js **18.17+** (use `nvm install 20 && nvm use 20` if unsure)
- npm, pnpm, or yarn

### 1. Clone / extract

```bash
cd kushal-portfolio
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Then open `.env.local` and add your **Groq API key** (free):

1. Go to <https://console.groq.com/keys>
2. Sign up (no credit card needed)
3. Create a new API key
4. Paste into `.env.local`:

```env
GROQ_API_KEY=gsk_your_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```

> **No Groq key?** The AI Playground will gracefully fall back to a "configure to enable" message — the rest of the site works normally. To remove the section entirely, see **Customization → Removing the AI Playground** below.

### 4. Run the dev server

```bash
npm run dev
```

Open <http://localhost:3000>.

### 5. Build for production

```bash
npm run build
npm run start
```

---

## ✦ Project Structure

```
kushal-portfolio/
├── app/
│   ├── layout.tsx            # Root layout, fonts, metadata
│   ├── page.tsx              # Home page (composes all sections)
│   ├── globals.css           # Tailwind base + custom animations
│   ├── not-found.tsx         # 404
│   └── api/
│       └── chat/route.ts     # Server route for Groq (keeps API key safe)
├── components/
│   ├── ui/                   # Reusable UI primitives
│   │   ├── BootSequence.tsx
│   │   ├── CommandPalette.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── KonamiTerminal.tsx
│   │   ├── ScrollProgress.tsx
│   │   └── SectionHeader.tsx
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── HeroCanvas.tsx        # Three.js scene (client-only)
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectModal.tsx
│   ├── Skills.tsx
│   ├── RadarChart.tsx
│   ├── Certifications.tsx
│   ├── Playground.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── lib/
│   ├── data.ts               # All content (profile, projects, skills, …)
│   ├── hooks.ts              # useMagnetic, useReveal
│   └── cn.ts                 # clsx + tailwind-merge utility
├── types/
│   └── index.ts
├── public/
│   ├── favicon.svg
│   └── resume.pdf            # ⚠ Drop your real resume here
├── .env.example
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## ✦ Customization

### Editing content

**All content lives in `lib/data.ts`** — one file, all sections. Edit there:

- `PROFILE` — name, role, contact info
- `EXPERIENCE` — work history (collapsible cards)
- `EDUCATION` — schools & degrees
- `PROJECTS` — case studies (filterable grid)
- `SKILLS` — categorized skill chips
- `RADAR_DATA` — radar chart values
- `CERTIFICATIONS` — active + in-progress credentials
- `PLAYGROUND_SYSTEM` — system prompt for the AI chatbot

No need to touch any component file for content edits.

### Adding your resume PDF

Drop `resume.pdf` into `public/`. The "Resume" button in the hero will link to `/resume.pdf`.

### Removing the AI Playground

If you don't want the AI chat:

1. Delete `components/Playground.tsx` and `app/api/chat/route.ts`
2. In `app/page.tsx`, remove the `<Playground />` import and JSX
3. In `components/Nav.tsx`, remove the "Playground" link
4. In `components/ui/CommandPalette.tsx`, remove the playground command
5. Uninstall: `npm uninstall groq-sdk`

### Switching AI providers

The `/api/chat` route uses the OpenAI-compatible Groq SDK. To swap:

- **OpenAI** → install `openai`, change `Groq` import
- **Anthropic** → install `@anthropic-ai/sdk`, swap message format
- **Local Ollama** → point base URL to `http://localhost:11434/v1`

The component side (`Playground.tsx`) doesn't change.

### Color / typography

- **Accent color**: change `accent` in `tailwind.config.ts`
- **Fonts**: edit the `next/font/google` calls in `app/layout.tsx`

---

## ✦ Deployment

### Vercel (recommended — 1 click)

1. Push this repo to GitHub
2. Import on <https://vercel.com/new>
3. Add `GROQ_API_KEY` (and optionally `GROQ_MODEL`) under **Environment Variables**
4. Deploy — done.

Vercel auto-detects Next.js, no config needed.

### Self-hosting

```bash
npm run build
npm run start  # runs on port 3000
```

Or with PM2 / Docker:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## ✦ Performance Notes

- **Three.js is lazy-loaded** via `next/dynamic({ ssr: false })` — keeps the initial JS small
- **Lucide icons** are tree-shaken by Next.js' `optimizePackageImports`
- **Custom cursor disabled on touch devices** (no hover state to track)
- **Reveal-on-scroll uses IntersectionObserver** — no scroll-listener jank
- Expected Lighthouse: 95+ Performance, 100 Accessibility, 100 Best Practices

To audit: `npm run build && npm run start`, then run Lighthouse against the production build (dev mode is always slower).

---

## ✦ License

MIT. Use this as a template — just swap the content in `lib/data.ts`.
