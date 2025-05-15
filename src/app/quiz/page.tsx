'use client';
import AuthWrap from '@/components/AuthWrap';
import CurrentQuiz from './components/CurrentQuiz';

export default function Quiz() {
    return (
        <AuthWrap roles={['school_admin', 'eo_admin', 'student']}>
            <div>
                <CurrentQuiz quiz={0} />
            </div>
        </AuthWrap>
    );
}
