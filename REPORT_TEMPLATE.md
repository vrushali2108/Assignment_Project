# Project Report: Yelp Review Rating Prediction & AI Feedback System

## Executive Summary

This project implements two main components:
1. **Task 1**: Rating prediction using three different prompting approaches
2. **Task 2**: A production-ready web application with User and Admin dashboards

---

## Task 1: Rating Prediction via Prompting

### Overall Approach

The task involved designing and evaluating three distinct prompting strategies to classify Yelp reviews into 1-5 star ratings. Each approach was evaluated on accuracy, JSON validity rate, and consistency.

### Design and Architecture Decisions

1. **Dataset Handling**
   - Used Yelp Reviews dataset from Kaggle
   - Sampled 200 rows for efficient evaluation
   - Implemented fallback sample data generation for testing

2. **LLM Selection**
   - Chose Google Gemini API (gemini-pro model)
   - Implemented retry logic for reliability
   - Added JSON extraction and parsing with error handling

3. **Evaluation Framework**
   - Accuracy: Percentage of correct predictions
   - JSON Validity Rate: Percentage of valid JSON responses
   - Consistency: Variance-based metric for prediction stability

### Prompting Approaches

#### Approach 1: Direct Classification
**Design**: Simple, straightforward prompt asking for direct classification.

**Prompt Structure**:
```
Classify the following Yelp review into a star rating from 1 to 5.
Review: {review_text}
Return JSON with predicted_stars and explanation.
```

**Rationale**: 
- Minimal token usage
- Fast processing
- Good baseline for comparison

**Improvements Made**:
- Added explicit JSON structure specification
- Included example format in prompt

#### Approach 2: Chain-of-Thought
**Design**: Step-by-step reasoning approach.

**Prompt Structure**:
```
Step 1: Identify positive aspects
Step 2: Identify negative aspects
Step 3: Assess overall sentiment
Step 4: Map sentiment to rating
Step 5: Consider intensity
Return JSON with predicted_stars and explanation.
```

**Rationale**:
- More transparent reasoning process
- Better handling of complex reviews
- Improved accuracy for nuanced sentiment

**Improvements Made**:
- Structured the steps clearly
- Added intensity consideration step
- Enhanced explanation requirement

#### Approach 3: Few-Shot Learning
**Design**: Provide examples before classification.

**Prompt Structure**:
```
5 examples of reviews with their ratings and explanations
Now classify: {review_text}
Return JSON with predicted_stars and explanation.
```

**Rationale**:
- Pattern recognition through examples
- Better understanding of rating criteria
- Improved consistency

**Improvements Made**:
- Selected diverse examples covering all rating levels
- Included clear explanations in examples
- Balanced positive and negative examples

### Evaluation Methodology

1. **Dataset**: 200 sampled reviews from Yelp dataset
2. **Metrics**:
   - Accuracy: Exact match with actual rating
   - JSON Validity: Successful JSON parsing rate
   - Consistency: Low variance in predictions for same rating
3. **Error Handling**: Retry logic, graceful degradation

### Results

[Results will be filled after running the notebook]

#### Comparison Table

| Approach | Accuracy | JSON Validity Rate | Consistency | Valid Responses |
|----------|----------|-------------------|-------------|-----------------|
| Direct Classification | [TBD] | [TBD] | [TBD] | [TBD] |
| Chain-of-Thought | [TBD] | [TBD] | [TBD] | [TBD] |
| Few-Shot Learning | [TBD] | [TBD] | [TBD] | [TBD] |

### Discussion of Results

[To be filled after evaluation]

**Key Findings**:
1. [Finding 1]
2. [Finding 2]
3. [Finding 3]

**Trade-offs**:
- **Direct Classification**: Fast but may miss nuances
- **Chain-of-Thought**: More accurate but slower and costlier
- **Few-Shot Learning**: Good balance but requires good examples

**Recommendations**:
Based on evaluation results, [recommendation will be added]

---

## Task 2: Two-Dashboard AI Feedback System

### Overall Approach

Built a production-ready web application with:
- **User Dashboard**: Public-facing review submission interface
- **Admin Dashboard**: Internal analytics and review management
- **Backend API**: FastAPI server with LLM integration
- **Database**: SQLite for data persistence

### Design and Architecture Decisions

#### Technology Stack

1. **Backend**: FastAPI (Python)
   - Fast and modern Python framework
   - Automatic API documentation
   - Built-in validation with Pydantic
   - Easy deployment

2. **Frontend**: Next.js (React/TypeScript)
   - Server-side rendering capabilities
   - Modern React patterns
   - Type safety with TypeScript
   - Easy deployment on Vercel

3. **Database**: SQLite
   - Simple setup
   - File-based (easy for deployment)
   - Can be upgraded to PostgreSQL for production

4. **LLM Integration**: Google Gemini API
   - Server-side only (security)
   - Handles three types of AI generation:
     - User-facing responses
     - Review summaries
     - Recommended actions

#### System Architecture

```
User Browser → Next.js Frontend → FastAPI Backend → Gemini API
                                      ↓
                                  SQLite Database
```

**Key Design Principles**:
1. **Server-side LLM calls**: All AI processing on backend
2. **Clear API boundaries**: RESTful endpoints with JSON schemas
3. **Error handling**: Graceful degradation at all levels
4. **Data persistence**: All submissions stored in database

### Prompt Iterations and Improvements

#### User Response Generation

**Initial Prompt**:
```
Respond to this {rating}-star review: {review_text}
```

**Improved Prompt**:
```
You are a friendly customer service representative.
Rating: {rating}/5
Review: {review_text}
Generate a brief, professional response (2-3 sentences) that:
- Acknowledges feedback
- Shows appreciation
- Addresses concerns if rating is low
- Thanks warmly if rating is high
```

**Improvements**:
- Added role definition
- Specified tone and length
- Included conditional logic guidance
- Better structure

#### Summary Generation

**Initial Prompt**:
```
Summarize: {review_text}
```

**Improved Prompt**:
```
Summarize the following customer review in one concise sentence (max 50 words):
Rating: {rating}/5
Review: {review_text}
```

**Improvements**:
- Added length constraint
- Included rating context
- Clearer output format

#### Recommended Actions

**Initial Prompt**:
```
What should we do about this review?
```

**Improved Prompt**:
```
Based on this customer review, suggest 2-3 specific recommended actions:
Rating: {rating}/5
Review: {review_text}
Provide concise, actionable recommendations (one per line):
```

**Improvements**:
- Specified number of actions
- Emphasized actionability
- Structured output format

### System Behavior

#### User Dashboard Flow

1. User selects rating (1-5 stars)
2. User writes review text
3. On submission:
   - Frontend validates input
   - Sends POST request to `/api/submit-review`
   - Backend generates AI response
   - Backend stores review in database
   - Frontend displays AI response to user
   - Success/error states shown clearly

#### Admin Dashboard Flow

1. Dashboard loads all reviews from `/api/reviews`
2. Statistics fetched from `/api/reviews/stats`
3. Auto-refresh every 30 seconds
4. Filtering by rating available
5. Each review displays:
   - Rating and timestamp
   - Original review text
   - AI-generated summary
   - AI-recommended actions
   - AI response to customer

### Trade-offs and Limitations

#### Trade-offs

1. **SQLite vs PostgreSQL**
   - **Chosen**: SQLite for simplicity
   - **Trade-off**: Less suitable for high concurrency
   - **Mitigation**: Can upgrade to PostgreSQL easily

2. **Client-side vs Server-side LLM calls**
   - **Chosen**: Server-side only
   - **Trade-off**: Higher backend load
   - **Benefit**: Security, API key protection

3. **Auto-refresh vs WebSockets**
   - **Chosen**: Polling every 30 seconds
   - **Trade-off**: Slight delay in updates
   - **Benefit**: Simpler implementation, works everywhere

4. **Error Handling**
   - **Chosen**: Graceful degradation
   - **Trade-off**: May show generic messages
   - **Benefit**: System remains functional

#### Limitations

1. **Rate Limiting**: No rate limiting implemented
   - Could be abused
   - Solution: Add rate limiting middleware

2. **Authentication**: No user authentication
   - Anyone can access admin dashboard
   - Solution: Add authentication/authorization

3. **Database Scaling**: SQLite not ideal for production scale
   - Limited concurrent writes
   - Solution: Migrate to PostgreSQL

4. **LLM Costs**: No cost tracking or limits
   - Could incur unexpected costs
   - Solution: Add usage monitoring and limits

5. **Input Validation**: Basic validation only
   - Could accept malicious input
   - Solution: Enhanced sanitization

6. **Error Logging**: No centralized logging
   - Difficult to debug production issues
   - Solution: Add logging service (e.g., Sentry)

### Deployment

#### Backend Deployment (Render)
- Platform: Render.com
- Runtime: Python 3
- Database: SQLite (file-based)
- Environment Variables: GEMINI_API_KEY, DATABASE_URL

#### Frontend Deployment (Vercel)
- Platform: Vercel
- Framework: Next.js
- Environment Variables: NEXT_PUBLIC_API_URL

#### Deployment URLs
- User Dashboard: [To be filled after deployment]
- Admin Dashboard: [To be filled after deployment]
- Backend API: [To be filled after deployment]

---

## Conclusion

This project successfully demonstrates:
1. Multiple prompting strategies for classification tasks
2. Production-ready web application architecture
3. Integration of LLMs into user-facing applications
4. Proper separation of concerns (frontend/backend)
5. Deployment-ready code structure

### Key Learnings

1. Prompt engineering significantly affects LLM performance
2. Server-side LLM calls are essential for security
3. Clear API schemas improve maintainability
4. Graceful error handling improves user experience
5. Auto-refresh provides good UX without complexity

### Future Improvements

1. Add user authentication
2. Implement rate limiting
3. Migrate to PostgreSQL
4. Add comprehensive logging
5. Implement caching for LLM responses
6. Add unit and integration tests
7. Implement WebSocket for real-time updates

---

## Appendix

### A. API Schemas

#### Review Submission
```json
{
  "rating": 1-5,
  "review_text": "string (1-5000 chars)"
}
```

#### Review Response
```json
{
  "id": "integer",
  "rating": 1-5,
  "review_text": "string",
  "ai_response": "string",
  "ai_summary": "string",
  "ai_recommended_actions": "string",
  "created_at": "timestamp"
}
```

### B. File Structure
```
project/
├── task1/
│   └── rating_prediction.ipynb
├── task2/
│   ├── backend/
│   │   ├── main.py
│   │   └── requirements.txt
│   ├── frontend/
│   │   ├── app/
│   │   │   ├── page.tsx (User Dashboard)
│   │   │   └── admin/page.tsx (Admin Dashboard)
│   │   └── package.json
│   └── deployment/
└── README.md
```

### C. Environment Variables

**Backend**:
- `GEMINI_API_KEY`: Google Gemini API key
- `DATABASE_URL`: Database file path

**Frontend**:
- `NEXT_PUBLIC_API_URL`: Backend API URL

---

*Report generated for AI Feedback System Project*
