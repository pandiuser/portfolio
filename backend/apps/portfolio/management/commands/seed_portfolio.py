"""Seed the portfolio DB with the canonical resume content.

Usage:
    python manage.py seed_portfolio              # idempotent upsert
    python manage.py seed_portfolio --reset      # wipe then re-seed
"""
from __future__ import annotations

from datetime import date

from django.core.management.base import BaseCommand

from apps.portfolio.models import (
    Achievement,
    Certification,
    Experience,
    Project,
    Skill,
    SkillCategory,
)

SKILL_CATEGORIES = [
    {
        "name": "Backend",
        "description": "API design, distributed systems, async workloads.",
        "icon": "Server",
        "order": 1,
        "skills": [
            ("Python", "expert", 5),
            ("Django", "expert", 4),
            ("DRF", "expert", 4),
            ("FastAPI", "advanced", 3),
            ("Flask", "advanced", 3),
            ("Celery", "advanced", 3),
        ],
    },
    {
        "name": "Frontend",
        "description": "Production React with TypeScript.",
        "icon": "Layout",
        "order": 2,
        "skills": [
            ("React", "advanced", 3),
            ("TypeScript", "advanced", 2),
            ("Tailwind CSS", "advanced", 2),
        ],
    },
    {
        "name": "Databases",
        "description": "Relational and document stores.",
        "icon": "Database",
        "order": 3,
        "skills": [
            ("PostgreSQL", "advanced", 4),
            ("MongoDB", "advanced", 3),
            ("Redis", "proficient", 2),
        ],
    },
    {
        "name": "Cloud",
        "description": "AWS workloads & serverless.",
        "icon": "Cloud",
        "order": 4,
        "skills": [
            ("AWS S3", "advanced", 4),
            ("AWS EC2", "advanced", 4),
            ("AWS Lambda", "proficient", 3),
            ("Linux", "advanced", 5),
        ],
    },
    {
        "name": "DevOps",
        "description": "Containers, orchestration, CI/CD.",
        "icon": "Boxes",
        "order": 5,
        "skills": [
            ("Docker", "advanced", 4),
            ("Kubernetes", "proficient", 2),
            ("Nginx", "advanced", 3),
            ("GitHub Actions", "advanced", 4),
        ],
    },
]

EXPERIENCES = [
    {
        "company": "Entropik",
        "company_url": "https://entropik.io",
        "role": "Senior Software Engineer",
        "location": "Chennai, India",
        "summary": (
            "Designing backend services for Entropik's AI-driven user-research platform. "
            "Own scalability, observability, and API design across the research-insights surface."
        ),
        "responsibilities": [
            "Lead design and implementation of backend features across the FastAPI microservices estate.",
            "Engineered an AI-assisted moderated-interview pipeline that auto-generates insights.",
            "Define service boundaries and API contracts that unblock parallel frontend/backend execution.",
            "Strengthened production observability with structured logging and runtime metrics.",
        ],
        "achievements": [
            {"label": "Manual moderation overhead eliminated", "metric": "100%"},
            {"label": "Cross-team integration time reduced"},
        ],
        "technologies": ["Python", "FastAPI", "PostgreSQL", "Redis", "AWS", "Docker", "LLMs"],
        "start_date": date(2025, 10, 1),
        "end_date": None,
        "is_current": True,
        "order": 1,
    },
    {
        "company": "Servion Global Solutions",
        "company_url": "https://servion.com",
        "role": "Software Engineer",
        "location": "Chennai, India",
        "summary": (
            "Delivered RingCentral UCaaS / CCaaS implementations for enterprise customers — "
            "owning provisioning, IVR, and post-launch support workflows."
        ),
        "responsibilities": [
            "Site provisioning, user/role/template management, IVR design, call queues, number porting, E911/ERL.",
            "Authored kickoff scripts, project documentation, and client-facing presentations.",
            "Coordinated cross-functional rollouts and post-launch hypercare.",
        ],
        "achievements": [{"label": "Onboarded enterprise customers end-to-end"}],
        "technologies": ["RingCentral", "UCaaS", "CCaaS", "IVR", "Telephony APIs"],
        "start_date": date(2025, 4, 1),
        "end_date": date(2025, 10, 1),
        "is_current": False,
        "order": 2,
    },
    {
        "company": "AppViewX",
        "company_url": "https://appviewx.com",
        "role": "Software Engineer",
        "location": "Coimbatore, India",
        "summary": (
            "Built the Python platform powering AppViewX's Certificate Lifecycle Management — "
            "automating PKI operations for Fortune-500 customers across the US, UK, and Singapore."
        ),
        "responsibilities": [
            "Architected and shipped a Django-based CLM platform automating discovery, issuance, renewal, and revocation.",
            "Authored 100+ production Python workflows integrating CAs, F5, DNS, and firewall vendors.",
            "Built and containerized Flask microservices for F5 LTM object provisioning.",
            "Designed asynchronous FastAPI services for high-throughput operations.",
            "Engineered cross-platform notification fabric (ServiceNow, JIRA, Slack, Teams, PagerDuty, BMC Remedy).",
            "Built an in-house Python SDK that stabilized deployments across the org.",
            "Shipped an NLP/NER-powered support chatbot.",
        ],
        "achievements": [
            {"label": "Operational productivity uplift on CLM", "metric": "+67%"},
            {"label": "Production Python workflows", "metric": "100+"},
            {"label": "MVP Award", "metric": "Sep 2023"},
            {"label": "Circle of Excellence", "metric": "Nov 2023"},
            {"label": "Spot Award", "metric": "Jan 2024"},
        ],
        "technologies": [
            "Python", "Django", "Flask", "FastAPI", "PostgreSQL", "MongoDB",
            "Celery", "AWS", "Docker", "Kubernetes", "F5 iControl", "NLP/NER",
        ],
        "start_date": date(2022, 2, 1),
        "end_date": date(2025, 4, 1),
        "is_current": False,
        "order": 3,
    },
]

PROJECTS = [
    {
        "title": "Certificate Lifecycle Management Platform",
        "tagline": "Enterprise PKI automation trusted by Fortune-500 customers.",
        "description": (
            "The flagship Django platform powering AppViewX CLM — automating certificate "
            "discovery, issuance, renewal, and revocation across heterogeneous PKI estates."
        ),
        "architecture": (
            "Django + DRF REST API, Celery + Redis for long-running PKI workflows, "
            "PostgreSQL for state, MongoDB for telemetry, AWS S3 for artifact storage, "
            "and a vendor-adapter layer that abstracts CA/LB/DNS/firewall integrations."
        ),
        "role": "Backend Engineer · Workflow Architect",
        "year": "2022–2025",
        "category": "platform",
        "challenges": [
            "Heterogeneous vendor APIs and auth models.",
            "Strict audit trails and compliance for every operation.",
            "Idempotent retries under network partitions without double-issuing.",
        ],
        "solutions": [
            "Adapter pattern normalizing vendor APIs behind a clean Python interface.",
            "Idempotent workflow engine with retry, backoff, and circuit-breaker semantics.",
            "Structured audit logging tied to each workflow run.",
        ],
        "impact": [
            {"label": "Operational productivity uplift", "metric": "+67%"},
            {"label": "Production workflows shipped", "metric": "100+"},
        ],
        "technologies": ["Python", "Django", "DRF", "Celery", "PostgreSQL", "MongoDB", "Redis", "AWS", "Docker"],
        "featured": True,
        "order": 1,
    },
    {
        "title": "AI-Assisted Moderated Interview Pipeline",
        "tagline": "Qualitative research sessions → structured insights, automatically.",
        "description": (
            "FastAPI pipeline that ingests moderated user-interview sessions and produces "
            "structured, citation-backed insights — eliminating manual research-ops moderation."
        ),
        "architecture": (
            "FastAPI control plane, Celery + Redis worker tier, S3 for raw transcripts, "
            "PostgreSQL for insight metadata, LLM orchestration with caching and batch summarization."
        ),
        "role": "Senior Backend Engineer",
        "year": "2025–Present",
        "category": "ai_ml",
        "challenges": [
            "Insight quality high enough to replace human moderators.",
            "Per-session LLM cost and latency budgets.",
            "Graceful degradation to human review for low-confidence outputs.",
        ],
        "solutions": [
            "Hybrid pipeline: deterministic preprocessing → LLM extraction → confidence scoring → human review fallback.",
            "Aggressive prompt + response caching; batched summarization for long sessions.",
            "Structured output validation with Pydantic schemas.",
        ],
        "impact": [
            {"label": "Manual moderation overhead eliminated", "metric": "100%"},
            {"label": "Per-session cost reduced"},
        ],
        "technologies": ["Python", "FastAPI", "PostgreSQL", "Redis", "Celery", "LLMs"],
        "featured": True,
        "order": 2,
    },
]

ACHIEVEMENTS = [
    {
        "title": "Most Valuable Player Award",
        "issuer": "AppViewX",
        "awarded_on": date(2023, 9, 1),
        "description": "Recognized for instrumental contributions to a high-impact migration program.",
        "icon": "Trophy",
        "order": 1,
    },
    {
        "title": "Circle of Excellence",
        "issuer": "AppViewX",
        "awarded_on": date(2023, 11, 1),
        "description": "Outstanding contribution to large-scale customer solutions and automation.",
        "icon": "Award",
        "order": 2,
    },
    {
        "title": "Spot Award",
        "issuer": "AppViewX",
        "awarded_on": date(2024, 1, 1),
        "description": "Strong analytical and troubleshooting skills resolving complex client issues.",
        "icon": "Sparkles",
        "order": 3,
    },
]


class Command(BaseCommand):
    help = "Seed the portfolio DB with canonical resume content."

    def add_arguments(self, parser):
        parser.add_argument(
            "--reset",
            action="store_true",
            help="Wipe portfolio tables before seeding.",
        )

    def handle(self, *args, **options):
        if options["reset"]:
            self.stdout.write(self.style.WARNING("Wiping portfolio tables…"))
            Skill.objects.all().delete()
            SkillCategory.objects.all().delete()
            Experience.objects.all().delete()
            Project.objects.all().delete()
            Achievement.objects.all().delete()
            Certification.objects.all().delete()

        self.stdout.write("Seeding skill categories…")
        for cat in SKILL_CATEGORIES:
            category, _ = SkillCategory.objects.update_or_create(
                name=cat["name"],
                defaults={
                    "description": cat["description"],
                    "icon": cat["icon"],
                    "order": cat["order"],
                },
            )
            for idx, (name, level, years) in enumerate(cat["skills"]):
                Skill.objects.update_or_create(
                    category=category,
                    name=name,
                    defaults={"level": level, "years": years, "order": idx},
                )

        self.stdout.write("Seeding experience…")
        for exp in EXPERIENCES:
            Experience.objects.update_or_create(
                company=exp["company"],
                role=exp["role"],
                start_date=exp["start_date"],
                defaults={
                    k: v for k, v in exp.items()
                    if k not in {"company", "role", "start_date"}
                },
            )

        self.stdout.write("Seeding projects…")
        for proj in PROJECTS:
            Project.objects.update_or_create(
                title=proj["title"],
                defaults={k: v for k, v in proj.items() if k != "title"},
            )

        self.stdout.write("Seeding achievements…")
        for a in ACHIEVEMENTS:
            Achievement.objects.update_or_create(
                title=a["title"],
                issuer=a["issuer"],
                defaults={k: v for k, v in a.items() if k not in {"title", "issuer"}},
            )

        self.stdout.write(self.style.SUCCESS("Portfolio seeded ✓"))
