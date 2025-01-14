'use client';
import Link from 'next/link';
import { useState } from 'react';
import './styles.css';

interface QuizProps {
    title: string;
    description: string;
}

export default function Quiz({ title, description }: QuizProps) {
    const [hasStarted, setHasStarted] = useState(false);
    const handleStart = () => {
        setHasStarted(true);
    };

    return (
        <>
            {!hasStarted ? (
                <div className="answers-container">
                    <h1>Title: {title}</h1>
                    <p>Description: {description}</p>
                    <button onClick={handleStart}>Begin Quiz</button>
                </div>
            ) : (
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
            )}
        </>
    );
}
