# models/user.py
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from models.relations import ViewedRelation, LikedRelation, RatedRelation, PurchasedRelation
class UserBase(BaseModel):
    id: str
    name: str
    email: EmailStr

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str  # пароль хранится в хэше (bcrypt)
class UserLogin(BaseModel):
    email: EmailStr
    password: str  # пароль хранится в хэше (bcrypt)

class UserResponse(UserBase):
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class UpdateProfile(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    password: str | None = None


class UserHistoryResponse(BaseModel):
    viewed: List[ViewedRelation] = []
    liked: List[LikedRelation] = []
    rated: List[RatedRelation] = []
    purchased: List[PurchasedRelation] = []



