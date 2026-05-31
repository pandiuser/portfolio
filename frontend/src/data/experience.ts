export type Experience = {
  id: string;
  company: string;
  companyUrl?: string;
  role: string;
  location: string;
  type: "full-time" | "contract" | "internship";
  startDate: string;
  endDate: string | null;
  summary: string;
  responsibilities: string[];
  achievements: { label: string; metric?: string }[];
  technologies: string[];
};

export const experiences: Experience[] = [
  {
    id: "entropik",
    company: "Entropik",
    companyUrl: "https://entropik.io",
    role: "Senior Software Engineer",
    location: "Chennai, India",
    type: "full-time",
    startDate: "2025-10-01",
    endDate: null,
    summary:
      "Designing backend services for Entropik's AI-driven user research and consumer-insights platform. I own scalability, observability, and API design across the research-insights surface.",
    responsibilities: [
      "Lead design and implementation of backend product features across a microservices estate using FastAPI, focusing on scalability, performance, and maintainability.",
      "Engineered an AI-assisted moderated-interview pipeline that auto-generates structured research insights, eliminating manual moderation overhead and reducing per-session cost.",
      "Define service boundaries and API contracts that enable parallel frontend/backend execution and cut integration time.",
      "Strengthened production observability with structured logging and runtime metrics, measurably reducing incident-resolution time.",
      "Partner directly with product stakeholders to scope, estimate, and ship high-priority features under tight delivery windows.",
    ],
    achievements: [
      { label: "Reduced manual moderation overhead", metric: "100%" },
      { label: "Faster cross-team integration via contract-first APIs" },
      { label: "Cut incident-resolution time with structured observability" },
    ],
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "AWS",
      "Docker",
      "LLM Orchestration",
      "Async Workers",
    ],
  },
  {
    id: "servion",
    company: "Servion Global Solutions",
    companyUrl: "https://servion.com",
    role: "Software Engineer",
    location: "Chennai, India",
    type: "full-time",
    startDate: "2025-04-01",
    endDate: "2025-10-01",
    summary:
      "Delivered RingCentral UCaaS / CCaaS implementations for enterprise customers — owning provisioning, IVR, and post-launch support workflows.",
    responsibilities: [
      "Delivered RingCentral UCaaS & CCaaS implementations: site provisioning, user/role/template management, IVR design, call queues, ring groups, number porting, and E911/ERL configuration.",
      "Authored kickoff scripts, project documentation, and client-facing presentations for enterprise customer onboarding.",
      "Coordinated cross-functional rollouts and post-launch hypercare across distributed customer teams.",
    ],
    achievements: [
      { label: "Onboarded enterprise customers end-to-end" },
      { label: "Drove hypercare for multi-region deployments" },
    ],
    technologies: [
      "RingCentral",
      "UCaaS",
      "CCaaS",
      "IVR",
      "Telephony APIs",
      "Project Documentation",
    ],
  },
  {
    id: "appviewx",
    company: "AppViewX",
    companyUrl: "https://appviewx.com",
    role: "Software Engineer",
    location: "Coimbatore, India",
    type: "full-time",
    startDate: "2022-02-01",
    endDate: "2025-04-01",
    summary:
      "Built the Python platform powering AppViewX's Certificate Lifecycle Management (CLM) — automating PKI operations for Fortune-500 customers across the US, UK, and Singapore.",
    responsibilities: [
      "Architected and shipped a Django-based Certificate Lifecycle Management (CLM) platform that automated discovery, issuance, renewal, and revocation across enterprise PKI estates.",
      "Authored 100+ production Python workflows integrating CAs (Sectigo, DigiCert, Microsoft ADCS), load balancers (F5 LTM/GTM), DNS platforms (Infoblox, BlueCat), and firewall managers (Fortinet, Palo Alto Panorama, FortiGate).",
      "Built and containerized Flask microservices for F5 LTM object provisioning (virtual servers, pools, monitors), eliminating manual configuration errors.",
      "Designed asynchronous FastAPI services for high-throughput, low-latency operations in production environments.",
      "Engineered a cross-platform notification fabric spanning ServiceNow, JIRA, Slack, MS Teams, PagerDuty, and BMC Remedy — unifying PKI and infrastructure alerting.",
      "Built an in-house Python SDK that reduced API call failures and stabilized deployments across the organization.",
      "Trained and shipped an NLP/NER-powered support chatbot, improving query resolution and reducing first-response time.",
      "Operated AWS workloads (S3, EC2, Lambda) and tuned SQL/MongoDB queries for high-volume CLM data.",
      "Partnered with Product Owners on requirements, estimation, functional specs, and on-time delivery of high-priority work orders.",
    ],
    achievements: [
      { label: "Operational productivity uplift on CLM", metric: "+67%" },
      { label: "Production Python workflows authored", metric: "100+" },
      { label: "Most Valuable Player Award", metric: "Sep 2023" },
      { label: "Circle of Excellence Award", metric: "Nov 2023" },
      { label: "Spot Award", metric: "Jan 2024" },
    ],
    technologies: [
      "Python",
      "Django",
      "Flask",
      "FastAPI",
      "PostgreSQL",
      "MongoDB",
      "Celery",
      "AWS",
      "Docker",
      "Kubernetes",
      "F5 iControl",
      "Infoblox",
      "Palo Alto",
      "ServiceNow",
      "NLP / NER",
    ],
  },
];
