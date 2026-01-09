# Submission Checklist

Use this checklist to ensure all deliverables are complete before submission.

## 1. GitHub Repository

- [ ] Repository is public and accessible
- [ ] All code is committed and pushed
- [ ] Repository includes:
  - [ ] `task1/rating_prediction.ipynb` (Python notebook)
  - [ ] `task2/backend/` (Backend application code)
  - [ ] `task2/frontend/` (Frontend application code)
  - [ ] Supporting files (schemas, prompts, configs)
  - [ ] `README.md` with setup instructions
  - [ ] `DEPLOYMENT.md` with deployment guide
  - [ ] `REPORT_TEMPLATE.md` or final report

## 2. Task 1 - Rating Prediction

- [ ] Notebook contains 3 different prompting approaches
- [ ] Each approach is clearly labeled and explained
- [ ] Evaluation code is implemented
- [ ] Results comparison table is generated
- [ ] Confusion matrices are created
- [ ] Discussion of results and trade-offs is included
- [ ] Evaluation run on ~200 rows (or sampled dataset)
- [ ] JSON validity checking is implemented
- [ ] Accuracy metrics are calculated

## 3. Task 2 - Web Application

### Backend
- [ ] FastAPI server is implemented
- [ ] All LLM calls are server-side only
- [ ] API endpoints are clearly defined:
  - [ ] `POST /api/submit-review`
  - [ ] `GET /api/reviews`
  - [ ] `GET /api/reviews/stats`
- [ ] JSON schemas are explicit (Pydantic models)
- [ ] Error handling is implemented
- [ ] Database persistence is working
- [ ] CORS is configured

### Frontend - User Dashboard
- [ ] Star rating selection (1-5)
- [ ] Review text input
- [ ] Form validation
- [ ] Submission functionality
- [ ] AI response display
- [ ] Success/error states
- [ ] Responsive design

### Frontend - Admin Dashboard
- [ ] List of all submissions
- [ ] User rating display
- [ ] User review display
- [ ] AI-generated summary
- [ ] AI-suggested recommended actions
- [ ] Auto-refresh functionality
- [ ] Analytics (stats, filters, counts)
- [ ] Rating filtering

## 4. Deployment

### User Dashboard
- [ ] Deployed on Vercel (or similar)
- [ ] Publicly accessible via URL
- [ ] Functional without local setup
- [ ] Environment variables configured
- [ ] API connection working

### Admin Dashboard
- [ ] Deployed on Vercel (or similar)
- [ ] Publicly accessible via URL
- [ ] Functional without local setup
- [ ] Environment variables configured
- [ ] API connection working

### Backend API
- [ ] Deployed on Render/Railway (or similar)
- [ ] Publicly accessible via URL
- [ ] Environment variables configured
- [ ] Database persistence working
- [ ] API documentation accessible (Swagger UI)

## 5. Report

- [ ] Report is in PDF format
- [ ] Report includes:
  - [ ] Overall approach
  - [ ] Design and architecture decisions
  - [ ] Prompt iterations and improvements
  - [ ] Evaluation methodology and results (Task 1)
  - [ ] System behaviour, trade-offs, and limitations (Task 2)
- [ ] Report is clear and well-structured
- [ ] All URLs are included:
  - [ ] User Dashboard URL
  - [ ] Admin Dashboard URL
  - [ ] Backend API URL (optional but recommended)

## 6. Final Submission Format

Prepare the following for submission:

```
GitHub Repository (must include the notebook):
[Your GitHub Repository URL]

Report PDF Link:
[Link to your report PDF - can be GitHub release, Google Drive, etc.]

User Dashboard URL:
[Your deployed User Dashboard URL]

Admin Dashboard URL:
[Your deployed Admin Dashboard URL]
```

## 7. Testing Checklist

Before submission, test:

- [ ] User Dashboard:
  - [ ] Can submit a review with rating 1-5
  - [ ] Can write review text
  - [ ] Receives AI response after submission
  - [ ] Shows success message
  - [ ] Handles errors gracefully

- [ ] Admin Dashboard:
  - [ ] Displays all submitted reviews
  - [ ] Shows statistics correctly
  - [ ] Auto-refreshes every 30 seconds
  - [ ] Filtering by rating works
  - [ ] Shows AI summaries
  - [ ] Shows recommended actions

- [ ] Backend API:
  - [ ] All endpoints respond correctly
  - [ ] JSON schemas are validated
  - [ ] Error handling works
  - [ ] Database persists data
  - [ ] LLM calls work (with API key)

## 8. Code Quality

- [ ] Code is well-commented
- [ ] No hardcoded API keys
- [ ] Environment variables are used
- [ ] Error messages are clear
- [ ] Code follows best practices
- [ ] No obvious bugs or issues

## 9. Documentation

- [ ] README.md is comprehensive
- [ ] Setup instructions are clear
- [ ] Deployment guide is included
- [ ] API documentation is available
- [ ] Environment variables are documented

## 10. Constraints Compliance

- [ ] NOT using Streamlit, HuggingFace Spaces, Gradio, or notebook-based apps
- [ ] Real web application (Next.js/React)
- [ ] Deployed on Vercel/Render or similar
- [ ] All LLM calls are server-side
- [ ] Clear API endpoints
- [ ] Explicit JSON schemas
- [ ] Handles edge cases (empty reviews, long reviews, failures)

---

## Quick Verification Commands

### Test Backend Locally
```bash
cd task2/backend
python main.py
# Visit http://localhost:8000/docs
```

### Test Frontend Locally
```bash
cd task2/frontend
npm run dev
# Visit http://localhost:3000
```

### Test API Endpoints
```bash
# Submit review
curl -X POST http://localhost:8000/api/submit-review \
  -H "Content-Type: application/json" \
  -d '{"rating": 5, "review_text": "Test review"}'

# Get reviews
curl http://localhost:8000/api/reviews

# Get stats
curl http://localhost:8000/api/reviews/stats
```

---

**Note**: Faster completion is viewed positively. Ensure all mandatory items are completed and deployed before submission.
