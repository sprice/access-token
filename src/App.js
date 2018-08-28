import React, { Component } from 'react'
import { Route } from 'react-router'
import HomeContainer from './layouts/home/HomeContainer'
import BuyTokensContainer from './layouts/buyTokens/BuyTokensContainer'
import AdminContainer from './layouts/admin/AdminContainer'
import Login from './Login'
import Logout from './Logout'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={HomeContainer}/>
        <Route exact path="/buy-tokens" component={BuyTokensContainer}/>
        <Route exact path="/admin" component={AdminContainer}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/logout" component={Logout}/>
      </div>
    );
  }
}

export default App
