import React from 'react'

export function ProductList({ products, deleteProduct }) {
  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id}>
          {product.title}
          <button onClick={() => deleteProduct(product.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}
