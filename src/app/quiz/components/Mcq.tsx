'use client';
import { useState } from 'react';
import {
    Description,
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogBackdrop,
} from '@headlessui/react';
import Question from './Question';
import Score from './Score';
import questions from '../questions.json' assert { type: 'json' };
import Feedback from './Feedback';

import './startpage.css';
import '../styles.css';

interface McqProps {
    title: string;
    description: string;
    quizIndex: number; // Add quizIndex prop to select which quiz to display
    quizName: number;
}

export default function Mcq({
    title,
    description,
    quizIndex,
    quizName,
}: McqProps) {
    const [hasStarted, setHasStarted] = useState(false);
    const handleStart = () => {
        setHasStarted(true);
    };

    interface MissedQuestion {
        question: string;
        correctAnswer: number;
        selectedAnswer: number | null;
        isCorrect: boolean;
    }

    const [missedQuestions, setMissedQuestions] = useState<MissedQuestion[]>(
        []
    );
    const [currentScore, setCurrentScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isQuestionSelected, setIsQuestionSelected] = useState(false);
    const [hasAnswered, setHasAnswered] = useState(false);

    // Get the current quiz and question
    const currentQuiz = questions[quizIndex];
    const currentQuestion = currentQuiz[currentQuestionIndex];

    const [feedback, setFeedback] = useState<string>('');
    const [completed, setCompleted] = useState(false);

    // for opening dialogue
    const [started, setStarted] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const onContinue = () => {
        setIsOpen(false);
        setStarted(true);
    };
    const handleAnswerSelected = (answerIndex: number) => {
        setSelectedAnswer(answerIndex);
        setIsQuestionSelected(true);
    };

    const handleSubmit = (answerIndex: number) => {
        setShowFeedback(true);
        setMissedQuestions((prevMissed) => [
            // add missed question to missedQuestions array
            ...prevMissed,
            {
                question: currentQuiz[currentQuestionIndex].question,
                correctAnswer: currentQuiz[currentQuestionIndex].correctAnswer,
                selectedAnswer: answerIndex,
                isCorrect:
                    answerIndex === currentQuestion.correctAnswer
                        ? true
                        : false,
            },
        ]);
        // check for correct answer
        if (answerIndex === currentQuestion.correctAnswer) {
            setFeedback('Correct!');
            setCurrentScore(currentScore + 1);
        } else {
            setFeedback('Wrong!');
        }
        // Check if last question in the current quiz
        // if (currentQuestionIndex === currentQuiz.length - 1) {
        //     setCompleted(true);
        // }
    };
    const handleNextQuestion = () => {
        setShowFeedback(false);
        setSelectedAnswer(null);
        setCurrentQuestionIndex((idx) => idx + 1);
        setFeedback('');
    };

    // if student has not started the quiz, display the begin quiz button, title, description
    if (!hasStarted) {
        return (
            <Dialog open={isOpen} onClose={handleStart} className="relative">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="dialog-container">
                    <DialogPanel className="dialog-panel">
                        <DialogTitle className="dialog-title">
                            {title}
                        </DialogTitle>
                        <Description className="dialog-description">
                            {description}
                        </Description>
                        <div className="dialog-button">
                            <button onClick={handleStart}>Begin</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        );
    }

    return (
        <>
            {!completed ? ( // if there are still questions to be answered, display the question
                <div className="question-container">
                    <Question
                        question={currentQuestion.question}
                        answers={currentQuestion.answers}
                        onAnswerSelected={handleAnswerSelected}
                        selectedAnswer={selectedAnswer}
                        showFeedback={showFeedback}
                        correctAnswer={currentQuestion.correctAnswer}
                    />
                    {isQuestionSelected &&
                        selectedAnswer !== null &&
                        !showFeedback && (
                            <button
                                className="next-button"
                                onClick={() => handleSubmit(selectedAnswer)}
                            >
                                Continue
                            </button>
                        )}

                    {feedback &&
                        (currentQuestionIndex < currentQuiz.length - 1 ? (
                            <button
                                className="next-button"
                                onClick={handleNextQuestion}
                            >
                                Next Question
                            </button>
                        ) : (
                            <button
                                onClick={() => setCompleted(true)}
                                className="next-button"
                            >
                                Complete Quiz
                            </button>
                        ))}
                </div>
            ) : (
                // if all questions have been answered, display the score
                <div>
                    <Score
                        numQuestions={currentQuiz.length}
                        currentScore={currentScore}
                        setCurrentScore={setCurrentScore}
                        setCurrentQuestionIndex={setCurrentQuestionIndex}
                        setSelectedAnswer={setSelectedAnswer}
                        setFeedback={setFeedback}
                        setShowFeedback={setShowFeedback}
                        missedQuestions={missedQuestions}
                        setMissedQuestions={setMissedQuestions}
                        setIsQuestionSelected={setIsQuestionSelected}
                        setIsCompleted={setCompleted}
                        isMCQ={true}
                        isGame={false}
                        quizIndex={quizIndex} // Pass quiz index to Score component
                        quizName={quizName}
                    />
                </div>
            )}
        </>
    );
}
