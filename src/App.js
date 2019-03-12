import React, { Component, Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import DashboardRoutes from 'routes/DashboardRoutes'
import SiteRoutes from 'routes/SiteRoutes'

import { TITLE_SITE } from 'constants/AppLanguage'

const CommonModal = React.lazy(() => import('components/Common/CommonModal'))

class App extends Component {
  render() {
    const { loggedIn } = this.props
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
        </Suspense>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.common.loggedIn
})

export default connect(mapStateToProps)(App)
