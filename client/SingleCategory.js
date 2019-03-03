import React from 'react'
import SingleProduct from './SingleProduct'

const SingleCategory = ({ category }) => {
  const { name, products } = category
  return (
    <li>
      {name}
      <button type="submit">+</button>
      <button type="submit">-</button>
      <ul>
        {products.map(product => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </ul>
    </li>
  )
}

export default SingleCategory
