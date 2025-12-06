from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "postgresql://yashasvi_user:change_me@localhost:5432/yashasvi"
    
    # JWT
    JWT_SECRET: str = "replace_with_strong_value"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # SSO Configuration
    SSO_PROVIDER: Optional[str] = None
    SSO_CLIENT_ID: Optional[str] = None
    SSO_CLIENT_SECRET: Optional[str] = None
    SSO_AUTH_URL: Optional[str] = None
    SSO_TOKEN_URL: Optional[str] = None
    SSO_USERINFO_URL: Optional[str] = None
    SSO_REDIRECT_URI: str = "http://localhost/auth/callback"
    
    class Config:
        env_file = ".env"


settings = Settings()
