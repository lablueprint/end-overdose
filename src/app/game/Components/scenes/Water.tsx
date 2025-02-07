'use client';

import Character from '../Character';
import styles from '../../game.module.css';

const Water = () => {
    return (
        <div className={styles.water}>
            <Character />
        </div>
    );
};

export default Water;
