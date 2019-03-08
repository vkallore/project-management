import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { login } from '../../actions/AppActions'

import LoginForm from './LoginForm'
import { FORM_LOGIN } from '../../constants/AppForms'
import AlertBox from '../Common/AlertBox'
import { TITLE_LOGIN, TEXT_LOGIN } from '../../constants/AppLanguage'

class LoginContainer extends React.Component {
  render() {
    const {
      loggedIn,
      handleSubmit,
      ajaxProcessing,
      formFields,
      apiResponse,
      apiResponseType
    } = this.props
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
            <AlertBox alertText={apiResponse} alertType={apiResponseType} />
            <LoginForm
              handleSubmit={handleSubmit}
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
  formFields: state.forms.login,
  apiResponse: state.common.apiResponse,
  apiResponseType: state.common.apiResponseType
})

const mapDispatchToProps = dispatch => ({
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
