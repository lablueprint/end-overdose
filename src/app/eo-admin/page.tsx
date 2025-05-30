'use client';
import StatCard from './components/StatCard';
import SchoolsTable from './components/SchoolsTable';
import styles from './Dashboard.module.css';
import { useUserStore } from '@/store/userStore';
import { useEffect, useState, useCallback } from 'react';

//Server Actions
import { getSingleSchoolAdminEmailMap } from '../api/admins/actions';
import { getSchoolCount, getAllSchools } from '../api/schools/actions';
import { getStudentCount } from '../api/students/actions';
import AddSchoolPopup from './components/AddSchoolPopup';

export default function AdminDashboard() {
    const { user } = useUserStore(); // Current User

    const [studentCount, setStudentCount] = useState<number | null>(null);
    const [schoolCount, setSchoolCount] = useState<number | null>(null);
    const [averagePerformance, setAveragePerformance] = useState<number | null>(
        0
    );
    const [courseCount, setCourseCount] = useState<number | null>(null);
    const [schoolsData, setSchoolsData] = useState<any[]>([]);
    const [showComponent, setShowComponent] = useState(false);
    const [refreshCounter, setRefreshCounter] = useState(0);

    const refreshData = useCallback(() => {
        // Increment the counter to trigger the useEffect
        setRefreshCounter((prev) => prev + 1);
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch counts
                const students = await getStudentCount();
                const schools = await getSchoolCount();

                // Fetch all schools with their details
                const allSchools = await getAllSchools();
                const schoolAdmins = await getSingleSchoolAdminEmailMap();

                // Transform schools data to match the expected format
                const schoolData = allSchools.map((school) => ({
                    school_id: school.school_id,
                    school_name: school.school_name,
                    school_email:
                        schoolAdmins[school.school_id] || 'No admin registered',
                    student_count: school.enrolled_students,
                    average_score:
                        school.average_performances !== null
                            ? school.average_performances.opioidCourse
                            : 0,
                    courseCount: Object.keys(school.average_performances || {})
                        .length,
                }));

                setSchoolsData(schoolData);
                setStudentCount(students);
                setSchoolCount(schools);

                let totalPerformance = 0;

                schoolData.forEach((school) => {
                    totalPerformance += school.average_score;
                });

                const avgPerformance =
                    schoolData.length > 0
                        ? Math.round(
                              (totalPerformance / schoolData.length) * 10
                          ) / 10
                        : 0;
                setAveragePerformance(avgPerformance);

                if (user) {
                    setCourseCount(schoolData[0].courseCount);
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        }

        fetchData();
    }, [user, refreshCounter]);

    const handleSchoolAdded = () => {
        refreshData();
    };

    return (
        <div className="h-full max-h-screen overflow-auto pb-8">
            <div className={styles.container}>
                <h2 className={styles.dashboardTitle}>Dashboard</h2>
                {/* Welcome Section */}
                <div className="mb-6 mt-4">
                    <h1 className="text-3xl font-bold uppercase">
                        Welcome Back, EO Admin!
                    </h1>
                    <p className="text-gray-500 mt-5">
                        Check in on schools and courses published
                    </p>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-8 rounded-2xl shadow-md px-6 py-4 bg-white">
                    <div className="border-r flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                            </svg>
                        </div>
                        <div>
                            <div className="text-gray-500 mb-1">
                                Enrolled Schools
                            </div>
                            <div className="text-2xl font-bold">
                                {schoolCount !== null
                                    ? schoolCount
                                    : 'Loading...'}
                            </div>
                        </div>
                    </div>

                    <div className="border-r flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                            </svg>
                        </div>
                        <div>
                            <div className="text-gray-500 mb-1">
                                Enrolled Students
                            </div>
                            <div className="text-2xl font-bold">
                                {studentCount !== null
                                    ? studentCount
                                    : 'Loading...'}
                            </div>
                        </div>
                    </div>

                    <div className="border-r flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                            </svg>
                        </div>
                        <div>
                            <div className="text-gray-500 mb-1">
                                Average Performance
                            </div>
                            <div className="text-2xl font-bold">
                                {averagePerformance !== null
                                    ? averagePerformance + '%'
                                    : 'Loading...'}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                        </div>
                        <div>
                            <div className="text-gray-500 mb-1">
                                All Courses
                            </div>
                            <div className="text-2xl font-bold">
                                {courseCount !== null
                                    ? courseCount
                                    : 'Loading...'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add School Section */}
                <div
                    className="bg-gray-100 rounded-2xl shadow-md flex flex-col items-center text-center space-y-2 px-6 py-6 mb-10"
                    style={{ minHeight: '110px' }}
                >
                    <button
                        className="w-12 h-12 rounded-full text-black flex items-center justify-center text-2xl bg-white hover:bg-gray-400 transition-colors duration-200"
                        onClick={() => setShowComponent(true)}
                    >
                        +
                    </button>
                    <div className="text-2xl font-bold text-gray-800 ml-4">
                        ADD SCHOOL
                    </div>
                    <div className="text-lg font-medium text-gray-800 ml-4">
                        {' '}
                        Add a new school to your database
                    </div>
                </div>

                {showComponent && (
                    <AddSchoolPopup
                        isOpen={showComponent}
                        setIsOpen={setShowComponent}
                        onSchoolAdded={handleSchoolAdded}
                    />
                )}

                {/* School List Section */}
                <div className={styles.schoolsSection}>
                    <SchoolsTable schools={schoolsData} />
                </div>
            </div>
        </div>
    );
}
