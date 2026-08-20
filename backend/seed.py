from database import SessionLocal, InventoryDB, ForecastDB

def seed_database():
    db = SessionLocal()

    print("Clearing old data...")
    # Clear existing data to avoid duplicates if you run this multiple times
    db.query(InventoryDB).delete()
    db.query(ForecastDB).delete()
    db.commit()

    print("Seeding new enterprise tenant data...")
    
    inventory_seed = [
        # Tenant 1: MedPlus
        InventoryDB(tenant_id=1, sku="MED-001", name="Dolo 650mg Tablets (Strip of 15)", category="Analgesics", price=30.00, qty=450, reorder_point=100, supplier="Micro Labs Ltd."),
        InventoryDB(tenant_id=1, sku="MED-002", name="Azithromycin 500mg Capsules", category="Antibiotics", price=110.50, qty=85, reorder_point=150, supplier="Sun Pharma"),
        InventoryDB(tenant_id=1, sku="MED-003", name="Cough Syrup (Benadryl) 150ml", category="Respiratory", price=125.00, qty=60, reorder_point=40, supplier="J&J India"),
        InventoryDB(tenant_id=1, sku="MED-004", name="Omron Digital BP Monitor", category="Medical Devices", price=1850.00, qty=12, reorder_point=15, supplier="Omron Healthcare"),
        InventoryDB(tenant_id=1, sku="MED-005", name="Volini Pain Relief Spray 60g", category="Topical", price=140.00, qty=120, reorder_point=50, supplier="Sun Pharma"),
        
        # Tenant 2: Q-Mart
        InventoryDB(tenant_id=2, sku="QMT-001", name="Imported Hass Avocados (2 pcs)", category="Fresh Produce", price=350.00, qty=25, reorder_point=40, supplier="Global Agro Imports"),
        InventoryDB(tenant_id=2, sku="QMT-002", name="Epigamia Almond Milk 1L", category="Dairy Alternatives", price=300.00, qty=45, reorder_point=30, supplier="Drums Food Int."),
        InventoryDB(tenant_id=2, sku="QMT-003", name="Lindt Excellence Dark Chocolate 85%", category="Confectionery", price=450.00, qty=80, reorder_point=50, supplier="Lindt & Sprungli"),
        InventoryDB(tenant_id=2, sku="QMT-004", name="Organic Quinoa 500g", category="Pantry", price=280.00, qty=15, reorder_point=25, supplier="Organic Tattva"),
        InventoryDB(tenant_id=2, sku="QMT-005", name="Borges Extra Virgin Olive Oil 1L", category="Pantry", price=950.00, qty=35, reorder_point=20, supplier="Borges India"),

        # Tenant 3: Bajaj Electronics
        InventoryDB(tenant_id=3, sku="BAJ-001", name="Sony 55-inch 4K Ultra HD Smart TV", category="Televisions", price=65990.00, qty=18, reorder_point=10, supplier="Sony India"),
        InventoryDB(tenant_id=3, sku="BAJ-002", name="LG 1.5 Ton 5 Star Inverter Split AC", category="Appliances", price=45500.00, qty=8, reorder_point=15, supplier="LG Electronics"),
        InventoryDB(tenant_id=3, sku="BAJ-003", name="Apple iPhone 15 (128GB)", category="Smartphones", price=79900.00, qty=42, reorder_point=20, supplier="Apple India"),
        InventoryDB(tenant_id=3, sku="BAJ-004", name="Samsung 324L Frost Free Refrigerator", category="Appliances", price=32490.00, qty=14, reorder_point=10, supplier="Samsung India"),
        InventoryDB(tenant_id=3, sku="BAJ-005", name="JBL Cinema SB270 Soundbar", category="Audio", price=12999.00, qty=25, reorder_point=15, supplier="Harman International")
    ]

    forecast_seed = [
        # Tenant 1: MedPlus
        ForecastDB(tenant_id=1, sku="MED-001", name="Dolo 650mg Tablets", category="Analgesics", price=30.00, predicted_demand=1850),
        ForecastDB(tenant_id=1, sku="MED-002", name="Azithromycin 500mg Capsules", category="Antibiotics", price=110.50, predicted_demand=420),
        ForecastDB(tenant_id=1, sku="MED-003", name="Cough Syrup (Benadryl)", category="Respiratory", price=125.00, predicted_demand=380),
        ForecastDB(tenant_id=1, sku="MED-004", name="Omron Digital BP Monitor", category="Medical Devices", price=1850.00, predicted_demand=45),
        ForecastDB(tenant_id=1, sku="MED-005", name="Volini Pain Relief Spray", category="Topical", price=140.00, predicted_demand=510),

        # Tenant 2: Q-Mart
        ForecastDB(tenant_id=2, sku="QMT-001", name="Imported Hass Avocados", category="Fresh Produce", price=350.00, predicted_demand=180),
        ForecastDB(tenant_id=2, sku="QMT-002", name="Epigamia Almond Milk 1L", category="Dairy Alternatives", price=300.00, predicted_demand=210),
        ForecastDB(tenant_id=2, sku="QMT-003", name="Lindt Excellence Dark", category="Confectionery", price=450.00, predicted_demand=340),
        ForecastDB(tenant_id=2, sku="QMT-004", name="Organic Quinoa 500g", category="Pantry", price=280.00, predicted_demand=90),
        ForecastDB(tenant_id=2, sku="QMT-005", name="Borges Extra Virgin Olive Oil", category="Pantry", price=950.00, predicted_demand=110),

        # Tenant 3: Bajaj Electronics
        ForecastDB(tenant_id=3, sku="BAJ-001", name="Sony 55-inch 4K TV", category="Televisions", price=65990.00, predicted_demand=45),
        ForecastDB(tenant_id=3, sku="BAJ-002", name="LG 1.5 Ton Inverter AC", category="Appliances", price=45500.00, predicted_demand=85),
        ForecastDB(tenant_id=3, sku="BAJ-003", name="Apple iPhone 15", category="Smartphones", price=79900.00, predicted_demand=150),
        ForecastDB(tenant_id=3, sku="BAJ-004", name="Samsung 324L Refrigerator", category="Appliances", price=32490.00, predicted_demand=35),
        ForecastDB(tenant_id=3, sku="BAJ-005", name="JBL Cinema Soundbar", category="Audio", price=12999.00, predicted_demand=60)
    ]

    db.add_all(inventory_seed)
    db.add_all(forecast_seed)
    db.commit()
    print("✅ Database successfully seeded with MedPlus, Q-Mart, and Bajaj Electronics data!")
    db.close()

if __name__ == "__main__":
    seed_database()