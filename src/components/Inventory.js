
import React from 'react';
import './Inventory.css';

const Inventory = ({ products }) => {
  const lowStockProducts = products.filter(p => p.quantity > 0 && p.quantity < 10);
  const outOfStockProducts = products.filter(p => p.quantity === 0);

  return (
    <div className="inventory">
      <h2>Inventory Overview</h2>
      
      <div className="grid grid-3">
        <div className="card inventory-card">
          <h3>Total Products</h3>
          <p className="inventory-count">{products.length}</p>
        </div>
        
        <div className="card inventory-card">
          <h3>In Stock</h3>
          <p className="inventory-count">
            {products.filter(p => p.quantity > 0).length}
          </p>
        </div>
        
        <div className="card inventory-card">
          <h3>Out of Stock</h3>
          <p className="inventory-count out-of-stock">{outOfStockProducts.length}</p>
        </div>
      </div>
      
      {lowStockProducts.length > 0 && (
        <div className="card alert alert-warning">
          <h3>Low Stock Alert</h3>
          <p>The following products are running low on stock:</p>
          <ul>
            {lowStockProducts.map(product => (
              <li key={product.id}>
                {product.name} (Only {product.quantity} left)
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {outOfStockProducts.length > 0 && (
        <div className="card alert alert-warning">
          <h3>Out of Stock Alert</h3>
          <p>The following products are out of stock:</p>
          <ul>
            {outOfStockProducts.map(product => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="card">
        <h3>All Products</h3>
        {products.length === 0 ? (
          <p>No products found. Add some products to get started.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.quantity}</td>
                  <td>
                    {product.quantity === 0 ? (
                      <span className="out-of-stock">Out of Stock</span>
                    ) : product.quantity < 10 ? (
                      <span className="low-stock">Low Stock</span>
                    ) : (
                      <span className="in-stock">In Stock</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Inventory;