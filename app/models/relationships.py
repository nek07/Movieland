# models/relationships.py
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ViewedRelation(BaseModel):
    movie_id: str
    count: int = 1
    lastTs: datetime = datetime.utcnow()

class LikedRelation(BaseModel):
    movie_id: str
    ts: datetime = datetime.utcnow()

class RatedRelation(BaseModel):
    movie_id: str
    rating: float
    ts: datetime = datetime.utcnow()
    
class PurchasedRelation(BaseModel):
    movie_id: str
    purchased_at: datetime = datetime.utcnow()
    price: Optional[float] = None
    status: Optional[str] = "completed"  # или "pending", "refunded"