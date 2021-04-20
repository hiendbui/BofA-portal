import * as APIUtil from '../util/folder_api_util';

export const RECEIVE_FOLDER_ID = "RECEIVE_FOLDER_ID";
export const REMOVE_FOLDER_ID = "REMOVE_FOLDER_ID";

const receiveFolderId = (folderId) => ({
    type: RECEIVE_FOLDER_ID,
    folderId
});

export const removeFolderId = () => ({
    type: REMOVE_FOLDER_ID
});

export const createFolder = (appType, parentfolderId) => dispatch => (
    APIUtil.createFolder(appType, parentfolderId)
        .then(res => { dispatch(receiveFolderId(res.data)) })
)

export const deleteFolder = (folderId) => dispatch => (
    APIUtil.deleteFolder(folderId)
        .then(res => { dispatch(removeFolderId()) })
)