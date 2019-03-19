import React, { Suspense } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import SiteLayout from 'layouts/SiteLayout'
import { ContentLoader } from 'components/Common/Loaders'

import { clearMessage } from 'actions'

const HomeContainer = React.lazy(() =>
  import('components/Site/Home/HomeContainer')
)
const LoginContainer = React.lazy(() =>
  import('components/Auth/LoginContainer')
)
const RegisterContainer = React.lazy(() =>
  import('components/Site/Register/RegisterContainer')
)
const PageNotFoundContainer = React.lazy(() =>
  import('components/Common/PageNotFoundContainer')
)

class SiteRoutes extends React.Component {
  renderRedirect() {
    const { loggedIn, history } = this.props
    if (loggedIn === true && history.location.pathname !== '/') {
      return <Redirect to="/" />
    }
    return null
  }

  componentDidUpdate(prevProps) {
    const { clearMessage } = this.props
    if (prevProps.location.pathname !== this.props.location.pathname) {
      clearMessage()
    }

    const { loggedIn, history } = this.props
    if (loggedIn === true && history.location.pathname !== '/') {
      history.push('/')
    }
  }

  render() {
    return (
      <SiteLayout>
        {this.renderRedirect()}
        <Suspense fallback={<ContentLoader />}>
          <Switch>
            <Route exact={true} path="/" render={() => <HomeContainer />} />
            <Route path="/login" render={() => <LoginContainer />} />
            <Route path="/register" render={() => <RegisterContainer />} />
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

const mapDispatchToProps = dispatch => ({
  clearMessage: () => {
    dispatch(clearMessage())
  }
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SiteRoutes)
)
