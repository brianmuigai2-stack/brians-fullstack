from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app import crud, schemas, utils
from app.dependencies import get_db, create_access_token, get_current_active_user
from app.models.user import User

router = APIRouter(tags=["auth"])


@router.post("/register", response_model=schemas.UserOut, status_code=201)
def register_user(
    user_in: schemas.UserCreate,
    db: Session = Depends(get_db),
):
    print(f"Register attempt: {user_in.email}, {user_in.username}")
    if crud.get_user_by_email(db, user_in.email):
        print("Email already registered")
        raise HTTPException(status_code=400, detail="Email already registered")
    if crud.get_user_by_username(db, user_in.username):
        print("Username already taken")
        raise HTTPException(status_code=400, detail="Username already taken")

    hashed_password = utils.get_password_hash(user_in.password)
    db_user = User(
        email=user_in.email,
        username=user_in.username,
        hashed_password=hashed_password,
        full_name=user_in.full_name,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    print(f"User registered: {db_user.id}")
    return db_user


@router.post("/login", response_model=schemas.Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/forgot-password")
def forgot_password(
    request: schemas.PasswordResetRequest,
    db: Session = Depends(get_db),
):
    token = crud.create_reset_token(db, request.email)
    if token:
        reset_link = f"http://localhost:5173/reset-password?token={token}"
        print(f"Password reset link: {reset_link}")
    return {"message": "If email exists, reset link has been sent"}


@router.post("/reset-password")
def reset_password_confirm(
    request: schemas.PasswordResetConfirm,
    db: Session = Depends(get_db),
):
    user = crud.reset_password_with_token(db, request.token, request.new_password)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid or expired token")
    return {"message": "Password reset successful"}
