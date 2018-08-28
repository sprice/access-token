import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AccountData } from 'drizzle-react-components'
import Header from '../../Header'
import posts from '../../data'

class Home extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts

    this.state = {
      savedAddress: localStorage.getItem('address'),
      address: this.props.accounts[0],
      level: 'free',
      tokenBalance: 0,
    }
  }

  componentWillMount() {
    if (this.state.savedAddress) {
      this.contracts.AccessToken.methods.balanceOf(this.state.address).call().then((tokenBalance) => {
        this.setState({ tokenBalance })
        this.setLevel(tokenBalance)
      })
    }
  }

  setLevel(tokenBalance) {
    for (let i = 0; i < tokenBalance; i++) {
      this.contracts.AccessToken.methods.tokenOfOwnerByIndex(this.state.address, i).call().then((tokenId) => {
        this.contracts.AccessToken.methods.getSubscriptionLevel(tokenId).call().then((level) => {
          this.updateLevel(level)
        })
      })
    }
  }

  updateLevel(level) {
    switch (level) {
      case 'gold':
        this.setState({ level: 'gold'} )
        break
      case 'silver':
        if (this.state.level !== 'gold') {
          this.setState({ level: 'silver'} )
        }
        break
      case 'bronze':
        if (this.state.level !== 'gold' && this.state.level !== 'silver') {
          this.setState({ level: 'bronze'} )
        }
        break
      default:
        break
    }
  }

  hasAccess(contentLevel) {
    if (this.state.level === 'gold') return true
    if (contentLevel === 'silver' && this.state.level === 'silver') return true
    if (contentLevel === 'bronze') {
      if (this.state.level === 'bronze' || this.state.level === 'silver') return true
    }
    if (contentLevel === 'free') return true
    return false
  }

  render() {

    const data = posts.map((post) => {
      if (this.hasAccess(post.level)) {
        return (
          <div className="pure-u-1-1" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        )
      } else {
        return false
      }
    })

    let account = (
      <div/>
    )

    if (this.state.savedAddress) {
      account = (
        <div className="pure-u-1-1">
          <h2>Active Account</h2>
          <AccountData accountIndex="0" units="ether" precision="3" />

          <br/><br/>
        </div>
      )
    }

    let subscription = 'You do not have a subscription'
    if (this.state.level !== 'free') {
      subscription = `You have a ${this.state.level} subscription`
    }

    return (
      <div>
        <Header {...this.props} />
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1 header">
              <h1>Posts</h1>
              <p>{subscription}</p>
            </div>

            {account}

            {data}

          </div>
        </main>
      </div>
    )
  }
}

Home.contextTypes = {
  drizzle: PropTypes.object,
  drizzleStore: PropTypes.object,
}

export default Home
