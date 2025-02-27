'use client';

import styles from './game.module.css';
import { useGameStore } from '@/store/gameStore';
import Image from 'next/image';
import NewDialogueState from './Components/DialogueState';
import { game } from './data';
import { Scene } from '@/types/Game';

const GamePage = () => {
    const scene: Scene | undefined = game.get('startScene');
    return (
        <div className={styles.pageContainer}>
            {scene && <NewDialogueState scene={scene} />}
        </div>
    );
};

export default GamePage;
