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
            <div className="relative cursor-pointer border-2 w-80 h-64 m-5 p-5 rounded-xl">
                <div onClick={handleClick}>
                    <h2 className="leading-8 font-bold">{courseTitle}</h2>
                </div>
                <div>
                    <progress value={courseProgress} max={100}></progress>{' '}
                    {courseProgress}
                </div>
                <div className="absolute w-32 border-2 h-28 bottom-5 right-5"></div>
            </div>
        </>
    );
}
