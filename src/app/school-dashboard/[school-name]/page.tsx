'use client';

import { useParams } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { useEffect, useState } from 'react';
import { getSchoolStudents } from '@/app/api/students/actions';
import { NewStudent } from '@/types/newStudent';
import { NewSchool } from '@/types/newSchool';
import { getSchoolData, getSchoolStats } from '@/app/api/schools/actions';
import StudentsTable from '../components/StudentsTable';

interface Quiz {
    name: string;
    score: number;
}

interface Student {
    student_id: string;
    email: string;
    school_name: string;
    nameplate: string;
    fish_count: number;
    courses: {
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

export default function SchoolDashboard() {
    const { user } = useUserStore();
    const params = useParams();
    const schoolId = params['school-name'] as string;
    const [students, setStudents] = useState<NewStudent[]>([]);
    const [school, setSchool] = useState<School | null>();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<{
        enrolled_students: number;
        average_score: number | null;
        students_in_progress: number;
        students_completed: number;
    } | null>(null);
    const [schoolName, setSchoolName] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [schoolStudents, schoolData, schoolStats] = await Promise.all([
                    getSchoolStudents(schoolId),
                    getSchoolData(user?.school_id),
                    getSchoolStats(schoolId),
                ]);
                setStudents(schoolStudents);
                setStats(schoolStats);
                setSchoolName(schoolData?.school_name);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (schoolId) {
            fetchData();
        }
    }, [schoolId, user]);

    // Hardcoded values for statistics
    const avgPerformance = '98%';
    const completedCount = 130;
    const inProgressCount = 20;
    const enrolledStudents = 150;

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="mb-8 mt-8">
                <div className="flex flex-col">
                    <div className="flex items-baseline gap-4">
                        <h1 className="text-3xl font-bold uppercase">
                            {schoolName || 'SCHOOL NAME'}
                        </h1>
                    </div>
                    <div className="mt-1 text-gray-600 flex items-center gap-2">
                        <span className="font-semibold text-black text-base">
                            Josie Bruin
                        </span>
                        <span className="mx-1 text-gray-400">•</span>
                        <a
                            href={`mailto:${user?.email || 'school@email.com'}`}
                            className="text-gray-400 underline"
                        >
                            {user?.email || 'school@email.com'}
                        </a>
                    </div>
                </div>
            </div>

            {/* Statistics Rectangle */}
            <div
                className="bg-white rounded-2xl shadow-md flex justify-between items-center px-6 py-6 mb-10"
                style={{ minHeight: '110px' }}
            >
                {/* Enrolled Students */}
                <div className="flex items-center gap-4 flex-1">
                    <img
                        src="/enrolled.png"
                        alt="Enrolled"
                        className="w-12 h-12"
                    />
                    <div>
                        <div className="text-gray-500 text-sm mb-1">
                            Enrolled Students
                        </div>
                        <div className="text-2xl font-bold">
                            {stats?.enrolled_students}
                        </div>
                    </div>
                </div>
                <div
                    className="border-l border-gray-300 mx-6"
                    style={{ height: '80px' }}
                />
                {/* Avg. Performance */}
                <div className="flex items-center gap-4 flex-1">
                    <img
                        src="/performance.png"
                        alt="Performance"
                        className="w-12 h-12"
                    />
                    <div>
                        <div className="text-gray-500 text-sm mb-1">
                            Avg. Performance
                        </div>
                        <div className="text-2xl font-bold">
                         {stats?.average_score !== null ? `${Math.round(stats?.average_score)}%` : '-'}
                        </div>
                    </div>
                </div>
                <div
                    className="border-l border-gray-300 mx-6"
                    style={{ height: '80px' }}
                />
                {/* All Courses Completed */}
                <div className="flex items-center gap-4 flex-1">
                    <img
                        src="/completed.png"
                        alt="Completed"
                        className="w-12 h-12"
                    />
                    <div>
                        <div className="text-gray-500 text-sm mb-1">
                            All Courses Completed
                        </div>
                        <div className="text-2xl font-bold">
                            {stats?.students_completed}
                        </div>
                    </div>
                </div>
                <div
                    className="border-l border-gray-300 mx-6"
                    style={{ height: '80px' }}
                />
                {/* Students In Progress */}
                <div className="flex items-center gap-4 flex-1">
                    <img
                        src="/inprogress.png"
                        alt="In Progress"
                        className="w-12 h-12"
                    />
                    <div>
                        <div className="text-gray-500 text-sm mb-1">
                            Students In Progress
                        </div>
                        <div className="text-2xl font-bold">
                            {stats?.students_in_progress}
                        </div>
                    </div>
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


// TODO:
// Get and display admin name (to replace hard-coded Josie Bruin); it's not in Zustand user state