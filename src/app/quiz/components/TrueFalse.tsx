'use client';
import { useState } from 'react';
import '../styles.css';
import trueFalseQuestions from '../true-false/questions';
import Image from 'next/image';
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
    const [image, setImage] = useState<string | null>(null);
    const [catImage, setCatImage] = useState<string | null>(null);

    const checkAnswer = (answer: boolean) => {
        setSelectedAnswer(answer);
        const isCorrect = answer === questions[questionIndex].answer;

        if (isCorrect) {
            setNumCorrect(numCorrect + 1);
            setResultMessage('Correct!');
            setAnimationProps({ x: 150, y: 50, rotate: 15, opacity: 0 });
            setImage('/CheckLogo.png');
            setCatImage('/happyNarcat.png');
        } else {
            setResultMessage('Incorrect!');
            setAnimationProps({ x: -150, y: 50, rotate: -15, opacity: 0 });
            setImage('/XLogo.png');
            setCatImage('/sadNarcat.png');
        }

        setTimeout(() => {
            setResultMessage(null);
            setAnimationProps(null);
            setHideCard(true);
            setImage(null);
            setCatImage(null);
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
        }, 400);
    };

    if (started && !completed) {
        return (
            <div className="true-false-container">
                <div>
                    {questionIndex + 1 < questions.length && (
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
                            {resultMessage && <div>{resultMessage}</div>}
                        </motion.div>
                    )}
                </div>
                <div className="image-container">
                    {image && (
                        <img
                            className="feedback-image"
                            src={image}
                            alt="feedback"
                            width={300}
                            height={300}
                        />
                    )}
                </div>
                <div className="cat-image-container">
                    {catImage && (
                        <img
                            className="feedback-image"
                            src={catImage}
                            alt="feedback"
                            width={100}
                            height={100}
                        />
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
                            setImage(null);
                            setCatImage(null);
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
