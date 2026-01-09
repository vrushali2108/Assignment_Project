# Quick Start Guide

Get up and running in 5 minutes!

## Prerequisites

1. **Python 3.8+** installed
2. **Node.js 18+** installed
3. **Gemini API Key** - Get one from [Google AI Studio](https://makersuite.google.com/app/apikey)

## Step 1: Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd Project

# Install Python dependencies
pip install -r requirements.txt
```

## Step 2: Setup Backend

```bash
cd task2/backend

# Install backend dependencies
pip install -r requirements.txt

# Create .env file
cp env.example .env

# Edit .env and add your API key
# GEMINI_API_KEY=your_actual_api_key_here

# Start backend server
python main.py
```

Backend will run on `http://localhost:8000`

## Step 3: Setup Frontend

Open a new terminal:

```bash
cd task2/frontend

# Install dependencies
npm install

# Create .env.local file
cp env.example .env.local

# Edit .env.local (should already have correct URL)
# NEXT_PUBLIC_API_URL=http://localhost:8000

# Start frontend
npm run dev
```

Frontend will run on `http://localhost:3000`

## Step 4: Test the Application

1. **User Dashboard**: Open `http://localhost:3000`
   - Select a rating (1-5 stars)
   - Write a review
   - Click "Submit Review"
   - See AI response!

2. **Admin Dashboard**: Open `http://localhost:3000/admin`
   - View all submitted reviews
   - See statistics
   - Check AI summaries and recommendations

3. **API Documentation**: Open `http://localhost:8000/docs`
   - Test API endpoints
   - View schemas

## Step 5: Run Task 1 (Optional)

```bash
# Make sure you have the Yelp dataset
# Download from: https://www.kaggle.com/datasets/omkarsabnis/yelp-reviews-dataset
# Place it as: task1/yelp_reviews.csv

# Start Jupyter
jupyter notebook task1/rating_prediction.ipynb

# Run all cells
# This will evaluate 3 prompting approaches
```

## Troubleshooting

### Backend won't start
- Check if port 8000 is available
- Verify `.env` file exists and has `GEMINI_API_KEY`
- Make sure all dependencies are installed: `pip install -r requirements.txt`

### Frontend won't start
- Check if port 3000 is available
- Verify `node_modules` exists: `npm install`
- Check `.env.local` has correct `NEXT_PUBLIC_API_URL`

### API calls failing
- Make sure backend is running on port 8000
- Check browser console for CORS errors
- Verify `NEXT_PUBLIC_API_URL` in frontend `.env.local`

### No AI responses
- Verify `GEMINI_API_KEY` is set correctly in backend `.env`
- Check backend logs for API errors
- Make sure you have API quota remaining

## Next Steps

1. **Deploy Backend**: See [DEPLOYMENT.md](DEPLOYMENT.md)
2. **Deploy Frontend**: See [DEPLOYMENT.md](DEPLOYMENT.md)
3. **Run Task 1 Evaluation**: Open the notebook and run all cells
4. **Create Report**: Use [REPORT_TEMPLATE.md](REPORT_TEMPLATE.md)

## Need Help?

- Check [README.md](README.md) for detailed documentation
- See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment instructions
- Review [SUBMISSION_CHECKLIST.md](SUBMISSION_CHECKLIST.md) before submitting
