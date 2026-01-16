# FastAPI imports
from fastapi import APIRouter, Depends, HTTPException
# APIRouter → for modular routing
# Depends → inject dependencies like DB session or current user
# HTTPException → raise errors with status codes

from sqlalchemy.orm import Session
# SQLAlchemy session for database operations

from typing import List
# Used for response typing → returning list of comments

# Project-specific imports
from app import crud, schemas
# crud → functions for database operations (get, create, delete comments)
# schemas → Pydantic models for request validation and response formatting

from app.dependencies import get_current_active_user, get_db
# get_current_active_user → dependency to get the logged-in user
# get_db → provides a database session

from app.models.user import User
# User model for authentication and ownership checks

# Create router for comment endpoints
router = APIRouter(tags=["comments"])


# -------------------
# GET COMMENTS FOR A PODCAST
# -------------------
@router.get("/podcast/{podcast_id}", response_model=List[schemas.CommentOut])
def get_comments(
    podcast_id: int,           # ID of the podcast to get comments for
    skip: int = 0,             # Number of comments to skip (pagination)
    limit: int = 50,           # Maximum number of comments to return
    db: Session = Depends(get_db),  # Inject DB session
):
    """
    Retrieve a list of comments for a specific podcast.
    Returns a list of CommentOut schema objects.
    """
    return crud.get_comments_by_podcast(db, podcast_id, skip, limit)


# -------------------
# ADD NEW COMMENT
# -------------------
@router.post("/", response_model=schemas.CommentOut, status_code=201)
def add_comment(
    comment: schemas.CommentCreate,                  # Input data for comment creation
    current_user: User = Depends(get_current_active_user),  # Get logged-in user
    db: Session = Depends(get_db),                  # Inject DB session
):
    """
    Create a new comment for a podcast.
    Associates the comment with the current logged-in user.
    Returns the created comment as CommentOut schema.
    """
    return crud.create_comment(db, comment, user_id=current_user.id)


# -------------------
# DELETE COMMENT
# -------------------
@router.delete("/{comment_id}")
def delete_comment(
    comment_id: int,                               # ID of the comment to delete
    current_user: User = Depends(get_current_active_user),  # Get logged-in user
    db: Session = Depends(get_db),                 # Inject DB session
):
    """
    Delete a comment by ID.
    - Only the user who created the comment can delete it.
    - Returns a confirmation message upon successful deletion.
    """
    # Fetch comment from DB
    comment = crud.get_comment(db, comment_id)
    
    # If comment does not exist, raise 404
    if not comment:
        raise HTTPException(404, "Comment not found")
    
    # If current user is not the comment owner, raise 403 Forbidden
    if comment.user_id != current_user.id:
        raise HTTPException(403, "Not your comment")
    
    # Delete comment from DB
    crud.delete_comment(db, comment_id)
    
    # Return success message
    return {"message": "Comment deleted"}
