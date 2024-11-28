'use client';
import { useRouter } from 'next/navigation';

interface ModuleProps {
    modulePath: string;
    moduleTitle: string;
    moduleCourse: string;
    moduleProgress: number;
}

export default function Module({
    moduleTitle,
    moduleProgress,
    moduleCourse,
    modulePath,
}: ModuleProps) {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/courses/${moduleCourse}/${modulePath}`);
    };
    return (
        <>
            <div style={{ cursor: 'pointer' }} onClick={handleClick}>
                Title: {moduleTitle}, Progress:{moduleProgress}
            </div>
            <div>
                <progress value={moduleProgress} max={100}></progress>
            </div>
        </>
    );
}
