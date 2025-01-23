'use client';
import { useState } from 'react';
import '../styles.css';

interface QuestionProps {
    question: string;
    answers: string[];
    question_type: number; // 0 for two-answer (T/F) questions, and 1 for four-answer questions (MCQ) /
    onAnswerSelected: (answerIndex: number) => void; // Add callback for answer selection
}

export default function Question({
    question,
    answers,
    question_type,
    onAnswerSelected,
}: QuestionProps) {
    return (
        <div className="question-container">
            <div>{question}</div>

            <div
                className={`answers-container ${
                    question_type === 0 ? 'two-answers' : ''
                }`}
            >
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
        </div>
    );
}
