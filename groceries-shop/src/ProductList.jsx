import React from 'react';

export function ProductList({ products, deleteProduct, prices }) {
  console.log(products);
  const includedInDeal = ['banana', 'orange', 'tomato'];

  return (
    <ul className="product-list">
      {products.map((product) => {
        const { id, title } = product;
        const price = prices[title.toLowerCase()];
        const promoMessage = includedInDeal.includes(title.toLowerCase()) ? '3 for 2 Promotion' : '';

        return (
          <li key={id}>
            <span>{title}</span>
            <span className="price">{price} aws</span>
            <button onClick={() => deleteProduct(id)}>Delete</button>
            <span>{promoMessage}</span>
          </li>
        );
      })}
    </ul>
  );
}