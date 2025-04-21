'use client';

import styles from './game.module.css';
import DialogueState from './Components/DialogueState';
import { Scene } from '@/types/Game';
import ChoicesOverlay from './Components/ChoicesOverlay';
import { useGameStore } from '@/store/gameStore';

/**
 * Notes:
 *
 * Very simple and clean to read. Just enter in your scene and the DialogueState will control Diaglogue and the ChoicesOverlay will control actions
 *
 * TODO: Importing scene from database. Converting database JSON into Scene object.
 */

const GamePage = () => {
    const scene: Scene | undefined = useGameStore((state) => state.currScene);
    const inDialogue = useGameStore((state) => state.inDialogue);

    return (
        <div className={styles.pageContainer}>
            {scene && inDialogue ? (
                <DialogueState scene={scene} />
            ) : (
                <ChoicesOverlay scene={scene} />
            )}
        </div>
    );
};

export default GamePage;
