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

  function calculateTotalPrice(items) {
    const countMap = {};
    const dealItems = ["banana", "orange", "tomato"]; // Списък с продуктите, които включват 2 за 3 отстъпка
    let totalPrice = 0;

    // Изчисляване на броят на всяка добавена позиция
    for (const item of items) {
      countMap[item] = (countMap[item] || 0) + 1;
    }

    // Изчисляване на общата цена, като се приложи отстъпката 2 за 3
    for (const item of items) {
      if (item in prices) {
        const price = prices[item];
        if (dealItems.includes(item) && countMap[item] >= 3) {
          countMap[item] -= 2; // Само първите 2 от тези продукти се вземат предвид
        } else {
          countMap[item]--; // Намаляване на броя за всички останали продукти
        }
        if (countMap[item] > 0) {
          totalPrice += price;
        }
      }
    }

    return totalPrice;
  }

  const [totalPrice, setTotalPrice] = useState(() => calculateTotalPrice(products));

 

  const aws = Math.floor(totalPrice / 100);
  const c = totalPrice % 100;
  useEffect(() => {
    const totalPrice = calculateTotalPrice(products);
    setTotalPrice(totalPrice);
  }, [products]);
  return (
    <>
      <AddProductForm onSubmit={addProduct} />
      <h1 className="header">Added Products</h1>
      <ProductList products={products} deleteProduct={deleteProduct} prices={prices} />
      <p>Total Price: {totalPrice} c</p>
    </>
  );
}
