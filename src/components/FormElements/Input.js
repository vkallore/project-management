import React from 'react'
import { connect } from 'react-redux'

import { changeForm } from 'actions/AppActions'

class Input extends React.Component {
  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    const { onChange, formModel } = this.props
    const { value, name } = event.target
    if (typeof onChange === 'function') {
      onChange(formModel, { [name]: value })
    }
  }

  render() {
    const { id, type, name, value, formModel, forms } = this.props
    let { className } = this.props
    const inputValue =
      value === undefined
        ? forms[formModel] && forms[formModel][name]
          ? forms[formModel][name]
          : ''
        : value
    className = `input ${className}`
    return (
      <React.Fragment>
        <input
          type={type || 'text'}
          name={name || ''}
          id={id || name}
          value={inputValue}
          onChange={this.onChange}
          className={className}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  forms: state.forms
})

const mapDispatchToProps = dispatch => ({
  onChange: (formModel, values) => dispatch(changeForm(formModel, values))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Input)
