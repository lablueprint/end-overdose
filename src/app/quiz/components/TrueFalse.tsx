'use client';
import { useState, useRef } from 'react';
import {
    Description,
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogBackdrop,
} from '@headlessui/react';
import '../styles.css';
import trueFalseQuestions from '../true-false/questions';
import Image from 'next/image';
import Score from './Score';
import { motion } from 'motion/react';
import TrueFalseFeedback from './TrueFalseFeedback';
import { set } from 'react-hook-form';

interface TrueFalseProps {
    title: string;
    description: string;
}
interface MissedQuestion {
    question: string;
    correctAnswer: number;
    selectedAnswer: number | null; // 1 is true, 0 is false
}

export default function TrueFalse({ title, description }: TrueFalseProps) {
    const [missedQuestions, setMissedQuestions] = useState<MissedQuestion[]>( //  array storing missed questions
        []
    );
    const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);
    const questions = trueFalseQuestions;
    const [questionIndex, setQuestionIndex] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);
    const [isQuestionSelected, setIsQuestionSelected] = useState(false);
    const [resultMessage, setResultMessage] = useState<string | null>(null);
    const [animationProps, setAnimationProps] = useState<Record<
        string,
        number
    > | null>(null);
    const fadeOutIndexRef = useRef<number>(0); // to keep track of the fade out index

    // for opening dialogue
    const [isOpen, setIsOpen] = useState(true);
    const onContinue = () => {
        setIsOpen(false);
        setStarted(true);
    };

    const checkAnswer = (answer: boolean) => {
        if (isQuestionSelected) return;
        setIsQuestionSelected(true);
        fadeOutIndexRef.current = questionIndex;
        if (questionIndex < questions.length - 1)
            setQuestionIndex(questionIndex + 1);
        setSelectedAnswer(answer);
        const isCorrect = answer === questions[questionIndex].answer;

        if (isCorrect) {
            setCurrentScore(currentScore + 1);
            setResultMessage('correct');
            setAnimationProps({ x: 150, y: 50, rotate: 15, opacity: 0 });
        } else {
            setResultMessage('incorrect');
            setAnimationProps({ x: -150, y: 50, rotate: -15, opacity: 0 });
            setMissedQuestions((prevMissed) => [
                // add missed question to missedQuestions array
                ...prevMissed,
                {
                    question: questions[questionIndex].question,
                    correctAnswer: questions[questionIndex].answer ? 1 : 0,
                    selectedAnswer: Number(answer),
                },
            ]);
        }
        console.log('missed questions', missedQuestions);

        setTimeout(() => {
            setResultMessage(null);
            setAnimationProps(null);
            setSelectedAnswer(null);
            setTimeout(() => {
                if (questionIndex < questions.length - 1) {
                    setQuestionIndex(questionIndex + 1);
                    setSelectedAnswer(null);
                } else {
                    setCompleted(true);
                    // setQuestionIndex(0);
                }
                setIsQuestionSelected(false);
            }, 100);
        }, 400);
    };

    if (!started) {
        return (
            <Dialog open={isOpen} onClose={onContinue} className="relative">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="dialog-container">
                    <DialogPanel className="dialog-panel">
                        <DialogTitle className="dialog-title">
                            True or False
                        </DialogTitle>
                        <Description className="dialog-description">
                            You will be presented with a statement regarding the
                            lesson you just completed. You must click either
                            true or false{' '}
                        </Description>
                        <div className="dialog-button">
                            <button onClick={onContinue}>Begin</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        );
    }
    // else if (started && !completed)
    return (
        <>
            {!completed ? (
                <div className="true-false-container">
                    <div className="custom-progress-container">
                        <div
                            className="custom-progress-fill"
                            style={{
                                width: `${(questionIndex / questions.length) * 100}%`,
                            }}
                        ></div>
                    </div>
                    <h1 className="quiz-name-info">{title}</h1>
                    <h1
                        style={{
                            position: 'absolute',
                            top: -125,
                            left: 0,
                            margin: 0,
                        }}
                    >
                        Determine whether this statement is true or false.
                    </h1>
                    <div>
                        {questionIndex < questions.length &&
                            (animationProps === null ||
                                fadeOutIndexRef.current <
                                    questions.length - 1) && (
                                <div className="tf-question-container under">
                                    <h1 className="tf-question-text">
                                        {questions[questionIndex].question}
                                    </h1>
                                    <div className="image-container">
                                        <img
                                            className="left-option-image"
                                            src={'/true.svg'}
                                            alt="feedback"
                                            width={300}
                                            height={200}
                                            onClick={() => checkAnswer(true)}
                                        />
                                        <img
                                            className="right-option-image"
                                            src={'/false.svg'}
                                            alt="feedback"
                                            width={300}
                                            height={200}
                                            onClick={() => checkAnswer(false)}
                                        />
                                    </div>
                                </div>
                            )}
                        {animationProps && (
                            <motion.div
                                className="tf-question-container under"
                                initial={{
                                    opacity: 1,
                                    x: 0,
                                    y: 0,
                                    rotate: 0,
                                }}
                                animate={animationProps}
                                transition={{
                                    duration: 0.5,
                                    ease: 'easeOut',
                                }}
                            >
                                <h1 className="tf-question-text">
                                    {
                                        questions[fadeOutIndexRef.current]
                                            .question
                                    }
                                </h1>
                                <div className="image-container"></div>
                            </motion.div>
                        )}
                        {selectedAnswer !== null && (
                            <TrueFalseFeedback
                                answer={resultMessage === 'correct'}
                            />
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    <Score
                        numQuestions={questions.length}
                        currentScore={currentScore}
                        setCurrentScore={setCurrentScore}
                        setCurrentQuestionIndex={setQuestionIndex}
                        setSelectedAnswer={(newSelectedAnswer: number | null) =>
                            setSelectedAnswer(
                                newSelectedAnswer === 1
                                    ? true
                                    : newSelectedAnswer === 0
                                      ? false
                                      : null
                            )
                        }
                        setFeedback={setResultMessage}
                        missedQuestions={missedQuestions}
                        setMissedQuestions={setMissedQuestions}
                        setIsQuestionSelected={setIsQuestionSelected}
                        setIsCompleted={setCompleted}
                        isMCQ={false}
                    />
                </div>
            )}
        </>
    );
}
