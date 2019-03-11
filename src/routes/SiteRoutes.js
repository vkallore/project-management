import React, { Suspense } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

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
  render() {
    const { loggedIn } = this.props
    if (loggedIn === true) {
      return <Redirect to="/" />
    }
    return (
      <SiteLayout>
        <Suspense fallback={<StyledLoader />}>
          <Switch>
            <Route exact={true} path="/" component={HomeContainer} />
            <Route path="/login" component={LoginContainer} />
            <Route path="/register" component={RegisterForm} />
            <Route path="*" component={PageNotFoundContainer} />
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
