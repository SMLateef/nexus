from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from database import SessionLocal, InventoryDB, ForecastDB, engine, Base

# Ensure tables are created
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Nexus Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Dependency to get DB session ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Pydantic Models ---
class InventoryItem(BaseModel):
    sku: str
    name: str
    category: str
    price: float
    qty: int
    reorder_point: int
    supplier: str

class CheckoutItem(BaseModel):
    sku: str
    cartQty: int
    price: float

class CheckoutPayload(BaseModel):
    orderId: str
    tenantName: str
    items: List[CheckoutItem]
    total: float

# --- API Endpoints ---

@app.get("/")
def read_root():
    return {"status": "Nexus Database API is running"}

@app.get("/analytics/{tenant_id}")
def get_analytics(tenant_id: int, db: Session = Depends(get_db)):
    inventory = db.query(InventoryDB).filter(InventoryDB.tenant_id == tenant_id).all()
    return {"inventory": inventory}

@app.get("/forecast/{tenant_id}")
def get_forecast(tenant_id: int, db: Session = Depends(get_db)):
    forecast = db.query(ForecastDB).filter(ForecastDB.tenant_id == tenant_id).all()
    return {"data": forecast}

@app.post("/inventory/{tenant_id}")
def add_inventory_item(tenant_id: int, item: InventoryItem, db: Session = Depends(get_db)):
    # Check if SKU already exists
    existing_item = db.query(InventoryDB).filter(InventoryDB.sku == item.sku, InventoryDB.tenant_id == tenant_id).first()
    if existing_item:
        raise HTTPException(status_code=400, detail="SKU already exists")
        
    db_item = InventoryDB(
        tenant_id=tenant_id, sku=item.sku, name=item.name, category=item.category,
        price=item.price, qty=item.qty, reorder_point=item.reorder_point, supplier=item.supplier
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return {"message": "Item added successfully", "item": db_item}

@app.post("/pos/checkout/{tenant_id}")
def process_checkout(tenant_id: int, payload: CheckoutPayload, db: Session = Depends(get_db)):
    for cart_item in payload.items:
        db_item = db.query(InventoryDB).filter(InventoryDB.sku == cart_item.sku, InventoryDB.tenant_id == tenant_id).first()
        if db_item:
            db_item.qty = max(0, db_item.qty - cart_item.cartQty)
    
    db.commit()
    return {"message": "Checkout processed successfully", "orderId": payload.orderId}