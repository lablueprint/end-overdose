'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getSchoolDataByID } from '@/app/api/schools/actions';
import './SchoolStatPage.css';

interface School {
    school_name: string;
    school_id: number;
    school_email: string;
    student_ids: Map<string, string>;
    student_count: number;
    course_ids: Array<string>;
    joined_date?: string;
}

export default function SchoolStatPage() {
    const params = useParams();
    const schoolId = Number(params['school-id'] as string);
    const [school, setSchool] = useState<School | null>();
    const [loading, setLoading] = useState(true);
    const enrolledStudents = 1000;
    const avgPerformance = 85;
    const completedCount = 800;
    const inProgressCount = 200;
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch school data from the API
                console.log('School data fetched successfully');
                const schoolData = await getSchoolDataByID(schoolId);
                setSchool(schoolData);
                console.log('School data fetched successfully');
            } catch (error) {
                console.error('Error fetching school data:', error);
            } finally {
                setLoading(false);
            }
        };
        if (schoolId) {
            fetchData();
        }
    }, [schoolId]);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="mb-8">
                <div className="flex flex-col">
                    <div className="flex items-baseline gap-4">
                        <h1 className="text-3xl font-bold">
                            {school?.school_name}
                        </h1>
                        <span className="text-gray-500">
                            Joined {school?.joined_date || 'September 28, 2024'}
                        </span>
                    </div>

                    <div className="mt-4 text-gray-600">
                        <span>{school?.school_email}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="border-r pr-4">
                    <div className="text-gray-500 mb-1">Enrolled Students</div>
                    <div className="text-2xl font-bold">{enrolledStudents}</div>
                </div>

                <div className="border-r px-4">
                    <div className="text-gray-500 mb-1">Avg. Performance</div>
                    <div className="text-2xl font-bold">{avgPerformance}</div>
                </div>

                <div className="border-r px-4">
                    <div className="text-gray-500 mb-1">Students Completed</div>
                    <div className="text-2xl font-bold">{completedCount}</div>
                </div>

                <div className="pl-4">
                    <div className="text-gray-500 mb-1">
                        Students In Progress
                    </div>
                    <div className="text-2xl font-bold">{inProgressCount}</div>
                </div>
            </div>
            <div>
                <h1>Opioid</h1>
                <h2>{avgPerformance}% avg count</h2>
                <div className="custom-progress-container">
                    <div
                        className="custom-progress-fill"
                        style={{
                            width: `${avgPerformance}%`,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
