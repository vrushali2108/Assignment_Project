'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface Review {
  id: number
  rating: number
  review_text: string
  ai_response: string | null
  ai_summary: string | null
  ai_recommended_actions: string | null
  created_at: string
}

interface Stats {
  total_reviews: number
  average_rating: number
  rating_distribution: Record<number, number>
}

export default function AdminDashboard() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filterRating, setFilterRating] = useState<number | null>(null)

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/reviews`)
      setReviews(response.data.reviews)
      setError('')
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load reviews')
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/reviews/stats`)
      setStats(response.data)
    } catch (err) {
      console.error('Failed to load stats:', err)
    }
  }

  useEffect(() => {
    fetchReviews()
    fetchStats()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchReviews()
      fetchStats()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const filteredReviews = filterRating
    ? reviews.filter(r => r.rating === filterRating)
    : reviews

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '40px' }}>
        <div className="card">
          <div className="loading">Loading reviews...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      <div className="card">
        <h1 style={{ fontSize: '32px', marginBottom: '10px', color: '#333' }}>
          Admin Dashboard
        </h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          View all customer reviews and AI-generated insights
        </p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Statistics */}
        {stats && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
              color: 'white', 
              padding: '20px', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>Total Reviews</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '10px' }}>
                {stats.total_reviews}
              </div>
            </div>
            <div style={{ 
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
              color: 'white', 
              padding: '20px', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>Average Rating</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '10px' }}>
                {stats.average_rating.toFixed(1)} ⭐
              </div>
            </div>
            {Object.entries(stats.rating_distribution).map(([rating, count]) => (
              <div key={rating} style={{ 
                background: '#f8f9fa', 
                padding: '20px', 
                borderRadius: '8px',
                textAlign: 'center',
                border: '2px solid #e0e0e0'
              }}>
                <div style={{ fontSize: '14px', color: '#666' }}>{rating} Stars</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '10px', color: '#333' }}>
                  {count}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Filter */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#333' }}>
            Filter by Rating:
          </label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              className="button"
              onClick={() => setFilterRating(null)}
              style={{ 
                background: filterRating === null ? '#667eea' : '#e0e0e0',
                color: filterRating === null ? 'white' : '#333',
                padding: '8px 16px',
                fontSize: '14px'
              }}
            >
              All
            </button>
            {[1, 2, 3, 4, 5].map((r) => (
              <button
                key={r}
                onClick={() => setFilterRating(r)}
                style={{ 
                  background: filterRating === r ? '#667eea' : '#e0e0e0',
                  color: filterRating === r ? 'white' : '#333',
                  padding: '8px 16px',
                  fontSize: '14px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                {r} ⭐
              </button>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div>
          <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
            Reviews ({filteredReviews.length})
          </h2>
          
          {filteredReviews.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              No reviews found
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {filteredReviews.map((review) => (
                <div
                  key={review.id}
                  style={{
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: '20px',
                    background: 'white'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                    <div>
                      <div style={{ fontSize: '20px', marginBottom: '5px' }}>
                        {'⭐'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                        <span style={{ marginLeft: '10px', fontWeight: '600', color: '#333' }}>
                          {review.rating} {review.rating === 1 ? 'star' : 'stars'}
                        </span>
                      </div>
                      <div style={{ fontSize: '14px', color: '#999' }}>
                        {formatDate(review.created_at)}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <strong style={{ color: '#667eea' }}>Review:</strong>
                    <p style={{ marginTop: '5px', color: '#333', lineHeight: '1.6' }}>
                      {review.review_text}
                    </p>
                  </div>

                  {review.ai_summary && (
                    <div style={{ 
                      marginBottom: '15px', 
                      padding: '15px', 
                      background: '#f8f9fa', 
                      borderRadius: '8px' 
                    }}>
                      <strong style={{ color: '#667eea' }}>AI Summary:</strong>
                      <p style={{ marginTop: '5px', color: '#333' }}>
                        {review.ai_summary}
                      </p>
                    </div>
                  )}

                  {review.ai_recommended_actions && (
                    <div style={{ 
                      marginBottom: '15px', 
                      padding: '15px', 
                      background: '#e8f4f8', 
                      borderRadius: '8px' 
                    }}>
                      <strong style={{ color: '#667eea' }}>Recommended Actions:</strong>
                      <div style={{ marginTop: '5px', color: '#333', whiteSpace: 'pre-line' }}>
                        {review.ai_recommended_actions}
                      </div>
                    </div>
                  )}

                  {review.ai_response && (
                    <div style={{ 
                      padding: '15px', 
                      background: '#f0f9ff', 
                      borderRadius: '8px',
                      borderLeft: '4px solid #667eea'
                    }}>
                      <strong style={{ color: '#667eea' }}>AI Response to Customer:</strong>
                      <p style={{ marginTop: '5px', color: '#333' }}>
                        {review.ai_response}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
