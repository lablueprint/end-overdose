'use client';

import Character from '../Character';
import styles from '../../game.module.css';

const Candy = () => {
    return (
        <div className={styles.candy}>
            <Character />
        </div>
    );
};

export default Candy;
