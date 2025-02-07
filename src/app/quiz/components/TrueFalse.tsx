'use client';
import { useState } from 'react';
import '../styles.css';
import trueFalseQuestions from '../true-false/questions';
import { motion } from 'motion/react';

interface TrueFalseProps {
    title: string;
    description: string;
}

export default function TrueFalse({ title, description }: TrueFalseProps) {
    const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);
    const questions = trueFalseQuestions;
    const [questionIndex, setQuestionIndex] = useState(0);
    const [numCorrect, setNumCorrect] = useState(0);
    const [resultMessage, setResultMessage] = useState<string | null>(null);
    const [animationProps, setAnimationProps] = useState<Record<
        string,
        number
    > | null>(null);
    const [hideCard, setHideCard] = useState(false);

    const checkAnswer = (answer: boolean) => {
        setSelectedAnswer(answer);
        const isCorrect = answer === questions[questionIndex].answer;

        if (isCorrect) {
            setNumCorrect(numCorrect + 1);
            setResultMessage('Correct!');
            setAnimationProps({ x: 150, y: 50, rotate: 15, opacity: 0 });
        } else {
            setResultMessage('Incorrect!');
            setAnimationProps({ x: -150, y: 50, rotate: -15, opacity: 0 });
        }

        setTimeout(() => {
            setResultMessage(null);
            setAnimationProps(null);
            setHideCard(true);
            setTimeout(() => {
                setHideCard(false);
                if (questionIndex < questions.length - 1) {
                    setQuestionIndex(questionIndex + 1);
                    setSelectedAnswer(null);
                } else {
                    setCompleted(true);
                    setQuestionIndex(0);
                }
            }, 100);
        }, 500);
    };

    if (started && !completed) {
        return (
            <div className="true-false-container">
                <div>
                    {questionIndex + 1 < questions.length && (
                        <div className="tf-question-container under">
                            <h1 style={{ fontSize: '2rem' }}>
                                {questions[questionIndex + 1].question}
                            </h1>
                            <div className="center-content">
                                <button
                                    className={`bg-green ${selectedAnswer === false ? 'selected' : ''}`}
                                    onClick={() => checkAnswer(true)}
                                >
                                    True
                                </button>
                                or
                                <button
                                    className={`bg-red ${selectedAnswer === false ? 'selected' : ''}`}
                                    onClick={() => checkAnswer(false)}
                                >
                                    False
                                </button>
                            </div>
                        </div>
                    )}
                    {!hideCard && (
                        <motion.div
                            className="tf-question-container under"
                            initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                            animate={
                                animationProps || {
                                    x: 0,
                                    y: 0,
                                    rotate: 0,
                                    opacity: 1,
                                }
                            }
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        >
                            <h1 style={{ fontSize: '2rem' }}>
                                {questions[questionIndex].question}
                            </h1>
                            <div className="center-content">
                                <button
                                    className={`bg-green ${selectedAnswer === false ? 'selected' : ''}`}
                                    onClick={() => checkAnswer(true)}
                                >
                                    True
                                </button>
                                or
                                <button
                                    className={`bg-red ${selectedAnswer === false ? 'selected' : ''}`}
                                    onClick={() => checkAnswer(false)}
                                >
                                    False
                                </button>
                            </div>
                            {resultMessage && <div>{resultMessage}</div>}
                        </motion.div>
                    )}
                </div>
            </div>
        );
    } else if (completed) {
        return (
            <div className="true-false-container">
                <div className="tf-question-container">
                    <h1 style={{ fontSize: '2rem' }}>Quiz Completed!</h1>
                    <div>
                        You got {numCorrect} out of {questions.length} correct!
                    </div>
                    <button
                        className="bg-light"
                        onClick={() => {
                            setStarted(true);
                            setCompleted(false);
                            setNumCorrect(0);
                        }}
                    >
                        Restart
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <div className="true-false-container">
                <div className="tf-question-container">
                    <h1 style={{ fontSize: '2rem' }}>{title}</h1>
                    <div>{description}</div>
                    <div> You must select either: </div>
                    <div className="center-content">
                        <div className="bg-green">True</div>
                        or
                        <div className="bg-red">False</div>
                    </div>
                </div>
                <button
                    className="bg-light"
                    onClick={() => {
                        setStarted(true);
                    }}
                >
                    Start
                </button>
            </div>
        );
    }
}
