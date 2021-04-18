import { React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { fetchToken } from '../../actions/session_actions'
import ContentUploader from 'box-ui-elements/es/elements/content-uploader';
import 'box-ui-elements/dist/uploader.css';



function ContentExplorer({token}) {
    return (
        <div>
            <IntlProvider locale="en">
                <ContentExplorer
                    contentPreviewProps={{
                        contentSidebarProps: {
                            detailsSidebarProps: {
                                hasProperties: true,
                                hasNotices: true,
                                hasAccessStats: true,
                                hasClassification: true,
                                hasRetentionPolicy: true,
                            },
                            // features: FEATURES,
                            hasActivityFeed: true,
                            hasMetadata: true,
                            hasSkills: true,
                            hasVersions: true,
                        },
                    }}
                    logoUrl={'https://1000logos.net/wp-content/uploads/2016/10/Bank-of-America-logo.png'}
                    rootFolderId={'0'}
                    token={token}
                />
            </IntlProvider>
        </div>
    )
};

export default ContentExplorer;