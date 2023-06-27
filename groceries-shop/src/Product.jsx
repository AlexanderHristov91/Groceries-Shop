export function Product({ id, title, deleteProduct}) {
    return (
        <li>
            <label>
            {title}
            </label>
            <button onClick={() => deleteProduct(id)} className="btn btn-danger">
        Remove Product
      </button>
        </li>
    )
}