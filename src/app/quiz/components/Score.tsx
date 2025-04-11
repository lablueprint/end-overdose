'use client';
import { addQuiz } from '@/app/api/students/actions';
import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { Student } from '@/types/Student';
import { Admin } from '@/types/Admin';
import './score.css';
import questions from '../questions.json' assert { type: 'json' };

interface MissedQuestion {
    question: string;
    correctAnswer: number;
    selectedAnswer: number | null;
}

interface ScoreProps {
    numQuestions: number;
    currentScore: number;
    setCurrentScore: (newCurrentScore: number) => void;
    setCurrentQuestionIndex: (newCurrentQuestionIndex: number) => void;
    setSelectedAnswer: (newSelectedAnswer: number | null) => void;
    setFeedback: (newFeedback: string) => void;
    missedQuestions: MissedQuestion[];
    setMissedQuestions: (newMissedQuestion: []) => void;
    setIsQuestionSelected: (newIsQuestionSelected: boolean) => void;
}

export default function Score({
    numQuestions,
    currentScore,
    setCurrentScore,
    setCurrentQuestionIndex,
    setSelectedAnswer,
    setFeedback,
    missedQuestions,
    setMissedQuestions,
    setIsQuestionSelected,
}: ScoreProps) {
    const percentage = ((currentScore / numQuestions) * 100).toFixed(0);

    // match props for both TF and MCQ, right now some features don't work for TF
    const retakeQuiz = () => {
        setCurrentScore(0);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setFeedback('');
        setMissedQuestions([]);
        setIsQuestionSelected(false);
    };

    const nextLesson = () => {
        console.log('Next lesson!!', percentage);
    };
    const user = useUserStore((state) => state.user);
    const name = 'quiz4'; // hard coded quiz name for now, causes override issue for taking tf and multiple choice quiz
    function isStudent(user: Student | Admin | null): user is Student {
        return user !== null && 'quizzes' in user;
    }
    useEffect(() => {
        const updateQuiz = async () => {
            try {
                const newScore = (currentScore / numQuestions) * 100; // calculate the percentage
                if (isStudent(user)) {
                    const quizzes = user?.quizzes;
                    const updateQuizzes = quizzes.some(
                        (quiz) => quiz.name === name // if name already exists, update the score
                    )
                        ? quizzes.map((quiz) =>
                              quiz.name === name
                                  ? { ...quiz, score: newScore } // updates the score of the existing quiz
                                  : quiz
                          )
                        : [...quizzes, { name: name, score: newScore }]; // otherwise add a new quiz
                    addQuiz(updateQuizzes);
                    useUserStore
                        .getState() // update the user store with the new quiz
                        .setUser({ ...user, quizzes: updateQuizzes });
                }
            } catch (error) {
                console.error('Error adding quiz', error);
            }
        };
        updateQuiz();
    }, [currentScore, numQuestions]);

    return (
        <div className="score-container">
            <div className="score-panel">
                <p>Score</p>
                <p className="score-number">{percentage}%</p>
                {currentScore / numQuestions >= 0.8 && (
                    <img // only happy cat available as of now
                        // className="right-option-image"
                        src={'/passed-test-image.svg'}
                        width={300}
                        height={200}
                    />
                )}
                <button className="retry-button" onClick={retakeQuiz}>
                    Retry
                </button>
                {currentScore / numQuestions >= 0.8 && ( // if the user scored 80% or higher, display the next lesson button
                    <button className="next-button" onClick={nextLesson}>
                        Next Lesson
                    </button>
                )}
            </div>
            <div className="missed-questions-container">
                {missedQuestions.length !== 0 ? (
                    <h2>Missed Questions</h2>
                ) : (
                    <h2>Perfect!!!</h2>
                )}
                <ul>
                    {missedQuestions.map((item, index) => (
                        <li key={index} className="question-card">
                            <p className="question-label">
                                Question {index + 1}
                            </p>
                            <p>{item.question}</p>
                            <p>
                                <span className="question-label">
                                    Correct Answer:
                                </span>{' '}
                                {
                                    // displays the actual text, not index (what causes error for tf)
                                    questions.find(
                                        (q) => q.question === item.question
                                    )?.answers[item.correctAnswer]
                                }{' '}
                            </p>
                            <p>
                                <span className="question-label">
                                    Selected Answer:
                                </span>{' '}
                                {
                                    //displays the actual text, not index
                                    item.selectedAnswer !== null
                                        ? questions.find(
                                              (q) =>
                                                  q.question === item.question
                                          )?.answers[item.selectedAnswer]
                                        : 'No answer selected'
                                }{' '}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
