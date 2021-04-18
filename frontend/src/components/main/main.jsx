import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchToken } from '../../actions/session_actions';
import ContentUpload from '../content/content_upload';
import ProfilePic from "../../assets/images/profile_pic.jpg";
import './main.scss'



function Main() {
    const dispatch = useDispatch();
    dispatch(fetchToken());
   
    const token = useSelector(state => state.session.token);
    const user = useSelector(state => state.session.user);
    const [fileTypeIdx, nextFileType] = useState(-1);
    const fileTypes = [
        'identity document',
        'income documents',
        'tax returns',
        'bank statements'
    ]
    const [appType, changeAppType] = useState();

    function startApp(app) {
        nextFileType(prevIdx => prevIdx + 1);
        changeAppType(app);
    }
    const buttons = () => {
        return (
            <div className="body">
                <h1>What would you like to do today?</h1>
                <div className='apply-btns'>
                    <button onClick={()=>startApp('credit')}>Apply for Credit Card</button>
                    <button onClick={()=>startApp('mortgage')}>Apply for Mortgage Loan</button>
                    <button onClick={()=>startApp('auto')}>Apply for Auto Loan</button>
                </div>
            </div>
        )
    }
   
    const body = appType ? 
                <ContentUpload 
                    token={token} 
                    folderId={user.folderId}
                    appType={appType}
                    // fileType={uploa}
                    quit={changeAppType} 
                /> : 
                buttons();

    if (token && user.folderId) {
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
