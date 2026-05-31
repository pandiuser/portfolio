# Portfolio — Frontend

Vite + React 19 + TypeScript + Tailwind CSS + Framer Motion + shadcn-style primitives.

## Stack

- **React 19** (Vite + SWC for fast dev/build)
- **TypeScript** strict mode
- **Tailwind CSS** with custom design tokens (dark theme)
- **Framer Motion** for animations (respects `prefers-reduced-motion`)
- **React Router v7** for routing
- **TanStack Query** + **Axios** for server state
- **react-hook-form** + **Zod** for forms
- **Sonner** for toasts
- **react-helmet-async** for per-page SEO

## Architecture

```
src/
├── assets/              # images, fonts
├── components/
│   ├── ui/              # shadcn-style primitives (Button, Card, Input, …)
│   ├── common/          # cross-cutting building blocks (Section, FadeIn, …)
│   └── layout/          # Navigation, Footer
├── config/              # site config, env, constants
├── data/                # portfolio content (resume rewritten at senior level)
├── features/            # vertical slices, one folder per section
│   ├── hero/
│   ├── about/
│   ├── skills/
│   ├── experience/
│   ├── projects/
│   ├── achievements/
│   ├── education/
│   └── contact/
├── hooks/               # custom hooks (useTyping, useActiveSection, …)
├── layouts/             # (reserved for future multi-layout setups)
├── lib/                 # utils, query-client
├── pages/               # route entries (Home, NotFound)
├── services/            # API service layer (axios + endpoints)
├── types/               # shared TS types
└── utils/               # (reserved)
```

## Scripts

```bash
npm run dev          # start dev server
npm run build        # production build
npm run preview      # preview built bundle
npm run typecheck    # tsc --noEmit
```

## Env

Copy `.env.example` to `.env.local`:

```
VITE_API_URL=http://localhost:8000/api
VITE_SITE_URL=https://pandiyarajan-portfolio.vercel.app
```

## Performance & accessibility

- Code-split routes via `React.lazy`
- Manual chunking in `vite.config.ts` for vendor splits
- Animation budget aware (`useReducedMotion`)
- Semantic HTML + proper heading hierarchy
- Focus-visible rings, keyboard-friendly nav, aria labels
- Mobile-first responsive layouts
