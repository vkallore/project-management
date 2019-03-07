import React from 'react'

const AlertBox = props => {
  let { alertType, alertText, allowDelete } = props
  const className = `notification is-${alertType}`
  if (alertText === undefined || alertText === '') {
    return null
  }
  return (
    <div className={className}>
      {allowDelete && <button className="delete" />}
      {alertText}
    </div>
  )
}

export default AlertBox
