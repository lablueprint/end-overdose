'use client';

import styles from './game.module.css';
import Character from './Components/Character';

const GamePage = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.gameCanvas}>
                <Character />
            </div>
        </div>
    );
};

export default GamePage;
