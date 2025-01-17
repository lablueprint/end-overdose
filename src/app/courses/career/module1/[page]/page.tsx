'use client';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import SimplePage from '@/app/courses/components/SimplePage';

export default function CareerPage() {
    const params = useParams<{ page: string }>();
    const router = useRouter();
    const totalCoursePages = 3;
    const handleNext = () => {
        if (parseInt(params.page) !== totalCoursePages) {
            router.push(`/courses/career/module1/${parseInt(params.page) + 1}`);
        }
    };
    const handlePrevious = () => {
        if (parseInt(params.page) !== 1) {
            router.push(`/courses/career/module1/${parseInt(params.page) - 1}`);
        }
    };
    return (
        <div>
            <h1> Career Pages {params.page}</h1>
            <div>
                <SimplePage
                    pageTitle="Title"
                    handleNext={handleNext}
                    handlePrevious={handlePrevious}
                />
            </div>
        </div>
    );
}
