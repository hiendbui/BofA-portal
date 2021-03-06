import { RECEIVE_CURRENT_USER, 
         RECEIVE_USER_LOGOUT,
        RECEIVE_TOKEN } from '../actions/session_actions';

const initialState = {
  isAuthenticated: false,
  user: {},
  token: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser
      };
    case RECEIVE_TOKEN:
    return {
      ...state,
      token: action.token
    };
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: {}
      };
    default:
      return state;
  }
}