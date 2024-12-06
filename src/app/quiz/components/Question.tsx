'use client';
import { useState } from 'react';

interface QuestionProps {
    question: string,
    answers: string[],
    onAnswerSelected: (answerIndex: number) => void; // Add callback for answer selection
}

export default function Question({ question, answers, onAnswerSelected }: QuestionProps)  {
    

    return (
        <>
            <div>{question}</div>
            {answers.map((answer, index) => (
                <button 
                    key={index} 
                    onClick={() => onAnswerSelected(index)}
                    style={{ display: 'block', margin: '10px 0' }}
                >
                    {answer}
                </button>
            ))}
        </>

    )


}