'use client';

import Character from '../Character';
import styles from '../../game.module.css';

const Forest = () => {
    return (
        <div className={styles.forest}>
            <Character />
        </div>
    );
};

export default Forest;
