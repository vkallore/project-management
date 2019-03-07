import React from 'react'
import Link from 'react-router-dom/Link'

const UserNavItems = props => (
  <React.Fragment>
    <div className="navbar-start">
      <Link className="navbar-item" to="/" title="Home">
        Home
      </Link>
      <Link className="navbar-item" to="/dashboard" title="Dashboard">
        Dashboard
      </Link>
    </div>
    <div className="navbar-end">
      <div className="navbar-item">
        <Link className="navbar-item" to="/logout" title="Logout">
          Logout
        </Link>
      </div>
    </div>
  </React.Fragment>
)
export default UserNavItems
