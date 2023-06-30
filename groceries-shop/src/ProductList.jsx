import React from "react";

export function ProductList({ products, deleteProduct, prices }) {
  // const includedInDeal = ["banana"];
  const promo3for2 = ["banana", "apple"];
  const buy1get1halfPrice = ["tomato"];
  return (
    <ul className="product-list">
      {products.map((product) => {
        const { id, title } = product;
        const price = prices[title.toLowerCase()];
        {
          /* const promoMessage = includedInDeal.includes(title.toLowerCase())
          ? "Half Price Promotion"
          : ""; */
        }
        let promoMessage = "";
        if (promo3for2.includes(title.toLowerCase())) {
          promoMessage = "Promo 3 for 2";
        }
        if (buy1get1halfPrice.includes(title.toLowerCase())) {
          promoMessage = "Promo Buy 1 get 1 half price";
        }
        return (
          <li key={id}>
            <span>{title}</span>
            <span className="price">{price} aws</span>
            <button onClick={() => deleteProduct(id)}>Delete</button>
            {promoMessage && <span className="promo">{promoMessage}</span>}
          </li>
        );
      })}
    </ul>
  );
}
