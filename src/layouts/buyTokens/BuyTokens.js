import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import Header from '../../Header'

class BuyTokens extends Component {

  constructor(props, context) {
    super(props)
  
    this.state = {
      bronzeAmount: 0,
      silverAmount: 0,
      goldAmount: 0
    }

    this.contracts = context.drizzle.contracts
  }

  componentWillMount() {
    this.contracts.AccessToken.methods.bronzeAmount().call().then((bronzeAmount) => {
      this.setState({ bronzeAmount })
    })
    this.contracts.AccessToken.methods.silverAmount().call().then((silverAmount) => {
      this.setState({ silverAmount })
    })
    this.contracts.AccessToken.methods.goldAmount().call().then((goldAmount) => {
      this.setState({ goldAmount })
    })
  }

  render() {

    return (
      <div>
        <Header {...this.props} />
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1 header">
              <h1>Buy Tokens</h1>
            </div>

            <div className="pure-u-1-1">
              <h2>Active Account</h2>
              <AccountData accountIndex="0" units="ether" precision="3" />
              <br/><br/>
            </div>

            <div className="pure-u-1-1">
              You have <ContractData contract="AccessToken" method="balanceOf" methodArgs={ [this.props.accounts[0]] } /> tokens
              <br/><br/>
            </div>

            <div className="pure-u-1-1">
              <h3>Bronze Subscriptions</h3>
              {this.state.bronzeAmount}
              <p>A bronze subscription costs <ContractData contract="AccessToken" method="bronzeAmount" /> wei</p>
              <label>Buy Bronze Subscription</label>
              <ContractForm
                contract="AccessToken"
                method="buyBronzeSubscription"
                sendArgs={{
                  value: this.state.bronzeAmount,
                  gasPrice: 20000000000
                }}
              />
              <br/><br/>
            </div>

            <div className="pure-u-1-1">
              <h3>Silver Subscriptions</h3>
              <p>A silver subscription costs <ContractData contract="AccessToken" method="silverAmount" /> wei</p>
              <label>Buy Silver Subscription</label>
              <ContractForm
                contract="AccessToken"
                method="buySilverSubscription"
                sendArgs={{
                  value: this.state.silverAmount,
                  gasPrice: 20000000000
                }}
              />
              <br/><br/>
            </div>

            <div className="pure-u-1-1">
              <h3>Gold Subscriptions</h3>
              <p>A gold subscription costs <ContractData contract="AccessToken" method="goldAmount" /> wei</p>
              <label>Buy Gold Subscription</label>
              <ContractForm
                contract="AccessToken"
                method="buyGoldSubscription"
                sendArgs={{
                  value: this.state.goldAmount,
                  gasPrice: 20000000000
                }}
              />
              <br/><br/>
            </div>

          </div>
        </main>
      </div>
    )
  }
}

BuyTokens.contextTypes = {
  drizzle: PropTypes.object,
  drizzleStore: PropTypes.object,
}

export default BuyTokens
