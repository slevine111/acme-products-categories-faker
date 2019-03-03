import React from 'react'
import SingleProduct from './SingleProduct'

const SingleCategory = ({
  category,
  createNewProduct,
  deleteCategory,
  deleteProduct
}) => {
  const { name, products, id } = category
  return (
    <li className="list-group-item">
      {name}
      <button
        className="btn btn-primary btn-sm"
        type="submit"
        onClick={() => createNewProduct(id)}
      >
        +
      </button>
      <button
        className="btn btn-danger btn-sm"
        type="submit"
        onClick={() => deleteCategory(id)}
      >
        -
      </button>
      <ul>
        {products.map(product => (
          <SingleProduct
            key={product.id}
            product={product}
            categoryId={id}
            deleteProduct={deleteProduct}
          />
        ))}
      </ul>
    </li>
  )
}

export default SingleCategory
