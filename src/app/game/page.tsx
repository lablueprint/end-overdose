'use client';

import styles from './game.module.css';
import Character from './Components/Character';

import Forest from './Components/scenes/Forest';
import Candy from './Components/scenes/Candy';
import Fire from './Components/scenes/Fire';
import Water from './Components/scenes/Water';
import { useGameStore } from '@/store/gameStore';

const sceneComponents = [Forest, Candy, Fire, Water];

const GamePage = () => {
    const sceneIndex = useGameStore((state) => state.sceneIndex);

    const ActiveScene = sceneComponents[sceneIndex];

    return (
        <div className={styles.pageContainer}>
            <ActiveScene key={sceneIndex} />
        </div>
    );
};

export default GamePage;
