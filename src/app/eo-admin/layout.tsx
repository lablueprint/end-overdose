import React from 'react';
import AuthWrap from '../../components/AuthWrap';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const EOAdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
        <AuthWrap roles={['eo_admin', 'school_admin']}>
            <>{children}</>
        </AuthWrap>
    );
};

export default EOAdminLayout;
