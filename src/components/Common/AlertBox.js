import React from 'react'

const AlertBox = props => {
  let { alertType, alertText, allowDelete, children } = props
  const className = `notification is-${alertType}`
  if ((alertText === undefined || alertText === '') && children === undefined) {
    return null
  }
  let alertTextSplit = alertText.split('\n')
  const alertTextHtml = alertTextSplit.map(alertText => {
    return (
      <React.Fragment key={alertText}>
        <span>
          {alertText}
          {alertTextSplit.length > 1 ? <br /> : null}
        </span>
      </React.Fragment>
    )
  })
  return (
    <div className={className}>
      {allowDelete && <button className="delete" />}
      {alertTextHtml}
      {children ? children : null}
    </div>
  )
}

export default AlertBox
