import React from 'react';
import AuthWrap from '../../components/AuthWrap';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
        <AuthWrap roles={['school_admin', 'eo_admin']}>
            <div className="courses-layout">{children}</div>
        </AuthWrap>
    );
};

export default AdminLayout;
