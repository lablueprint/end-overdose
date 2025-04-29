'use client';

import { useParams } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { useEffect, useState } from 'react';
import { getSchoolStudents } from '@/app/api/students/actions';
import { getSchoolData } from '@/app/api/schools/actions';
import StudentsTable from './components/StudentsTable';

interface Quiz {
    name: string;
    score: number;
}

interface Student {
    student_id: string;
    email: string;
    school_name: string;
    nameplate: string;
    kibble_count: number;
    course_completion: {
        opioidCourse: {
            courseScore: number;
            courseProgress: number;
        };
        careerCourse: {
            courseScore: number;
            courseProgress: number;
        };
    };
    quizzes: Quiz[];
    badges: string[];
    certificates: string[];
}

interface School {
    school_name: string;
    school_id: number;
    school_email: string;
    student_ids: Map<string, string>;
    student_count: number;
    course_ids: Array<string>;
    joined_date?: string;
}

export default function SchoolDashboard() {
    const { user } = useUserStore();
    const params = useParams();
    const schoolName = params['school-name'] as string;

    const [students, setStudents] = useState<Student[]>([]);
    const [school, setSchool] = useState<School | null>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const schoolStudents = await getSchoolStudents(schoolName);
                const schoolData = await getSchoolData(schoolName);
                setSchool(schoolData);
                setStudents(schoolStudents);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (schoolName) {
            fetchData();
        }
    }, [schoolName, user]);

    // Hardcoded values for statistics
    const avgPerformance = '98%';
    const completedCount = 130;
    const inProgressCount = 20;
    const enrolledStudents = 150;

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

            {loading ? (
                <div className="flex justify-center py-8">
                    <div className="animate-pulse">Loading student data...</div>
                </div>
            ) : (
                <StudentsTable students={students} />
            )}
        </div>
    );
}
