import React from 'react'

const AlertBox = props => {
  let { alertType, alertText, allowDelete } = props
  const className = `notification is-${alertType}`
  if (alertText === undefined || alertText === '') {
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
    </div>
  )
}

export default AlertBox
