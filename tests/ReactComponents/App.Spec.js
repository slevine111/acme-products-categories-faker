import React from 'react'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
chai.use(chaiEnzyme())
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from '../../client/app'
import List from '../../client/List'

Enzyme.configure({ adapter: new Adapter() })

let app
beforeEach(() => {
  app = shallow(<App />)
})

describe('App component', () => {
  it('test', () => {
    expect(app.find(List)).to.have.length(1)
    console.log(app.state())
  })
})
