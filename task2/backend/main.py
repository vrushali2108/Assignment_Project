"""
FastAPI Backend for AI Feedback System
Handles review submissions, LLM processing, and data persistence
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # 1. Import Middleware

app = FastAPI()

# 2. Define the allowed origins
origins = [
    "https://assignment-project-lemon.vercel.app",
]

# 3. Add the middleware to your app
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)














from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from typing import List, Optional
from datetime import datetime
import os
from dotenv import load_dotenv
import google.generativeai as genai
import json
import sqlite3
from contextlib import contextmanager

load_dotenv()

app = FastAPI(title="AI Feedback System API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Gemini API
api_key = os.getenv('GEMINI_API_KEY')
if api_key:
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-pro')
else:
    print("Warning: GEMINI_API_KEY not found")
    model = None

# Database setup
DB_PATH = os.getenv('DATABASE_URL', 'reviews.db')

@contextmanager
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()

def init_db():
    """Initialize database tables"""
    with get_db() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS reviews (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                rating INTEGER NOT NULL,
                review_text TEXT NOT NULL,
                ai_response TEXT,
                ai_summary TEXT,
                ai_recommended_actions TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

init_db()

# Pydantic schemas
class ReviewSubmission(BaseModel):
    rating: int = Field(..., ge=1, le=5, description="Star rating from 1 to 5")
    review_text: str = Field(..., min_length=1, max_length=5000, description="Review text")

    @validator('review_text')
    def validate_review_text(cls, v):
        if not v or not v.strip():
            raise ValueError('Review text cannot be empty')
        return v.strip()

class ReviewResponse(BaseModel):
    id: int
    rating: int
    review_text: str
    ai_response: Optional[str]
    ai_summary: Optional[str]
    ai_recommended_actions: Optional[str]
    created_at: str

class SubmissionResponse(BaseModel):
    success: bool
    message: str
    review_id: int
    ai_response: str

class ReviewsListResponse(BaseModel):
    reviews: List[ReviewResponse]
    total: int

# LLM helper functions
def generate_ai_response(rating: int, review_text: str) -> str:
    """Generate AI response to user review"""
    if not model:
        return "Thank you for your feedback! We appreciate you taking the time to share your experience."
    
    prompt = f"""You are a friendly customer service representative responding to a customer review.

Customer Rating: {rating} out of 5 stars
Customer Review: {review_text}

Generate a brief, professional, and empathetic response (2-3 sentences) that:
- Acknowledges their feedback
- Shows appreciation for their input
- If rating is low (1-2), expresses concern and willingness to improve
- If rating is high (4-5), thanks them warmly
- If rating is medium (3), acknowledges their feedback and invites further engagement

Response:"""
    
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"Thank you for your {rating}-star review! We appreciate your feedback."

def generate_summary(rating: int, review_text: str) -> str:
    """Generate AI summary of the review"""
    if not model:
        return f"{rating}-star review: {review_text[:100]}..."
    
    prompt = f"""Summarize the following customer review in one concise sentence (max 50 words):

Rating: {rating}/5
Review: {review_text}

Summary:"""
    
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"{rating}-star review: {review_text[:100]}..."

def generate_recommended_actions(rating: int, review_text: str) -> str:
    """Generate recommended actions based on review"""
    if not model:
        if rating <= 2:
            return "Follow up with customer, investigate issues mentioned, implement improvements"
        elif rating == 3:
            return "Acknowledge feedback, identify improvement opportunities"
        else:
            return "Thank customer, share positive feedback with team"
    
    prompt = f"""Based on this customer review, suggest 2-3 specific recommended actions for the business:

Rating: {rating}/5
Review: {review_text}

Provide concise, actionable recommendations (one per line):
1."""
    
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        if rating <= 2:
            return "1. Follow up with customer\n2. Investigate issues mentioned\n3. Implement improvements"
        elif rating == 3:
            return "1. Acknowledge feedback\n2. Identify improvement opportunities"
        else:
            return "1. Thank customer\n2. Share positive feedback with team"

# API Endpoints
@app.get("/")
async def root():
    return {"message": "AI Feedback System API", "status": "running"}

@app.post("/api/submit-review", response_model=SubmissionResponse)
async def submit_review(review: ReviewSubmission):
    """Submit a new review and get AI response"""
    try:
        # Generate AI response
        ai_response = generate_ai_response(review.rating, review.review_text)
        
        # Generate summary and recommended actions (for admin dashboard)
        ai_summary = generate_summary(review.rating, review.review_text)
        ai_actions = generate_recommended_actions(review.rating, review.review_text)
        
        # Store in database
        with get_db() as conn:
            cursor = conn.execute("""
                INSERT INTO reviews (rating, review_text, ai_response, ai_summary, ai_recommended_actions)
                VALUES (?, ?, ?, ?, ?)
            """, (review.rating, review.review_text, ai_response, ai_summary, ai_actions))
            review_id = cursor.lastrowid
        
        return SubmissionResponse(
            success=True,
            message="Review submitted successfully",
            review_id=review_id,
            ai_response=ai_response
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing review: {str(e)}")

@app.get("/api/reviews", response_model=ReviewsListResponse)
async def get_reviews(skip: int = 0, limit: int = 100):
    """Get all reviews (for admin dashboard)"""
    try:
        with get_db() as conn:
            cursor = conn.execute("""
                SELECT id, rating, review_text, ai_response, ai_summary, ai_recommended_actions, created_at
                FROM reviews
                ORDER BY created_at DESC
                LIMIT ? OFFSET ?
            """, (limit, skip))
            
            rows = cursor.fetchall()
            reviews = [
                ReviewResponse(
                    id=row['id'],
                    rating=row['rating'],
                    review_text=row['review_text'],
                    ai_response=row['ai_response'],
                    ai_summary=row['ai_summary'],
                    ai_recommended_actions=row['ai_recommended_actions'],
                    created_at=row['created_at']
                )
                for row in rows
            ]
            
            # Get total count
            count_cursor = conn.execute("SELECT COUNT(*) as total FROM reviews")
            total = count_cursor.fetchone()['total']
        
        return ReviewsListResponse(reviews=reviews, total=total)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching reviews: {str(e)}")

@app.get("/api/reviews/stats")
async def get_stats():
    """Get statistics about reviews"""
    try:
        with get_db() as conn:
            # Rating distribution
            rating_cursor = conn.execute("""
                SELECT rating, COUNT(*) as count
                FROM reviews
                GROUP BY rating
                ORDER BY rating
            """)
            rating_dist = {row['rating']: row['count'] for row in rating_cursor.fetchall()}
            
            # Total count
            total_cursor = conn.execute("SELECT COUNT(*) as total FROM reviews")
            total = total_cursor.fetchone()['total']
            
            # Average rating
            avg_cursor = conn.execute("SELECT AVG(rating) as avg_rating FROM reviews")
            avg_rating = avg_cursor.fetchone()['avg_rating'] or 0
            
        return {
            "total_reviews": total,
            "average_rating": round(avg_rating, 2),
            "rating_distribution": rating_dist
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching stats: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
