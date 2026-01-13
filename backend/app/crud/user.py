from sqlalchemy.orm import Session
from sqlalchemy import select
from .. import models, schemas, utils

def get_user_by_email(db: Session, email: str):
    return db.execute(
        select(models.User).where(models.User.email == email)
    ).scalar_one_or_none()


def get_user_by_username(db: Session, username: str):
    return db.execute(
        select(models.User).where(models.User.username == username)
    ).scalar_one_or_none()


def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if not user:
        return None
    if not utils.verify_password(password, user.hashed_password):
        return None
    return user


def update_user(db: Session, user_id: int, user_update: schemas.UserUpdate):
    user = db.get(models.User, user_id)
    if not user:
        return None

    update_data = user_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(user, key, value)

    db.add(user)
    db.commit()
    db.refresh(user)
    return user                       