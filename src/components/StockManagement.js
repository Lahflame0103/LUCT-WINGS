
import React, { useState } from 'react';
import './StockManagement.css';

const StockManagement = ({ products, updateStock }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantityChange, setQuantityChange] = useState('');

  const handleStockUpdate = (e) => {
    e.preventDefault();
    
    if (!selectedProduct || !quantityChange) return;
    
    updateStock(parseInt(selectedProduct), parseInt(quantityChange));
    setQuantityChange('');
  };

  return (
    <div className="stock-management">
      <h2>Stock Management</h2>
      
      <div className="card">
        <h3>Update Stock</h3>
        <form onSubmit={handleStockUpdate}>
          <div className="form-group">
            <label htmlFor="product">Select Product</label>
            <select
              id="product"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              required
            >
              <option value="">Select Product</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} (Current: {product.quantity})
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="quantityChange">Quantity Change</label>
            <input
              type="number"
              id="quantityChange"
              value={quantityChange}
              onChange={(e) => setQuantityChange(e.target.value)}
              required
            />
            <small>Positive number to add stock, negative number to remove stock</small>
          </div>
          
          <button type="submit" className="btn btn-primary">Update Stock</button>
        </form>
      </div>
      
      <div className="card">
        <h3>Current Stock Levels</h3>
        {products.length === 0 ? (
          <p>No products found. Add some products to get started.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
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

export default StockManagement;