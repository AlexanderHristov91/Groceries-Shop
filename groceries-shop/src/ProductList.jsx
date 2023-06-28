export function ProductList({ products, deleteProduct, prices }) {
  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id}>
          <span>{product.title}</span>
          <span> - {prices[product.title.toLowerCase()]}</span>
          <button onClick={() => deleteProduct(product.id)}>
            Delete
          </button>
          <span> - remove one</span>
        </li>
      ))}
    </ul>
  );
}
