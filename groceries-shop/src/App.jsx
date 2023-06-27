import { useEffect, useState } from 'react'
import "./index.css"
import { ProductList } from './ProductList'
import { AddProductForm } from './AddProductForm'

export default function App() {
  const [products, setProducts] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(products))
  }, [products])

  function addProduct(title) {
    setProducts(currentProducts => {
      return [
        ...currentProducts,
        { id: crypto.randomUUID(), title },
      ]
    })
  }


  function deleteProduct(id) {
    setProducts(currentProducts => {
      return currentProducts.filter(product => product.id !== id)
    })
  }

  return (
    <>
      <AddProductForm onSubmit={addProduct} />
      <h1 className="header">Added Products</h1>
      <ProductList products={products} deleteProduct={deleteProduct} />
    </>
  )
}


