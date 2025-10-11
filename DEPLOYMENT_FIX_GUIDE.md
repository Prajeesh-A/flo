# 🔧 Deployment Fix Guide - Content Updates Not Appearing

## 🎯 Issues Identified

### 1. **Environment Variable Missing in Vercel**
- **Problem**: `NEXT_PUBLIC_API_URL` is not set in Vercel production environment
- **Impact**: Frontend tries to connect to `localhost:8000` instead of Render backend
- **Status**: ❌ Critical Issue

### 2. **API Connectivity Problems**
- **Problem**: Frontend cannot reach Django backend on Render
- **Impact**: All Django admin changes are invisible on the website
- **Status**: ❌ Critical Issue

### 3. **Caching Issues**
- **Problem**: SWR and browser caching may prevent fresh data from showing
- **Impact**: Even when API works, old data might be cached
- **Status**: ⚠️ Secondary Issue

## 🛠️ Step-by-Step Fix Instructions

### Step 1: Fix Vercel Environment Variables

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your project (flo)

2. **Navigate to Settings**
   - Click on your project
   - Go to "Settings" tab
   - Click "Environment Variables" in the sidebar

3. **Add Environment Variable**
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://flo-do2v.onrender.com/api`
   - **Environment**: Production (and Preview if needed)
   - Click "Save"

4. **Redeploy**
   - Go to "Deployments" tab
   - Click "..." on the latest deployment
   - Click "Redeploy"

### Step 2: Verify Render Backend Status

1. **Check Render Dashboard**
   - Visit: https://dashboard.render.com
   - Verify your Django service is running
   - Check logs for any errors

2. **Test Backend Directly**
   - Open: https://flo-do2v.onrender.com/api/hero/
   - Should return JSON data
   - If 404/500, backend needs fixing

3. **Check Environment Variables in Render**
   - Ensure `ALLOWED_HOSTS` includes your domain
   - Verify `CORS_ALLOWED_ORIGINS` includes Vercel URL
   - Check `DATABASE_URL` is set correctly

### Step 3: Clear Caches

1. **Clear Browser Cache**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or open DevTools → Network → "Disable cache"

2. **Clear SWR Cache**
   - The app will automatically fetch fresh data after environment fix

3. **Clear Vercel Cache**
   - Redeploy will clear Vercel's edge cache

### Step 4: Test the Fix

1. **Use Diagnostic Tool**
   - Open: `test-api-connectivity.html` in browser
   - Click "Test All Endpoints"
   - Verify all endpoints return success

2. **Test Django Admin Changes**
   - Make a change in Django admin (e.g., FAQ title)
   - Save the change
   - Refresh your website
   - Verify the change appears

## 🔍 Verification Checklist

- [ ] Vercel environment variable `NEXT_PUBLIC_API_URL` is set
- [ ] Render backend is running and accessible
- [ ] API endpoints return data (test with diagnostic tool)
- [ ] Django admin changes appear on website within 1-2 minutes
- [ ] SocialSection.tsx changes are visible (Features section)
- [ ] No console errors in browser DevTools

## 🚨 Common Issues and Solutions

### Issue: "Failed to fetch" errors
**Solution**: Check CORS settings in Django backend

### Issue: Changes still not appearing
**Solution**: 
1. Clear all caches
2. Wait 2-3 minutes for CDN propagation
3. Check if changes are saved in Django admin

### Issue: SocialSection changes not visible
**Solution**: 
1. Verify latest commit is deployed to Vercel
2. Check Vercel deployment logs
3. Force redeploy if needed

## 📊 Expected Results After Fix

1. **Django Admin Changes**: Should appear on website within 1-2 minutes
2. **FAQ Section**: Dynamic content from admin panel
3. **Metrics Section**: Real-time data from backend
4. **SocialSection**: Shows "Features" instead of "Services"
5. **API Connectivity**: All endpoints working in diagnostic tool

## 🔧 Technical Details

### Current Configuration
- **Frontend**: Next.js on Vercel
- **Backend**: Django on Render (https://flo-do2v.onrender.com)
- **Database**: PostgreSQL on Render
- **Caching**: SWR + Vercel Edge Cache

### API Endpoints
- Hero: `/api/hero/`
- FAQ Section: `/api/faq/`
- FAQ Items: `/api/faq-items/`
- Metrics: `/api/metrics/`

### Environment Variables Needed
```
# Vercel (Frontend)
NEXT_PUBLIC_API_URL=https://flo-do2v.onrender.com/api

# Render (Backend)
SECRET_KEY=<your-secret-key>
DEBUG=False
DATABASE_URL=<postgres-url>
ALLOWED_HOSTS=flo-do2v.onrender.com
CORS_ALLOWED_ORIGINS=https://<your-vercel-app>.vercel.app
```

## 🎯 Priority Actions

1. **IMMEDIATE**: Set Vercel environment variable
2. **IMMEDIATE**: Redeploy Vercel
3. **VERIFY**: Test with diagnostic tool
4. **CONFIRM**: Check Django admin changes appear

This should resolve all content update issues!
