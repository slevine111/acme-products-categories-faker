import React from 'react'
import SingleCategory from './SingleCategory'

const List = ({ data, createNewProduct, deleteCategory, deleteProduct }) => {
  return (
    <div className="container">
      <ul className="list-group col-md-9 col-lg-7 col-xm-12">
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
    </div>
  )
}

export default List
