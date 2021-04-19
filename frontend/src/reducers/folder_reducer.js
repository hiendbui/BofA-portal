import { 
    RECEIVE_FOLDER_ID,
    REMOVE_FOLDER_ID
 } from '../actions/folder_actions';

export default function(state = {folderId:null}, action) {
  switch (action.type) {
    case RECEIVE_FOLDER_ID:
      return {folderId: action.folderId};
    case REMOVE_FOLDER_ID:
      return {folderId: null};
    default:
      return state;
  }
}