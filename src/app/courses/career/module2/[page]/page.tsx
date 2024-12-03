'use client';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

export default function CareerPage() {
    const params = useParams<{ page: string }>();
    const router = useRouter();
    const totalCoursePages = 2;
    const handleNext = () => {
        if (parseInt(params.page) !== totalCoursePages) {
            router.push(`/courses/career/module2/${parseInt(params.page) + 1}`);
        }
    };
    const handlePrevious = () => {
        if (parseInt(params.page) !== 1) {
            router.push(`/courses/career/module2/${parseInt(params.page) - 1}`);
        }
    };
    return (
        <div>
            <h1> Career Pages {params.page}</h1>
            <div onClick={handleNext}>Next</div>
            <div onClick={handlePrevious}>Previous</div>
        </div>
    );
}
