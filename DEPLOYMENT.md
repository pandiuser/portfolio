# Deployment

This portfolio is split into two deploy units. The frontend is a static SPA that's happiest on Vercel/Netlify/Cloudflare Pages. The backend is a standard Django app that you can run on Railway, Fly.io, Render, or your own VPS.

```
┌──────────────────┐     HTTPS      ┌─────────────────────┐
│   Vercel SPA     │ ─────────────► │  Django API (DRF)   │
│  (frontend/dist) │   /api/*       │  + PostgreSQL       │
└──────────────────┘                └─────────────────────┘
```

## 1. Frontend — Vercel

1. Push the repo to GitHub.
2. In Vercel: **New Project → Import Git Repository**, point Root Directory at `frontend/`.
3. Framework Preset: **Vite**. Build command: `npm run build`. Output: `dist`.
4. Environment variables:

   ```
   VITE_API_URL=https://your-django-api.example.com/api
   VITE_SITE_URL=https://your-site.example.com
   ```

5. Deploy. Vercel handles caching, immutable assets, and global CDN.

### Custom domain

Vercel → Settings → Domains. Add your domain, follow the DNS instructions. Update `index.html` Open Graph + `siteConfig.url` if needed.

## 2. Backend — Railway / Fly / Render

### Railway (easiest)

1. New Project → Deploy from GitHub repo → select root `backend/`.
2. Railway will auto-detect Python; if not, add a `Procfile`:

   ```procfile
   web: gunicorn core.wsgi:application --bind 0.0.0.0:$PORT --workers 3
   release: python manage.py migrate
   ```

3. Add the Postgres plugin → it auto-injects `DATABASE_URL`.
4. Set environment variables:

   ```
   DJANGO_SETTINGS_MODULE=core.settings.prod
   DJANGO_SECRET_KEY=<long random string>
   DJANGO_ALLOWED_HOSTS=your-django-api.example.com
   CORS_ALLOWED_ORIGINS=https://your-site.example.com
   CSRF_TRUSTED_ORIGINS=https://your-site.example.com
   FRONTEND_URL=https://your-site.example.com
   JWT_SIGNING_KEY=<another long random string>
   ADMIN_NOTIFY_EMAIL=pandiyarajans372@gmail.com
   EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
   EMAIL_HOST=smtp.example.com
   EMAIL_HOST_USER=...
   EMAIL_HOST_PASSWORD=...
   ```

5. Deploy. Visit `https://<your-app>.railway.app/api/docs/` to verify.

### Fly.io

```bash
cd backend
fly launch --no-deploy   # generates fly.toml
fly secrets set DJANGO_SECRET_KEY=... JWT_SIGNING_KEY=... DATABASE_URL=...
fly deploy
```

### Render

- New Web Service → connect repo, root `backend/`.
- Build: `pip install -r requirements.txt && python manage.py collectstatic --noinput`
- Start: `gunicorn core.wsgi:application --bind 0.0.0.0:$PORT --workers 3`
- Add Render Postgres → wire `DATABASE_URL`.
- Add the same env vars listed above.

## 3. Local production preview with Docker

```bash
docker compose up --build
# frontend → http://localhost:5173
# backend  → http://localhost:8000
# db       → localhost:5432
```

Once up:

```bash
docker compose exec backend python manage.py createsuperuser
docker compose exec backend python manage.py seed_portfolio
```

## 4. Post-deploy checklist

- [ ] `https://<frontend>/` loads, hero animates, all sections render
- [ ] `POST https://<backend>/api/contact/` returns 201 with valid payload
- [ ] `GET  https://<backend>/api/docs/` shows Swagger UI
- [ ] CORS works from your real frontend origin (check Network tab)
- [ ] Email notification arrives at `ADMIN_NOTIFY_EMAIL`
- [ ] `https://<frontend>/sitemap.xml` and `/robots.txt` are reachable
- [ ] Open Graph preview renders (Slack / Twitter card validator)
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, Best Practices = 100, SEO = 100

## 5. Continuous deployment

GitHub Actions example (`.github/workflows/ci.yml`):

```yaml
name: CI
on: [push, pull_request]
jobs:
  frontend:
    runs-on: ubuntu-latest
    defaults: { run: { working-directory: frontend } }
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm, cache-dependency-path: frontend/package-lock.json }
      - run: npm ci
      - run: npm run typecheck
      - run: npm run build
  backend:
    runs-on: ubuntu-latest
    defaults: { run: { working-directory: backend } }
    services:
      postgres:
        image: postgres:16
        env: { POSTGRES_PASSWORD: postgres }
        ports: ["5432:5432"]
        options: >-
          --health-cmd pg_isready --health-interval 5s --health-retries 10
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.12", cache: pip }
      - run: pip install -r requirements.txt
      - run: python manage.py test
        env:
          DATABASE_URL: postgres://postgres:postgres@localhost:5432/postgres
          DJANGO_SECRET_KEY: ci-secret
          DJANGO_SETTINGS_MODULE: core.settings.dev
```
