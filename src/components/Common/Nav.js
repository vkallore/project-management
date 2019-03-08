import React from 'react'
import Link from 'react-router-dom/Link'

import { LOGO } from '../../constants/ImageAssets'
import UserNavItems from './UserNavItems'
import PublicNavItems from './PublicNavItems'
import { TITLE_SITE } from '../../constants/AppLanguage'

class Nav extends React.Component {
  render() {
    const { loggedIn } = this.props
    return (
      <div className="hero-head">
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
              {loggedIn ? <UserNavItems /> : <PublicNavItems />}
            </div>
          </div>
        </nav>
      </div>
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

export default Nav
