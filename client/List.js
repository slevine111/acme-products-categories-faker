import React from 'react'
import SingleCategory from './SingleCategory'

const List = ({ data, createNewProduct, deleteCategory, deleteProduct }) => {
  return (
    <ul className="list-group">
      {data.map(category => {
        return (
          <SingleCategory
            key={category.id}
            category={category}
            createNewProduct={createNewProduct}
            deleteCategory={deleteCategory}
            deleteProduct={deleteProduct}
          />
        )
      })}
    </ul>
  )
}

export default List
