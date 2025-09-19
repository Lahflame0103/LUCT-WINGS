
import React, { useState, useEffect } from 'react';
import './App.css';


import Dashboard from './components/Dashboard';
import ProductManagement from './components/ProductManagement';
import StockManagement from './components/StockManagement';
import Sales from './components/Sales';
import Inventory from './components/Inventory';
import Customer from './components/Customer';
import Reporting from './components/Reports';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);

  
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const savedSales = JSON.parse(localStorage.getItem('sales')) || [];
    const savedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
    
    setProducts(savedProducts);
    setSales(savedSales);
    setCustomers(savedCustomers);
  }, []);

  
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  
  const addProduct = (product) => {
    const newProduct = {
      id: Date.now(),
      ...product
    };
    setProducts([...products, newProduct]);
  };

  
  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(product => 
      product.id === id ? {...updatedProduct, id} : product
    ));
  };

  
  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  
  const updateStock = (id, quantityChange) => {
    setProducts(products.map(product => {
      if (product.id === id) {
        const newQuantity = product.quantity + quantityChange;
        return {
          ...product,
          quantity: newQuantity < 0 ? 0 : newQuantity
        };
      }
      return product;
    }));
  };

  
  const addSale = (sale) => {
    const newSale = {
      id: Date.now(),
      ...sale
    };
    setSales([...sales, newSale]);
    
    
    updateStock(sale.productId, -sale.quantity);
  };

  
  const renderCurrentView = () => {
    switch(currentView) {
      case 'dashboard':
        return <Dashboard setCurrentView={setCurrentView} />;
      case 'products':
        return (
          <ProductManagement 
            products={products}
            addProduct={addProduct}
            updateProduct={updateProduct}
            deleteProduct={deleteProduct}
          />
        );
      case 'stock':
        return (
          <StockManagement 
            products={products}
            updateStock={updateStock}
          />
        );
      case 'sales':
        return (
          <Sales 
            products={products}
            sales={sales}
            addSale={addSale}
          />
        );
      case 'inventory':
        return <Inventory products={products} />;
      case 'customers':
        return <Customer customers={customers} setCustomers={setCustomers} />;
      case 'reporting':
        return <Reporting products={products} sales={sales} />;
      default:
        return <Dashboard setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>LUCT Wings-Cafe</h1>
        <nav className="nav-menu">
          <button onClick={() => setCurrentView('dashboard')}>Dashboard</button>
          <button onClick={() => setCurrentView('products')}>Products</button>
          <button onClick={() => setCurrentView('stock')}>Stock</button>
          <button onClick={() => setCurrentView('sales')}>Sales</button>
          <button onClick={() => setCurrentView('inventory')}>Inventory</button>
          <button onClick={() => setCurrentView('customers')}>Customers</button>
          <button onClick={() => setCurrentView('reporting')}>Reporting</button>
        </nav>
      </header>
      <main className="main-content">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;