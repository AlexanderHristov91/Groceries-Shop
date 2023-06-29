import { useState } from 'react';

export function AddProductForm({ onSubmit }) {
  const [newProduct, setNewProduct] = useState('');

  const fruitAndVegetableList = ['apple', 'banana', 'carrot', 'tomato', 'cucumber', 'orange'];

  function handleSubmit(e) {
    e.preventDefault();
    if (newProduct.trim() === '') return;

    if (!fruitAndVegetableList.includes(newProduct.toLowerCase())) {
      alert(`Please provide a product from the list: ${fruitAndVegetableList.join(', ')}`);
      return;
    }

    onSubmit(newProduct);
    setNewProduct('');
  }

  return (
    <form onSubmit={handleSubmit} className="new-product-form">
      <div className="form-row">
        <label htmlFor="item">New Product</label>
        <input
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
          type="text"
          id="item"
        />
      </div>
      <button className="btn">Add</button>
    </form>
  );
}