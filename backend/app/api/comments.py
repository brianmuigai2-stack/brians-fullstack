from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app import crud, schemas
from app.dependencies import get_current_active_user, get_db
from app.models.user import User

router = APIRouter(tags=["comments"])


@router.get("/podcast/{podcast_id}", response_model=List[schemas.CommentOut])
def get_comments(
    podcast_id: int,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
):
    return crud.get_comments_by_podcast(db, podcast_id, skip, limit)


@router.post("/", response_model=schemas.CommentOut, status_code=201)
def add_comment(
    comment: schemas.CommentCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    return crud.create_comment(db, comment, user_id=current_user.id)


@router.delete("/{comment_id}")
def delete_comment(
    comment_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    comment = crud.get_comment(db, comment_id)
    if not comment:
        raise HTTPException(404, "Comment not found")
    if comment.user_id != current_user.id:
        raise HTTPException(403, "Not your comment")
    crud.delete_comment(db, comment_id)
    return {"message": "Comment deleted"}