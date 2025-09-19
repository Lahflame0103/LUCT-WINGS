
import React, { useState } from 'react';


const Sales = ({ products, sales, addSale }) => {
  const [saleProduct, setSaleProduct] = useState('');
  const [saleQuantity, setSaleQuantity] = useState('');

  const handleSale = (e) => {
    e.preventDefault();
    
    if (!saleProduct || !saleQuantity) return;
    
    const product = products.find(p => p.id === parseInt(saleProduct));
    
    if (!product) return;
    
    if (product.quantity < parseInt(saleQuantity)) {
      alert('Not enough stock available!');
      return;
    }
    
    const sale = {
      productId: product.id,
      productName: product.name,
      quantity: parseInt(saleQuantity),
      price: product.price,
      total: product.price * parseInt(saleQuantity),
      date: new Date().toLocaleString()
    };
    
    addSale(sale);
    setSaleProduct('');
    setSaleQuantity('');
  };

  return (
    <div className="sales">
      <h2>Sales</h2>
      
      <div className="card">
        <h3>Record Sale</h3>
        <form onSubmit={handleSale}>
          <div className="form-group">
            <label htmlFor="saleProduct">Product</label>
            <select
              id="saleProduct"
              value={saleProduct}
              onChange={(e) => setSaleProduct(e.target.value)}
              required
            >
              <option value="">Select Product</option>
              {products.filter(p => p.quantity > 0).map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} (Available: {product.quantity})
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="saleQuantity">Quantity</label>
            <input
              type="number"
              id="saleQuantity"
              min="1"
              value={saleQuantity}
              onChange={(e) => setSaleQuantity(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">Record Sale</button>
        </form>
      </div>
      
      <div className="card">
        <h3>Recent Sales</h3>
        {sales.length === 0 ? (
          <p>No sales recorded yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {sales.slice().reverse().map(sale => (
                <tr key={sale.id}>
                  <td>{sale.date}</td>
                  <td>{sale.productName}</td>
                  <td>{sale.quantity}</td>
                  <td>${sale.price.toFixed(2)}</td>
                  <td>${sale.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Sales;