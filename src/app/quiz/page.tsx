'use client';
import Link from 'next/link';
import AuthWrap from '@/components/AuthWrap';

export default function Quiz() {
    return (
        <AuthWrap roles={['school_admin', 'eo_admin', 'student']}>
            <div>
                <h1> Quizzes </h1>
                <li>
                    <Link href="/quiz/mcq">Multiple Choice</Link>
                </li>
                <li>
                    <Link href="/quiz/true-false">True/False</Link>
                </li>
                <li>
                    <Link href="/quiz/scenario-game">Scenario Game</Link>
                </li>
            </div>
        </AuthWrap>
    );
}
