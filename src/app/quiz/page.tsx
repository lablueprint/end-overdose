'use client';
import AuthWrap from '@/components/AuthWrap';
import CurrentQuiz from './components/CurrentQuiz';
import { useUserStore } from '@/store/userStore';
import { isStudent } from '@/types/newStudent';
import { useState } from 'react';

export default function Quiz() {
    const user = useUserStore((state) => state.user);
    const [quizIndex, setQuizIndex] = useState(
        isStudent(user) ? user.courses.opioidCourse.quizzes.length : 0
    );

    return (
        <AuthWrap roles={['school_admin', 'eo_admin', 'student']}>
            <div>
                <CurrentQuiz quiz={quizIndex} />
            </div>
        </AuthWrap>
    );
}
