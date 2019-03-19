import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { timeLogs } from 'actions/TimeLogActions'

import { TEXT_TIME_LOG, TITLE_TIME_LOG } from 'constants/AppLanguage'
import { clearMessage } from 'actions'

import { SvgLoader } from 'components/Common/Loaders'

import { queryParse, stringify } from 'services'

const AlertBox = React.lazy(() => import('components/Common/AlertBox'))

class TimeLogList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userTimeLogs: [],
      totalRecords: 0,
      perPage: 3,
      currentPage: 1
    }
    this.getData = this.getData.bind(this)
    this.paginate = this.paginate.bind(this)
  }

  getData = async () => {
    const { timeLogs } = this.props
    const { perPage } = this.state

    let { page } = queryParse()

    let { currentPage } = this.state

    currentPage = parseInt(page === undefined || page < 1 ? currentPage : page)

    const offset = (currentPage - 1) * perPage

    const userTimeLogResponse = await timeLogs({ offset, perPage })

    this.setState({
      userTimeLogs: userTimeLogResponse.data || [],
      totalRecords: userTimeLogResponse.totalRecords || 0,
      currentPage: currentPage + 1
    })
  }

  paginate(page) {
    const { history } = this.props
    let query = queryParse()

    let newQuery = {
      ...query,
      page: page
    }

    const queryString = stringify(newQuery)

    history.push({ search: queryString })

    this.setState({
      currentPage: page + 1
    })
  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props
    if (prevProps.location.search !== location.search) {
      this.getData()
    }
  }

  render() {
    const { loggedIn } = this.props
    if (!loggedIn) {
      return <Redirect to="/" />
    }
    const {
      ajaxProcessing,
      apiResponse,
      apiResponseType,
      allowMessageClear,
      clearMessage
    } = this.props

    const { userTimeLogs, currentPage } = this.state

    const htmlUserTimeLogs = userTimeLogs.map(userTimeLog => {
      return (
        <div key={userTimeLog.id}>
          category: {userTimeLog.category} <br />
          createdAt: {userTimeLog.createdAt} <br />
          createdBy: {userTimeLog.createdBy} <br />
          durationInMin: {userTimeLog.durationInMin} <br />
          endTime: {userTimeLog.endTime} <br />
          startTime: {userTimeLog.startTime} <br />
          taskId: {userTimeLog.taskId} <br />
          taskName: {userTimeLog.taskName} <br />
          <br />
        </div>
      )
    })

    return (
      <>
        <Helmet>
          <title>{TITLE_TIME_LOG}</title>
        </Helmet>
        <h1 className="title">{TEXT_TIME_LOG}</h1>
        <a onClick={() => this.paginate(currentPage)}>Next</a>
        {htmlUserTimeLogs}
        <AlertBox
          alertText={apiResponse}
          alertType={apiResponseType}
          allowMessageClear={allowMessageClear}
          clearMessage={clearMessage}
        />
        <div className="ajaxloader">{ajaxProcessing && <SvgLoader />}</div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.common.loggedIn,
  ajaxProcessing: state.common.ajaxProcessing,
  apiResponse: state.common.apiResponse,
  apiResponseType: state.common.apiResponseType,
  allowMessageClear: state.common.allowMessageClear
})

export default withRouter(
  connect(
    mapStateToProps,
    { timeLogs, clearMessage }
  )(TimeLogList)
)
