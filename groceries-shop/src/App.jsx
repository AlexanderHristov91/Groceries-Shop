import { useEffect, useState } from 'react';
import './index.css';
import { ProductList } from './ProductList';
import { AddProductForm } from './AddProductForm';

export default function App() {
  const [products, setProducts] = useState(() => {
    const localValue = localStorage.getItem('ITEMS');
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem('ITEMS', JSON.stringify(products));
  }, [products]);

  function addProduct(title) {
    setProducts((currentProducts) => {
      return [
        ...currentProducts,
        { id: crypto.randomUUID(), title },
      ];
    });
  }

  

  function deleteProduct(id) {
    setProducts((currentProducts) => {
      return currentProducts.filter((product) => product.id !== id);
    });
  }

  const prices = {
    apple: 300,
    banana: 550,
    carrot: 700,
    tomato: 930,
    cucumber: 1100,
    orange: 1300,
  };
  

  const totalPrice = products.reduce((total, product) => {
    let price = prices[product.title.toLowerCase()];
    
  // products.filter(item => item === dealOfTheDay).length > 1;
    if (product.title === "banana") {
      price = price / 2;
    }
    return total + price;
  }, 0);
  
  const aws = Math.floor(totalPrice / 100);
  const c = totalPrice % 100;
  
  return (
    <>
      <AddProductForm onSubmit={addProduct} />
      <h1 className="header">Added Products</h1>
      <ProductList products={products} deleteProduct={deleteProduct} prices={prices} />
      <p>Total Price: {aws} aws {c} c</p>
    </>
  );
}