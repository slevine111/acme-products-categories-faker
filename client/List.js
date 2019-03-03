import React from 'react'
import SingleCategory from './SingleCategory'

const List = ({ data }) => {
  return (
    <ul>
      {data.map(category => {
        return <SingleCategory key={category.id} category={category} />
      })}
    </ul>
  )
}

export default List
