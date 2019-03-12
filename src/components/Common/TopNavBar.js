import React from 'react'
import Link from 'react-router-dom/Link'
import { TITLE_SITE } from 'constants/AppLanguage'
import { LOGO } from 'constants/ImageAssets'
import { useMenuToggle } from 'helpers/HooksHelpers'

const TopNavBar = ({ children }) => {
  const [menuToggle, setMenuToggle] = useMenuToggle(false)

  const menuToggleClass = menuToggle ? 'is-active' : ''

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
            className={`navbar-burger burger ${menuToggleClass}`}
            data-target="siteMainNav"
            aria-label="menu"
            aria-expanded="false"
            onClick={() => setMenuToggle()}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div
          id="siteMainNav"
          className={`navbar-menu ${menuToggleClass}`}
          onClick={() => setMenuToggle()}
        >
          {children}
        </div>
      </div>
    </nav>
  )
}

export default TopNavBar
