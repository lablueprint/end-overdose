'use client';
import { useState } from 'react';

interface QuestionProps {
    question: string,
    answers: string[],
}

export default function Question({ question, answers }: QuestionProps)  {
    

    return (
        <>
            <div>{question}</div>
            <div>{answers[0]}</div>
            <div>{answers[1]}</div>
            <div>{answers[2]}</div>
            <div>{answers[3]}</div>
        </>

    )


}