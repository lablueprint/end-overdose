'use client';
import { addQuiz } from '@/app/api/students/actions';
import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { Student } from '@/types/Student';
import { Admin } from '@/types/Admin';
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
    const percentage = ((currentScore / numQuestions) * 100).toFixed(2);

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
    const name = 'quiz3';
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
        <div>
            <p>Your Score: {percentage}</p>
            <button onClick={retakeQuiz}>Retake Quiz</button>
            {currentScore / numQuestions >= 0.8 && ( // if the user scored 80% or higher, display the next lesson button
                <button onClick={nextLesson}>Next Lesson</button>
            )}
            <ul className="question-container">
                {missedQuestions.map((item, index) => (
                    <li key={index}>
                        <p>Question: {item.question}</p>
                        <p>Correct Answer: {item.correctAnswer}</p>
                        <p>Selected Answer: {item.selectedAnswer}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
