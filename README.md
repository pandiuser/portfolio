# Pandiyarajan S — Portfolio

Production-grade portfolio for a Senior Software Engineer.

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router, shadcn/ui, TanStack Query
- **Backend:** Django 5, Django REST Framework, PostgreSQL, JWT (SimpleJWT), drf-spectacular
- **Infra:** Docker / docker-compose, Nginx reverse proxy, GitHub Actions friendly

## Repo layout

```
.
├── frontend/        # Vite + React 19 + TS app (this is what gets deployed to Vercel)
├── backend/         # Django REST API (deploy to Railway / Fly / Render / your VPS)
├── DEPLOYMENT.md    # Step-by-step deployment guide
└── README.md
```

## Quick start

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local        # set VITE_API_URL if backend is running
npm run dev                       # http://localhost:5173
```

### Backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env              # set SECRET_KEY, DATABASE_URL, etc.
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver        # http://localhost:8000
```

API docs at `http://localhost:8000/api/docs/`.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deploy.
