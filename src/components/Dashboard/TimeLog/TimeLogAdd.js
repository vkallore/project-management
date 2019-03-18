import React from 'react'
import TimeLogForm from 'components/Dashboard/TimeLog/TimeLogForm'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { addTimeLog } from 'actions/TimeLogActions'

import { FORM_TIME_LOG } from 'constants/AppForms'

import { TITLE_TIME_LOG_ADD, TIME_LOG_ADD } from 'constants/AppLanguage'

import { clearMessage } from 'actions'

const AlertBox = React.lazy(() => import('components/Common/AlertBox'))

class TimeLogAdd extends React.Component {
  handleSubmit = async formFields => {
    const { addTimeLog } = this.props
    addTimeLog(formFields)
  }

  render() {
    const {
      ajaxProcessing,
      formFields,
      apiResponse,
      apiResponseType,
      allowMessageClear,
      clearMessage
    } = this.props
    return (
      <>
        <Helmet>
          <title>{TITLE_TIME_LOG_ADD}</title>
        </Helmet>
        <h1 className="title">{TIME_LOG_ADD}</h1>
        <TimeLogForm
          handleSubmit={this.handleSubmit}
          ajaxProcessing={ajaxProcessing}
          formFields={formFields}
          formModel={FORM_TIME_LOG}
        />
        <AlertBox
          alertText={apiResponse}
          alertType={apiResponseType}
          allowMessageClear={allowMessageClear}
          clearMessage={clearMessage}
        />
      </>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.common.loggedIn,
  ajaxProcessing: state.common.ajaxProcessing,
  formFields: state.forms.timeLog,
  apiResponse: state.common.apiResponse,
  apiResponseType: state.common.apiResponseType,
  allowMessageClear: state.common.allowMessageClear
})

export default withRouter(
  connect(
    mapStateToProps,
    { addTimeLog, clearMessage }
  )(TimeLogAdd)
)
