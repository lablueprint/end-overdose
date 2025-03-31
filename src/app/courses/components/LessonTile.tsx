'use client';

import { useRouter } from 'next/navigation';
import styles from './LessonTile.module.css';
import '@fontsource/roboto-condensed';
import Image from 'next/image';
interface LessonTileProps {
    lessonNumber: number;
    lessonTitle: string;
    lessonCourse: string;
    lessonPath: string;
    onHandleChangeLesson: (lessonNumber: number) => void;
    selected: boolean;
}

export default function LessonTileProps({
    lessonNumber,
    lessonTitle,
    lessonCourse,
    lessonPath,
    onHandleChangeLesson,
    selected,
}: LessonTileProps) {
    const router = useRouter();

    return (
        <div
            className={`${styles.container} ${selected ? styles.selectedContainer : ''}`}
            onClick={() => onHandleChangeLesson(lessonNumber)}
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                fontFamily: 'Roboto Condensed, sans-serif',
            }}
        >
            <Image
                src="/videoIcon.png"
                width={37}
                height={37}
                alt="Video Icon"
                style={{
                    margin: '10px',
                }}
            />
            <div>
                <h4 className={styles.subtitle}>Lesson #{lessonNumber + 1}</h4>
                <h2 className={styles.title}>{lessonTitle}</h2>
            </div>
        </div>
    );
}
