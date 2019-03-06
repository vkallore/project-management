import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Nav from './components/Common/Nav'
import CommonModal from './components/Common/CommonModal'
import HomeContainer from './components/Home/HomeContainer'
import LoginContainer from './components/Login/LoginContainer'
import RegisterForm from './components/Register/RegisterForm'
import PageNotFoundContainer from './components/Common/PageNotFoundContainer'
import { getLocalStorage } from './actions/AppActions'
import { USER_TOKEN } from './constants/AppConstants'

class App extends Component {
  componentDidMount() {
    this.userToken = getLocalStorage(USER_TOKEN)
  }
  render() {
    return (
      <React.Fragment>
        <Router>
          <React.Fragment>
            <Nav />
            <div className="section">
              <div className="container">
                <Switch>
                  <Route exact={true} path="/" component={HomeContainer} />
                  <Route path="/login" component={LoginContainer} />
                  <Route path="/register" component={RegisterForm} />
                  <Route path="*" component={PageNotFoundContainer} />
                </Switch>
              </div>
            </div>
            <CommonModal />
          </React.Fragment>
        </Router>
      </React.Fragment>
    )
  }
}

export default App
