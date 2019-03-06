import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import { login, changeLoginRegisterForm } from '../../actions/AppActions'

import LoginForm from './LoginForm'

class LoginContainer extends React.Component {
  render() {
    const {
      loggedIn,
      handleSubmit,
      handleChange,
      ajaxProcessing,
      formFields
    } = this.props
    return (
      <React.Fragment>
        <h1 className="title">Login</h1>
        <LoginForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          ajaxProcessing={ajaxProcessing}
          formFields={formFields}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.common.loggedIn,
  ajaxProcessing: state.common.ajaxProcessing,
  formFields: state.loginRegister.login
})

const mapDispatchToProps = dispatch => ({
  handleChange: values => dispatch(changeLoginRegisterForm('login', values)),
  handleSubmit: formFields =>
    dispatch(login(formFields.username, formFields.password))
  // clearErrors: () => dispatch(setErrorMessage(''))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginContainer)
)
