import axios from 'axios';

export const createFolder = (appType, parentFolderId) => {
    const data = {appType, parentFolderId}
    return axios.post('/api/folders', data)
};

export const deleteFolder = (folderId) => {
    return axios.delete('/api/folders', {data: {folderId:folderId}})
};