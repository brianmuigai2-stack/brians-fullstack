from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..database import Base

class Podcast(Base):
    __tablename__ = "podcasts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False, index=True)
    description = Column(Text, nullable=True)
    audio_url = Column(String(500), nullable=False)          # URL or path to audio file
    cover_image_url = Column(String(500), nullable=True)
    duration_seconds = Column(Integer, nullable=True)        # optional
    listen_count = Column(Integer, default=0, nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    owner = relationship("User", back_populates="podcasts")
    category = relationship("Category", back_populates="podcasts")

    # One-to-Many: one podcast → many comments
    comments = relationship("Comment", back_populates="podcast", cascade="all, delete-orphan")