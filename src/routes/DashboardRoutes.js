import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import LogoutView from '../components/Auth/LogoutView'
import PageNotFoundContainer from '../components/Common/PageNotFoundContainer'
import DashboardLayout from '../layouts/DashboardLayout'
import DashboardContainer from '../components/Dashboard/DashboardContainer'

class DashboardRoutes extends React.Component {
  render() {
    const { loggedIn } = this.props
    if (loggedIn !== true) {
      return <Redirect to="/" />
    }
    return (
      <DashboardLayout>
        <Switch>
          <Route path="/" exact={true} component={DashboardContainer} />
          <Route path="/logout" component={LogoutView} />
          <Route path="*" component={PageNotFoundContainer} />
        </Switch>
      </DashboardLayout>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.common.loggedIn
})

export default connect(
  mapStateToProps,
  () => ({})
)(DashboardRoutes)
