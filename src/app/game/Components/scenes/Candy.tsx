'use client';

import Character from '../Character';
import styles from '../../game.module.css';
import DialogueTree from '../DialogueTree';

const Candy = () => {
    return (
        <div className={styles.candy}>
            <Character />
            <DialogueTree xPos={100} yPos={100} />
        </div>
    );
};

export default Candy;
