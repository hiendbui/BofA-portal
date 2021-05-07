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
    //create and fetch token on component mount
    useEffect(() => dispatch(generateToken()),[]);
   
    const token = useSelector(state => state.session.token);
    const user = useSelector(state => state.session.user);
    //fetch folder associated with current user
    const appFolderId = useSelector(state => state.folder.folderId);

    const [fileTypeIdx, nextFileType] = useState();
    const fileTypes = [
        'Identity Document',
        'Income Documents',
        'Tax Returns',
        'Bank Statements'
    ]

    const [appType, changeAppType] = useState();

    function startApp(app) {
        //sets type of application
        changeAppType(app);
        //creates the subfolder for files to be uploaded to for application
        dispatch(createFolder(app,user.folderId));
        //set file type idx to 0 to start with first fileType
        nextFileType(0);
    }

    //options for loan applications to be displayed when page first renders
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
    
    //render buttons when not in application,
    //render loading gif when app is initialized and req is made to create folder
    //render content uploader for application when folderId is received
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

    //display once token is fetched
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
