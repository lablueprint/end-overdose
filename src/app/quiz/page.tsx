'use client';
import { useState } from 'react';
import Question from './components/Question';

export default function Quiz() {
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

    const [currentScore, setCurrentScore] = useState(0);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    const currentQuestion = questions[currentQuestionIndex];

    // const [correctAnswer, setCorrectAnswer] = useState(currentQuestion.correctAnswer)

    const handleAnswerSelected = (answerIndex: number) => {
        setSelectedAnswer(answerIndex);
        if (answerIndex === currentQuestion.correctAnswer) {
            alert('Correct!');
            setCurrentScore(currentScore + 1);
        } else {
            alert('Wrong!');
        }

        // Move to the next question
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setSelectedAnswer(null);
            } else {
                alert('Quiz complete!');
            }
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }, 1000);
    };

    return (
        <>
            {currentQuestionIndex < questions.length ? (
                <Question
                    question={currentQuestion.question}
                    answers={currentQuestion.answers}
                    onAnswerSelected={handleAnswerSelected}
                />
            ) : (
                <>{((currentScore / questions.length) * 100).toFixed(2)}%</>
            )}
        </>
    );
}
