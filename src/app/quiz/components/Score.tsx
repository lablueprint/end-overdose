'use client';
import { addQuiz } from '@/app/api/students/actions';
import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { newStudent } from '@/types/newStudent';
import { Admin } from '@/types/Admin';
import './score.css';
import questions from '../questions.json' assert { type: 'json' };
import Results from './Results';
import { isStudent } from '@/types/newStudent';

interface MissedQuestion {
    question: string;
    correctAnswer: number;
    selectedAnswer: number | null;
    isCorrect: boolean;
}

interface ScoreProps {
    numQuestions: number;
    currentScore: number;
    isMCQ?: boolean;
    isTF?: boolean;
    isGame?: boolean;
    setCurrentScore: (newCurrentScore: number) => void;
    setCurrentQuestionIndex: (newCurrentQuestionIndex: number) => void;
    setSelectedAnswer: (newSelectedAnswer: number | null) => void;
    setFeedback: (newFeedback: string) => void;
    missedQuestions: MissedQuestion[];
    setMissedQuestions: (newMissedQuestion: []) => void;
    setIsQuestionSelected: (newIsQuestionSelected: boolean) => void;
    setIsCompleted: (newSetIsCompleted: boolean) => void;
    quizIndex: number;
    quizName: number;
    onRetry?: () => void;
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
    setIsCompleted,
    isMCQ,
    isTF,
    isGame,
    quizIndex,
    quizName,
    onRetry,
}: ScoreProps) {
    // match props for both TF and MCQ, right now some features don't work for TF
    const retakeQuiz = () => {
        setCurrentScore(0);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setFeedback('');
        setMissedQuestions([]);
        setIsQuestionSelected(false);
        setIsCompleted(false);
    };

    const nextLesson = () => {
        window.location.href = '/courses/opioid';
    };
    const user = useUserStore((state) => state.user);
    const name = `quiz${quizName + 1}`;
    useEffect(() => {
        const updateQuiz = async () => {
            try {
                const newScore = (currentScore / numQuestions) * 100; // calculate the percentage
                if (isStudent(user)) {
                    const quizzes = user?.courses.opioidCourse.quizzes;
                    const updateQuizzes = quizzes.some(
                        (quiz) => quiz.name === name // if name already exists, update the score
                    )
                        ? quizzes.map((quiz) =>
                              quiz.name === name
                                  ? { ...quiz, score: newScore } // updates the score of the existing quiz
                                  : quiz
                          )
                        : [...quizzes, { name: name, score: newScore }]; // otherwise add a new quiz
                    console.log('quizzes: ' + updateQuizzes);
                    addQuiz(user.student_id, updateQuizzes);
                    useUserStore
                        .getState() // update the user store with the new quiz
                        .setUser({
                            ...user,
                            courses: {
                                ...user.courses,
                                opioidCourse: {
                                    ...user.courses.opioidCourse,
                                    quizzes: updateQuizzes,
                                },
                            },
                        });
                }
            } catch (error) {
                console.error('Error adding quiz', error);
            }
        };
        updateQuiz();
    }, [currentScore, numQuestions, name]);

    // Deduplicate missedQuestions by question (first attempt only)
    const seen = new Set<string>();
    const uniqueMissedQuestions = missedQuestions.filter((q) => {
        if (seen.has(q.question)) return false;
        seen.add(q.question);
        return true;
    });

    // Recalculate score: only first attempts that were correct
    const firstAttemptScore = uniqueMissedQuestions.filter(
        (q) => q.isCorrect
    ).length;
    const firstAttemptTotal = uniqueMissedQuestions.length;
    const percentage =
        firstAttemptTotal > 0
            ? ((firstAttemptScore / firstAttemptTotal) * 100).toFixed(0)
            : '0';

    return (
        <>
            {1 && (
                <div className="score-container">
                    <div className="score-panel">
                        <p className="score-number">
                            {Number(percentage) <= 30
                                ? 'Only Up From Here!'
                                : Number(percentage) <= 70
                                  ? 'Keep Going!'
                                  : 'Awesome!'}
                        </p>
                        <div className="circle-container">
                            <div className="percent">
                                <svg>
                                    <circle cx="80" cy="80" r="40%"></circle>
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="40%"
                                        style={{
                                            strokeDashoffset: `${790 * (Number(percentage) / 100) - 790}`,
                                        }}
                                    ></circle>
                                </svg>
                                <div className="number">
                                    <h2>{percentage}%</h2>
                                </div>
                            </div>
                            <div className="text"> </div>
                        </div>
                        <button className="go-home">Return To Home</button>
                        <button
                            className="retry-button"
                            onClick={isGame ? onRetry : retakeQuiz}
                        >
                            Retry
                        </button>
                        {currentScore / numQuestions >= 0.8 && ( // if the user scored 80% or higher, display the next lesson button
                            <button
                                className="next-button"
                                onClick={nextLesson}
                            >
                                Next Lesson
                            </button>
                        )}
                    </div>
                    {Number(percentage) <= 30 ? (
                        <div className="narcat-30"></div>
                    ) : Number(percentage) <= 70 ? (
                        <div className="narcat-70"></div>
                    ) : (
                        <div className="narcat-100"></div>
                    )}
                    <div className="missed-questions-container">
                        <Results
                            missedQuestions={uniqueMissedQuestions}
                            isMCQ={isMCQ}
                            isTF={isTF}
                            quizIndex={quizIndex}
                            isGame={isGame}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
