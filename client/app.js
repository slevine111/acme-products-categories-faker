import React, { Component } from 'react'
import axios from 'axios'
import List from './List'

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    axios
      .get('/api/categories')
      .then(response => this.setState({ data: response.data }))
      .catch(err => console.error(err))
  }

  render() {
    return (
      <div id="main">
        <h2>
          Acme Categories and Products by <i>faker</i>
        </h2>
        <button type="submit">Create Category</button>
        <List data={this.state.data} />
      </div>
    )
  }
}

export default App
