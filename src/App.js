import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import DashboardRoutes from './routes/DashboardRoutes'
import SiteRoutes from './routes/SiteRoutes'

import { getLocalStorage, setLoggedIn } from './actions/AppActions'

import CommonModal from './components/Common/CommonModal'
import { USER_TOKEN } from './constants/AppConstants'
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
            {loggedIn ? <DashboardRoutes /> : <SiteRoutes />}
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
