from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app import crud, schemas
from app.dependencies import get_current_active_user, get_db
from app.models.user import User

router = APIRouter(tags=["favorites"])


@router.get("/", response_model=List[schemas.PodcastOut])
def get_user_favorites(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 20,
):
    return crud.get_user_favorite_podcasts(db, current_user.id, skip, limit)


@router.post("/{podcast_id}")
def add_favorite(
    podcast_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    if crud.is_podcast_favorited(db, current_user.id, podcast_id):
        raise HTTPException(400, "Already favorited")
    crud.add_favorite(db, current_user.id, podcast_id)
    return {"message": "Added to favorites"}


@router.delete("/{podcast_id}")
def remove_favorite(
    podcast_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    if not crud.is_podcast_favorited(db, current_user.id, podcast_id):
        raise HTTPException(404, "Not in favorites")
    crud.remove_favorite(db, current_user.id, podcast_id)
    return {"message": "Removed from favorites"}