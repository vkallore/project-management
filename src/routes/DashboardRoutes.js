import React, { Suspense } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import DashboardLayout from 'layouts/DashboardLayout'
import { ContentLoader } from 'components/Common/Loaders'
import TimeLogLayout from 'components/Dashboard/TimeLog/TimeLogLayout'

import { clearMessage } from 'actions'

const DashboardContainer = React.lazy(() =>
  import('components/Dashboard/DashboardContainer')
)
const LogoutView = React.lazy(() => import('components/Auth/LogoutView'))
const PageNotFoundContainer = React.lazy(() =>
  import('components/Common/PageNotFoundContainer')
)

class DashboardRoutes extends React.Component {
  renderRedirect() {
    const { loggedIn, history } = this.props
    if (loggedIn !== true && history.location.pathname !== '/') {
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
    if (loggedIn !== true && history.location.pathname !== '/') {
      history.push('/')
    }
  }

  render() {
    return (
      <DashboardLayout match={this.props.match}>
        {this.renderRedirect()}
        <Suspense fallback={<ContentLoader />}>
          <Switch>
            <Route
              path="/"
              exact={true}
              render={() => <DashboardContainer />}
            />
            <Route path="/logout" render={() => <LogoutView />} />
            <Route path="/time-log" component={TimeLogLayout} />
            {/*
              <Route path="/time-log" render={() => <TimeLogLayout />} />
              <>
                <Route path="/" exact={true} render={() => <TimeLogList />} />
                <Route path="add" render={() => <TimeLogAdd />} />
              </>
            </Route> */}
            <Route path="*" render={() => <PageNotFoundContainer />} />
          </Switch>
        </Suspense>
      </DashboardLayout>
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
  )(DashboardRoutes)
)
