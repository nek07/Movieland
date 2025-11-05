from fastapi import FastAPI, HTTPException
from models.user import UserCreate, UserResponse
from api.user_routes import create_user, get_user_by_email
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
def login(user: UserCreate):
    db_user = get_user_by_email(user.email)
    if not db_user or not verify_password(user.password, db_user["password_hash"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"sub": db_user["id"]})
    return {"access_token": token, "token_type": "bearer"}
