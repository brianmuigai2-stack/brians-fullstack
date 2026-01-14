from sqlalchemy import Column, Integer, ForeignKey, DateTime, UniqueConstraint
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..database import Base

class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    podcast_id = Column(Integer, ForeignKey("podcasts.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Prevent duplicate favorites (user can't favorite same podcast twice)
    __table_args__ = (
        UniqueConstraint("user_id", "podcast_id", name="unique_user_podcast_favorite"),
    )

    # Relationships (optional - mostly used for querying)
    user = relationship("User")
    podcast = relationship("Podcast")