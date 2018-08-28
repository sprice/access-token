import React, { Component } from 'react'

class Logout extends Component {

  constructor(props) {
    super(props)

    this.state = {
      savedAddress: localStorage.getItem('address'),
      web3: null
    }
  }

  componentDidMount() {
    this.logout()
  }

  logout() {
    localStorage.removeItem('address')
    this.setState({savedAddress: null})
    this.props.history.push('/')

  }

  render() {
    return (
      <div></div>
    );
  }
}

export default Logout
