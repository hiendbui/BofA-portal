import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { deleteFolder, removeFolderId } from '../../actions/folder_actions';
import ContentUploader from 'box-ui-elements/es/elements/content-uploader';
import 'box-ui-elements/dist/uploader.css';



function ContentUploaderContainer({token,folderId,appType,fileType,nextFile,changeAppType}) {
    // since bank statements are last fileType to be submitted,
    // we'd want the btn name to be 'Submit' rather than 'Next'
    const buttonName = fileType === "Bank Statements" ? 'Submit' : 'Next';
    //btn is disabled by default until user uploads a file
    const [buttonClass, toggleButton] = useState('disabled');
    const dispatch = useDispatch();

    function deleteApplication() {
        //reset file/app types to exit app 
        nextFile();
        changeAppType();
        //delete subfolder for application files
        dispatch(deleteFolder(folderId));
    }

    return (
        <div className='content-uploader-container'>
            <h1>{appType} Application</h1>
            <br/>
            <h2>Please upload your {fileType} below:</h2>
            <br/>
            <IntlProvider locale="en">
                <ContentUploader
                    className='content-uploader'
                    language='en-US'
                    rootFolderId={folderId?.toString()}
                    token={token}
                    logoUrl={'https://1000logos.net/wp-content/uploads/2016/10/Bank-of-America-logo.png'}
                    fileLimit={3}
                    onClose={deleteApplication}
                    //enables user to click to proceed once file is uploaded
                    onComplete={toggleButton}
                />
            </IntlProvider>
            <button
                className='delete'
                onClick={deleteApplication}>
                Delete App
            </button>
            <button 
                className={`next ${buttonClass}`} 
                onClick={() => {
                    if (buttonName === 'Submit') {
                        nextFile();
                        changeAppType();
                        dispatch(removeFolderId());
                        return;
                    }
                    toggleButton('disabled');
                    nextFile(prevIdx=>prevIdx+1);
                }}
            >{buttonName}
            </button>
        </div>
    )

};

export default ContentUploaderContainer;