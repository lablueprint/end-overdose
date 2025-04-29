'use client';

import styles from './game.module.css';
import DialogueState from './Components/DialogueState';
import { Scene } from '@/types/Game';
import ChoicesOverlay from './Components/ChoicesOverlay';
import { useGameStore } from '@/store/gameStore';
import Score from '../quiz/components/Score';
import { useState } from 'react';

export interface Question {
    question: string;
    correctAnswer: number;
    selectedAnswer: number | null;
    isCorrect: boolean;
}

const GamePage = () => {
    const scene: Scene | undefined = useGameStore((state) => state.currScene);
    const inDialogue = useGameStore((state) => state.inDialogue);

    const [currentScore, setCurrentScore] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [missedQuestions, setMissedQuestions] = useState<Question[]>([]);
    const [isQuestionSelected, setIsQuestionSelected] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [feedback, setFeedback] = useState('');

    if (!scene) {
        return <div>Loading...</div>; // or a nicer loading UI
    }
    if (scene.scene === 'resultScene') {
        return (
            <Score
                numQuestions={totalQuestions}
                currentScore={currentScore}
                setCurrentScore={setCurrentScore}
                setCurrentQuestionIndex={() => {}}
                setSelectedAnswer={setSelectedAnswer}
                setFeedback={setFeedback}
                missedQuestions={missedQuestions}
                setMissedQuestions={setMissedQuestions}
                setIsQuestionSelected={setIsQuestionSelected}
            />
        );
    }

    return (
        <div className={styles.pageContainer}>
            {inDialogue ? (
                <DialogueState />
            ) : (
                <ChoicesOverlay
                    scene={scene}
                    currentScore={currentScore}
                    setCurrentScore={setCurrentScore}
                    totalQuestions={totalQuestions}
                    setTotalQuestions={setTotalQuestions}
                    missedQuestions={missedQuestions}
                    setMissedQuestions={setMissedQuestions}
                />
            )}
        </div>
    );
};

export default GamePage;
