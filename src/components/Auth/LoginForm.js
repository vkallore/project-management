import React from 'react'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.changeInput = this.changeInput.bind(this)
  }

  changeInput(event) {
    const { handleChange } = this.props
    const { value, name } = event.target
    handleChange({ [name]: value })
  }
  render() {
    const { formFields, handleSubmit, ajaxProcessing } = this.props

    const submitForm = event => {
      event.preventDefault()
      handleSubmit(formFields)
    }

    return (
      <form onSubmit={submitForm}>
        {ajaxProcessing && <span>Loading</span>}
        <input
          type="text"
          name="username"
          label="Email:"
          onChange={this.changeInput}
        />
        <input
          type="password"
          name="password"
          label="Password:"
          onChange={this.changeInput}
        />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default LoginForm
