'use client';
import { useRouter } from 'next/navigation';
import styles from './LessonBanner.module.css';

interface LessonBannerProps {
    lessonNumber: number;
    lessonProgress: number;
}

export default function LessonBanner({
    lessonNumber,
    lessonProgress,
}: LessonBannerProps) {
    return (
        <div className={styles.bannerBox}>
            <h1>Lesson: {lessonNumber}</h1>
            <p> Progress: {lessonProgress}/100</p>
        </div>
    );
}
