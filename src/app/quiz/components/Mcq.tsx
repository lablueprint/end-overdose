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
}

export default function Mcq({ title, description }: McqProps) {
    const [hasStarted, setHasStarted] = useState(false);
    const handleStart = () => {
        setHasStarted(true);
    };

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
        }
    };

    // if student has not started the quiz, display the begin quiz button, title, description
    if (!hasStarted) {
        // return (
        //     <div className="start-container">
        //         <h1>{title}</h1>
        //         <p>{description}</p>
        //         <button onClick={handleStart}>Begin</button>
        //     </div>
        // );
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
            {currentQuestionIndex < questions.length ? ( // if there are still questions to be answered, display the question
                <div className="question-container">
                    <Question
                        question={currentQuestion.question}
                        answers={currentQuestion.answers}
                        onAnswerSelected={handleAnswerSelected}
                    />
                    {feedback && (
                        <Feedback
                            feedback={feedback}
                            question={currentQuestion.question}
                            currentQuestionIndex={currentQuestionIndex}
                            numQuestions={questions.length}
                            setSelectedAnswer={setSelectedAnswer}
                            setIsQuestionSelected={setIsQuestionSelected}
                            setFeedback={setFeedback}
                            setCurrentQuestionIndex={setCurrentQuestionIndex}
                        />
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
