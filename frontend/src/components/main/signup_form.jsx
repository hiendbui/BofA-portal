import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signup } from '../../actions/session_actions';
// import './session_form.scss';

function SignupForm() {
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();


  const [formData, setFormData] = useState({
    firstName:'',
    lastName: '',
    username: '',
    password: '',
    password2: '',
  });
  
  const {firstName, lastName, username, password, password2} = formData;


  function update(field) {
    return e => setFormData({...formData, [field]: e.target.value})
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(signup(formData));
  }

  function renderErrors() {
    return(
      <ul className="errors">
        {Object.keys(errors).map((error, i) => (
          <li key={`error-${i}`}>
            {errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  
  return (
    <div className="session-form">
      {renderErrors()}
      <form onSubmit={handleSubmit}>
        <div className="signup-form">
          <input type="text"
            value={firstName}
            onChange={update('firstName')}
            placeholder="First Name"
            required
          />
          <br/>
          <input type="text"
            value={lastName}
            onChange={update('lastName')}
            placeholder="Last Name"
            required
          />
          <br/>
          <input type="text"
            value={username}
            onChange={update('username')}
            placeholder="Online ID"
            required
          />
          <br/>
          <input type="password"
            value={password}
            onChange={update('password')}
            placeholder="Password"
          />
          <br/>
          <input type="password"
            value={password2}
            onChange={update('password2')}
            placeholder="Confirm Password"
          />
          <br/>
          <input className= "submit" type="submit" value="Open an Account" />
        </div>
      </form>
    </div>
  );
}

export default SignupForm;