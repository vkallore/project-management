import React from 'react'
import Link from 'react-router-dom/Link'
import {
  TEXT_HOME,
  TEXT_DASHBOARD,
  TEXT_LOGOUT
} from '../../constants/AppLanguage'

const UserNavItems = props => (
  <React.Fragment>
    <div className="navbar-start">
      <Link className="navbar-item" to="/" title={TEXT_HOME}>
        {TEXT_HOME}
      </Link>
      <Link className="navbar-item" to="/dashboard" title={TEXT_DASHBOARD}>
        {TEXT_DASHBOARD}
      </Link>
    </div>
    <div className="navbar-end">
      <div className="navbar-item">
        <Link className="navbar-item" to="/logout" title={TEXT_LOGOUT}>
          {TEXT_LOGOUT}
        </Link>
      </div>
    </div>
  </React.Fragment>
)
export default UserNavItems
