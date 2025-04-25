'use client';

import Question from './Question';
import questions from '../questions.json' assert { type: 'json' };
import trueFalseQuestions from '../true-false/questions';
interface MissedQuestion {
    question: string;
    correctAnswer: number;
    selectedAnswer: number | null;
    isCorrect: boolean;
}

interface ResultsProps {
    missedQuestions: MissedQuestion[];
    isMCQ: boolean;
}
export default function Results({ missedQuestions, isMCQ }: ResultsProps) {
    return (
        <div>
            <h1>MCQ Results</h1>
            {isMCQ && (
                <ul>
                    {missedQuestions.map((item, index) => (
                        <li key={index} className="question-card">
                            <p>Question: {item.question}</p>
                            <ul>
                                {questions[index].answers.map((answer, i) => (
                                    <li
                                        key={i}
                                        style={{
                                            color:
                                                i === item.correctAnswer
                                                    ? 'green'
                                                    : i === item.selectedAnswer
                                                      ? 'red'
                                                      : 'white',
                                        }}
                                    >
                                        {answer}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
            {!isMCQ && (
                <ul>
                    {missedQuestions.map((item, index) => (
                        <li key={index} className="question-card">
                            <p>Question: {item.question}</p>
                            <ul>
                                {[true, false].map((answer, i) => (
                                    <li
                                        key={i}
                                        style={{
                                            color:
                                                i === item.correctAnswer
                                                    ? 'green'
                                                    : i === item.selectedAnswer
                                                      ? 'red'
                                                      : 'white',
                                        }}
                                    >
                                        {answer ? 'True' : 'False'}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
