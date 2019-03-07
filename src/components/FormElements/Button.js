import React from 'react'

const Button = props => {
  let { className, text } = props
  className = `button ${className}`
  return <button className={className}>{text || 'Submit'}</button>
}

export default Button
