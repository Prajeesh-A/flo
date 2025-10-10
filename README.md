# FloNeo Website

A modern business automation website built with Next.js (frontend) and Django (backend).

## 🏗️ Project Structure

```
repo/
├─ app/                # Next.js frontend (Vercel deployment)
├─ components/         # React components
├─ public/            # Static assets
├─ package.json       # Frontend dependencies
├─ next.config.mjs    # Next.js configuration
└─ backend_new/       # Django backend (Render deployment)
   ├─ manage.py
   ├─ floneo_backend/
   ├─ content/        # Django app
   ├─ requirements.txt
   └─ runtime.txt
```

## 🚀 Deployment Instructions

### Backend (Render - Django + PostgreSQL)

1. **Create PostgreSQL Database**
   - Go to Render Dashboard → "New" → "PostgreSQL"
   - Copy the External Connection string

2. **Create Web Service**
   - "New" → "Web Service" → Connect GitHub repo
   - **Root Directory**: `backend_new/`
   - **Environment**: Python
   - **Build Command**: `pip install -r requirements.txt && python manage.py collectstatic --noinput`
   - **Start Command**: `gunicorn floneo_backend.wsgi:application`

3. **Environment Variables** (Render → Web Service → Environment):
   ```
   SECRET_KEY=<generate-random-string>
   DEBUG=False
   DATABASE_URL=<postgres-connection-string>
   ALLOWED_HOSTS=<your-backend-slug>.onrender.com
   CSRF_TRUSTED_ORIGINS=https://<your-backend-slug>.onrender.com,https://<your-frontend>.vercel.app
   CORS_ALLOWED_ORIGINS=https://<your-frontend>.vercel.app,http://localhost:3000
   ```

4. **Run Migrations** (after first deploy):
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```

### Frontend (Vercel - Next.js)

1. **Connect Repository**
   - Vercel Dashboard → "New Project" → Import repo
   - **Framework**: Next.js (auto-detected)
   - **Root Directory**: repo root

2. **Environment Variables** (Project → Settings → Environment Variables):
   ```
   NEXT_PUBLIC_API_URL=https://<your-backend-slug>.onrender.com/api
   ```

3. **Deploy**
   - Click Deploy
   - Your site will be available at `https://<your-frontend>.vercel.app`

## 🔧 Local Development

### Backend Setup
```bash
cd backend_new
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend Setup
```bash
npm install
npm run dev
```

### Environment Files
- Frontend: Create `.env.local` with `NEXT_PUBLIC_API_URL=http://localhost:8000/api`
- Backend: Create `.env` based on `.env.example`

## 📝 Features

- **Content Management**: Django admin for all website content
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: shadcn/ui components with Framer Motion animations
- **API Integration**: RESTful API with Django REST Framework
- **Production Ready**: Configured for Render (backend) and Vercel (frontend)

## 🛠️ Tech Stack

**Frontend:**
- Next.js 15.2.4
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui

**Backend:**
- Django 5.0.1
- Django REST Framework
- PostgreSQL (production)
- Gunicorn
- Whitenoise
- CORS Headers

## 📞 Support

For deployment issues or questions, refer to the deployment guides above or check the respective platform documentation.
