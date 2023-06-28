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
    apple: 3,
    banana: 5,
    carrot: 7,
    tomato: 9,
    cucumber: 11,
    orange: 13,
  };

  const totalPrice = products.reduce((total, product) => {
    const price = prices[product.title.toLowerCase()];
    return total + price;
  }, 0);

  return (
    <>
      <AddProductForm onSubmit={addProduct} />
      <h1 className="header">Added Products</h1>
      <ProductList products={products} deleteProduct={deleteProduct} prices={prices} />
      <p>Total Price: {totalPrice}</p>
    </>
  );
}
