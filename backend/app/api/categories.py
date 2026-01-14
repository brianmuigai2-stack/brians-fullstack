from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.crud import category as crud_category
from app.schemas import category as schemas_category
from app.dependencies import get_db

router = APIRouter(tags=["categories"])


@router.get("/", response_model=List[schemas_category.CategoryOut])
def list_categories(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_category.get_categories(db, skip, limit)


@router.get("/{category_id}", response_model=schemas_category.CategoryOut)
def get_category(category_id: int, db: Session = Depends(get_db)):
    category_obj = crud_category.get_category(db, category_id)
    if not category_obj:
        raise HTTPException(404, "Category not found")
    return category_obj


@router.post("/", response_model=schemas_category.CategoryOut, status_code=201)
def create_category(category_in: schemas_category.CategoryCreate, db: Session = Depends(get_db)):
    if crud_category.get_category_by_name(db, category_in.name):
        raise HTTPException(400, "Category name already exists")
    return crud_category.create_category(db, category_in)
