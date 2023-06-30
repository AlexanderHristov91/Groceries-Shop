import { useEffect, useState } from "react";
import "./index.css";
import { ProductList } from "./ProductList";
import { AddProductForm } from "./AddProductForm";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [products, setProducts] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  const fruitAndVegetableList = [
    "apple",
    "banana",
    "carrot",
    "tomato",
    "cucumber",
    "orange",
  ];

  const promo3for2 = ["banana", "apple"];
  const buy1get1halfPrice = ["tomato"];

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(products));
  }, [products]);

  function addProduct(title) {
    setProducts((currentProducts) => {
      return [...currentProducts, { id: uuidv4(), title }];
    });
  }

  function deleteProduct(id) {
    setProducts((currentProducts) => {
      const updatedProducts = currentProducts.filter(
        (product) => product.id !== id,
      );

      return updatedProducts;
    });
  }
  function count3for2(products, promo3for2) {
    const counts = {};

    products.forEach((product) => {
      const title = product.title.toLowerCase();
      if (promo3for2.includes(title)) {
        counts[title] = (counts[title] || 0) + 1;
      }
    });

    return counts;
  }

  function countBuy1get1halfPrice(products, buy1get1halfPrice) {
    const counts = {};

    products.forEach((product) => {
      const title = product.title.toLowerCase();
      if (buy1get1halfPrice.includes(title)) {
        counts[title] = (counts[title] || 0) + 1;
      }
    });

    return counts;
  }
  const prices = {
    apple: 300,
    banana: 550,
    carrot: 700,
    tomato: 930,
    cucumber: 1100,
    orange: 1300,
  };

  const productCounts3for2 = count3for2(products, promo3for2);
  const productCounts1oneHalf = countBuy1get1halfPrice(
    products,
    buy1get1halfPrice,
  );
  console.log("---", productCounts3for2);
  const totalPrice = products.reduce((total, product) => {
    const title = product.title.toLowerCase();
    let price = prices[title];

    if (promo3for2.includes(title) && productCounts3for2[title] === 3) {
      price = (productCounts3for2[title] * price - price) / 3;
      // console.log("oooooo", price);
    }
    if (
      buy1get1halfPrice.includes(title) &&
      productCounts1oneHalf[title] === 2
    ) {
      price = (productCounts1oneHalf[title] * price - price / 2) / 2;
      // console.log("oooooo", price);
    }

    return total + price;
  }, 0);

  const aws = Math.floor(totalPrice / 100);
  const c = totalPrice % 100;

  return (
    <>
      <AddProductForm onSubmit={addProduct} />
      <h1 className="header">Added Products</h1>
      <ProductList
        products={products}
        deleteProduct={deleteProduct}
        prices={prices}
      />
      <p>
        Total Price: {aws} aws {c} c
      </p>
    </>
  );
}
