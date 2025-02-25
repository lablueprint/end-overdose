import React from 'react';
import AuthWrap from '../../components/AuthWrap';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const EOAdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
        <AuthWrap roles={['eo_admin', 'school_admin']}>
            <div className="courses-layout">{children}</div>
        </AuthWrap>
    );
};

export default EOAdminLayout;
