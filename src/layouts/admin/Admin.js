import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import Header from '../../Header'

class Admin extends Component {

  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts

    this.state = {
      address: this.props.accounts[0],
      ownerAddress: '0x',
      isPaused: false
    }
  }

  componentWillMount() {
    this.contracts.AccessToken.methods.owner().call().then((ownerAddress) => {
      this.setState({ ownerAddress })
      if (this.state.ownerAddress !== this.state.address) {
        this.props.history.push('/')
      }
    })
  }

  componentWillUpdate() {
    this.contracts.AccessToken.methods.paused().call().then((isPaused) => {
      this.setState({ isPaused })
    })
  }

  render() {
    let pausedForm = (
      <div className="pure-u-1-1">
        <h3>The contract is not paused</h3>
        <label>Pause the contract</label>
        <ContractForm
          contract="AccessToken"
          method="pause"
        />
      </div>
    )
    if (this.state.isPaused) {
      pausedForm = (
        <div className="pure-u-1-1">
        <h3>The contract is paused</h3>
        <label>Unpause the contract</label>
          <ContractForm
            contract="AccessToken"
            method="unpause"
          />
        </div>
      )
    }

    return (
      <div>
        <Header {...this.props} />
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1 header">
              <h1>Admin</h1>
            </div>

            <div className="pure-u-1-1">
              <h2>Active Account</h2>
              <AccountData accountIndex="0" units="ether" precision="3" />
              <br/><br/>
            </div>

            <div className="pure-u-1-1">
              <h3>Bronze Subscriptions</h3>
              <p>The bronze amount is currently <ContractData contract="AccessToken" method="bronzeAmount" /> wei</p>
              <label>Set Bronze Amount (wei)</label> <br/>
              <ContractForm
                contract="AccessToken"
                method="setBronzeAmount"
                labels={['Bronze Amount in Wei']}
              />
              <br/><br/>
            </div>

            <div className="pure-u-1-1">
              <h3>Silver Subscriptions</h3>
              <p>The silver amount is currently <ContractData contract="AccessToken" method="silverAmount" /> wei</p>
              <label>Set Silver Amount (wei)</label> <br/>
              <ContractForm
                contract="AccessToken"
                method="setSilverAmount"
                labels={['Silver Amount in Wei']}
              />
              <br/><br/>
            </div>

            <div className="pure-u-1-1">
              <h3>Gold Subscriptions</h3>
              <p>The gold amount is currently <ContractData contract="AccessToken" method="goldAmount" /> wei</p>
              <label>Set Gold Amount</label> <br/>
              <ContractForm
                contract="AccessToken"
                method="setGoldAmount"
                labels={['Gold Amount in Wei']}
              />
              <br/><br/>
            </div>

            {pausedForm}

            <div className="pure-u-1-1">
            <h3>Withdraw</h3>
            <label>Withdraw the contract balance</label>
              <ContractForm
                contract="AccessToken"
                method="withdraw"
              />
            </div>

          </div>
        </main>
      </div>
    )
  }
}

Admin.contextTypes = {
  drizzle: PropTypes.object,
  drizzleStore: PropTypes.object,
}

export default Admin
