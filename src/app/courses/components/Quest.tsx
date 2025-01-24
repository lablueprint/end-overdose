import React from 'react';
import styles from './quest.module.css';

interface QuestProps {
    questTitle: string;
    questShape: string;
    questFeature1: string;
    questFeature2: string;
    completionPercentage: number;
}

export default function Quest({
    questTitle,
    questShape,
    completionPercentage = 0,
}: QuestProps) {
    return (
        <div className={styles.quest}>
            <div className={styles.shape}>
                <svg viewBox="0 0 100 100" className={styles.triangleShape}>
                    <polygon points="0,100 100,100 0,0" fill="#4A5568" />
                </svg>
            </div>
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
