import React from 'react';

export function ProductList({ products, deleteProduct, prices }) {

  const includedInDeal = ['banana'];

  return (
    <ul className="product-list">
      {products.map((product) => {
        const { id, title } = product;
        const price = prices[title.toLowerCase()];
        const promoMessage = includedInDeal.includes(title.toLowerCase()) ? 'Half Price Promotion' : '';

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