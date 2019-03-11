import React from 'react'
import Link from 'react-router-dom/Link'
import {
  TITLE_SITE,
  TEXT_HOME,
  TEXT_DASHBOARD,
  TEXT_LOGOUT
} from '../../../constants/AppLanguage'
import { LOGO } from '../../../constants/ImageAssets'

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

document.addEventListener('DOMContentLoaded', () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll('.navbar-burger'),
    0
  )

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target
        const $target = document.getElementById(target)

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active')
        $target.classList.toggle('is-active')
      })
    })
  }
})

export default TopNav
