#!/bin/bash
# E2E Smoke Test Script for Yashasvi Duniya

set -e

BASE_URL="${BASE_URL:-http://localhost}"
API_URL="${API_URL:-http://localhost:8000}"

echo "🧪 Running E2E Smoke Tests for Yashasvi Duniya"
echo "================================================"
echo "Frontend URL: $BASE_URL"
echo "Backend URL: $API_URL"
echo ""

# Test 1: Health Check
echo "1️⃣ Testing Backend Health Check..."
HEALTH=$(curl -s "$API_URL/api/healthz")
if echo "$HEALTH" | grep -q "healthy"; then
    echo "   ✅ Backend is healthy"
else
    echo "   ❌ Backend health check failed"
    exit 1
fi

# Test 2: Frontend Availability
echo "2️⃣ Testing Frontend Availability..."
FRONTEND=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL")
if [ "$FRONTEND" = "200" ]; then
    echo "   ✅ Frontend is accessible"
else
    echo "   ❌ Frontend is not accessible (HTTP $FRONTEND)"
    exit 1
fi

# Test 3: Login with admin credentials
echo "3️⃣ Testing Admin Login..."
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/api/auth/login" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "username=admin&password=admin")

if echo "$LOGIN_RESPONSE" | grep -q "access_token"; then
    echo "   ✅ Admin login successful"
    ACCESS_TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4)
else
    echo "   ❌ Admin login failed"
    echo "   Response: $LOGIN_RESPONSE"
    exit 1
fi

# Test 4: Get Posts
echo "4️⃣ Testing Get Posts Endpoint..."
POSTS=$(curl -s "$API_URL/api/posts")
if echo "$POSTS" | grep -q "title"; then
    POST_COUNT=$(echo "$POSTS" | grep -o '"id":' | wc -l)
    echo "   ✅ Posts endpoint working ($POST_COUNT posts found)"
else
    echo "   ❌ Posts endpoint failed"
    exit 1
fi

# Test 5: Create a Post (authenticated)
echo "5️⃣ Testing Create Post..."
CREATE_RESPONSE=$(curl -s -X POST "$API_URL/api/posts" \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "title": "E2E Test Post",
        "summary": "This is an automated test post",
        "content": "<p>Test content for smoke test</p>",
        "category": "Tech",
        "tags": ["test", "automated"]
    }')

if echo "$CREATE_RESPONSE" | grep -q "E2E Test Post"; then
    POST_ID=$(echo "$CREATE_RESPONSE" | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
    echo "   ✅ Post created successfully (ID: $POST_ID)"
else
    echo "   ❌ Post creation failed"
    echo "   Response: $CREATE_RESPONSE"
    exit 1
fi

# Test 6: Get Single Post
echo "6️⃣ Testing Get Single Post..."
SINGLE_POST=$(curl -s "$API_URL/api/posts/$POST_ID")
if echo "$SINGLE_POST" | grep -q "E2E Test Post"; then
    echo "   ✅ Single post retrieval working"
else
    echo "   ❌ Single post retrieval failed"
    exit 1
fi

# Test 7: Update Post
echo "7️⃣ Testing Update Post..."
UPDATE_RESPONSE=$(curl -s -X PUT "$API_URL/api/posts/$POST_ID" \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "title": "E2E Test Post Updated"
    }')

if echo "$UPDATE_RESPONSE" | grep -q "Updated"; then
    echo "   ✅ Post update working"
else
    echo "   ❌ Post update failed"
    exit 1
fi

# Test 8: Delete Post
echo "8️⃣ Testing Delete Post..."
DELETE_RESPONSE=$(curl -s -X DELETE "$API_URL/api/posts/$POST_ID" \
    -H "Authorization: Bearer $ACCESS_TOKEN")

if echo "$DELETE_RESPONSE" | grep -q "deleted"; then
    echo "   ✅ Post deletion working"
else
    echo "   ❌ Post deletion failed"
    exit 1
fi

# Test 9: Admin Users Endpoint
echo "9️⃣ Testing Admin Users Endpoint..."
USERS=$(curl -s "$API_URL/api/admin/users" \
    -H "Authorization: Bearer $ACCESS_TOKEN")

if echo "$USERS" | grep -q "admin"; then
    echo "   ✅ Admin users endpoint working"
else
    echo "   ❌ Admin users endpoint failed"
    exit 1
fi

# Test 10: User Registration
echo "🔟 Testing User Registration..."
REGISTER_RESPONSE=$(curl -s -X POST "$API_URL/api/auth/register" \
    -H "Content-Type: application/json" \
    -d '{
        "username": "e2etest",
        "email": "e2e@test.com",
        "password": "testpass123",
        "full_name": "E2E Test User"
    }')

if echo "$REGISTER_RESPONSE" | grep -q "e2etest"; then
    echo "   ✅ User registration working"
else
    # User might already exist from previous test run
    if echo "$REGISTER_RESPONSE" | grep -q "already"; then
        echo "   ⚠️  User already exists (from previous test)"
    else
        echo "   ❌ User registration failed"
        echo "   Response: $REGISTER_RESPONSE"
    fi
fi

echo ""
echo "================================================"
echo "🎉 All smoke tests passed successfully!"
echo "================================================"
