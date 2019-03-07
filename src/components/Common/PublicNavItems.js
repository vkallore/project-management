import React from 'react'
import Link from 'react-router-dom/Link'

const PublicNavItems = props => (
  <React.Fragment>
    <div className="navbar-start">
      <Link className="navbar-item" to="/" title="Home">
        Home
      </Link>
      <Link className="navbar-item" to="/login" title="Login">
        Login
      </Link>
    </div>
    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <Link className="navbar-item button is-primary" to="/register">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  </React.Fragment>
)
export default PublicNavItems
