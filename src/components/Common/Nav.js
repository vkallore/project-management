import React from 'react'
import Link from 'react-router-dom/Link'
import {
  TITLE_SITE,
  TEXT_LOGIN,
  TEXT_HOME,
  TEXT_REGISTER
} from 'constants/AppLanguage'
import { LOGO } from 'constants/ImageAssets'

class Nav extends React.Component {
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
              data-target="siteMainNav"
              aria-label="menu"
              aria-expanded="false"
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div id="siteMainNav" className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to="/" title={TEXT_HOME}>
                {TEXT_HOME}
              </Link>
              <Link className="navbar-item" to="/login" title={TEXT_LOGIN}>
                {TEXT_LOGIN}
              </Link>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <Link
                    className="navbar-item button is-primary"
                    to="/register"
                    title={TEXT_REGISTER}
                  >
                    {TEXT_REGISTER}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Nav
