'use client';
import { useRouter } from 'next/navigation';
import styles from './courses.module.css';

interface CourseProps {
    coursePath: string;
    courseTitle: string;
    courseProgress: number | string;
}

export default function Course({
    courseTitle,
    courseProgress,
    coursePath,
}: CourseProps) {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/courses/${coursePath}`);
    };
    return (
        <div className={styles.container}>
            <div onClick={handleClick}>
                <h2 className={styles.title}>{courseTitle}</h2>
            </div>
            <div className={styles.progressWrapper}>
                <progress value={courseProgress} max={100}></progress>{' '}
                {courseProgress}
            </div>
            <div className={styles.absoluteBox}></div>
        </div>
    );
}
