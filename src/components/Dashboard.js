
import React from 'react';
import './Dashboard.css';

const Dashboard = ({ setCurrentView }) => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="grid grid-3">
        <div className="card dashboard-card" onClick={() => setCurrentView('products')}>
          <h3>Product Management</h3>
          
        </div>
        <div className="card dashboard-card" onClick={() => setCurrentView('stock')}>
          <h3>Stock Management</h3>
         
        </div>
        <div className="card dashboard-card" onClick={() => setCurrentView('sales')}>
          <h3>Sales</h3>
         
        </div>
        <div className="card dashboard-card" onClick={() => setCurrentView('inventory')}>
          <h3>Inventory</h3>
          
        </div>
        <div className="card dashboard-card" onClick={() => setCurrentView('customers')}>
          <h3>Customers</h3>
          
        </div>
        <div className="card dashboard-card" onClick={() => setCurrentView('reporting')}>
          <h3>Reports</h3>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;