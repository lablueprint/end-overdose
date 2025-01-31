'use client';
import { useState } from 'react';
import '../styles.css';
import trueFalseQuestions from '../true-false/questions';

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

    const checkAnswer = (answer: boolean) => {
        setSelectedAnswer(answer);
        const isCorrect = answer === questions[questionIndex].answer;

        if (isCorrect) {
            setNumCorrect(numCorrect + 1);
            setResultMessage('Correct!');
        } else {
            setResultMessage('Incorrect!');
        }

        setTimeout(() => {
            setResultMessage(null);
            if (questionIndex < questions.length - 1) {
                setQuestionIndex(questionIndex + 1);
                setSelectedAnswer(null);
            } else {
                setCompleted(true);
                setQuestionIndex(0);
            }
        }, 500);
    };

    if (started && !completed) {
        return (
            <div className="true-false-container">
                <div className="question-container">
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
                </div>
            </div>
        );
    } else if (completed) {
        return (
            <div className="true-false-container">
                <div className="question-container">
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
                <div className="question-container">
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
