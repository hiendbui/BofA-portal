import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { deleteFolder } from '../../actions/folder_actions';
import ContentUploader from 'box-ui-elements/es/elements/content-uploader';
import 'box-ui-elements/dist/uploader.css';



function ContentUpload({token,folderId,appType,fileType,nextFile,quit}) {
    const buttonName = fileType === "Bank Statements" ? 'Submit' : 'Next';
    const [buttonClass, toggleButton] = useState('disabled');
    const dispatch = useDispatch();

        return (
            <div className='content-uploader'>
                <h1>{appType} Application</h1>
                <br/>
                <h2>Please upload your {fileType} below:</h2>
                <br/>
                <IntlProvider locale="en">
                    <ContentUploader
                        language='en-US'
                        rootFolderId={folderId?.toString()}
                        token={token}
                        logoUrl={'https://1000logos.net/wp-content/uploads/2016/10/Bank-of-America-logo.png'}
                        fileLimit={3}
                        onClose={()=> {
                            nextFile(-1);
                            quit(null);
                            dispatch(deleteFolder(folderId));
                        }}
                        onComplete={toggleButton}
                    />
                </IntlProvider>
                <button 
                    className={`next ${buttonClass}`} 
                    onClick={() => {
                        if (buttonName === 'Submit') {
                            nextFile(-1);
                            quit(null);
                            return;
                        }
                        toggleButton('disabled')
                        nextFile(prevIdx=>prevIdx+1)
                    }}
                >{buttonName}
                </button>
            </div>
        )

};

export default ContentUpload;