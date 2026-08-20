import pandas as pd
import numpy as np
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.models import Tenant, Supplier, Warehouse, Product, InventoryTransaction

def seed_database():
    print("🌱 Seeding Nexus Management with Multi-Tenant Enterprise Data...")
    db: Session = SessionLocal()

    try:
        db.query(InventoryTransaction).delete()
        db.query(Product).delete()
        db.query(Warehouse).delete()
        db.query(Supplier).delete()
        db.query(Tenant).delete()
        db.commit()

        tenants = [
            Tenant(company_name="Apex Retail Corp", subscription_plan="Enterprise"),
            Tenant(company_name="Global Pharma Solutions", subscription_plan="Pro")
        ]
        db.add_all(tenants)
        db.commit()

        for t in tenants:
            db.refresh(t)

        for tenant in tenants:
            wh1 = Warehouse(tenant_id=tenant.id, name=f"{tenant.company_name} - Central Hub", location="Chicago, IL")
            wh2 = Warehouse(tenant_id=tenant.id, name=f"{tenant.company_name} - East Depot", location="New York, NY")
            db.add_all([wh1, wh2])

            sup1 = Supplier(tenant_id=tenant.id, name="Prime Logistics Global", lead_time_avg_days=6, rating=4.7)
            sup2 = Supplier(tenant_id=tenant.id, name="SwiftParts Manufacturing", lead_time_avg_days=4, rating=4.9)
            db.add_all([sup1, sup2])
        
        db.commit()

        categories = ['Electronics', 'Apparel', 'Automotive', 'Pharmaceuticals', 'Home Goods']
        all_tenants = db.query(Tenant).all()
        
        for tenant in all_tenants:
            products_data = []
            for i in range(1, 26):
                products_data.append({
                    "tenant_id": tenant.id,
                    "sku": f"SKU-{tenant.id}00{i}",
                    "name": f"{tenant.company_name[:4]}-Item-{i}",
                    "category": np.random.choice(categories),
                    "unit_price": round(np.random.uniform(15.0, 450.0), 2),
                    "reorder_point": int(np.random.randint(10, 30))
                })
            
            df_products = pd.DataFrame(products_data)
            
            for _, row in df_products.iterrows():
                prod = Product(
                    tenant_id=row['tenant_id'],
                    sku=row['sku'],
                    name=row['name'],
                    category=row['category'],
                    unit_price=row['unit_price'],
                    reorder_point=row['reorder_point']
                )
                db.add(prod)
        db.commit()

        for tenant in all_tenants:
            tenant_products = db.query(Product).filter(Product.tenant_id == tenant.id).all()
            tenant_warehouses = db.query(Warehouse).filter(Warehouse.tenant_id == tenant.id).all()

            tx_data = []
            for _ in range(100):
                prod = np.random.choice(tenant_products)
                wh = np.random.choice(tenant_warehouses)
                t_type = np.random.choice(['IN', 'OUT'], p=[0.6, 0.4])
                qty = int(np.random.randint(5, 75))

                tx_data.append({
                    "tenant_id": tenant.id,
                    "product_id": prod.id,
                    "warehouse_id": wh.id,
                    "transaction_type": t_type,
                    "quantity": qty
                })

            df_tx = pd.DataFrame(tx_data)
            for _, row in df_tx.iterrows():
                tx = InventoryTransaction(
                    tenant_id=row['tenant_id'],
                    product_id=row['product_id'],
                    warehouse_id=row['warehouse_id'],
                    transaction_type=row['transaction_type'],
                    quantity=row['quantity']
                )
                db.add(tx)
        
        db.commit()
        print("✨ Successfully seeded multi-tenant analytics data!")

    except Exception as e:
        print(f"❌ Seeding failed: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
