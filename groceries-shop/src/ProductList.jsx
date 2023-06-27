import { Product } from "./Product";

export function ProductList({ products, toggleProduct, deleteProduct }) {
    return (
        <ul className="list">
      {products.length === 0 && "No products"}
      {products.map(product => {
        return (
          <Product
            {...product}
            key={product.id}
            toggleProduct={toggleProduct}
            deleteProduct={deleteProduct}
          />
        )
      })}
    </ul> 
    )
}