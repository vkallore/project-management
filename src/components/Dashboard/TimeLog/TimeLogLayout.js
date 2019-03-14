import React from 'react'
import { Route, Switch } from 'react-router-dom'

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
