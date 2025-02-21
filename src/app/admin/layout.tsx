import React from 'react';
import AuthWrap from '../../components/AuthWrap';

const AdminLayout: React.FC = ({ children }) => {
    return (
        <AuthWrap roles={['school_admin', 'eo_admin']}>
            <div className="courses-layout">{children}</div>
        </AuthWrap>
    );
};

export default AdminLayout;
