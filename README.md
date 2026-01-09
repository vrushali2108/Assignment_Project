# Yelp Review Rating Prediction & AI Feedback System

This project consists of two main tasks:
1. **Task 1**: Rating Prediction via Prompting - Classifying Yelp reviews using different prompting approaches
2. **Task 2**: Two-Dashboard AI Feedback System - A web-based application with User and Admin dashboards

## Project Structure

```
├── task1/                    # Task 1: Rating Prediction
│   └── rating_prediction.ipynb
├── task2/                    # Task 2: Web Application
│   ├── backend/              # FastAPI backend
│   ├── frontend/             # Next.js frontend (both dashboards)
│   └── deployment/           # Deployment configurations
├── requirements.txt
└── README.md
```

## Task 1: Rating Prediction

The notebook implements 3 different prompting approaches to classify Yelp reviews:
1. Direct Classification Prompt
2. Chain-of-Thought Prompting
3. Few-Shot Learning Prompt

Evaluation includes accuracy, JSON validity rate, and consistency metrics.

## Task 2: AI Feedback System

### User Dashboard
- Submit reviews with star ratings (1-5)
- Receive AI-generated responses
- View submission status

### Admin Dashboard
- View all submissions in real-time
- See AI-generated summaries
- Get AI-suggested recommended actions
- Analytics and filtering capabilities

### Tech Stack
- **Backend**: FastAPI (Python)
- **Frontend**: Next.js (React)
- **Database**: SQLite
- **LLM**: Gemini API / OpenRouter
- **Deployment**: Vercel (Frontend) + Render (Backend)

## Setup Instructions

### Task 1
1. Install dependencies: `pip install -r requirements.txt`
2. Download Yelp dataset from Kaggle
3. Run the notebook: `rating_prediction.ipynb`

### Task 2
1. Backend:
   ```bash
   cd task2/backend
   pip install -r requirements.txt
   python main.py
   ```

2. Frontend:
   ```bash
   cd task2/frontend
   npm install
   npm run dev
   ```

## Quick Start

### Prerequisites
- Python 3.8+
- Node.js 18+
- Gemini API key (or OpenRouter API key)

### Task 1 Setup
```bash
# Install dependencies
pip install -r requirements.txt

# Set up environment
cp task2/backend/env.example task2/backend/.env
# Edit .env and add your GEMINI_API_KEY

# Download Yelp dataset from Kaggle
# Place it as yelp_reviews.csv in task1/ directory

# Run Jupyter notebook
jupyter notebook task1/rating_prediction.ipynb
```

### Task 2 Setup

#### Backend
```bash
cd task2/backend
pip install -r requirements.txt

# Create .env file
cp env.example .env
# Edit .env and add your GEMINI_API_KEY

# Run server
python main.py
# Server runs on http://localhost:8000
```

#### Frontend
```bash
cd task2/frontend
npm install

# Create .env.local file
cp env.example .env.local
# Edit .env.local and set NEXT_PUBLIC_API_URL=http://localhost:8000

# Run development server
npm run dev
# Frontend runs on http://localhost:3000
```

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Deployment URLs (Update after deployment)
- **User Dashboard**: [Your Vercel URL]
- **Admin Dashboard**: [Your Vercel URL]/admin
- **Backend API**: [Your Render/Railway URL]

## API Documentation

Once the backend is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### API Endpoints

- `POST /api/submit-review` - Submit a new review
  - Request: `{ "rating": 1-5, "review_text": "string" }`
  - Response: `{ "success": true, "review_id": int, "ai_response": "string" }`

- `GET /api/reviews` - Get all reviews (for admin)
  - Query params: `skip`, `limit`
  - Response: `{ "reviews": [...], "total": int }`

- `GET /api/reviews/stats` - Get statistics
  - Response: `{ "total_reviews": int, "average_rating": float, "rating_distribution": {...} }`

## Project Structure Details

```
├── task1/
│   └── rating_prediction.ipynb    # Jupyter notebook with 3 prompting approaches
├── task2/
│   ├── backend/
│   │   ├── main.py                 # FastAPI application
│   │   ├── requirements.txt        # Python dependencies
│   │   └── env.example            # Environment variables template
│   ├── frontend/
│   │   ├── app/
│   │   │   ├── page.tsx            # User Dashboard
│   │   │   ├── admin/
│   │   │   │   └── page.tsx        # Admin Dashboard
│   │   │   ├── layout.tsx          # Root layout
│   │   │   └── globals.css         # Global styles
│   │   ├── package.json            # Node dependencies
│   │   ├── tsconfig.json           # TypeScript config
│   │   ├── next.config.js          # Next.js config
│   │   └── env.example             # Environment variables template
│   └── deployment/
│       ├── vercel.json             # Vercel deployment config
│       └── render.yaml             # Render deployment config
├── requirements.txt                # Task 1 dependencies
├── REPORT_TEMPLATE.md              # Report template
├── DEPLOYMENT.md                   # Deployment guide
└── README.md                       # This file
```

## Features

### Task 1 Features
- ✅ 3 different prompting approaches
- ✅ Comprehensive evaluation metrics
- ✅ JSON validity checking
- ✅ Consistency analysis
- ✅ Confusion matrices
- ✅ Comparison tables

### Task 2 Features
- ✅ User-friendly review submission interface
- ✅ Real-time AI-generated responses
- ✅ Admin dashboard with analytics
- ✅ Auto-refreshing review list
- ✅ Rating filtering
- ✅ Statistics dashboard
- ✅ AI-generated summaries
- ✅ AI-recommended actions
- ✅ Error handling and validation
- ✅ Responsive design

## Environment Variables

### Backend (.env)
```
GEMINI_API_KEY=your_api_key_here
DATABASE_URL=reviews.db
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Testing

### Test Backend API
```bash
# Start backend
cd task2/backend
python main.py

# Test submission
curl -X POST http://localhost:8000/api/submit-review \
  -H "Content-Type: application/json" \
  -d '{"rating": 5, "review_text": "Great experience!"}'

# Get reviews
curl http://localhost:8000/api/reviews
```

### Test Frontend
1. Start backend on port 8000
2. Start frontend: `cd task2/frontend && npm run dev`
3. Visit http://localhost:3000 (User Dashboard)
4. Visit http://localhost:3000/admin (Admin Dashboard)

## Troubleshooting

### Backend Issues
- **CORS errors**: Check CORS settings in `main.py`
- **API key errors**: Verify `GEMINI_API_KEY` in `.env`
- **Database errors**: Ensure write permissions for SQLite file

### Frontend Issues
- **API connection errors**: Check `NEXT_PUBLIC_API_URL` in `.env.local`
- **Build errors**: Run `npm install` again
- **Type errors**: Check TypeScript configuration

## Report

See [REPORT_TEMPLATE.md](REPORT_TEMPLATE.md) for the report template. Fill in the evaluation results after running Task 1.

## License

MIT

## Submission Checklist

- [x] Task 1 notebook with 3 prompting approaches
- [x] Task 1 evaluation and comparison
- [x] Task 2 backend API with LLM integration
- [x] Task 2 User Dashboard
- [x] Task 2 Admin Dashboard
- [x] Deployment configurations
- [x] Documentation
- [ ] Deploy User Dashboard (Vercel)
- [ ] Deploy Admin Dashboard (Vercel)
- [ ] Deploy Backend API (Render/Railway)
- [ ] Run Task 1 evaluation and fill report
- [ ] Create final report PDF
