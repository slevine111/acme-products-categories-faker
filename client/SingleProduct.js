import React from 'react'

const SingleProduct = ({ product, categoryId, deleteProduct }) => {
  const { name, id } = product
  return (
    <li className="product-list-item">
      {name}
      <button
        className="btn btn-danger btn-sm product-delete-button"
        type="submit"
        onClick={() => deleteProduct(id, categoryId)}
      >
        <i className="fas fa-trash" />
      </button>
    </li>
  )
}

export default SingleProduct
