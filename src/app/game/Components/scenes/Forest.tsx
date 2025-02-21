'use client';

import Character from '../Character';
import styles from '../../game.module.css';
import ClickableDialogue from '../ClickableDialogue';

const Forest = () => {
    return (
        <div className={styles.forest}>
            <Character />
            <ClickableDialogue xPos={100} yPos={100} />
        </div>
    );
};

export default Forest;
