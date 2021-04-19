import { combineReducers } from 'redux';
import folder from './folder_reducer';
import session from './session_reducer';
import errors from './errors_reducer';

const RootReducer = combineReducers({
  folder,
  session,
  errors
});

export default RootReducer;