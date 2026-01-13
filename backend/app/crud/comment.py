from sqlalchemy.orm import Session
from sqlalchemy import select
from .. import models, schemas


def get_comment(db, comment_id):
    return db.get(models.Comment, comment_id)


def get_comments_by_podcast(db, podcast_id, skip=0, limit=50):
    stmt = (
        select(models.Comment)
        .where(models.Comment.podcast_id == podcast_id)
        .order_by(models.Comment.created_at.desc())
        .offset(skip)
        .limit(limit)
    )
    return db.execute(stmt).scalars().all()


def create_comment(db, comment, user_id):
    # Convert pydantic model to dict in classic style
    comment_data = dict(comment.__dict__)
    comment_data['user_id'] = user_id

    db_comment = models.Comment(**comment_data)
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)

    return db_comment


def delete_comment(db, comment_id):
    comment = db.get(models.Comment, comment_id)
    if comment:
        db.delete(comment)
        db.commit()
