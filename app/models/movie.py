# models/movie.py
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Movie(BaseModel):
    id: str
    movie_id: str
    posterUrl: str
    price: float
    rating: float
    synopsis: str
    title: str
    year: int

class Genre(BaseModel):
    id: str
    name: str
    
class Mood(BaseModel):
    id: str
    name: str
class Person(BaseModel):
    id: str
    name: str
class Tag(BaseModel):
    id: str
    name: str