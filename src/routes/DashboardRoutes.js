import React from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { clearMessage } from 'actions'

import LogoutView from 'components/Auth/LogoutView'
import PageNotFoundContainer from 'components/Common/PageNotFoundContainer'
import DashboardContainer from 'components/Dashboard/DashboardContainer'

import DashboardLayout from 'layouts/DashboardLayout'

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
      <DashboardLayout>
        {this.renderRedirect()}
        <Switch>
          <Route path="/" exact={true} component={DashboardContainer} />
          <Route path="/logout" component={LogoutView} />
          <Route
            path="/link-1"
            component={() => {
              console.log('a')
              return <div>TEST</div>
            }}
          />
          <Route path="*" component={PageNotFoundContainer} />
        </Switch>
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
