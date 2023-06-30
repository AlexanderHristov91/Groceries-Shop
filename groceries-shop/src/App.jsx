import { useEffect, useState } from 'react';
import './index.css';
import { ProductList } from './ProductList';
import { AddProductForm } from './AddProductForm';
import { v4 as uuidv4 } from 'uuid';
export default function App() {
  const [products, setProducts] = useState(() => {
    const localValue = localStorage.getItem('ITEMS');
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  const [productCounts, setProductCounts] = useState({});

  const fruitAndVegetableList = ["apple", "banana", "carrot", "tomato", "cucumber", "orange"];
  const includedIn2For3Deal = ["apple", "orange"]; // Промоция "2 за 3"
  const includedInBuy1Get1HalfPriceDeal = ["tomato"]; // Промоция "buy 1 get 1 half price"

  useEffect(() => {
    
    const updatedProductCounts = {};
    fruitAndVegetableList.forEach((item) => {
      updatedProductCounts[item] = products.filter(
        (product) => product.title.toLowerCase() === item
      ).length;
    });
    setProductCounts(updatedProductCounts);

    
    localStorage.setItem('ITEMS', JSON.stringify(products));
  }, [products]);

  function addProduct(title) {
    setProducts((currentProducts) => {
      const updatedProducts = [
        ...currentProducts,
        { id: uuidv4(), title },
      ];

      return updatedProducts;
    });
  }

  function deleteProduct(id) {
    setProducts((currentProducts) => {
      const updatedProducts = currentProducts.filter((product) => product.id !== id);

      return updatedProducts;
    });
  }
  console.log("------------", productCounts)
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

   
    if (includedIn2For3Deal.includes(product.title.toLowerCase())) {
      const count = productCounts[product.title.toLowerCase()] || 0;
      console.log("------------", productCounts)
      const discountCount = Math.floor(count / 3);
      price = price * (count - discountCount);
    }

    
    // if (includedInBuy1Get1HalfPriceDeal.includes(product.title.toLowerCase())) {
    //   const count = productCounts[product.title.toLowerCase()] || 0;
    //   const discountCount = Math.floor(count / 2);
    //   price = price * (count - discountCount);
    // }

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
