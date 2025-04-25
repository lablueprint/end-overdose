'use client';
import { useState } from 'react';
import '../styles.css';

interface QuestionProps {
    question: string;
    answers: string[];
    onAnswerSelected: (answerIndex: number) => void; // Add callback for answer selection
}

export default function Question({
    question,
    answers,
    onAnswerSelected,
}: QuestionProps) {
    return (
        <>
            <div className="mcq-question-text">{question}</div>

            <div className={`answers-container`}>
                {answers.map((answer, index) => (
                    <button key={index} onClick={() => onAnswerSelected(index)}>
                        <div>
                            <img
                                className="star-image-center"
                                src={`/mcq-star-${index}.svg`}
                                alt="feedback"
                                width={200}
                                height={100}
                            />
                        </div>
                        <div className="mcq-answer-text">{answer}</div>
                    </button>
                ))}
            </div>
        </>
    );
}
