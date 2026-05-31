export const profile = {
  name: "Pandiyarajan S",
  firstName: "Pandiyarajan",
  initials: "PS",
  title: "Senior Software Engineer",
  subtitle: "Backend · Distributed Systems · AI Platforms",
  yearsOfExperience: 5,
  location: "Chennai, India",
  availableFor: "Senior / Staff backend roles",
  email: "pandiyarajans372@gmail.com",
  workEmail: "pandiyarajan.s@entropik.io",
  phone: "+91 6382320439",
  resumeUrl: "/Pandiyarajan_S_International_Resume.pdf",
  tagline:
    "I architect resilient backend platforms — from enterprise PKI automation to AI-assisted research pipelines.",
  summary:
    "Senior Software Engineer with 5+ years building production systems trusted by enterprise customers across the US, UK, and Singapore. I design backend platforms in Python (Django, DRF, FastAPI, Flask), ship them to PostgreSQL, MongoDB, AWS, and Kubernetes, and pair them with React/TypeScript frontends. My work has shipped behind Fortune-500 PKI estates, AI moderated-interview pipelines, and 100+ workflow automations powering certificate lifecycle, F5 load balancing, DNS, and firewall fleets.",
  shortBio:
    "I architect resilient backend systems and AI platforms. Currently a Senior Software Engineer at Entropik — previously shipped enterprise PKI automation at AppViewX.",
  socials: {
    github: "https://github.com/pandiuser",
    linkedin: "https://www.linkedin.com/in/pandiyarajans/",
    email: "mailto:pandiyarajans372@gmail.com",
    twitter: null as string | null,
  },
  metrics: [
    { label: "Years of experience", value: "5+" },
    { label: "Production workflows shipped", value: "100+" },
    { label: "Enterprise clients served", value: "30+" },
    { label: "Productivity uplift delivered", value: "67%" },
  ],
  industries: [
    "Enterprise Security / PKI",
    "AI & Research Tooling",
    "Cloud Communications (UCaaS/CCaaS)",
    "DevOps Automation",
  ],
  highlights: [
    "Architected a Django-based Certificate Lifecycle Management platform that boosted ops productivity by 67%.",
    "Shipped 100+ Python workflows integrating CAs, F5, DNS, and firewall vendors at AppViewX.",
    "Engineered an AI-assisted moderated-interview pipeline at Entropik, eliminating manual review overhead.",
    "Built and open-sourced an internal Python SDK that reduced API failures across the org.",
  ],
} as const;
