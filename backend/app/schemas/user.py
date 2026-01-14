from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    username: str

class UserCreate(UserBase):
    password: str = Field(..., min_length=8, description="Minimum 8 characters")
    full_name: Optional[str] = None

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None

class UserOut(UserBase):
    id: int
    full_name: Optional[str]
    is_active: bool
    created_at: datetime

class Config:
    from_attributes = True  
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"