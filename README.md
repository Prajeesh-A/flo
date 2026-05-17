# Floneo Website

A production Next.js frontend and Django backend for the Floneo platform.

## Project Structure

```text
repo/
├─ app/                # Next.js frontend deployed on Netlify
├─ components/         # React components
├─ public/             # Static assets
├─ package.json        # Frontend dependencies
├─ netlify.toml        # Active frontend deployment config
├─ next.config.mjs     # Next.js configuration
└─ backend_new/        # Django backend deployed on Railway
   ├─ manage.py
   ├─ railway.toml
   ├─ floneo_backend/
   ├─ content/
   └─ requirements.txt
```

## Production Stack

- Frontend: Netlify at `https://floneo.co/`
- Backend: Railway at `https://floneo-backend-production.up.railway.app/`
- API base URL: `https://floneo-backend-production.up.railway.app/api`

## Frontend Deployment - Netlify

Netlify uses `netlify.toml`.

```toml
[build]
  command = "pnpm install --no-frozen-lockfile && pnpm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
  PNPM_VERSION = "9"
  NEXT_PUBLIC_API_URL = "https://floneo-backend-production.up.railway.app/api"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Confirm the Netlify UI environment variable `NEXT_PUBLIC_API_URL` matches the Railway API URL if it is configured in the dashboard.

## Backend Deployment - Railway

Railway uses `backend_new/railway.toml`.

Required environment variables:

```bash
DEBUG=False
SECRET_KEY=<strong-random-secret>
DATABASE_URL=<railway-postgres-url>
ALLOWED_HOSTS=floneo-backend-production.up.railway.app,.railway.app
CSRF_TRUSTED_ORIGINS=https://floneo.co,https://www.floneo.co
CORS_ALLOWED_ORIGINS=https://floneo.co,https://www.floneo.co
CORS_ALLOW_ALL_ORIGINS=False
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
```

Optional HTTPS hardening after confirming proxy behavior:

```bash
SECURE_SSL_REDIRECT=True
SECURE_HSTS_SECONDS=31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS=True
SECURE_HSTS_PRELOAD=True
```

## Local Development

Backend:

```bash
cd backend_new
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Frontend:

```bash
npm install
npm run dev
```

Create `.env.local` for local frontend work:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Verification

Before launch:

```bash
npm run build
cd backend_new
python manage.py check
python manage.py test content
```

After deployment, verify:

- `https://floneo.co/robots.txt`
- `https://floneo.co/sitemap.xml`
- Mobile homepage hamburger navigation
- Contact form save and email notification
- Newsletter subscribe and duplicate handling
- Public CMS write endpoints reject unauthenticated POST
- Admin content changes reflect on the frontend
