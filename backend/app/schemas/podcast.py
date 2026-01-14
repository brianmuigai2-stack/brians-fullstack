from pydantic import BaseModel, Field, HttpUrl
from typing import Optional
from datetime import datetime
from .category import CategoryOut

class PodcastBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    audio_url: str = Field(..., description="URL to the audio file")
    cover_image_url: Optional[HttpUrl] = None
    duration_seconds: Optional[int] = None

class PodcastCreate(PodcastBase):
    category_id: int

class PodcastUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category_id: Optional[int] = None
    cover_image_url: Optional[HttpUrl] = None

class PodcastOut(PodcastBase):
    id: int
    listen_count: int
    category: CategoryOut
    owner_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True