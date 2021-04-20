import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { generateToken } from '../../actions/session_actions';
import { createFolder } from '../../actions/folder_actions';
import ContentUploaderContainer from '../content/content_uploader_container';
import ProfilePic from "../../assets/images/profile_pic.jpg";
import Loading from "../../assets/images/loading2.gif";
import './main.scss'



function Main() {
    const dispatch = useDispatch();
    useEffect(() => dispatch(generateToken()),[]);
   
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
        changeAppType(app);
        dispatch(createFolder(app,user.folderId));
        nextFileType(prevIdx => prevIdx + 1);
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
                <ContentUploaderContainer 
                    token={token} 
                    folderId={appFolderId}
                    appType={appType}
                    fileType={fileTypes[fileTypeIdx]}
                    nextFile={nextFileType}
                    changeAppType={changeAppType} 
                /> : 
                appType || appFolderId ? <img className={'loading2'} src={Loading} /> :
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
                {body}
            </div>
        )
    } else return null
 
};

export default Main;
