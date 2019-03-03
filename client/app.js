import React, { Component } from 'react'
import axios from 'axios'
import List from './List'

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
    this.createNewCategory = this.createNewCategory.bind(this)
    this.createNewProduct = this.createNewProduct.bind(this)
    this.deleteCategory = this.deleteCategory.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
  }

  componentDidMount() {
    axios
      .get('/api/categories')
      .then(response => this.setState({ data: response.data }))
      .catch(err => console.error(err))
  }

  createNewCategory() {
    axios.post('/api/categories').then(response => {
      return this.setState(prevState => {
        response.data.products = []
        prevState.data.push(response.data)
        return { data: prevState.data }
      })
    })
  }

  createNewProduct(categoryId) {
    axios.post(`/api/categories/${categoryId}/products`).then(response => {
      return this.setState(prevState => {
        let selectedCategory = prevState.data.find(
          category => category.id === categoryId
        )
        selectedCategory.products.push(response.data)
        return { data: prevState.data }
      })
    })
  }

  deleteCategory(categoryId) {
    axios.delete(`/api/categories/${categoryId}`).then(() => {
      return this.setState(prevState => {
        const newState = prevState.data.filter(
          category => category.id !== categoryId
        )
        return { data: newState }
      })
    })
  }

  deleteProduct(productId, categoryId) {
    console.log(productId)
    console.log(categoryId)
    axios.delete(`/api/categories/products/${productId}`).then(() => {
      return this.setState(prevState => {
        const categoryOfProduct = prevState.data.find(
          category => category.id === categoryId
        )
        categoryOfProduct.products = categoryOfProduct.products.filter(
          product => product.id !== productId
        )
        return { data: prevState.data }
      })
    })
  }

  render() {
    return (
      <div id="main">
        <h2>
          Acme Categories and Products by <i>faker</i>
        </h2>
        <button type="submit" onClick={this.createNewCategory}>
          Create Category
        </button>
        <List
          data={this.state.data}
          createNewProduct={this.createNewProduct}
          deleteCategory={this.deleteCategory}
          deleteProduct={this.deleteProduct}
        />
      </div>
    )
  }
}

export default App
