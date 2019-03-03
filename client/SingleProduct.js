import React from 'react'

const SingleProduct = ({ product }) => {
  const { name } = product
  return (
    <li>
      {name}
      <button type="submit">-</button>
    </li>
  )
}

export default SingleProduct
