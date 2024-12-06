'use client';
import { useRouter } from 'next/navigation';

interface CourseProps {
    coursePath: string;
    courseTitle: string;
    courseProgress: number;
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
        <>
            <div style={{ cursor: 'pointer' }} onClick={handleClick}>
                Title: {courseTitle}, Progress:{courseProgress}
            </div>
            <div>
                <progress value={courseProgress} max={100}></progress>
            </div>
        </>
    );
}
