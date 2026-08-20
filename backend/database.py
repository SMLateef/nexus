from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Connect to the Docker Postgres container we just started
SQLALCHEMY_DATABASE_URL = "postgresql://admin:nexuspass@localhost:5433/nexusdb"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# --- Database Models ---

class InventoryDB(Base):
    __tablename__ = "inventory"

    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, index=True)
    sku = Column(String, index=True)
    name = Column(String)
    category = Column(String)
    price = Column(Float)
    qty = Column(Integer)
    reorder_point = Column(Integer)
    supplier = Column(String)

class ForecastDB(Base):
    __tablename__ = "forecasts"

    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, index=True)
    sku = Column(String, index=True)
    name = Column(String)
    category = Column(String)
    price = Column(Float)
    predicted_demand = Column(Integer)

# Create the tables in PostgreSQL
Base.metadata.create_all(bind=engine)