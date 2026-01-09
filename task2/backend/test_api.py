"""
Simple test script for the API
Run this after starting the backend server
"""
import requests
import json

API_URL = "http://localhost:8000"

def test_submit_review():
    """Test submitting a review"""
    print("Testing review submission...")
    response = requests.post(
        f"{API_URL}/api/submit-review",
        json={
            "rating": 5,
            "review_text": "This is a test review. The service was excellent!"
        }
    )
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    return response.json()

def test_get_reviews():
    """Test getting all reviews"""
    print("\nTesting get reviews...")
    response = requests.get(f"{API_URL}/api/reviews")
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Total reviews: {data['total']}")
    print(f"Reviews returned: {len(data['reviews'])}")
    if data['reviews']:
        print(f"First review: {json.dumps(data['reviews'][0], indent=2)}")
    return data

def test_get_stats():
    """Test getting statistics"""
    print("\nTesting get stats...")
    response = requests.get(f"{API_URL}/api/reviews/stats")
    print(f"Status: {response.status_code}")
    print(f"Stats: {json.dumps(response.json(), indent=2)}")
    return response.json()

if __name__ == "__main__":
    try:
        # Test API is running
        response = requests.get(f"{API_URL}/")
        print(f"API Status: {response.status_code}")
        print(f"Message: {response.json()}\n")
        
        # Run tests
        test_submit_review()
        test_get_reviews()
        test_get_stats()
        
        print("\n✅ All tests completed!")
    except requests.exceptions.ConnectionError:
        print("❌ Error: Could not connect to API. Make sure the backend is running on http://localhost:8000")
    except Exception as e:
        print(f"❌ Error: {e}")
