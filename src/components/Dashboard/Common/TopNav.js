import React from 'react'
import Link from 'react-router-dom/Link'
import {
  TITLE_SITE,
  TEXT_HOME,
  TEXT_DASHBOARD,
  TEXT_LOGOUT
} from 'constants/AppLanguage'
import { LOGO } from 'constants/ImageAssets'

class TopNav extends React.Component {
  render() {
    return (
      <nav
        className="main-nav navbar is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <img src={LOGO} alt={TITLE_SITE} />
            </Link>
            <div
              className="navbar-burger burger"
              data-target="siteDashboardNav"
              aria-label="menu"
              aria-expanded="false"
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div id="siteDashboardNav" className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to="/" title={TEXT_HOME}>
                {TEXT_DASHBOARD}
              </Link>
            </div>
            <div className="navbar-end">
              <Link className="navbar-item" to="/logout" title={TEXT_LOGOUT}>
                {TEXT_LOGOUT}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default TopNav
