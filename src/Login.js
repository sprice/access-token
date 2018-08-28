import React, { Component } from 'react'
import getWeb3 from './util/web3/getWeb3'

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      savedAddress: localStorage.getItem('address'),
      web3: null
    }
  }

  componentDidMount() {
    getWeb3.then((results) => {
      this.setState({ web3: results.web3 })
      if (!this.state.savedAddress) {
        this.login()
      } else {
        this.props.history.push('/')
      }
    })
  }

  login() {
    this.state.web3.eth.getAccounts()
      .then((accounts) => {
        const personalMessageToSign = 'Please sign in to Access Token.'
        this.state.web3.eth.personal.sign(`${personalMessageToSign.toString("hex")}`, accounts[0], 'random string')
          .then(() => {
            localStorage.setItem('address', accounts[0])
            this.setState({ savedAddress: accounts[0] })
            this.props.history.push('/')
          })
      })
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default Login
