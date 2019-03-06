import React from 'react'
import Link from 'react-router-dom/Link'

import { LOGO } from '../../constants/ImageAssets'

class Nav extends React.Component {
  render() {
    return (
      <nav className="navbar is-fixed-top">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <img
                src={LOGO}
                alt="Bulma: a modern CSS framework based on Flexbox"
              />
            </Link>
            <div className="navbar-burger burger" data-target="siteMainNav">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div id="siteMainNav" className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to="/">
                Home
              </Link>
              <Link className="navbar-item" to="/login">
                Login
              </Link>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <Link
                    className="navbar-item1 button is-primary"
                    to="/register"
                  >
                    Create Account
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

document.addEventListener('DOMContentLoaded', () => {
  // Add a click event on burger
  const navBarBurger = document.querySelector('.navbar-burger')
  if (navBarBurger === undefined || navBarBurger === null) return
  navBarBurger.addEventListener('click', () => {
    // Get the target from the "data-target" attribute
    const target = navBarBurger.dataset.target
    const $target = document.getElementById(target)

    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    navBarBurger.classList.toggle('is-active')
    $target.classList.toggle('is-active')
  })
})

export default Nav
