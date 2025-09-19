
import React, { useState } from 'react';


const ProductManagement = ({ products, addProduct, updateProduct, deleteProduct }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      updateProduct(currentProduct.id, currentProduct);
    } else {
      addProduct(currentProduct);
    }
    
    
    setCurrentProduct({
      id: null,
      name: '',
      description: '',
      category: '',
      price: '',
      quantity: ''
    });
    setIsEditing(false);
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentProduct({
      id: null,
      name: '',
      description: '',
      category: '',
      price: '',
      quantity: ''
    });
  };

  return (
    <div className="product-management">
      <h2>Product Management</h2>
      
      <div className="card">
        <h3>{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              value={currentProduct.name}
              onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={currentProduct.description}
              onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={currentProduct.category}
              
            >
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="price">Price (R)</label>
            <input
              type="number"
              id="price"
              step="0.01"
              min="0"
              value={currentProduct.price}
              onChange={(e) => setCurrentProduct({...currentProduct, price: parseFloat(e.target.value)})}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="quantity">Initial Quantity</label>
            <input
              type="number"
              id="quantity"
              min="0"
              value={currentProduct.quantity}
              onChange={(e) => setCurrentProduct({...currentProduct, quantity: parseInt(e.target.value)})}
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Update Product' : 'Add Product'}
            </button>
            {isEditing && (
              <button type="button" className="btn" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      
      <div className="card">
        <h3>Product List</h3>
        {products.length === 0 ? (
          <p>No products found. Add some products to get started.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>R{product.price.toFixed(2)}</td>
                  <td className={product.quantity < 10 ? 'low-stock' : ''}>
                    {product.quantity} {product.quantity < 10 && '(Low Stock)'}
                  </td>
                  <td>
                    <button 
                      className="btn btn-primary"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-danger"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
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

export default ProductManagement;