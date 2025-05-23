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
    isMCQ?: boolean;
    quizIndex: number;
    isGame?: boolean;
    isTF?: boolean;
}
export default function Results({
    missedQuestions,
    isMCQ,
    quizIndex,
    isGame,
    isTF,
}: ResultsProps) {
    const currentQuiz = questions[quizIndex];

    return (
        <div className="results-container">
            <h1 style={{ color: 'white' }}>Review</h1>
            <div className="results-list">
                {isMCQ && (
                    <ul>
                        {missedQuestions.map((item, index) => (
                            <li key={index} className="results-card">
                                <img
                                    className="answer-image"
                                    src={
                                        item.isCorrect
                                            ? `/correct-result-image.svg`
                                            : `/incorrect-result-image.svg`
                                    }
                                    alt={`Result image`}
                                    width={100}
                                    height={100}
                                />
                                <p>Question: {item.question}</p>
                                <ul>
                                    {currentQuiz[index]?.answers?.map(
                                        (answer, i) => (
                                            <li
                                                key={i}
                                                className={
                                                    i === item.correctAnswer
                                                        ? 'answer-item-correct'
                                                        : i ===
                                                            item.selectedAnswer
                                                          ? 'answer-item-incorrect'
                                                          : 'answer-item-neutral'
                                                }
                                            >
                                                <img
                                                    className="option-icon"
                                                    src={
                                                        i === item.correctAnswer
                                                            ? `/correct${i + 1}.svg`
                                                            : i ===
                                                                item.selectedAnswer
                                                              ? `/incorrect${i + 1}.svg`
                                                              : `/resultsOption${i + 1}.svg`
                                                    }
                                                    alt={`Option ${i + 1}`}
                                                    width={60}
                                                    height={60}
                                                />
                                                <span>{answer}</span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
                {isTF && (
                    <ul>
                        {missedQuestions.map((item, index) => (
                            <li key={index} className="results-card">
                                <img
                                    className="answer-image"
                                    src={
                                        item.isCorrect
                                            ? `/correct-result-image.svg`
                                            : `/incorrect-result-image.svg`
                                    }
                                    alt={`Result image`}
                                    width={100}
                                    height={100}
                                />
                                <p>Question: {item.question}</p>
                                <ul>
                                    {[true, false].map((answer, i) => (
                                        <li
                                            key={i}
                                            className={
                                                (answer ? 1 : 0) ===
                                                item.correctAnswer
                                                    ? 'answer-item-correct'
                                                    : (answer ? 1 : 0) ===
                                                        item.selectedAnswer
                                                      ? 'answer-item-incorrect'
                                                      : 'answer-item-neutral'
                                            }
                                        >
                                            <img
                                                className="option-icon"
                                                src={
                                                    (answer ? 1 : 0) ===
                                                    item.correctAnswer
                                                        ? `/correct${i + 1}.svg`
                                                        : (answer ? 1 : 0) ===
                                                            item.selectedAnswer
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
                {isGame && (
                    <ul>
                        {missedQuestions.map((item, index) => (
                            <li key={index} className="results-card">
                                <img
                                    className="answer-image"
                                    src={
                                        item.isCorrect
                                            ? `/correct-result-image.svg`
                                            : `/incorrect-result-image.svg`
                                    }
                                    alt={`Result image`}
                                    width={100}
                                    height={100}
                                />
                                <p>Question: {item.question}</p>
                                <ul>
                                    {item.allChoices.map((choiceText, i) => {
                                        const isCorrect =
                                            choiceText === item.correctAnswer;
                                        const isSelected =
                                            choiceText === item.selectedAnswer;

                                        return (
                                            <li
                                                key={i}
                                                className={
                                                    isCorrect
                                                        ? 'answer-item-correct'
                                                        : isSelected
                                                          ? 'answer-item-incorrect'
                                                          : 'answer-item-neutral'
                                                }
                                            >
                                                <img
                                                    className="option-icon"
                                                    src={
                                                        isCorrect
                                                            ? `/correct${i + 1}.svg`
                                                            : isSelected
                                                              ? `/incorrect${i + 1}.svg`
                                                              : `/resultsOption${i + 1}.svg`
                                                    }
                                                    alt={`Option ${i + 1}`}
                                                    width={60}
                                                    height={60}
                                                />
                                                <span>{choiceText}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
