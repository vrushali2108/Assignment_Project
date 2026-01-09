'use client'

import { useState } from 'react'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function UserDashboard() {
  const [rating, setRating] = useState<number>(0)
  const [reviewText, setReviewText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [aiResponse, setAiResponse] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (rating === 0) {
      setError('Please select a rating')
      return
    }
    
    if (!reviewText.trim()) {
      setError('Please write a review')
      return
    }

    setSubmitting(true)
    setError('')
    setSuccess(false)
    setAiResponse('')

    try {
      const response = await axios.post(`${API_URL}/api/submit-review`, {
        rating,
        review_text: reviewText
      })

      setSuccess(true)
      setAiResponse(response.data.ai_response)
      setReviewText('')
      setRating(0)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to submit review. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '10px', color: '#333' }}>
          Share Your Feedback
        </h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          We value your opinion! Please rate your experience and share your thoughts.
        </p>

        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#333' }}>
              Rating *
            </label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${rating >= star ? 'active' : ''}`}
                  onClick={() => setRating(star)}
                  style={{ userSelect: 'none' }}
                >
                  ★
                </span>
              ))}
            </div>
            {rating > 0 && (
              <p style={{ marginTop: '10px', color: '#666' }}>
                Selected: {rating} {rating === 1 ? 'star' : 'stars'}
              </p>
            )}
          </div>

          <div style={{ marginTop: '30px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#333' }}>
              Your Review *
            </label>
            <textarea
              className="textarea"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Tell us about your experience..."
              maxLength={5000}
            />
            <p style={{ marginTop: '5px', fontSize: '14px', color: '#999' }}>
              {reviewText.length} / 5000 characters
            </p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {success && (
            <div className="success-message">
              <strong>✓ Review submitted successfully!</strong>
              {aiResponse && (
                <div style={{ marginTop: '15px', padding: '15px', background: 'white', borderRadius: '8px' }}>
                  <strong style={{ color: '#667eea' }}>AI Response:</strong>
                  <p style={{ marginTop: '10px', color: '#333' }}>{aiResponse}</p>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            className="button"
            disabled={submitting}
            style={{ width: '100%', marginTop: '20px' }}
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  )
}
