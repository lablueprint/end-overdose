import React from 'react';
import styles from './quest.module.css';

interface QuestProps {
    questTitle: string;
    questShape: string;
    completionPercentage: number;
}

export default function Quest({
    questTitle,
    questShape,
    completionPercentage = 0,
}: QuestProps) {
    return (
        <div className={styles.quest}>
            <div className={styles.shape}>SHAPE HERE</div>
            <div className={styles.questDetails}>
                <div className={styles.questName}>{questTitle}</div>
                <div className={styles.completionBar}>
                    <div
                        className={styles.completionProgress}
                        style={{ width: `${completionPercentage}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
