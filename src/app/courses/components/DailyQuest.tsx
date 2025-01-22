'use client';

import { useRouter } from 'next/navigation';
import styles from './dailyquest.module.css';

interface DailyQuestProps {
    questPath: string;
    questTitle: string;
    questDescription: string;
    totalTasks: number;
    completedTasks: number;
}

export default function DailyQuest({
    questPath,
    questTitle,
    questDescription,
    totalTasks,
    completedTasks,
}: DailyQuestProps) {
    const router = useRouter(); //router will be used later so that we can get to specific quests

    return (
        <div className={styles.container}>
            Daily Quests
            <div className={styles.header}>
                <div className={styles.icon}>{/* Empty circle icon */}</div>
                <div className={styles.content}>
                    <h2 className={styles.title}>{questTitle}</h2>
                    <p className={styles.description}>{questDescription}</p>
                    <div className={styles.progressWrapper}>
                        <progress
                            value={(completedTasks / totalTasks) * 100}
                            className={styles.progress}
                        />
                        <span className={styles.taskInfo}>
                            {completedTasks}/{totalTasks}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
