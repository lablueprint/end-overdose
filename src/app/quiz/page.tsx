'use client';
import { useState } from 'react';
import Question from './components/Question';

export default function Home() {
    const questions = [
        {
            question: 'How are you?',
            answers: ['1', '2', '3', '4', '5'],
            correctAnswer: 1,
        },
        {
            question: 'What is your favorite food?',
            answers: ['1', '2', '3', '4', '5'],
            correctAnswer: 2,
        },
        {
            question: 'Name a breed of cat?',
            answers: ['1', '2', '3', '4', '5'],
            correctAnswer: 3,
        },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(questions[0])
    const [selectedAnswer, setSelectedAnswer] = useState(0)

    const [correctAnswer, setCorrectAnswer] = useState(currentQuestion.correctAnswer)

    return (
        <>
            <Question 
                question={currentQuestion.question}
                answers={currentQuestion.answers}
             />
        </>

    )
}

