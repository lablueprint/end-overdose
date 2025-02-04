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
            <div>{question}</div>

            <div className={`answers-container`}>
                {answers.map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => onAnswerSelected(index)}
                        className="answer-button"
                    >
                        {answer}
                    </button>
                ))}
            </div>
        </>
    );
}
