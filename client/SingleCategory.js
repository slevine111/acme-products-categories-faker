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
      <div className="container">
        <div className="row">
          <h5 className="col">{name}</h5>
          <div className="col category-buttons">
            <button
              className="btn btn-primary btn-sm create-product-button"
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
              <i className="fas fa-trash" />
            </button>
          </div>
        </div>
      </div>

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
