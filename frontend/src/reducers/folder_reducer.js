import { RECEIVE_FOLDER_ID } from '../actions/folder_actions';

export default function(state = {folderId:null}, action) {
  switch (action.type) {
    case RECEIVE_FOLDER_ID:
      return {folderId: action.folderId};
    default:
      return state;
  }
}