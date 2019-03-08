import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import Nav from './components/Common/Nav'
import CommonModal from './components/Common/CommonModal'
import HomeContainer from './components/Home/HomeContainer'
import LoginContainer from './components/Auth/LoginContainer'
import RegisterForm from './components/Register/RegisterForm'
import PageNotFoundContainer from './components/Common/PageNotFoundContainer'
import { getLocalStorage, setLoggedIn } from './actions/AppActions'
import { USER_TOKEN } from './constants/AppConstants'
import LogoutView from './components/Auth/LogoutView'
import Footer from './components/Common/Footer'
import { TITLE_SITE } from './constants/AppLanguage'

class App extends Component {
  componentDidMount() {
    const { setLoggedIn } = this.props
    const userToken = getLocalStorage(USER_TOKEN)
    if (userToken !== null) {
      setLoggedIn(true)
    }
  }

  render() {
    const { loggedIn } = this.props
    return (
      <React.Fragment>
        <Router>
          <React.Fragment>
            <Helmet>
              <meta charSet="utf-8" />
              <title>{TITLE_SITE}</title>
              {/* <link rel="canonical" href="" /> */}
            </Helmet>
            <section>
              <Nav loggedIn={loggedIn} />
            </section>
            <div className="columns">
              <div className="column">
                <div className="section">
                  <div className="container">
                    <Switch>
                      <Route exact={true} path="/" component={HomeContainer} />
                      <Route path="/login" component={LoginContainer} />
                      <Route path="/register" component={RegisterForm} />
                      <Route path="/logout" component={LogoutView} />
                      <Route path="*" component={PageNotFoundContainer} />
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
            <CommonModal />
          </React.Fragment>
        </Router>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.common.loggedIn
})
const mapDispatchToProps = dispatch => ({
  setLoggedIn: () => {
    dispatch(setLoggedIn(true))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
