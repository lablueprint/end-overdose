'use client';

import { useRouter } from 'next/navigation';
import styles from './LessonTile.module.css';
import '@fontsource/roboto-condensed';
import LockIcon from '@mui/icons-material/Lock';
import Image from 'next/image';
interface LessonTileProps {
    lessonNumber: number;
    lessonTitle: string;
    lessonCourse: string;
    lessonPath: string;
    onHandleChangeLesson: (lessonNumber: number) => void;
    selected: boolean;
    disabled: boolean; // for disabling unreached lesson tile
}

export default function LessonTileProps({
    lessonNumber,
    lessonTitle,
    lessonCourse,
    lessonPath,
    onHandleChangeLesson,
    selected,
    disabled = false,
}: LessonTileProps) {
    const router = useRouter();

    return (
        <div
            className={`${styles.container} ${selected ? styles.selectedContainer : ''}`}
            onClick={
                disabled ? () => {} : () => onHandleChangeLesson(lessonNumber)
            }
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                fontFamily: 'Roboto Condensed, sans-serif',
                opacity: 1,
                cursor: disabled ? 'not-allowed' : 'pointer',
                position: 'relative', // necessary for overlay to work
            }}
        >
            <div>
                <h4 className={styles.subtitle}>Lesson #{lessonNumber + 1}</h4>
                <h2 className={styles.title}>{lessonTitle}</h2>
            </div>

            {disabled && (
                <div className={styles.disabledOverlay}>
                    <LockIcon className={styles.lockIcon} />
                </div>
            )}
        </div>
    );
}
