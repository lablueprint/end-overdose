'use client';
import { useRouter } from 'next/navigation';
import styles from './LessonCircle.module.css';

interface LessonCircleProps {
    lessonPath: string;
    lessonTitle: string;
    lessonCourse: string;
    lessonProgress: number;
}

export default function LessonCircle({
    lessonTitle,
    lessonProgress,
    lessonCourse,
    lessonPath,
}: LessonCircleProps) {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/courses/${lessonCourse}/${lessonPath}`);
    };
    return (
        <>
            <div className={styles.container} onClick={handleClick}>
                <h1>{lessonTitle} </h1>
                <p>
                    Progress:{lessonProgress}
                    {/* <progress value={lessonProgress} max={100}></progress> */}
                </p>
            </div>
        </>
    );
}
