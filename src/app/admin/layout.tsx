import React from 'react';
import AuthWrap from '../../components/AuthWrap';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
        <AuthWrap roles={['school_admin', 'eo_admin']}>
            <>{children}</>
        </AuthWrap>
    );
};

export default AdminLayout;
