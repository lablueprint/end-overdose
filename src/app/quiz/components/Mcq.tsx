'use client';
import { useState } from 'react';
import Question from './Question';
import Score from './Score';

import '../styles.css';

interface McqProps {
    title: string;
    description: string;
}

export default function Mcq({ title, description }: McqProps) {
    const [hasStarted, setHasStarted] = useState(false);
    const handleStart = () => {
        setHasStarted(true);
    };
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

    interface MissedQuestion {
        question: string;
        correctAnswer: number;
        selectedAnswer: number | null;
    }

    const [missedQuestions, setMissedQuestions] = useState<MissedQuestion[]>( //  array storing missed questions
        []
    );

    const [currentScore, setCurrentScore] = useState(0);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isQuestionSelected, setIsQuestionSelected] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    const [feedback, setFeedback] = useState<string>('');

    const handleAnswerSelected = (answerIndex: number) => {
        setSelectedAnswer(answerIndex);
        setIsQuestionSelected(true);
        if (!isQuestionSelected) {
            // check for correct answer
            if (answerIndex === currentQuestion.correctAnswer) {
                setFeedback('Correct!');
                setCurrentScore(currentScore + 1);
            } else {
                setFeedback('Wrong!');
                setMissedQuestions((prevMissed) => [
                    // add missed question to missedQuestions array
                    ...prevMissed,
                    {
                        question: questions[currentQuestionIndex].question,
                        correctAnswer:
                            questions[currentQuestionIndex].correctAnswer,
                        selectedAnswer: answerIndex,
                    },
                ]);
            }

            // Move to the next question after short delay
            setTimeout(() => {
                if (currentQuestionIndex < questions.length - 1) {
                    setSelectedAnswer(null);
                    setIsQuestionSelected(false);
                    setFeedback(
                        ''
                    ); /* sets feedback back to empty before displaying next question, changing after short period of time to display green or red styling for that period of time */
                }
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }, 1000);
        }
    };

    // if student has not started the quiz, display the begin quiz button, title, description
    if (!hasStarted) {
        return (
            <div className="answers-container">
                <h1>Title: {title}</h1>
                <p>Description: {description}</p>
                <button onClick={handleStart}>Begin Quiz</button>
            </div>
        );
    }

    return (
        <>
            {currentQuestionIndex < questions.length ? ( // if there are still questions to be answered, display the question
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
                // if all questions have been answered, display the score
                <div>
                    <Score
                        numQuestions={questions.length}
                        currentScore={currentScore}
                        setCurrentScore={setCurrentScore}
                        setCurrentQuestionIndex={setCurrentQuestionIndex}
                        setSelectedAnswer={setSelectedAnswer}
                        setFeedback={setFeedback}
                        missedQuestions={missedQuestions}
                        setMissedQuestions={setMissedQuestions}
                        setIsQuestionSelected={setIsQuestionSelected}
                    />
                </div>
            )}
        </>
    );
}
