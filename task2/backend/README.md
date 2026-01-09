# AI Feedback System - Backend

FastAPI backend for handling review submissions and LLM processing.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create `.env` file:
```
GEMINI_API_KEY=your_api_key_here
DATABASE_URL=reviews.db
```

3. Run the server:
```bash
python main.py
```

Or with uvicorn:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

- `POST /api/submit-review` - Submit a new review
- `GET /api/reviews` - Get all reviews (for admin)
- `GET /api/reviews/stats` - Get review statistics

## Deployment

### Render

1. Create a new Web Service
2. Connect your GitHub repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables:
   - `GEMINI_API_KEY`
   - `DATABASE_URL` (optional, defaults to reviews.db)

The API will be available at your Render URL.
