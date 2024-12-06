'use client';
import { useRouter } from 'next/navigation';
interface videoPageProps {
    pageTitle: string;
    pageContent: string;
    pageModule: string;
    pageCourse: string;
    pagePath: string;
    videoPath: string;
}

export default function VideoPage({
    pageTitle,
    pageContent,
    pageModule,
    pageCourse,
    pagePath,
    videoPath,
}: videoPageProps) {
    const router = useRouter();
    // not sure if this is necessary and/or is good code, lowkey just hardcoding a totalCoursePages for now for a next page link
    const totalCoursePages = 3;
    const handleNext = () => {
        if (parseInt(pagePath) + 1 !== totalCoursePages)
            router.push(
                `/courses/${pageCourse}/${pageModule}/${parseInt(pagePath) + 1}`
            );
    };
    return (
        <div>
            <h1>{pageTitle}</h1>
            <p>{pageContent}</p>
            <video src={videoPath} width="1000" height="800" />
            <div style={{ cursor: 'pointer' }} onClick={handleNext}>
                Next Page
            </div>
        </div>
    );
}
