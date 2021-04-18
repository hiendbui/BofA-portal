import {React, useState} from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from './login_form';
import SignupForm from './signup_form';
import { clearErrors } from '../../actions/session_actions';
import LandingPage from "../../assets/images/landing_page.png";

import './landing.scss'

function Landing() {
  const dispatch = useDispatch();

  const [formType, toggleForm] = useState('login')
  const otherFormType = formType === 'login' ? 'signup' : 'login';
  const sessionForm = formType === 'login' ? <LoginForm/> : <SignupForm/>
  const buttonValue = formType === 'login' ? 'Open an Account' : 'Log into Account'
  
  return (
    <div className="landing">
        <img id='landing-img' src={LandingPage} />
        <div className='session-form-container'>
          {sessionForm}
          <button className='toggle-btn' 
            onClick={() => {
              dispatch(clearErrors());
              toggleForm(otherFormType);
            }}
          >
            {buttonValue}
          </button>
        </div>
    </div>
  );
  
}

export default Landing;