import React from 'react'

const SingleProduct = ({ product, categoryId, deleteProduct }) => {
  const { name, id } = product
  return (
    <li>
      {name}
      <button type="submit" onClick={() => deleteProduct(id, categoryId)}>
        -
      </button>
    </li>
  )
}

export default SingleProduct
