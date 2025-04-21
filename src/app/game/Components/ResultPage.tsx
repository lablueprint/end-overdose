'use client';

import { useGameStore } from '@/store/gameStore';
import styles from '../game.module.css';

export default function ResultPage() {
    const correct = useGameStore((state) => state.correctAnswers);
    const total = useGameStore((state) => state.totalQuestions);
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

    return (
        <div className={styles.resultContainer}>
            <h1>
                Slay <br></br>Game Complete!
            </h1>
            {/* <p>Correct Answers: {correct}</p>
            <p>Total Questions: {total}</p> */}
            <h2>Accuracy: {accuracy}%</h2>
        </div>
    );
}
