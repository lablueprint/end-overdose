'use client';

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
}: ScoreProps) {
    const percentage = ((currentScore / numQuestions) * 100).toFixed(2);

    const retakeQuiz = () => {
        setCurrentScore(0);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setFeedback('');
        setMissedQuestions([]);
    };

    const nextLesson = () => {
        console.log('Next lesson!!', percentage);
    };

    return (
        <div>
            <p>Your Score: {percentage}</p>
            <button onClick={retakeQuiz}>Retake Quiz</button>
            {currentScore / numQuestions >= 0.8 && (
                <button onClick={nextLesson}>Next Lesson</button>
            )}
            <ul>
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
