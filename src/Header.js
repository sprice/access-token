import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


class Header extends Component {

  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts

    this.state = {
      savedAddress: localStorage.getItem('address'),
      address: this.props.accounts[0],
      ownerAddress: '0x'
    }
  }

  componentWillMount() {
    this.contracts.AccessToken.methods.owner().call().then((ownerAddress) => {
      this.setState({ ownerAddress })
    })
  }

  render() {

    let loginLogout = (
      <Link to="/login">Login</Link>
    )
    if (this.state.savedAddress) {
      loginLogout = (
        <Link to="/logout">Logout</Link>
      )
    }

    let adminLink = ''
    let buyLink = ''

    if (this.state.savedAddress === this.state.ownerAddress) {
      adminLink = (
        <Link to="/admin">Admin</Link>
      )
    }
    if (this.state.savedAddress) {
      buyLink = (
        <Link to="/buy-tokens">Buy Tokens</Link>
      )
    }

    return (
      <header className="Header">
        <Link to="/">Home</Link>
        {buyLink}
        {adminLink}
        {loginLogout}
      </header>
    );
  }
}

Header.contextTypes = {
  drizzle: PropTypes.object,
  drizzleStore: PropTypes.object,
}

export default Header
