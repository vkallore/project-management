import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { TITLE_TIME_LOG } from 'constants/AppLanguage'

const TimeLogList = React.lazy(() =>
  import('components/Dashboard/TimeLog/TimeLogList')
)
const TimeLogAdd = React.lazy(() =>
  import('components/Dashboard/TimeLog/TimeLogAdd')
)
const TimeLogEdit = React.lazy(() =>
  import('components/Dashboard/TimeLog/TimeLogEdit')
)

const TimeLogLayout = props => {
  const { match } = props
  return (
    <>
      <Helmet>
        <title>{TITLE_TIME_LOG}</title>
      </Helmet>
      <Switch>
        <Route
          path={`${match.url}/`}
          exact={true}
          render={() => <TimeLogList />}
        />
        <Route path={`${match.url}/add`} render={() => <TimeLogAdd />} />
        <Route
          path={`${match.url}/:timeLogId`}
          render={props => <TimeLogEdit {...props} />}
        />
      </Switch>
    </>
  )
}

export default TimeLogLayout
