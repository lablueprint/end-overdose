'use client';
import { useRouter } from 'next/navigation';

interface LessonProps {
    lessonPath: string;
    lessonTitle: string;
    lessonCourse: string;
    lessonProgress: number;
}

export default function Lesson({
    lessonTitle,
    lessonProgress,
    lessonCourse,
    lessonPath,
}: LessonProps) {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/courses/${lessonCourse}/${lessonPath}`);
    };
    return (
        <>
            <div style={{ cursor: 'pointer' }} onClick={handleClick}>
                Title: {lessonTitle}, Progress:{lessonProgress}
            </div>
            <div>
                <progress value={lessonProgress} max={100}></progress>
            </div>
        </>
    );
}
