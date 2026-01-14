from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class CommentBase(BaseModel):
    content: str = Field(..., min_length=1, description="Comment text")

class CommentCreate(CommentBase):
    podcast_id: int

class CommentOut(CommentBase):
    id: int
    podcast_id: int
    user_id: int
    created_at: datetime

    class Config:
        orm_mode = True