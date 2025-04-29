'use client';

//import Question from './Question';
import questions from '../questions.json' assert { type: 'json' };
//import trueFalseQuestions from '../true-false/questions';
import './Results.css';
interface MissedQuestion {
    question: string;
    correctAnswer: number | string;
    selectedAnswer: number | null;
    isCorrect: boolean;
}

interface ResultsProps {
    missedQuestions: MissedQuestion[];
    isMCQ: boolean;
}
export default function Results({ missedQuestions, isMCQ }: ResultsProps) {
    return (
        <div className="results-container">
            <h1 style={{ color: 'white' }}>Review</h1>
            <div className="results-list">
                {isMCQ && (
                    <ul>
                        {missedQuestions.map((item, index) => (
                            <li key={index} className="results-card">
                                <p>Question: {item.question}</p>
                                <ul>
                                    {questions[index].answers.map((answer, i) => (
                                        <li
                                            key={i}
                                            className={
                                                i === item.correctAnswer
                                                    ? 'answer-item-correct'
                                                    : i === item.selectedAnswer
                                                      ? 'answer-item-incorrect'
                                                      : 'answer-item-neutral'
                                            }
                                        >
                                            <img
                                                className="option-icon"
                                                src={
                                                    i === item.correctAnswer
                                                        ? `/correct${i + 1}.svg`
                                                        : i === item.selectedAnswer
                                                          ? `/incorrect${i + 1}.svg`
                                                          : `/resultsOption${i + 1}.svg`
                                                }
                                                alt={`Option ${i + 1}`}
                                                width={60}
                                                height={60}
                                            />
                                            <span>{answer}</span>
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
                            <li key={index} className="results-card">
                                <p>Question: {item.question}</p>
                                <ul>
                                    {[true, false].map((answer, i) => (
                                        <li
                                            key={i}
                                            className={
                                                i === item.correctAnswer
                                                    ? 'answer-item-correct'
                                                    : i === item.selectedAnswer
                                                      ? 'answer-item-incorrect'
                                                      : 'answer-item-neutral'
                                            }
                                        >
                                            <img
                                                className="option-icon"
                                                src={
                                                    i === item.correctAnswer
                                                        ? `/correct${i + 1}.svg`
                                                        : i === item.selectedAnswer
                                                          ? `/incorrect${i + 1}.svg`
                                                          : `/resultsOption${i + 1}.svg`
                                                }
                                                alt={`Option ${i + 1}`}
                                                width={60}
                                                height={60}
                                            />
                                            {answer ? 'True' : 'False'}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
