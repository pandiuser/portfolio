export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  year: string;
  category: "Platform" | "AI / ML" | "Microservices" | "Developer Tools" | "Web App";
  featured: boolean;
  architecture: string;
  challenges: string[];
  solutions: string[];
  impact: { label: string; metric?: string }[];
  technologies: string[];
  links: {
    github?: string;
    demo?: string;
    caseStudy?: string;
  };
};

export const projects: Project[] = [
  {
    id: "clm-platform",
    title: "Certificate Lifecycle Management Platform",
    tagline: "Enterprise PKI automation trusted by Fortune-500 customers.",
    description:
      "The flagship Django platform powering AppViewX CLM — automating certificate discovery, issuance, renewal, and revocation across heterogeneous PKI estates spanning DigiCert, Sectigo, Microsoft ADCS, F5, Infoblox, and Palo Alto.",
    role: "Backend Engineer · Workflow Architect",
    year: "2022–2025",
    category: "Platform",
    featured: true,
    architecture:
      "Django + DRF REST API, Celery + Redis for long-running PKI workflows, PostgreSQL for state, MongoDB for high-volume telemetry, AWS S3 for artifact storage, and a vendor-adapter layer that abstracts CA/LB/DNS/firewall integrations behind a single workflow contract.",
    challenges: [
      "Each CA, load balancer, DNS, and firewall vendor exposes a different API shape and authentication model — workflows had to remain idempotent across all of them.",
      "Customers required strict audit trails and compliance for every certificate operation.",
      "Workflows had to retry safely under network partitions without double-issuing certificates.",
    ],
    solutions: [
      "Designed an adapter pattern that normalizes vendor APIs behind a clean Python interface, so workflow code stays vendor-agnostic.",
      "Built an idempotent workflow engine with retry, exponential backoff, and circuit-breaker semantics.",
      "Added structured audit logging tied to each workflow run for compliance and incident review.",
    ],
    impact: [
      { label: "Operational productivity uplift", metric: "+67%" },
      { label: "Production workflows shipped", metric: "100+" },
      { label: "Enterprise customers served", metric: "30+" },
    ],
    technologies: [
      "Python",
      "Django",
      "DRF",
      "Celery",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "AWS",
      "Docker",
      "F5 iControl",
    ],
    links: {},
  },
  {
    id: "ai-interview-insights",
    title: "AI-Assisted Moderated Interview Pipeline",
    tagline: "Turning qualitative research sessions into structured insights — automatically.",
    description:
      "A FastAPI pipeline that ingests moderated user-interview sessions and produces structured, citation-backed insights using LLMs — replacing manual research-ops moderation while keeping a human-review fallback.",
    role: "Senior Backend Engineer",
    year: "2025–Present",
    category: "AI / ML",
    featured: true,
    architecture:
      "FastAPI control plane, async worker tier on Celery + Redis, S3 for raw transcripts, PostgreSQL for insight metadata, and an LLM orchestration layer with caching and batch summarization.",
    challenges: [
      "Insight quality had to be high enough to replace human moderators.",
      "Per-session LLM cost and latency had to stay within strict budgets.",
      "The system had to gracefully degrade to human review on low-confidence outputs.",
    ],
    solutions: [
      "Hybrid pipeline: deterministic transcript preprocessing → LLM extraction → confidence scoring → human-review fallback.",
      "Aggressive prompt + response caching at the segment level; batched summarization for long sessions.",
      "Structured output validation with Pydantic schemas, so downstream consumers can rely on shape.",
    ],
    impact: [
      { label: "Manual moderation overhead eliminated", metric: "100%" },
      { label: "Per-session cost reduction" },
      { label: "Insights delivered in minutes vs hours" },
    ],
    technologies: ["Python", "FastAPI", "PostgreSQL", "Redis", "Celery", "LLMs", "AWS S3"],
    links: {},
  },
  {
    id: "f5-provisioner",
    title: "F5 LTM Provisioning Microservice",
    tagline: "Idempotent, container-native automation for F5 load balancers.",
    description:
      "A containerized Flask microservice that automates F5 LTM object provisioning — virtual servers, pools, nodes, and monitors — exposing a clean REST surface to upstream CLM workflows.",
    role: "Backend Engineer",
    year: "2023–2024",
    category: "Microservices",
    featured: true,
    architecture:
      "Flask + Gunicorn behind Nginx, F5 iControl REST as the south-bound interface, PostgreSQL state store, and Docker images deployed via the customer's Kubernetes cluster.",
    challenges: [
      "F5 state could drift between API calls due to shared customer access.",
      "Failed provisioning runs had to roll back partial changes cleanly.",
    ],
    solutions: [
      "Optimistic locking + idempotency keys on every provisioning request.",
      "Transactional rollback strategy that walks back partial object creation if any sub-step fails.",
    ],
    impact: [
      { label: "Provisioning errors reduced" },
      { label: "Deployment velocity accelerated" },
    ],
    technologies: ["Python", "Flask", "Docker", "Kubernetes", "PostgreSQL", "F5 iControl REST"],
    links: {},
  },
  {
    id: "portfolio",
    title: "Full-Stack Portfolio Platform",
    tagline: "This site — React 19 + Django REST, fully containerized.",
    description:
      "Production-grade portfolio with a React 19 + TypeScript frontend and a Django REST backend behind Nginx, fully containerized with Docker. JWT-protected admin APIs, drf-spectacular OpenAPI docs, and analytics endpoints baked in.",
    role: "Full-Stack Engineer",
    year: "2026",
    category: "Web App",
    featured: true,
    architecture:
      "React 19 + Vite + Tailwind + Framer Motion frontend, Django + DRF + PostgreSQL backend, JWT auth via SimpleJWT, Nginx reverse proxy, Dockerized end-to-end.",
    challenges: [
      "Premium feel without sacrificing Lighthouse scores.",
      "Backend had to be production-real, not a stub.",
    ],
    solutions: [
      "Code-split bundles, lazy-loaded sections, animation-budget-aware Framer Motion usage.",
      "Real Django models for Contact, Analytics, Skills, Projects, Experience — with admin and OpenAPI docs.",
    ],
    impact: [
      { label: "Lighthouse performance target", metric: "95+" },
      { label: "WCAG AA accessible" },
    ],
    technologies: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "Django",
      "DRF",
      "PostgreSQL",
      "Docker",
      "Nginx",
    ],
    links: {
      github: "https://github.com/pandiyarajans/portfolio",
      demo: "https://pandiyarajan-portfolio.vercel.app",
    },
  },
  {
    id: "ticket-system",
    title: "Django Ticket Management with Sentiment Triage",
    tagline: "JWT-secured ticketing with NLP-powered urgency scoring.",
    description:
      "A Django + DRF ticketing system that triages incoming tickets by running sentiment analysis on the description — letting agents focus on high-urgency conversations first.",
    role: "Full-Stack Engineer",
    year: "2024",
    category: "Web App",
    featured: false,
    architecture:
      "Django + DRF API, JWT (SimpleJWT) auth, server-rendered Django UI for agents, and a sentiment-scoring pipeline on ticket creation.",
    challenges: [
      "Reliable sentiment scoring on short, noisy ticket descriptions.",
      "Clean auth model for agents vs. end-users.",
    ],
    solutions: [
      "Lightweight pretrained model with heuristics for domain-specific keywords.",
      "Role-based permissions on every DRF view with JWT auth.",
    ],
    impact: [
      { label: "Agent triage time reduced" },
    ],
    technologies: ["Python", "Django", "DRF", "JWT", "NLP", "PostgreSQL"],
    links: {},
  },
  {
    id: "jarviz",
    title: "Jarviz — Conversational Data Assistant",
    tagline: "An NLU-driven chatbot that visualizes data on demand.",
    description:
      "A conversational AI chatbot with a structured NLU layer, designed for both technical and non-technical users — capable of returning data in charts, tables, and natural-language summaries.",
    role: "Backend Engineer · ML",
    year: "2024",
    category: "AI / ML",
    featured: false,
    architecture:
      "Python NLU pipeline with intent detection + NER, a visualization layer that renders charts based on detected intent, and a pluggable data-source adapter.",
    challenges: [
      "Disambiguating user intent across domain vocabulary.",
      "Choosing the right visualization for each intent.",
    ],
    solutions: [
      "Two-stage NLU: rule-based + statistical intent classification.",
      "Intent → visualization mapping with fallbacks to tabular display.",
    ],
    impact: [
      { label: "Improved end-user query resolution" },
    ],
    technologies: ["Python", "NLP", "NER", "spaCy", "Chart.js"],
    links: {},
  },
];
