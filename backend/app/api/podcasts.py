from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional

from app import crud, schemas
from app.dependencies import get_current_active_user, get_db
from app.models.user import User

router = APIRouter(tags=["podcasts"])


@router.get("/", response_model=List[schemas.PodcastOut])
def list_podcasts(
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db),
):
    return crud.get_podcasts(db, skip=skip, limit=limit)


@router.get("/{podcast_id}", response_model=schemas.PodcastOut)
def get_podcast_detail(
    podcast_id: int,
    db: Session = Depends(get_db),
):
    podcast = crud.get_podcast(db, podcast_id)
    if not podcast:
        raise HTTPException(404, "Podcast not found")
    return podcast


@router.post("/", response_model=schemas.PodcastOut, status_code=201)
def create_podcast(
    title: str = Form(...),
    description: Optional[str] = Form(None),
    category_id: int = Form(...),
    audio_file: UploadFile = File(...),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    # In real app: save file → get URL (local / S3 / Cloudinary)
    # For now we fake it
    audio_url = f"/uploads/{audio_file.filename}"

    podcast_create = schemas.PodcastCreate(
        title=title,
        description=description,
        category_id=category_id,
        audio_url=audio_url,
    )

    return crud.create_podcast(db, podcast_create, owner_id=current_user.id)


@router.put("/{podcast_id}", response_model=schemas.PodcastOut)
def update_podcast(
    podcast_id: int,
    update_data: schemas.PodcastUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    podcast = crud.get_podcast(db, podcast_id)
    if not podcast:
        raise HTTPException(404, "Podcast not found")
    if podcast.owner_id != current_user.id:
        raise HTTPException(403, "Not authorized")
    return crud.update_podcast(db, podcast_id, update_data)