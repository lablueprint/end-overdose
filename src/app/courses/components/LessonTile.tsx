'use client';

import { useRouter } from 'next/navigation';
import styles from './LessonTile.module.css';

interface LessonTileProps {
    lessonNumber: number;
    lessonTitle: string;
    lessonCourse: string;
    lessonPath: string;
    onHandleChangeLesson: (lessonNumber: number) => void;
}

export default function LessonTileProps({
    lessonNumber,
    lessonTitle,
    lessonCourse,
    lessonPath,
    onHandleChangeLesson,
}: LessonTileProps) {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <div onClick={() => onHandleChangeLesson(lessonNumber)}>
                <h4 className={styles.subtitle}>Lesson #{lessonNumber + 1}</h4>
                <h2 className={styles.title}>{lessonTitle}</h2>
            </div>
        </div>
    );
}
