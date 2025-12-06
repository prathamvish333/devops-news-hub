import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.db import Base, get_db
from app import crud, schemas

# Test database
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(autouse=True)
def setup_database():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def client():
    return TestClient(app)


@pytest.fixture
def test_user(client):
    user_data = {
        "username": "testuser",
        "email": "test@example.com",
        "password": "testpassword",
        "full_name": "Test User"
    }
    response = client.post("/api/auth/register", json=user_data)
    assert response.status_code == 200
    return user_data


@pytest.fixture
def auth_headers(client, test_user):
    response = client.post(
        "/api/auth/login",
        data={"username": test_user["username"], "password": test_user["password"]}
    )
    assert response.status_code == 200
    token = response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


class TestHealthCheck:
    def test_health_check(self, client):
        response = client.get("/api/healthz")
        assert response.status_code == 200
        assert response.json()["status"] == "healthy"


class TestAuth:
    def test_register_user(self, client):
        user_data = {
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "password123",
            "full_name": "New User"
        }
        response = client.post("/api/auth/register", json=user_data)
        assert response.status_code == 200
        assert response.json()["username"] == "newuser"
        assert response.json()["email"] == "newuser@example.com"
    
    def test_register_duplicate_username(self, client, test_user):
        user_data = {
            "username": test_user["username"],
            "email": "different@example.com",
            "password": "password123"
        }
        response = client.post("/api/auth/register", json=user_data)
        assert response.status_code == 400
    
    def test_login_success(self, client, test_user):
        response = client.post(
            "/api/auth/login",
            data={"username": test_user["username"], "password": test_user["password"]}
        )
        assert response.status_code == 200
        assert "access_token" in response.json()
        assert "refresh_token" in response.json()
    
    def test_login_wrong_password(self, client, test_user):
        response = client.post(
            "/api/auth/login",
            data={"username": test_user["username"], "password": "wrongpassword"}
        )
        assert response.status_code == 401
    
    def test_get_current_user(self, client, auth_headers):
        response = client.get("/api/auth/me", headers=auth_headers)
        assert response.status_code == 200
        assert response.json()["username"] == "testuser"


class TestPosts:
    def test_get_posts_empty(self, client):
        response = client.get("/api/posts")
        assert response.status_code == 200
        assert response.json() == []
    
    def test_create_post(self, client, auth_headers):
        post_data = {
            "title": "Test Post",
            "summary": "This is a test post",
            "content": "<p>Test content</p>",
            "category": "Tech",
            "tags": ["test", "sample"]
        }
        response = client.post("/api/posts", json=post_data, headers=auth_headers)
        assert response.status_code == 200
        assert response.json()["title"] == "Test Post"
        assert response.json()["slug"] == "test-post"
    
    def test_create_post_unauthorized(self, client):
        post_data = {
            "title": "Test Post",
            "content": "<p>Test content</p>",
            "category": "Tech"
        }
        response = client.post("/api/posts", json=post_data)
        assert response.status_code == 401
    
    def test_get_post(self, client, auth_headers):
        # Create a post first
        post_data = {
            "title": "Test Post",
            "content": "<p>Test content</p>",
            "category": "Tech"
        }
        create_response = client.post("/api/posts", json=post_data, headers=auth_headers)
        post_id = create_response.json()["id"]
        
        # Get the post
        response = client.get(f"/api/posts/{post_id}")
        assert response.status_code == 200
        assert response.json()["title"] == "Test Post"
    
    def test_update_post(self, client, auth_headers):
        # Create a post first
        post_data = {
            "title": "Original Title",
            "content": "<p>Original content</p>",
            "category": "Tech"
        }
        create_response = client.post("/api/posts", json=post_data, headers=auth_headers)
        post_id = create_response.json()["id"]
        
        # Update the post
        update_data = {"title": "Updated Title"}
        response = client.put(f"/api/posts/{post_id}", json=update_data, headers=auth_headers)
        assert response.status_code == 200
        assert response.json()["title"] == "Updated Title"
    
    def test_delete_post(self, client, auth_headers):
        # Create a post first
        post_data = {
            "title": "To Delete",
            "content": "<p>Delete me</p>",
            "category": "Tech"
        }
        create_response = client.post("/api/posts", json=post_data, headers=auth_headers)
        post_id = create_response.json()["id"]
        
        # Delete the post
        response = client.delete(f"/api/posts/{post_id}", headers=auth_headers)
        assert response.status_code == 200
        
        # Verify it's deleted
        get_response = client.get(f"/api/posts/{post_id}")
        assert get_response.status_code == 404
