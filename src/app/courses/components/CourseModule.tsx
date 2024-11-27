'use client';
import { useRouter } from 'next/navigation';

interface CourseModuleProps {
    coursePath: string;
    courseTitle: string;
    courseProgress: number;
}

export default function CourseModule({
    courseTitle,
    courseProgress,
    coursePath,
}: CourseModuleProps) {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/courses/${coursePath}`);
    };
    return (
        <div style={{ cursor: 'pointer' }} onClick={handleClick}>
            Title: {courseTitle}, Progress:{courseProgress}
        </div>
    );
}
