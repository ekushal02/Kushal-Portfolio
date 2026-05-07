export type ProfileData = {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  status: string;
  resumeHref: string;
};

export type ImpactMetric = {
  metric: string;
  label: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  impact: ImpactMetric[];
  bullets: string[];
  stack: string[];
};

export type EducationItem = {
  school: string;
  degree: string;
  period: string;
  detail: string;
};

export type ProjectMetric = {
  value: string;
  label: string;
};

export type ProjectCategory = "ai" | "data" | "fullstack" | "research" | "cloud";

export type Project = {
  id: string;
  title: string;
  tag: string;
  year: string;
  blurb: string;
  problem: string;
  solution: string;
  impact: string;
  metrics: ProjectMetric[];
  stack: string[];
  category: ProjectCategory;
  accent: string;
  githubUrl?: string;
  liveUrl?: string;
};

export type ProjectFilter = {
  key: ProjectCategory | "all";
  label: string;
};

export type ProficiencyLevel = 1 | 2 | 3;

export type Skill = {
  name: string;
  level: ProficiencyLevel;
};

export type SkillCategory = {
  group: string;
  icon: string;
  description: string;
  skills: Skill[];
};

export type RadarPoint = {
  area: string;
  v: number;
};

export type CertificationStatus = "active" | "in-progress" | "expired";

export type Certification = {
  name: string;
  issuer: string;
  issuedDate: string;
  expiresDate?: string;
  credentialId?: string;
  status: CertificationStatus;
  verifyUrl?: string;
  skills: string[];
};

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};
