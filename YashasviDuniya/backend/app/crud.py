from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import Optional, List
import re
from . import models, schemas
from .auth import get_password_hash


def slugify(title: str) -> str:
    """Convert title to URL-friendly slug"""
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'[\s_]+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')


# User CRUD
def get_user(db: Session, user_id: int) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_username(db: Session, username: str) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.username == username).first()


def get_user_by_email(db: Session, email: str) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100) -> List[models.User]:
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate, is_admin: bool = False) -> models.User:
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
        full_name=user.full_name,
        is_admin=is_admin
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user_role(db: Session, user_id: int, is_admin: bool) -> Optional[models.User]:
    db_user = get_user(db, user_id)
    if db_user:
        db_user.is_admin = is_admin
        db.commit()
        db.refresh(db_user)
    return db_user


# Post CRUD
def get_post(db: Session, post_id: int) -> Optional[models.Post]:
    return db.query(models.Post).filter(models.Post.id == post_id).first()


def get_post_by_slug(db: Session, slug: str) -> Optional[models.Post]:
    return db.query(models.Post).filter(models.Post.slug == slug).first()


def get_posts(
    db: Session,
    skip: int = 0,
    limit: int = 20,
    category: Optional[str] = None,
    published_only: bool = True
) -> List[models.Post]:
    query = db.query(models.Post)
    
    if published_only:
        query = query.filter(models.Post.is_published == True)
    
    if category:
        query = query.filter(models.Post.category == category)
    
    return query.order_by(desc(models.Post.created_at)).offset(skip).limit(limit).all()


def create_post(db: Session, post: schemas.PostCreate, author_id: int) -> models.Post:
    slug = slugify(post.title)
    
    # Ensure unique slug
    existing = get_post_by_slug(db, slug)
    counter = 1
    original_slug = slug
    while existing:
        slug = f"{original_slug}-{counter}"
        existing = get_post_by_slug(db, slug)
        counter += 1
    
    db_post = models.Post(
        **post.model_dump(),
        slug=slug,
        author_id=author_id
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post


def update_post(
    db: Session,
    post_id: int,
    post_update: schemas.PostUpdate,
    user: models.User
) -> Optional[models.Post]:
    db_post = get_post(db, post_id)
    if not db_post:
        return None
    
    # Check permission: admin can edit any, users can edit their own
    if not user.is_admin and db_post.author_id != user.id:
        return None
    
    update_data = post_update.model_dump(exclude_unset=True)
    
    # Update slug if title changed
    if "title" in update_data:
        update_data["slug"] = slugify(update_data["title"])
    
    for field, value in update_data.items():
        setattr(db_post, field, value)
    
    db.commit()
    db.refresh(db_post)
    return db_post


def delete_post(db: Session, post_id: int, user: models.User) -> bool:
    db_post = get_post(db, post_id)
    if not db_post:
        return False
    
    # Check permission: admin can delete any, users can delete their own
    if not user.is_admin and db_post.author_id != user.id:
        return False
    
    db.delete(db_post)
    db.commit()
    return True


def increment_post_views(db: Session, post_id: int) -> None:
    db_post = get_post(db, post_id)
    if db_post:
        db_post.views += 1
        db.commit()
