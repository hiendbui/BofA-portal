import axios from 'axios';

export const createFolder = (appType, parentFolderId) => {
    const data = {appType, parentFolderId}
    return axios.post('/api/folders', data)
};