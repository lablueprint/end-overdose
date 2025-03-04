'use client';

import styles from './game.module.css';
import Image from 'next/image';
import DialogueState from './Components/DialogueState';
import { game } from './data';
import { Scene } from '@/types/Game';
import ChoicesOverlay from './Components/ChoicesOverlay';
import { useGameStore } from '@/store/gameStore';

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

// export type Character = {
//     name: string;
//     avatar: string;
// };

// export type Line = {
//     name: string;
//     text: string;
// };

// export type Choice = {
//     text: string;
//     nextScene: string;
// };

// export type Action = {
//     type: string;
//     choices: Array<Choice>;
// };

// export type Scene = {
//     scene: string;
//     background: string;
//     characters: Array<Character>;
//     actions: Array<Action>;
//     Dialogue: Array<Line>;
// };

// export interface SceneProp {
//     scene: Scene;
// }

// export type Game = Map<string, Scene>; // Maps scene name to scene data
