# Deployment Guide

This guide explains how to deploy both the frontend and backend of the AI Feedback System.

## Prerequisites

1. GitHub account
2. Vercel account (for frontend)
3. Render account (for backend) - or use any other platform
4. Gemini API key (or OpenRouter API key)

## Step 1: Backend Deployment (Render)

1. **Push backend code to GitHub**
   - Ensure `task2/backend/` is in your repository

2. **Create Render Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Service**
   - **Name**: `ai-feedback-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `cd task2/backend && pip install -r requirements.txt`
   - **Start Command**: `cd task2/backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Root Directory**: `task2/backend`

4. **Environment Variables**
   - `GEMINI_API_KEY`: Your Gemini API key
   - `DATABASE_URL`: `reviews.db` (or leave default)

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy the service URL (e.g., `https://ai-feedback-backend.onrender.com`)

## Step 2: Frontend Deployment (Vercel)

1. **Push frontend code to GitHub**
   - Ensure `task2/frontend/` is in your repository

2. **Create Vercel Project**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository

3. **Configure Project**
   - **Framework Preset**: Next.js
   - **Root Directory**: `task2/frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

4. **Environment Variables**
   - `NEXT_PUBLIC_API_URL`: Your backend URL from Step 1
     - Example: `https://ai-feedback-backend.onrender.com`

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Copy the deployment URL (e.g., `https://ai-feedback-system.vercel.app`)

## Step 3: Update Frontend API URL

If you need to update the API URL after deployment:

1. Go to Vercel project settings
2. Navigate to "Environment Variables"
3. Update `NEXT_PUBLIC_API_URL` with your backend URL
4. Redeploy the project

## Step 4: Verify Deployment

1. **User Dashboard**
   - Visit: `https://your-frontend-url.vercel.app`
   - Test submitting a review
   - Verify AI response appears

2. **Admin Dashboard**
   - Visit: `https://your-frontend-url.vercel.app/admin`
   - Verify reviews are displayed
   - Check auto-refresh functionality
   - Verify statistics are shown

3. **Backend API**
   - Visit: `https://your-backend-url.onrender.com/docs`
   - Test API endpoints using Swagger UI

## Alternative Deployment Options

### Backend Alternatives
- **Railway**: Similar to Render, supports Python
- **Fly.io**: Good for Python apps
- **Heroku**: Requires credit card but has free tier
- **AWS/GCP/Azure**: More complex but scalable

### Frontend Alternatives
- **Netlify**: Similar to Vercel, supports Next.js
- **AWS Amplify**: For AWS ecosystem
- **Cloudflare Pages**: Fast CDN

## Troubleshooting

### Backend Issues
- **Database not persisting**: Use PostgreSQL addon on Render instead of SQLite
- **CORS errors**: Check CORS settings in `main.py`
- **API key errors**: Verify `GEMINI_API_KEY` is set correctly

### Frontend Issues
- **API calls failing**: Check `NEXT_PUBLIC_API_URL` environment variable
- **Build errors**: Ensure all dependencies are in `package.json`
- **Routing issues**: Verify Next.js routing structure

## Production Considerations

1. **Database**: Use PostgreSQL instead of SQLite for production
2. **Environment Variables**: Keep API keys secure, never commit to Git
3. **Rate Limiting**: Add rate limiting to prevent abuse
4. **Error Handling**: Implement proper error logging
5. **Monitoring**: Set up monitoring and alerts

## URLs for Submission

After deployment, provide these URLs:

- **User Dashboard URL**: `https://your-frontend-url.vercel.app`
- **Admin Dashboard URL**: `https://your-frontend-url.vercel.app/admin`
- **Backend API URL**: `https://your-backend-url.onrender.com`
