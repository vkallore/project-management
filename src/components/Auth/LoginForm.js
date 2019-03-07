import React from 'react'

import Input from '../FormElements/Input'

class LoginForm extends React.Component {
  render() {
    const { formFields, handleSubmit, ajaxProcessing, formModel } = this.props
    const submitForm = event => {
      event.preventDefault()
      handleSubmit(formFields)
    }

    return (
      <form onSubmit={submitForm}>
        {ajaxProcessing && <span>Loading</span>}
        <Input
          type="text"
          name="username"
          label="Email:"
          formModel={formModel}
        />
        <Input
          type="password"
          name="password"
          label="Password:"
          formModel={formModel}
        />
        <Input type="submit" value="Submit" />
      </form>
    )
  }
}

export default LoginForm
