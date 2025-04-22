import React from 'react';
import AuthWrap from '../../components/AuthWrap';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const QuizLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
        <AuthWrap roles={['school_admin', 'eo_admin', 'student']}>
            <>{children}</>
        </AuthWrap>
    );
};

export default QuizLayout;
