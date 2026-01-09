# AI Feedback System - Frontend

Next.js application with two dashboards:
- User Dashboard: Submit reviews and receive AI responses
- Admin Dashboard: View all reviews with AI summaries and recommendations

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) for User Dashboard
5. Open [http://localhost:3000/admin](http://localhost:3000/admin) for Admin Dashboard

## Deployment

### Vercel

1. Push to GitHub
2. Import project in Vercel
3. Set environment variable: `NEXT_PUBLIC_API_URL` to your backend URL
4. Deploy

The app will be available at:
- User Dashboard: `https://your-project.vercel.app`
- Admin Dashboard: `https://your-project.vercel.app/admin`
