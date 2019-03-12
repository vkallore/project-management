import React, { Suspense } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import SiteLayout from 'layouts/SiteLayout'
import { StyledLoader } from '../components/Common/Loaders'

const HomeContainer = React.lazy(() =>
  import('components/Site/Home/HomeContainer')
)
const LoginContainer = React.lazy(() =>
  import('components/Auth/LoginContainer')
)
const RegisterForm = React.lazy(() =>
  import('components/Site/Register/RegisterForm')
)
const PageNotFoundContainer = React.lazy(() =>
  import('components/Common/PageNotFoundContainer')
)

class SiteRoutes extends React.Component {
  renderRedirect() {
    const { loggedIn } = this.props
    if (loggedIn === true) {
      return <Redirect to="/" />
    }
    return null
  }
  render() {
    return (
      <SiteLayout>
        {this.renderRedirect()}
        <Suspense fallback={<StyledLoader />}>
          <Switch>
            <Route exact={true} path="/" render={() => <HomeContainer />} />
            <Route path="/login" render={() => <LoginContainer />} />
            <Route path="/register" render={() => <RegisterForm />} />
            <Route path="*" render={() => <PageNotFoundContainer />} />
          </Switch>
        </Suspense>
      </SiteLayout>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.common.loggedIn
})

export default withRouter(
  connect(
    mapStateToProps,
    () => ({})
  )(SiteRoutes)
)
