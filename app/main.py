from fastapi import FastAPI, HTTPException
from models.user import UserCreate, UserResponse, UserLogin, UpdateProfile
from api.user_routes import create_user, get_user_by_email, update_user
from services.auth import hash_password, verify_password, create_access_token
import uuid

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
