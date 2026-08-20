import pandas as pd
from sqlalchemy.orm import Session
from app.models.models import InventoryTransaction, Product

def get_tenant_analytics(db: Session, tenant_id: int):
    # 1. Fetch data into DataFrame
    transactions = db.query(InventoryTransaction).filter(InventoryTransaction.tenant_id == tenant_id).all()
    products = db.query(Product).filter(Product.tenant_id == tenant_id).all()
    
    if not transactions or not products:
        return {"error": "No data found for this tenant"}

    df_tx = pd.DataFrame([t.__dict__ for t in transactions])
    df_tx.drop('_sa_instance_state', axis=1, errors='ignore', inplace=True)

    # 2. Calculate Stock Levels per Product
    df_tx['qty_signed'] = df_tx.apply(lambda x: x['quantity'] if x['transaction_type'] == 'IN' else -x['quantity'], axis=1)
    stock_levels = df_tx.groupby('product_id')['qty_signed'].sum().reset_index()

    # 3. Identify High-Risk Stock (Stock <= Reorder Point)
    prod_df = pd.DataFrame([p.__dict__ for p in products])
    prod_df.drop('_sa_instance_state', axis=1, errors='ignore', inplace=True)
    
    merged = pd.merge(stock_levels, prod_df, left_on='product_id', right_on='id')
    merged['is_low_stock'] = merged['qty_signed'] <= merged['reorder_point']
    
    low_stock_items = merged[merged['is_low_stock'] == True][['name', 'qty_signed', 'reorder_point']]

    return {
        "tenant_id": tenant_id,
        "total_stock_items": int(len(stock_levels)),
        "low_stock_alert_count": int(len(low_stock_items)),
        "critical_items": low_stock_items.to_dict(orient='records')
    }