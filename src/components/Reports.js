
import React from 'react';
import './Reports.css';

const Reporting = ({ products, sales }) => {
  
  const totalInventoryValue = products.reduce(
    (total, product) => total + (product.price * product.quantity), 
    0
  );
  
  
  const totalSalesValue = sales.reduce(
    (total, sale) => total + sale.total, 
    0
  );
  
  
  const totalItemsSold = sales.reduce(
    (total, sale) => total + sale.quantity, 
    0
  );
  
  
  const salesByProduct = {};
  sales.forEach(sale => {
    if (!salesByProduct[sale.productName]) {
      salesByProduct[sale.productName] = 0;
    }
    salesByProduct[sale.productName] += sale.quantity;
  });
  
  let bestSellingProduct = 'None';
  let maxSales = 0;
  
  for (const product in salesByProduct) {
    if (salesByProduct[product] > maxSales) {
      maxSales = salesByProduct[product];
      bestSellingProduct = product;
    }
  }

  return (
    <div className="reporting">
      <h2>Reports & Analytics</h2>
      
      <div className="grid grid-3">
        <div className="card report-card">
          <h3>Total Inventory Value</h3>
          <p className="report-value">R{totalInventoryValue.toFixed(2)}</p>
        </div>
        
        <div className="card report-card">
          <h3>Total Sales Value</h3>
          <p className="report-value">R{totalSalesValue.toFixed(2)}</p>
        </div>
        
        <div className="card report-card">
          <h3>Total Items Sold</h3>
          <p className="report-value">{totalItemsSold}</p>
        </div>
      </div>
      
      <div className="card">
        <h3>Sales Performance</h3>
        {sales.length === 0 ? (
          <p>No sales data available.</p>
        ) : (
          <div>
            <p><strong>Best Selling Product:</strong> {bestSellingProduct} ({maxSales} units sold)</p>
            
            <h4>Sales by Product</h4>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Units Sold</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(salesByProduct).map(product => {
                  const productSales = sales.filter(s => s.productName === product);
                  const revenue = productSales.reduce((total, sale) => total + sale.total, 0);
                  
                  return (
                    <tr key={product}>
                      <td>{product}</td>
                      <td>{salesByProduct[product]}</td>
                      <td>${revenue.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      <div className="card">
        <h3>Inventory Status</h3>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Stock Level</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.quantity}</td>
                  <td>${(product.price * product.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Reporting;