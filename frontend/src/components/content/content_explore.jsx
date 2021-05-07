import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { generateToken, logout, clearErrors } from '../../actions/session_actions'
import ContentExplorer from 'box-ui-elements/es/elements/content-explorer';
import 'box-ui-elements/dist/explorer.css';
import './content_explore.scss';



function ContentExplore() {
    const dispatch = useDispatch();
    //create and fetch token on component mount
    useEffect(() => dispatch(generateToken()),[]);
   
    const token = useSelector(state => state.session.token);
    
    if (token) {
        return (
        <div className='content-explore'>
            <br/>
            <div className='nav'>
                Welcome, Admin
                <button
                    className='next signout'
                    onClick={() => {
                        dispatch(logout())
                        dispatch(clearErrors())
                    }}
                >
                    Sign Out
                </button>
            </div>
            <IntlProvider locale="en">
                <ContentExplorer
                    className='content-explorer'
                    //sent configurations for admin controls/capabilities
                    contentPreviewProps={{
                        contentSidebarProps: {
                            detailsSidebarProps: {
                                hasProperties: true,
                                hasNotices: true,
                                hasAccessStats: true,
                                hasClassification: true,
                                hasRetentionPolicy: true,
                                hasVersions: true,
                                hasSkills: true
                            },
                            hasActivityFeed: true,
                            hasMetadata: true,
                            hasSkills: true,
                            hasVersions: true,
                        },
                        contentOpenWithProps: {
                             dropdownAlignment: 'left'   
                        }
                    }}
                    autoFocus={true}
                    canSetShareAccess={false}
                    canShare={false}
                    canRename={false}
                    canDelete={false}
                    canDownload={false}
                    logoUrl={'https://1000logos.net/wp-content/uploads/2016/10/Bank-of-America-logo.png'}
                    rootFolderId={'0'}
                    token={token}
                />
            </IntlProvider>
        </div>
    )} else return null; 
};

export default ContentExplore;