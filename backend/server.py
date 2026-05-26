from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional, Any, Dict
import uuid
from datetime import datetime, timezone, timedelta
from passlib.context import CryptContext
from jose import JWTError, jwt

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

SECRET_KEY = os.environ.get('SECRET_KEY', 'uv-secret-key-2026-change-in-prod')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer(auto_error=False)

app = FastAPI(title="Verdant Clothier API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ──────────────────────────────────────────
# MODELS
# ──────────────────────────────────────────

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: str
    email: str
    first_name: str
    last_name: str
    created_at: datetime

class AddressModel(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    first_name: str
    last_name: str
    address1: str
    address2: Optional[str] = ""
    city: str
    state: str
    zip_code: str
    country: str = "US"
    phone: Optional[str] = ""
    is_default: bool = False

class CartItem(BaseModel):
    product_id: str
    slug: str
    title: str
    price: float
    image: str
    size: str
    qty: int

class OrderAddress(BaseModel):
    first_name: str
    last_name: str
    address1: str
    address2: Optional[str] = ""
    city: str
    state: str
    zip_code: str
    country: str = "US"
    phone: Optional[str] = ""

class OrderCreate(BaseModel):
    items: List[CartItem]
    shipping_address: OrderAddress
    payment_method: str = "card"
    card_last4: Optional[str] = "4242"

class OrderOut(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    order_number: str
    user_id: str
    items: List[CartItem]
    shipping_address: OrderAddress
    subtotal: float
    shipping: float
    tax: float
    total: float
    status: str
    payment_method: str
    card_last4: Optional[str]
    created_at: datetime

class WishlistItem(BaseModel):
    product_id: str
    slug: str
    title: str
    price: float
    image: str

class PasswordUpdate(BaseModel):
    current_password: str
    new_password: str

class ProfileUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None

# ──────────────────────────────────────────
# AUTH HELPERS
# ──────────────────────────────────────────

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_token(user_id: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    return jwt.encode({"sub": user_id, "exp": expire}, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if not credentials:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await db.users.find_one({"id": user_id}, {"_id": 0, "password": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

async def get_optional_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if not credentials:
        return None
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if not user_id:
            return None
        return await db.users.find_one({"id": user_id}, {"_id": 0, "password": 0})
    except:
        return None

# ──────────────────────────────────────────
# AUTH ROUTES
# ──────────────────────────────────────────

@api_router.post("/auth/register")
async def register(data: UserCreate):
    existing = await db.users.find_one({"email": data.email.lower()})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user_id = str(uuid.uuid4())
    user_doc = {
        "id": user_id,
        "email": data.email.lower(),
        "password": hash_password(data.password),
        "first_name": data.first_name,
        "last_name": data.last_name,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "addresses": [],
        "wishlist": [],
    }
    await db.users.insert_one(user_doc)
    token = create_token(user_id)
    return {
        "token": token,
        "user": {
            "id": user_id,
            "email": data.email.lower(),
            "first_name": data.first_name,
            "last_name": data.last_name,
        }
    }

@api_router.post("/auth/login")
async def login(data: UserLogin):
    user = await db.users.find_one({"email": data.email.lower()})
    if not user or not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_token(user["id"])
    return {
        "token": token,
        "user": {
            "id": user["id"],
            "email": user["email"],
            "first_name": user["first_name"],
            "last_name": user["last_name"],
        }
    }

@api_router.get("/auth/me")
async def me(current_user=Depends(get_current_user)):
    return current_user

# ──────────────────────────────────────────
# PROFILE ROUTES
# ──────────────────────────────────────────

@api_router.put("/profile")
async def update_profile(data: ProfileUpdate, current_user=Depends(get_current_user)):
    update_fields = {k: v for k, v in data.model_dump().items() if v is not None}
    if "email" in update_fields:
        existing = await db.users.find_one({"email": update_fields["email"].lower(), "id": {"$ne": current_user["id"]}})
        if existing:
            raise HTTPException(status_code=400, detail="Email already in use")
        update_fields["email"] = update_fields["email"].lower()
    if update_fields:
        await db.users.update_one({"id": current_user["id"]}, {"$set": update_fields})
    return {"message": "Profile updated"}

@api_router.put("/profile/password")
async def update_password(data: PasswordUpdate, current_user=Depends(get_current_user)):
    user = await db.users.find_one({"id": current_user["id"]})
    if not verify_password(data.current_password, user["password"]):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    await db.users.update_one({"id": current_user["id"]}, {"$set": {"password": hash_password(data.new_password)}})
    return {"message": "Password updated"}

# ──────────────────────────────────────────
# ADDRESS ROUTES
# ──────────────────────────────────────────

@api_router.get("/addresses")
async def get_addresses(current_user=Depends(get_current_user)):
    user = await db.users.find_one({"id": current_user["id"]})
    return user.get("addresses", [])

@api_router.post("/addresses")
async def add_address(addr: AddressModel, current_user=Depends(get_current_user)):
    user = await db.users.find_one({"id": current_user["id"]})
    addresses = user.get("addresses", [])
    if addr.is_default:
        for a in addresses:
            a["is_default"] = False
    if not addresses:
        addr.is_default = True
    addresses.append(addr.model_dump())
    await db.users.update_one({"id": current_user["id"]}, {"$set": {"addresses": addresses}})
    return addr

@api_router.put("/addresses/{addr_id}")
async def update_address(addr_id: str, addr: AddressModel, current_user=Depends(get_current_user)):
    user = await db.users.find_one({"id": current_user["id"]})
    addresses = user.get("addresses", [])
    if addr.is_default:
        for a in addresses:
            a["is_default"] = False
    addresses = [addr.model_dump() if a["id"] == addr_id else a for a in addresses]
    await db.users.update_one({"id": current_user["id"]}, {"$set": {"addresses": addresses}})
    return addr

@api_router.delete("/addresses/{addr_id}")
async def delete_address(addr_id: str, current_user=Depends(get_current_user)):
    user = await db.users.find_one({"id": current_user["id"]})
    addresses = [a for a in user.get("addresses", []) if a["id"] != addr_id]
    await db.users.update_one({"id": current_user["id"]}, {"$set": {"addresses": addresses}})
    return {"message": "Address deleted"}

# ──────────────────────────────────────────
# WISHLIST ROUTES
# ──────────────────────────────────────────

@api_router.get("/wishlist")
async def get_wishlist(current_user=Depends(get_current_user)):
    user = await db.users.find_one({"id": current_user["id"]})
    return user.get("wishlist", [])

@api_router.post("/wishlist")
async def add_to_wishlist(item: WishlistItem, current_user=Depends(get_current_user)):
    user = await db.users.find_one({"id": current_user["id"]})
    wishlist = user.get("wishlist", [])
    if any(w["product_id"] == item.product_id for w in wishlist):
        raise HTTPException(status_code=400, detail="Already in wishlist")
    wishlist.append(item.model_dump())
    await db.users.update_one({"id": current_user["id"]}, {"$set": {"wishlist": wishlist}})
    return item

@api_router.delete("/wishlist/{product_id}")
async def remove_from_wishlist(product_id: str, current_user=Depends(get_current_user)):
    user = await db.users.find_one({"id": current_user["id"]})
    wishlist = [w for w in user.get("wishlist", []) if w["product_id"] != product_id]
    await db.users.update_one({"id": current_user["id"]}, {"$set": {"wishlist": wishlist}})
    return {"message": "Removed from wishlist"}

# ──────────────────────────────────────────
# ORDER ROUTES
# ──────────────────────────────────────────

@api_router.post("/orders")
async def create_order(data: OrderCreate, current_user=Depends(get_current_user)):
    subtotal = sum(i.price * i.qty for i in data.items)
    shipping = 0 if subtotal >= 150 else 9.95
    tax = round(subtotal * 0.085, 2)
    total = round(subtotal + shipping + tax, 2)
    order_number = f"UV{datetime.now().strftime('%Y%m%d')}{str(uuid.uuid4())[:6].upper()}"
    order_id = str(uuid.uuid4())
    order_doc = {
        "id": order_id,
        "order_number": order_number,
        "user_id": current_user["id"],
        "items": [i.model_dump() for i in data.items],
        "shipping_address": data.shipping_address.model_dump(),
        "subtotal": round(subtotal, 2),
        "shipping": shipping,
        "tax": tax,
        "total": total,
        "status": "processing",
        "payment_method": data.payment_method,
        "card_last4": data.card_last4,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.orders.insert_one(order_doc)
    return order_doc

@api_router.get("/orders")
async def get_orders(current_user=Depends(get_current_user)):
    orders = await db.orders.find({"user_id": current_user["id"]}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return orders

@api_router.get("/orders/{order_id}")
async def get_order(order_id: str, current_user=Depends(get_current_user)):
    order = await db.orders.find_one({"id": order_id, "user_id": current_user["id"]}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

# ──────────────────────────────────────────
# HEALTH CHECK
# ──────────────────────────────────────────

@api_router.get("/")
async def root():
    return {"message": "Verdant Clothier API is running", "version": "2.0"}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
