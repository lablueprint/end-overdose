'use client';

import { useRouter } from 'next/navigation';
import styles from './dailyquest.module.css';
import Quest from './Quest';

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
    const router = useRouter();

    return (
        <div className={styles.container}>
            Daily Quests
            <Quest
                questTitle={'Collect 10 Gems'}
                questShape={'EMPTY'}
                completionPercentage={60}
            />
            <Quest
                questTitle={'Defeat 5 Enemies'}
                questShape={'EMPTY'}
                completionPercentage={30}
            />
            <Quest
                questTitle={'Explore New Area'}
                questShape={'triangle'}
                completionPercentage={90}
            />
        </div>
    );
}
