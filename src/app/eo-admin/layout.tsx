import React from 'react';
import AuthWrap from '../../components/AuthWrap';

const EOAdminLayout: React.FC = ({ children }) => {
    return (
        <AuthWrap roles={['school_admin', 'eo_admin', 'student']}>
            <div className="courses-layout">{children}</div>
        </AuthWrap>
    );
};

export default EOAdminLayout;
