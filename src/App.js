import React, { Component, Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import DashboardRoutes from 'routes/DashboardRoutes'
import SiteRoutes from 'routes/SiteRoutes'

import { TITLE_SITE } from 'constants/AppLanguage'

import { clearMessage } from 'actions'

const CommonModal = React.lazy(() => import('components/Common/CommonModal'))
const AlertBox = React.lazy(() => import('components/Common/AlertBox'))

class App extends Component {
  render() {
    const {
      loggedIn,
      apiResponse,
      apiResponseType,
      allowMessageClear,
      clearMessage
    } = this.props
    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{TITLE_SITE}</title>
          {/* <link rel="canonical" href="" /> */}
        </Helmet>
        <Router>{loggedIn ? <DashboardRoutes /> : <SiteRoutes />}</Router>
        <Suspense fallback={null}>
          <CommonModal />
          <AlertBox
            alertText={apiResponse}
            alertType={apiResponseType}
            allowMessageClear={allowMessageClear}
            clearMessage={clearMessage}
          />
        </Suspense>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.common.loggedIn,
  apiResponse: state.common.apiResponse,
  apiResponseType: state.common.apiResponseType,
  allowMessageClear: state.common.allowMessageClear
})

const mapDispatchToProps = dispatch => ({
  clearMessage: () => {
    dispatch(clearMessage())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
