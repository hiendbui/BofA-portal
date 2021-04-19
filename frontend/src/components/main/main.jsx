import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchToken } from '../../actions/session_actions';
import { createFolder } from '../../actions/folder_actions';
import ContentUpload from '../content/content_upload';
import ProfilePic from "../../assets/images/profile_pic.jpg";
import './main.scss'



function Main() {
    const dispatch = useDispatch();
    useEffect(()=>dispatch(fetchToken()),[]);
   
    const token = useSelector(state => state.session.token);
    const user = useSelector(state => state.session.user);
    const appFolderId = useSelector(state => state.folder.folderId);
    const [fileTypeIdx, nextFileType] = useState(-1);
    const fileTypes = [
        'Identity Document',
        'Income Documents',
        'Tax Returns',
        'Bank Statements'
    ]
    const [appType, changeAppType] = useState();

    function startApp(app) {
        dispatch(createFolder(app,user.folderId));
        nextFileType(prevIdx => prevIdx + 1);
        changeAppType(app);
    }

    const buttons = () => {
        return (
            <div className="body">
                <h1>What would you like to do today?</h1>
                <div className='apply-btns'>
                    <button onClick={()=>startApp('Credit Card')}>Apply for Credit Card</button>
                    <button onClick={()=>startApp('Mortgage Loan')}>Apply for Mortgage Loan</button>
                    <button onClick={()=>startApp('Auto Loan')}>Apply for Auto Loan</button>
                </div>
            </div>
        )
    }
   
    const body = appType && appFolderId ? 
                <ContentUpload 
                    token={token} 
                    folderId={appFolderId}
                    appType={appType}
                    fileType={fileTypes[fileTypeIdx]}
                    nextFile={nextFileType}
                    quit={changeAppType} 
                /> : 
                buttons();

    if (token) {
        return (
            <div className='main'>
                <div className='profile'>
                    <img src={ProfilePic}/>
                    <h2>Bank of America Preferred Client</h2>
                    <h1>Hello, {user.firstName}</h1>  
                </div>
                <br/>
                <br/>
                {body}
            </div>
        )
    } else return null
 
};

export default Main;
