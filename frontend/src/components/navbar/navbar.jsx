import {React, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../actions/session_actions';
import { logout } from '../../actions/session_actions';
import NavBarImg from "../../assets/images/navbar.png";
import './nav.scss'

function NavBar() {
  const dispatch = useDispatch();
  const curUser = useSelector(state => state.session.user);
    
  return (
    <div className="navbar">
        <img id='nav' src={NavBarImg} />
        <div className="nav-details">
            {curUser.firstName + ' ' + curUser.lastName}
            <span> | </span>
            <button
                onClick={() => {
                    dispatch(logout())
                    dispatch(clearErrors())
                }}
            >
                Sign Out
            </button>
        </div>
    </div>
  );
  
}

export default NavBar;