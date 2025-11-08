from fastapi import FastAPI, HTTPException, Query
from models.user import UserCreate, UserResponse, UserLogin, UpdateProfile
from api.user_routes import create_user, get_user_by_email, update_user
from api.movie_routes import get_all_movies,  get_movie_by_id, get_movies_by_mood, get_movies_by_mood_with_scores, get_personal_by_history_with_scores
from services.auth import hash_password, verify_password, create_access_token
import uuid
from models.movie import Movie
from typing import List, Optional


app = FastAPI(title="Movieland Auth API")

@app.post("/register", response_model=UserResponse)
def register(user: UserCreate):
    existing_user = get_user_by_email(user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_id = str(uuid.uuid4())
    hashed_pw = hash_password(user.password)
    db_user = create_user(user_id, user.name, user.email, hashed_pw)
    node = db_user["u"]
    token = create_access_token({"sub": user.email})
    return UserResponse(
        id=node["id"],
        name=node["name"],
        email=node["email"],
        created_at=node["created_at"].to_native()
    )

@app.post("/login")
async def login(user: UserLogin):
    db_user_node = get_user_by_email(user.email)
    if not db_user_node:
        raise HTTPException(status_code=404, detail="Пользователь не найден")

    hashed_password = db_user_node.get("password_hash")  # ключ именно такой, какой у тебя в Neo4j
    if not verify_password(user.password, hashed_password):
        raise HTTPException(status_code=401, detail="Неверные данные")

    # Генерация токена
    access_token = create_access_token({"sub": db_user_node.get("id")})
    return {"access_token": access_token, "token_type": "bearer"}


@app.put("/profile/{user_id}")
def update_profile(user_id: str, profile: UpdateProfile):
    updated_user = update_user(user_id, profile.name, profile.email, profile.password)
    if not updated_user:
        raise HTTPException(status_code=404, detail="Пользователь не найден или данные не изменились")
    return {"message": "Профиль обновлен", "user": dict(updated_user)}

@app.get("/movies", response_model=List[Movie])
def read_movies(sort_by: Optional[str] = Query(None, description="Sort by: price, rating, year, title"), 
                descending: bool = False):
    return get_all_movies(sort_by=sort_by, descending=descending)


@app.get("/movies/{movie_id}", response_model=Movie)
def read_movie(movie_id: str):
    movie = get_movie_by_id(movie_id)
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie

@app.get("/movies/mood/{mood}", response_model=List[Movie])
def read_movies_by_mood(
    mood: str,
    limit: int = 10,
    weight_pop: float = 0.8,
    weight_mood: float = 0.2,
):
    return get_movies_by_mood(mood, limit, weight_pop, weight_mood)

from models.movie import MovieWithScore

@app.get("/movies/mood_scores/{mood}", response_model=List[MovieWithScore])
def read_movies_by_mood_with_scores(
    mood: str,
    limit: int = 10,
    weight_pop: float = 0.8,
    weight_mood: float = 0.2,
):
    return get_movies_by_mood_with_scores(mood, limit, weight_pop, weight_mood)

@app.get("/recommend/personal_by_history", response_model=List[MovieWithScore])
def recommend_personal_by_history(uid: str, limit: int = 10, w_pop: float = 0.2):
    return get_personal_by_history_with_scores(uid=uid, limit=limit, w_pop=w_pop)
