import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import HomeContainer from '../components/Home/HomeContainer'
import LoginContainer from '../components/Auth/LoginContainer'
import RegisterForm from '../components/Register/RegisterForm'
import PageNotFoundContainer from '../components/Common/PageNotFoundContainer'
import SiteLayout from '../layouts/SiteLayout'

class SiteRoutes extends React.Component {
  render() {
    const { loggedIn } = this.props
    if (loggedIn === true) {
      return <Redirect to="/" />
    }
    return (
      <SiteLayout>
        <Switch>
          <Route exact={true} path="/" component={HomeContainer} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/register" component={RegisterForm} />
          <Route path="*" component={PageNotFoundContainer} />
        </Switch>
      </SiteLayout>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.common.loggedIn
})

export default connect(
  mapStateToProps,
  () => ({})
)(SiteRoutes)
