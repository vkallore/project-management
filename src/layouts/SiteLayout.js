import React from 'react'

import Nav from '../components/Common/Nav'
import Footer from '../components/Common/Footer'

const SiteLayout = ({ children }) => {
  return (
    <>
      <section>
        <Nav loggedIn={false} />
      </section>
      <div className="columns">
        <div className="column">
          <div className="section">
            <div className="container">{children}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SiteLayout
