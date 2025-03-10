'use client';

import { useRouter } from 'next/navigation';
import styles from './LessonTile.module.css';

interface LessonTileProps {
    lessonNumber: number;
    lessonTitle: string;
    lessonCourse: string;
    lessonPath: string;
}

export default function LessonTileProps({
    lessonNumber,
    lessonTitle,
    lessonCourse,
    lessonPath,
}: LessonTileProps) {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/courses/${lessonCourse}/${lessonPath}/1`);
    };
    return (
        <div className={styles.container} onClick={handleClick}>
            <h4 className={styles.subtitle}>Lesson #{lessonNumber}</h4>
            <h2 className={styles.title}>{lessonTitle}</h2>
        </div>
    );
}
