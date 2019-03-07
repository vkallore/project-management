import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { logout } from '../../actions/AppActions'

class LogoutView extends React.Component {
  componentDidMount() {
    this.props.dispatch(logout())
  }
  render() {
    return <Redirect to="/" />
  }
}

export default connect()(LogoutView)
