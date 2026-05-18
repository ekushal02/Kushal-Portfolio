/**
 * ─────────────────────────────────────────────────────────────
 *  CONTENT — single source of truth
 *  Edit anything in this file to update the site. No component
 *  edits should be needed for content changes.
 * ─────────────────────────────────────────────────────────────
 */

import type {
  ProfileData,
  ExperienceItem,
  EducationItem,
  Project,
  SkillCategory,
  RadarPoint,
  Certification,
  ProjectFilter,
} from "@/types";

/* ============================ PROFILE ============================ */

export const PROFILE: ProfileData = {
  name: "Kushal Erramilli",
  role: "AI Engineer & Data Scientist",
  tagline:
    "Software Engineer building scalable backend systems and production-grade ML applications.",
  location: "Baltimore, MD",
  email: "kushalerramilli202@gmail.com",
  phone: "410-500-3431",
  github: "ekushal02",
  linkedin: "kushalerramilli",
  status: "Open to Work",
  resumeHref: "/resume.pdf",
};

/* ============================ EXPERIENCE ============================ */

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Carrier Corporation",
    role: "Management Trainee — Engineering Leadership Program",
    period: "Jul 2023 → Dec 2024",
    location: "India",
    summary:
      "Rotational program across embedded systems and data analytics. Shipped firmware to production HVAC controllers and built internal tooling adopted across engineering teams.",
    impact: [
      { metric: "C++", label: "embedded firmware shipped to production" },
      { metric: "100%", label: "peer-reviewed releases" },
      { metric: "Multi-team", label: "Python libraries adopted internally" },
    ],
    bullets: [
      "Implemented C++ event-handling routines for threshold alarms and mode-trigger logic in embedded firmware. Authored, tested across hardware setups, delivered through peer-reviewed releases.",
      "Developed a Python tool for Wi-Fi authentication and real-time monitoring of remote embedded controllers — automated connectivity diagnostics that previously took manual SSH sessions.",
      "Analyzed industrial sensor datasets with Python/Pandas. Generated Jupyter reports covering fault detection, edge-case validation, and client findings.",
      "Built reusable Python libraries for standardized engineering calculations — teams applied shared frameworks with project-specific configurations.",
    ],
    stack: ["C++", "Python", "Pandas", "Jupyter", "Embedded Linux", "Git"],
  },
];

/* ============================ EDUCATION ============================ */

export const EDUCATION: EducationItem[] = [
  {
    school: "University of Maryland, Baltimore County",
    degree: "M.S. Data Science",
    period: "2025 → Dec 2026",
    detail: "GPA 3.9 / 4.0",
  },
  {
    school: "Malaviya National Institute of Technology, Jaipur",
    degree: "B.Tech, Computer Science & Engineering",
    period: "2019 → 2023",
    detail: "NIT, India",
  },
];

/* ============================ PROJECTS ============================ */

export const PROJECT_FILTERS: ProjectFilter[] = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI / ML" },
];

export const PROJECTS: Project[] = [
  {
    id: "rag",
    title: "RAG Document Intelligence Engine",
    tag: "AI / ML",
    year: "2026",
    blurb:
      "Production-grade retrieval pipeline with intelligent query routing, RAGAS-evaluated quality, and zero server-side credential storage.",
    problem:
      "Naive RAG breaks on complex queries — single retrievals miss context, and most pipelines have no quality measurement loop.",
    solution:
      "Two-tier router: simple queries hit direct vector search (~400ms); complex queries trigger HyDE + cross-encoder reranking (~1300ms). Real-time SSE token streaming with per-claim source citations.",
    impact:
      "0.90 average across faithfulness, relevancy, and context recall on 16-experiment RAGAS sweep. Per-user API key architecture means zero credentials stored server-side.",
    metrics: [
      { value: "0.90", label: "RAGAS avg score" },
      { value: "16", label: "param sweep runs" },
      { value: "~400ms", label: "fast-path latency" },
      { value: "0", label: "server-side keys stored" },
    ],
    stack: [
      "Python",
      "FastAPI",
      "Next.js",
      "ChromaDB",
      "OpenAI",
      "Groq",
      "Docker",
      "AWS EC2/ECR",
    ],
    category: "ai",
    accent: "from-lime-300/20 to-lime-300/0",
    githubUrl: "https://github.com/kushalerramilli",
  },
  {
    id: "presence",
    title: "Presence — AI Confidence Companion",
    tag: "AI / ML",
    year: "2026",
    blurb:
      "Emotionally intelligent companion for people with chronic visible skin conditions. Real skin data from Perfect Corp's API → situation-specific readiness plan → AI companion that references your actual scores.",
    problem:
      "85 million Americans live with rosacea, eczema, psoriasis, or severe acne. The anxiety before a job interview or first date isn't just cosmetic — it's psychological. No tool addressed it with real data instead of generic affirmations.",
    solution:
      "Perfect Corp's YCE API returns 14 real skin metrics per scan. Those scores — redness, texture, evenness, pores, moisture — feed directly into a situation-aware LLM prompt that generates a personalized 12-minute readiness plan. The AI companion carries full scan context across every message. Studio tab shows virtual try-on and skin simulation via Perfect Corp's Makeup VTO API. All LLM calls route through TrueFoundry's AI Gateway: Groq → Gemini → OpenAI with automatic failover, visualized live on a resilience dashboard.",
    impact:
      "End-to-end deployed product: Vercel frontend + Railway backend. Real Perfect Corp API integration — not mocked. Three-provider LLM resilience demoed live with a chaos kill switch. Custom image preprocessing pipeline silently solves Perfect Corp's face-size constraint on webcam captures (centre-crop + upscale before every API call).",
    metrics: [
      { value: "14", label: "skin metrics per scan" },
      { value: "3", label: "LLM providers, auto-failover" },
      { value: "0", label: "errors on real webcam captures" },
      { value: "12min", label: "personalized readiness plan" },
    ],
    stack: [
      "Next.js 14",
      "TypeScript",
      "FastAPI",
      "Python",
      "Perfect Corp YCE API",
      "TrueFoundry",
      "Groq",
      "Gemini",
      "OpenAI",
      "Vercel",
      "Railway",
      "Framer Motion",
      "Zustand",
    ],
    category: "ai",
    accent: "from-violet-400/20 to-violet-400/0",
    githubUrl: "https://github.com/ekushal02/presence",
    liveUrl: "https://presence-xi-two.vercel.app",
  },
];

/* ============================ SKILLS ============================ */

/**
 * Proficiency levels:
 *   3 = strong, day-to-day production tool
 *   2 = comfortable, used in real projects
 *   1 = familiar, can ramp quickly
 */
export const SKILLS: SkillCategory[] = [
  {
    group: "Languages",
    icon: "Code2",
    description: "What I write daily.",
    skills: [
      { name: "Python", level: 3 },
      { name: "C++", level: 3 },
      { name: "TypeScript", level: 2 },
      { name: "JavaScript", level: 2 },
      { name: "SQL", level: 2 },
    ],
  },
  {
    group: "AI / ML",
    icon: "Brain",
    description: "Modeling & retrieval — where I live.",
    skills: [
      { name: "PyTorch", level: 3 },
      { name: "scikit-learn", level: 3 },
      { name: "LightGBM", level: 3 },
      { name: "XGBoost", level: 2 },
      { name: "RAG / HyDE", level: 3 },
      { name: "Cross-encoders", level: 2 },
      { name: "RAGAS", level: 2 },
    ],
  },
  {
    group: "Backend",
    icon: "Layers",
    description: "Where the requests actually go.",
    skills: [
      { name: "FastAPI", level: 3 },
      { name: "Node.js", level: 2 },
      { name: "Express", level: 2 },
      { name: "REST APIs", level: 3 },
      { name: "Next.js (API)", level: 2 },
    ],
  },
  {
    group: "Frontend",
    icon: "Sparkles",
    description: "Lighter side, increasingly comfortable.",
    skills: [
      { name: "React", level: 2 },
      { name: "Next.js", level: 2 },
      { name: "Tailwind", level: 2 },
      { name: "Streamlit", level: 3 },
    ],
  },
  {
    group: "Cloud / DevOps",
    icon: "Cloud",
    description: "AWS-first. Pursuing SAA next.",
    skills: [
      { name: "AWS EC2", level: 2 },
      { name: "AWS S3", level: 2 },
      { name: "AWS ECR", level: 2 },
      { name: "AWS RDS", level: 1 },
      { name: "Docker", level: 2 },
      { name: "Git", level: 3 },
    ],
  },
  {
    group: "Data / Stores",
    icon: "Database",
    description: "From vectors to relational.",
    skills: [
      { name: "ChromaDB", level: 2 },
      { name: "PostgreSQL", level: 2 },
      { name: "MySQL", level: 2 },
      { name: "Pandas", level: 3 },
      { name: "NumPy", level: 3 },
    ],
  },
];



export const RADAR_DATA: RadarPoint[] = [
  { area: "ML Modeling", v: 88 },
  { area: "Systems / C++", v: 72 },
  { area: "Backend APIs", v: 82 },
  { area: "Data Eng", v: 80 },
  { area: "Cloud / Deploy", v: 70 },
  { area: "Frontend", v: 68 },
];

/* ============================ CERTIFICATIONS ============================ */

export const CERTIFICATIONS: Certification[] = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issuedDate: "Mar 2026",
    expiresDate: "Mar 2029",
    credentialId: "2ed4e3144bdc4518bccffd41f21dc9bc",
    status: "active",
    verifyUrl: "https://aws.amazon.com/verification",
    skills: ["Cloud Concepts", "AWS Core Services", "Security", "Pricing"],
  },
  {
    name: "AWS Solutions Architect Associate",
    issuer: "Amazon Web Services",
    issuedDate: "In progress",
    status: "in-progress",
    skills: ["Architecture Design", "Resilience", "Performance", "Cost Optimization"],
  },
];

/* ============================ AI PLAYGROUND ============================ */

export const PLAYGROUND_SYSTEM = `You are KUSHAL.AI — a concise, witty assistant trained to answer questions about Kushal Erramilli, an M.S. Data Science student at UMBC and former engineer at Carrier Corporation. Be honest about what you don't know. Keep replies short (2–4 sentences max unless asked for depth). Use a confident, technical, slightly playful tone.

Key facts about Kushal:
- M.S. Data Science at UMBC (GPA 3.9), expected Dec 2026. Capstone supervised by Dr. Chaojie (Jay) Wang on household energy consumption forecasting; LightGBM was the best model (~41% improvement over naive baseline).
- B.Tech CSE from MNIT Jaipur (2023), a tier-1 NIT in India.
- 18 months at Carrier Corporation as Management Trainee (Engineering Leadership Program): C++ embedded firmware for HVAC controllers, Python tools for Wi-Fi auth/monitoring, sensor data analysis in Pandas, reusable Python libraries.
- RAG Document Intelligence Engine — FastAPI + ChromaDB, HyDE + cross-encoder reranking, 0.90 RAGAS avg, deployed on AWS EC2/ECR with Docker, per-user API key architecture (zero server-side key storage).
- Other projects: CareerCoach (Next.js + Google AI full-stack platform), Leaf Disease Detection (custom QuadNET attention CNN, +8–10% accuracy over baseline).
- Presence — AI confidence companion for people with chronic visible skin conditions (rosacea, eczema, psoriasis, severe acne). Captures face photo → Perfect Corp YCE API returns 14 real skin metrics → LLM generates situation-specific 12-min readiness plan → AI companion with full scan context. Three-provider LLM resilience via TrueFoundry gateway (Groq → Gemini → OpenAI). Custom image preprocessing pipeline to solve Perfect Corp's face-size constraint on webcam images. Deployed: Vercel + Railway. Live at presence-xi-two.vercel.app.
- Skills: Python, C++, TypeScript, SQL · PyTorch, LightGBM, scikit-learn, RAG, HyDE, RAGAS · FastAPI, Next.js, Node.js · AWS (EC2/S3/ECR/RDS), Docker · ChromaDB, PostgreSQL.
- AWS Certified Cloud Practitioner (active). Pursuing AWS Solutions Architect Associate.
- Currently exploring: LangGraph, production LLM evaluation, distributed training.
- Open to Work in AI/ML engineering, data science, and SDE roles.
- Contact: kushalerramilli202@gmail.com · 410-500-3431 · linkedin.com/in/kushalerramilli · github.com/kushalerramilli

If asked something you don't know about Kushal, say so plainly and suggest emailing him directly. Don't make things up.`;

export const PLAYGROUND_SUGGESTIONS = [
  "What's Kushal's strongest project?",
  "Explain the RAG architecture.",
  "Why hire him for AI/ML?",
  "What's he doing right now?",
];

export const PLAYGROUND_GREETING =
  "Hey — I'm KUSHAL.AI. Ask me anything about Kushal's work. Try the suggestions below, or go off-script.";
