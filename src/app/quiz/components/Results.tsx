'use client';

interface MissedQuestion {
    question: string;
    correctAnswer: number;
    selectedAnswer: number | null;
}

interface ResultsProps {
    missedQuestions: MissedQuestion[];
}
export default function Results({ missedQuestions }: ResultsProps) {
    return (
        <div>
            {/* map the questions, pass in the map of questions + missed answers, and when mapping the questions, find the index of the correct answer. Correct answer is always green. If correct answer doesn't match selected answer */}
            <h1>MCQ Results</h1>
        </div>
    );
}
