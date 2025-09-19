
import React, { useState } from 'react';


const Customer = ({ customers, setCustomers }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  const handleAddCustomer = (e) => {
    e.preventDefault();
    
    if (!customerName || !customerEmail) return;
    
    const newCustomer = {
      id: Date.now(),
      name: customerName,
      email: customerEmail,
      joinDate: new Date().toLocaleDateString()
    };
    
    setCustomers([...customers, newCustomer]);
    setCustomerName('');
    setCustomerEmail('');
  };

  return (
    <div className="customer">
      <h2>Customer Management</h2>
      
      <div className="card">
        <h3>Add New Customer</h3>
        <form onSubmit={handleAddCustomer}>
          <div className="form-group">
            <label htmlFor="customerName">Customer Name</label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="customerEmail">Email</label>
            <input
              type="email"
              id="customerEmail"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">Add Customer</button>
        </form>
      </div>
      
      <div className="card">
        <h3>Customer List</h3>
        {customers.length === 0 ? (
          <p>No customers found. Add some customers to get started.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Join Date</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.joinDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Customer;