# FastAPI imports
from fastapi import APIRouter, Depends, HTTPException
# APIRouter → create modular routes for users
# Depends → inject dependencies like DB session or current user
# HTTPException → raise errors with proper status codes

from sqlalchemy.orm import Session
# SQLAlchemy session for database operations

# Project-specific imports
from app import crud, schemas
# crud → functions for database operations on users
# schemas → Pydantic models for request validation and response formatting

from app.dependencies import get_current_active_user, get_db
# get_current_active_user → retrieves the currently logged-in user
# get_db → provides a database session

from app.models.user import User
# User model used for authentication and ownership checks

# Create router for user endpoints
router = APIRouter(tags=["users"])


# -------------------
# GET CURRENT USER
# -------------------
@router.get("/me", response_model=schemas.UserOut)
def read_current_user(
    current_user: User = Depends(get_current_active_user),  # Get logged-in user
):
    """
    Retrieve details of the currently authenticated user.
    Returns a UserOut schema object.
    """
    return current_user


# -------------------
# UPDATE CURRENT USER
# -------------------
@router.put("/me", response_model=schemas.UserOut)
def update_current_user(
    user_update: schemas.UserUpdate,                        # Validated input data for updating user
    current_user: User = Depends(get_current_active_user),  # Get logged-in user
    db: Session = Depends(get_db),                          # Inject database session
):
    """
    Update information for the currently authenticated user.
    Returns the updated user object.
    """
    return crud.update_user(db, current_user.id, user_update)


# -------------------
# RESET CURRENT USER PASSWORD
# -------------------
@router.post("/me/reset-password")
def reset_password(
    password_data: schemas.PasswordReset,                  # Validated input: current and new password
    current_user: User = Depends(get_current_active_user),  # Get logged-in user
    db: Session = Depends(get_db),                          # Inject database session
):
    from app.utils import verify_password
    # Check if current password matches the user's stored hashed password
    if not verify_password(password_data.current_password, current_user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect current password")
    
    # Update password in the database
    crud.reset_password(db, current_user.id, password_data.new_password)
    
    # Return success message
    return {"message": "Password updated successfully"}
