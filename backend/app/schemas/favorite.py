from pydantic import BaseModel
from typing import List
from .podcast import PodcastOut
from datetime import datetime

class FavoriteCreate(BaseModel):
    podcast_id: int

class FavoriteOut(BaseModel):
    id: int
    user_id: int
    podcast_id: int
    created_at: datetime

    class Config:
        orm_mode = True

class FavoriteList(BaseModel):
    favorites: List[PodcastOut]