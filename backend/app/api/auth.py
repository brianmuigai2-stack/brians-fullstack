# FastAPI imports
from fastapi import APIRouter, Depends, HTTPException, status
# APIRouter → create a modular router for endpoints
# Depends → inject dependencies like DB session or auth functions
# HTTPException → raise HTTP errors with status codes
# status → standard HTTP status codes

from fastapi.security import OAuth2PasswordRequestForm
# OAuth2PasswordRequestForm → FastAPI helper for login form data (username & password)

from sqlalchemy.orm import Session
# SQLAlchemy session type for database interactions

# Import project modules
from app import crud, schemas, utils
# crud → contains functions to interact with the database
# schemas → Pydantic models for request/response validation
# utils → helper functions like password hashing

from app.dependencies import get_db, create_access_token, get_current_active_user
# get_db → provides a database session
# create_access_token → generates JWT access tokens
# get_current_active_user → dependency to get the currently logged-in user

from app.models.user import User
# User → SQLAlchemy User model representing users in the database

# Create a router for authentication endpoints
router = APIRouter(tags=["auth"])


# -------------------
# REGISTER USER
# -------------------
@router.post("/register", response_model=schemas.UserOut, status_code=201)
def register_user(
    user_in: schemas.UserCreate,      # Incoming request validated against UserCreate schema
    db: Session = Depends(get_db),    # Inject database session
):
    # Log registration attempt (for debugging)
    print(f"Register attempt: {user_in.email}, {user_in.username}")

    # Check if email already exists
    if crud.get_user_by_email(db, user_in.email):
        print("Email already registered")
        raise HTTPException(status_code=400, detail="Email already registered")

    # Check if username is already taken
    if crud.get_user_by_username(db, user_in.username):
        print("Username already taken")
        raise HTTPException(status_code=400, detail="Username already taken")

    # Hash the user's password before storing
    hashed_password = utils.get_password_hash(user_in.password)

    # Create a new User instance
    db_user = User(
        email=user_in.email,
        username=user_in.username,
        hashed_password=hashed_password,
        full_name=user_in.full_name,
    )

    # Add user to database and commit
    db.add(db_user)
    db.commit()
    db.refresh(db_user)  # R_
