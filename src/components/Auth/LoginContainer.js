import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { login } from 'actions/AppActions'

import LoginForm from 'components/Auth/LoginForm'
import { FORM_LOGIN } from 'constants/AppForms'
import { TITLE_LOGIN, TEXT_LOGIN } from 'constants/AppLanguage'
import { setUserData } from 'actions/AppActions'

class LoginContainer extends React.Component {
  handleSubmit = async formFields => {
    const { login, history } = this.props
    const response = await login(formFields.username, formFields.password)
    if (response.token) {
      setUserData(response.token, response.tokenExpiry, response.refreshToken)
      history.push('/')
    }
  }

  render() {
    const { loggedIn, ajaxProcessing, formFields } = this.props
    if (loggedIn) {
      return <Redirect to="/" />
    }
    return (
      <React.Fragment>
        <Helmet>
          <title>{TITLE_LOGIN}</title>
        </Helmet>
        <h1 className="title">{TEXT_LOGIN}</h1>
        <div className="columns is-centered">
          <div className="column is-half">
            <LoginForm
              handleSubmit={this.handleSubmit}
              ajaxProcessing={ajaxProcessing}
              formFields={formFields}
              formModel={FORM_LOGIN}
            />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.common.loggedIn,
  ajaxProcessing: state.common.ajaxProcessing,
  formFields: state.forms.login
})

export default withRouter(
  connect(
    mapStateToProps,
    { login }
  )(LoginContainer)
)
