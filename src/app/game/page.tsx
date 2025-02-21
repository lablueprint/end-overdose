'use client';

import styles from './game.module.css';
import { useGameStore } from '@/store/gameStore';
import Image from 'next/image';
import NewDialogueState from './Components/NewDialogueState';

const GamePage = () => {
    return (
        <div className={styles.pageContainer}>
            <NewDialogueState />
        </div>
    );
};

export default GamePage;
