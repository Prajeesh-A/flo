# Deployment Fix Guide - Netlify Frontend + Railway Backend

## Active Production Stack

- Frontend: Netlify, serving `https://floneo.co/`
- Backend: Railway, serving `https://floneo-backend-production.up.railway.app/`
- Frontend API base: `https://floneo-backend-production.up.railway.app/api`

## Required Netlify Settings

The active frontend deployment uses `netlify.toml`, not `vercel.json`.

Netlify build settings should be:

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

If the Netlify UI has environment variables configured, make sure `NEXT_PUBLIC_API_URL` matches the Railway API URL above.

## Required Railway Settings

Railway backend environment variables should include:

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

Set these only after confirming the Railway proxy terminates HTTPS correctly:

```bash
SECURE_SSL_REDIRECT=True
SECURE_HSTS_SECONDS=31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS=True
SECURE_HSTS_PRELOAD=True
```

## Post-Deploy Verification

After deploying both services:

1. Open `https://floneo.co/robots.txt`; expect `200`.
2. Open `https://floneo.co/sitemap.xml`; expect `200`.
3. Open the homepage on mobile width; verify the hamburger button is visible.
4. Submit the contact form; verify `201` response, admin record, and notification email.
5. Submit newsletter once and then duplicate; expect first subscribe and duplicate handling.
6. Confirm public CMS mutation endpoints reject unauthenticated writes:
   - `POST /api/country-data/`
   - `POST /api/video-tabs/`
   - `POST /api/demo-tabs/`
7. Confirm untrusted CORS origins are not reflected.
8. Log into Django admin and verify content edits still reflect on the frontend.

## Common Issues

- If content changes do not appear, verify Netlify has the correct `NEXT_PUBLIC_API_URL` and redeploy the frontend.
- If browser requests fail with CORS, verify Railway `CORS_ALLOWED_ORIGINS` includes `https://floneo.co` and `https://www.floneo.co`.
- If admin sessions fail after secure cookie changes, confirm the backend is accessed over HTTPS and `SECURE_PROXY_SSL_HEADER` is honored.
