import { React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { fetchToken } from '../../actions/session_actions'
import ContentUploader from 'box-ui-elements/es/elements/content-uploader';
import 'box-ui-elements/dist/uploader.css';



function ContentUpload({token,folderId,quit}) {
        return (
            <div className='content-uploader'>
                <IntlProvider locale="en">
                    <ContentUploader
                        language='en-US'
                        rootFolderId={folderId.toString()}
                        token={token}
                        logoUrl={'https://1000logos.net/wp-content/uploads/2016/10/Bank-of-America-logo.png'}
                        fileLimit={3}
                        onClose={()=>quit(null)}
                    />
                </IntlProvider>
            </div>
        )

};

export default ContentUpload;