import React from 'react'
import Link from 'react-router-dom/Link'

const SideNav = props => {
  return (
    <aside className="menu section">
      <p className="menu-label"> Group </p>
      <ul className="menu-list">
        <li>
          <Link to="/link-1"> Link 1 </Link>
        </li>
        <li>
          <Link to="/link-2"> Link 2 </Link>
        </li>
      </ul>
    </aside>
  )
}

export default SideNav
