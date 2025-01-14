'use client';
import VideoPage from '@/app/courses/components/VideoPage';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

export default function OpioidPage() {
    const params = useParams<{ page: string }>();
    const router = useRouter();
    const totalCoursePages = 3;
    const handleNext = () => {
        if (parseInt(params.page) !== totalCoursePages) {
            router.push(`/courses/opioid/module1/${parseInt(params.page) + 1}`);
        }
    };
    const handlePrevious = () => {
        if (parseInt(params.page) !== 1) {
            router.push(`/courses/opioid/module1/${parseInt(params.page) - 1}`);
        }
    };
    return (
        <div>
            <h1> Opioid Pages {params.page}</h1>
            <VideoPage
                pageTitle={params.page}
                pageContent={'Hello'}
                pageModule={'module1'}
                pageCourse={'opioid'}
                pagePath={'1'}
                videoPath={'https://www.youtube.com/watch?v=LXb3EKWsInQ'}
                startTime={'0:00'}
                endTime={'1:00'}
            />

            <div onClick={handleNext}>Next</div>
            <div onClick={handlePrevious}>Previous</div>
        </div>
    );
}
