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
    <li>
      {name}
      <button type="submit" onClick={() => createNewProduct(id)}>
        +
      </button>
      <button type="submit" onClick={() => deleteCategory(id)}>
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
