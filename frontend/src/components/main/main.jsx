import { React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchToken } from '../../actions/session_actions';
import ContentUpload from '../content/content_upload';
import './main.scss'



function Main() {
    const dispatch = useDispatch();
    dispatch(fetchToken());
   
    const token = useSelector(state => state.session.token);
    const folderId = useSelector(state => state.session.user.folderId);
    
    if (token && folderId) {
        return (
            <ContentUpload token={token} folderId={folderId} />
        )
    } else return null
 
};

export default Main;
