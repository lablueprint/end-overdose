'use client';
import Link from 'next/link';

export default function Quiz() {
    return (
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
    );
}
