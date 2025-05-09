'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getSchoolDataByID } from '@/app/api/schools/actions';
import ProgressBar from './Components/ProgressBar';
import StatusPieChart from './Components/CustomPieChart';

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
    const topics = [{ label: 'Opioid', percentage: 85 }];
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
        <div className="max-w-6xl mx-auto px-4 py-6 pt-16">
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
            <div className="border-b border-gray-300 py-4 mb-8">
                <nav className="flex space-x-8">
                    <button className="pb-2 text-black font-semibold border-b-2 border-black">
                        Overview
                    </button>
                    <button className="pb-2 text-gray-400 hover:text-black">
                        Courses
                    </button>
                </nav>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-8 rounded-2xl shadow-md px-6 py-4 bg-white">
                <div className="border-r">
                    <div className="text-gray-500 mb-1">Enrolled Students</div>
                    <div className="text-2xl font-bold">{enrolledStudents}</div>
                </div>

                <div className="border-r">
                    <div className="text-gray-500 mb-1">Avg. Performance</div>
                    <div className="text-2xl font-bold">{avgPerformance}%</div>
                </div>

                <div className="border-r">
                    <div className="text-gray-500 mb-1">Students Completed</div>
                    <div className="text-2xl font-bold">{completedCount}</div>
                </div>

                <div>
                    <div className="text-gray-500 mb-1">
                        Students In Progress
                    </div>
                    <div className="text-2xl font-bold">{inProgressCount}</div>
                </div>
            </div>
            <div className="flex justify-between gap-8">
                <div className="w-3/5 p-4 bg-white rounded-2xl shadow-md">
                    <h1 className="text-3xl font-bold pb-4">Topics</h1>
                    <div className="pl-8 pr-4 pb-6 flex flex-col space-y-6">
                        {topics.map((topic) => (
                            <ProgressBar
                                key={topic.label}
                                label={topic.label}
                                percentage={topic.percentage}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-2/5 p-4 bg-white rounded-2xl shadow-md space-y-4">
                    <h1 className="text-3xl font-bold pb-4">Steps to Take</h1>
                    <StatusPieChart
                        failPercent={10}
                        inProgressPercent={40}
                        passPercent={50}
                    />
                </div>
            </div>
        </div>
    );
}
