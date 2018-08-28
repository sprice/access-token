import BuyTokens from './BuyTokens'
import { drizzleConnect } from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    SimpleStorage: state.contracts.SimpleStorage,
    TutorialToken: state.contracts.TutorialToken,
    AccessToken: state.contracts.AccessToken,
    drizzleStatus: state.drizzleStatus
  }
}

const BuyTokensContainer = drizzleConnect(BuyTokens, mapStateToProps);

export default BuyTokensContainer
