import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

import Input from 'components/FormElements/Input'
import Button from 'components/FormElements/Button'
import { VALID_PATTERN_PASSWORD } from 'constants/AppConstants'
import { TEXT_LOGIN } from 'constants/AppLanguage'
import { StyledLoader } from 'components/Common/Loaders'

class LoginForm extends React.Component {
  render() {
    const { formFields, handleSubmit, ajaxProcessing, formModel } = this.props
    const submitForm = event => {
      event.preventDefault()
      handleSubmit(formFields)
    }

    return (
      <form onSubmit={submitForm}>
        <div className="field">
          <label>Username/Email:</label>
          <p className="control has-icons-left">
            <Input
              type="email"
              name="username"
              placeholder="Username/Email"
              formModel={formModel}
              required={true}
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
              required={true}
              pattern={VALID_PATTERN_PASSWORD}
            />
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={faLock} />
            </span>
          </p>
        </div>
        <div className="buttons is-centered">
          <Button
            text={TEXT_LOGIN}
            className="is-info"
            disabled={ajaxProcessing}
          />
        </div>
        <div className="ajaxloader">{!ajaxProcessing && <StyledLoader />}</div>
      </form>
    )
  }
}

export default LoginForm
