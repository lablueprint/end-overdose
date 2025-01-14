'use client';
import { useState } from 'react';
import Question from './Question';
import '../styles.css';

export default function MCQ() {
    const questions = [
        {
            question: 'How are you?',
            answers: ['1', '2', '3', '4'],
            question_type: 1,
            correctAnswer: 1,
        },
        {
            question: 'What is your favorite food?',
            answers: ['1', '2', '3', '4'],
            question_type: 1,
            correctAnswer: 2,
        },
        {
            question: 'Name a breed of cat?',
            answers: ['1', '2', '3', '4'],
            question_type: 1,
            correctAnswer: 3,
        },
        {
            question: 'Are you having a good time?',
            answers: ['1', '2'],
            question_type: 0,
            correctAnswer: 0,
        },
    ];

    const [currentScore, setCurrentScore] = useState(0);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    const currentQuestion = questions[currentQuestionIndex];

    const [feedback, setFeedback] = useState<string>('');
    // const [correctAnswer, setCorrectAnswer] = useState(currentQuestion.correctAnswer)

    const handleAnswerSelected = (answerIndex: number) => {
        setSelectedAnswer(answerIndex);
        if (answerIndex === currentQuestion.correctAnswer) {
            setFeedback('Correct!');
            setCurrentScore(currentScore + 1);
        } else {
            setFeedback('Wrong!');
        }

        // Move to the next question after short delay
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setSelectedAnswer(null);
                setFeedback(
                    ''
                ); /* sets feedback back to empty before displaying next question, changing after short period of time to display green or red styling for that period of time */
            }
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }, 1000);
    };

    return (
        <>
            {currentQuestionIndex < questions.length ? (
                <div>
                    <Question
                        question={currentQuestion.question}
                        answers={currentQuestion.answers}
                        question_type={currentQuestion.question_type}
                        onAnswerSelected={handleAnswerSelected}
                    />
                    {feedback && (
                        <div
                            className={`feedback ${feedback === 'Wrong!' ? 'wrong' : 'correct'}`}
                        >
                            {feedback}
                        </div>
                    )}
                </div>
            ) : (
                <>{((currentScore / questions.length) * 100).toFixed(2)}%</>
            )}
        </>
    );
}
