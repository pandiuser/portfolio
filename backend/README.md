# Portfolio — Backend

Django 5 + DRF + PostgreSQL + SimpleJWT + drf-spectacular.

## Quick start

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

cp .env.example .env

# Migrate and seed
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_portfolio        # optional: load resume content into the DB

python manage.py runserver
```

Open:
- API: http://localhost:8000/api/
- Swagger UI: http://localhost:8000/api/docs/
- Redoc: http://localhost:8000/api/redoc/
- Admin: http://localhost:8000/admin/

## Apps

| App | Purpose |
| --- | --- |
| `apps.contact` | Public contact form endpoint + admin-only listing |
| `apps.analytics` | First-party event ingestion + aggregated summaries (admin) |
| `apps.portfolio` | Skills, Experience, Projects, Achievements, Certifications |
| `apps.accounts` | Reserved for future custom user model |

## Endpoints

Public:

```
POST  /api/contact/                       # contact form submission
POST  /api/analytics/events/              # track event
GET   /api/portfolio/skills/              # skill categories (with nested skills)
GET   /api/portfolio/experience/          # experience timeline
GET   /api/portfolio/projects/            # project case studies
GET   /api/portfolio/achievements/        # awards / achievements
GET   /api/portfolio/certifications/      # certifications
```

Auth (SimpleJWT):

```
POST  /api/auth/token/                    # obtain access + refresh tokens
POST  /api/auth/token/refresh/            # refresh access token
POST  /api/auth/token/verify/             # verify a token
```

Admin (require IsAdminUser via JWT):

```
GET   /api/contact/admin/                 # list contact submissions
GET   /api/analytics/events/admin/        # list raw analytics events
GET   /api/analytics/summary/             # 30-day aggregated counters
```

OpenAPI:

```
GET   /api/schema/                        # raw OpenAPI 3.0 schema
GET   /api/docs/                          # Swagger UI
GET   /api/redoc/                         # ReDoc
```

## Tests

```bash
python manage.py test
```

## Spam protection

The contact endpoint applies three layers:

1. **Honeypot field** — a hidden form field that real users won't fill but bots will.
2. **URL cap** — rejects messages with > 3 URLs to deter link-spam.
3. **Rate limit** — DRF `ScopedRateThrottle` with `contact: 5/hour` per IP.

## Environments

- `core/settings/dev.py` — local development (DEBUG on, permissive CORS)
- `core/settings/prod.py` — production (HSTS, secure cookies, SSL redirect)

Switch via `DJANGO_SETTINGS_MODULE`.
