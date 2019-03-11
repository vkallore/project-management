import React from 'react'
import { Helmet } from 'react-helmet'

import SideNav from '../components/Dashboard/Common/SideNav'
import { TITLE_DASHBOARD } from '../constants/AppLanguage'
import TopNav from '../components/Dashboard/Common/TopNav'

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Helmet>
        <title>{TITLE_DASHBOARD}</title>
      </Helmet>
      <TopNav />

      <div className="container">
        <div className="columns">
          <div className="column column is-2">
            <SideNav />
          </div>
          <div className="column">
            <div className="section">{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
