import React from 'react';
import AuthWrap from '../../components/AuthWrap';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const ProfileLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
        <AuthWrap roles={['school_admin', 'eo_admin', 'student']}>
            <div className="courses-layout">{children}</div>
        </AuthWrap>
    );
};

export default ProfileLayout;
