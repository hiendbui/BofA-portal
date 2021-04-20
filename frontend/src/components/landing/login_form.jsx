import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../actions/session_actions';
import Loading from "../../assets/images/loading.gif";

function LoginForm() {
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  const [loadingImgClass, toggleLoading] = useState('hidden');

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  // Handle field updates (called in the render method)
  function update(field) {
    return e => setFormData({...formData, [field]: e.target.value})
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    toggleLoading('loading');
    dispatch(login(formData));
  }

  useEffect(()=>toggleLoading('hidden'), [errors]);
  // Render the session errors if there are any
  function renderErrors() {
    return(
      <ul className="errors signin">
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
        <form onSubmit={handleSubmit}>
          <div>
            <br/>
              <input type="text"
                value={formData.username}
                onChange={update('username')}
                placeholder="Online ID"
                required
              />
            <br/>
            <br/>
              <input type="password"
                value={formData.password}
                onChange={update('password')}
                placeholder="Password"
                required
              />
            <br/><br/><br/><br/>
            <input className= "submit" type="submit" value="Sign In" />
            {renderErrors()}
          </div>
        </form>
        <img className={loadingImgClass} src={Loading} />
        <br/>
        <br/>
      </div>
    );
  
}

export default LoginForm;