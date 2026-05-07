# Kushal Erramilli — Portfolio

Production-grade personal portfolio built with **Next.js 14**, **TypeScript**, **Tailwind**, and **Three.js**. AI Playground powered by **Groq** (free tier).

## Quick Start

### 1. Install & Setup

```bash
npm install
cp .env.example .env.local
```

Add your Groq API key to `.env.local`:
- Get free key at <https://console.groq.com/keys>
- Paste: `GROQ_API_KEY=gsk_your_key_here`

### 2. Run

```bash
npm run dev   # http://localhost:3000
```

### 3. Build

```bash
npm run build
npm run start
```

## Customize Content

All content lives in **`lib/data.ts`** — edit:

- `PROFILE` — name, role, contact
- `EXPERIENCE` — work history
- `EDUCATION` — schools & degrees
- `PROJECTS` — case studies
- `SKILLS` — skill categories
- `RADAR_DATA` — radar chart
- `CERTIFICATIONS` — credentials

No component changes needed.

## Add Resume

Drop `resume.pdf` into `public/`. The hero "Resume" button links to it automatically.

## Deploy

**Vercel (1 click):**
1. Push to GitHub
2. Import at <https://vercel.com/new>
3. Add `GROQ_API_KEY` to Environment Variables
4. Deploy ✓

**Self-host:**
```bash
npm run build && npm run start
```

## Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── layout.tsx         # Fonts, metadata
│   ├── page.tsx           # Home (composes all sections)
│   ├── globals.css        # Tailwind + animations
│   └── api/chat/route.ts  # Groq backend
├── components/            # React components
│   ├── ui/               # Reusable primitives
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   └── ...
├── lib/
│   ├── data.ts           # All content (edit this)
│   ├── hooks.ts
│   └── cn.ts
├── types/index.ts        # TypeScript types
└── public/               # Resume + favicon
```

## Features

- ✨ Three.js hero scene (icosahedron + particles)
- 🎯 Custom cursor with magnetic effects
- ⌘K command palette
- 🎮 Konami code easter egg (↑↑↓↓←→←→BA)
- 🤖 AI chatbot via Groq
- 📊 Skills radar chart
- 🎬 Project modals
- 📱 Fully responsive
- ♿ WCAG accessible
- 🚀 Lighthouse 95+

## Customization

**Remove AI Playground:**
1. Delete `components/Playground.tsx` and `app/api/chat/route.ts`
2. Remove `<Playground />` from `app/page.tsx`
3. Remove "Playground" link from `components/Nav.tsx`
4. `npm uninstall groq-sdk`

**Change accent color:**
Edit `tailwind.config.ts` → change `accent` theme values

**Change fonts:**
Edit `app/layout.tsx` → swap `next/font/google` imports

## Performance

- Three.js lazy-loaded (smaller initial JS)
- Lucide icons tree-shaken
- IntersectionObserver for scroll reveals
- Expected Lighthouse: 95+ Performance, 100 Accessibility

## License

MIT — customize and ship.