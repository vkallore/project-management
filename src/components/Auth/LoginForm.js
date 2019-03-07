import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

import Input from '../FormElements/Input'
import Button from '../FormElements/Button'
import { TEXT_LOGIN } from '../../constants/AppLanguage'

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

        <div className="field">
          <label>Username/Email:</label>
          <p className="control has-icons-left">
            <Input
              type="text"
              name="username"
              placeholder="Username/Email"
              formModel={formModel}
            />
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
          </p>
        </div>
        <div className="field">
          <label>Password:</label>
          <p className="control has-icons-left">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              formModel={formModel}
            />
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={faLock} />
            </span>
          </p>
        </div>
        <Button text={TEXT_LOGIN} />
      </form>
    )
  }
}

export default LoginForm
