'use client';
import { useUserStore } from '@/store/userStore';
import {
    getSchool,
    toggleCourseInclusion,
    getSchoolCount,
    addIdPasswordPair,
} from '../api/schools/actions';
import { getStudentCount } from '../api/students/actions';
import { useState, useEffect } from 'react';
import { SchoolDocument } from '@/types/School';
import { getCourseCount } from '../api/admins/actions';
import StatCard from './components/StatCard';
import styles from './Dashboard.module.css';
import StudentTable from './components/StudentTable';
import FeatureCard from './components/FeatureCard';
import AuthWrap from '@/components/AuthWrap';

const studentsData = [
    {
        id: '001315',
        name: 'Amy',
        email: 'Amy@ucla.edu',
        avgScore: '98%',
    },
    {
        id: '203418',
        name: 'Bob',
        email: 'Bob@ucla.edu',
        avgScore: '89%',
    },
];
// Admin Dashboard Component, currently displays all courses and toggle switches to include/exclude them
export default function Dashboard() {
    const { user } = useUserStore(); // Current User
    const [schoolDoc, setSchoolDoc] = useState<SchoolDocument | null>(null);
    const [included_courses, setIncludedCourses] = useState<Array<string>>([]); // List of courses that are included at user's school
    const [idPasswordPairs, setIdPasswordPairs] = useState<Map<string, string>>(
        new Map()
    );
    const [newId, setNewId] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [schoolId, setSchoolId] = useState('');
    useEffect(() => {
        // Fetch the school data and included courses for the current user
        async function fetchSchool() {
            if (user) {
                const schoolData = await getSchool(user.school_name);
                setSchoolId(schoolData.id);
                setSchoolDoc(schoolData);
                setIncludedCourses(schoolData?.school.course_ids);
                setIdPasswordPairs(
                    new Map(Object.entries(schoolData?.school.school_ids || {}))
                );
            }
        }
        fetchSchool();
    }, [user]);

    // Toggle the course inclusion
    const updateCourseInclusion = async (
        schoolId: string,
        courseId: string
    ) => {
        await toggleCourseInclusion(schoolId, courseId); // Update the course inclusion in the database
        // Update the local state
        setIncludedCourses((prev) =>
            prev.includes(courseId)
                ? prev.filter((course) => course !== courseId)
                : [...prev, courseId]
        );
    };
    const [studentCount, setStudentCount] = useState<number | null>(null);
    const [schoolCount, setSchoolCount] = useState<number | null>(null);
    const [courseCount, setCourseCount] = useState<number | null>(null);
    useEffect(() => {
        async function fetchCounts() {
            const students = await getStudentCount();
            const schools = await getSchoolCount();
            if (user && user.email) {
                const courses = await getCourseCount(user.email);
                setCourseCount(courses);
            }
            setStudentCount(students);
            setSchoolCount(schools);
        }
        fetchCounts();
    }, []);

    const handleSubmit = async () => {
        if (!schoolDoc) {
            setError('School document not found!');
            return;
        }
        if (!user) {
            setError('User not found!');
            return;
        }

        try {
            addIdPasswordPair(schoolId, newId, newPassword);
            const tempMap = new Map(idPasswordPairs);
            tempMap.set(newId, newPassword);
            setIdPasswordPairs(tempMap);
            setNewId('');
            setNewPassword('');
        } catch (err) {
            setError('Failed to update school IDs.');
            console.error(err);
        }
    };

    return (
        <>
            <div>
                <AuthWrap roles={['school_admin', 'eo_admin']}>
                    <div className={styles.container}>
                        <div className={styles.welcomeSection}>
                            <p className={styles.welcomeText}>Welcome Back,</p>
                            <h1 className={styles.welcomeName}>
                                Mackenzie Smith
                            </h1>
                        </div>
                        <h2 className={styles.dashboardTitle}>
                            School Dashboard
                        </h2>
                        <div className={styles.statsRow}>
                            <StatCard
                                icon={
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
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
                                }
                                title="Enrolled Students "
                                value={
                                    studentCount !== null
                                        ? studentCount
                                        : 'Loading...'
                                }
                            />
                            <StatCard
                                icon={
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
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
                                }
                                title="Current Courses"
                                value={
                                    courseCount !== null
                                        ? courseCount
                                        : 'Loading...'
                                }
                            />
                        </div>
                        <div className={styles.featureCardsRow}>
                            <FeatureCard
                                title="Current Courses"
                                description="Manage your released courses and create new ones"
                                buttonText="View Courses"
                                route="/admin/toggle-courses"
                            />
                            <FeatureCard
                                title="Analyze Scores"
                                description="Track student performance and course scores"
                                buttonText="View Student Scores"
                                route="/admin/toggle-courses" // go to same page for now
                            />
                        </div>
                        {/* School List Section */}
                        <div className={styles.schoolsSection}>
                            <h2 className={styles.schoolsSectionTitle}>
                                Students
                            </h2>
                            <StudentTable students={studentsData} />
                        </div>
                    </div>
                </AuthWrap>
                <form>
                    <label>
                        Name:
                        <input
                            type="text"
                            placeholder="Enter ID"
                            value={newId}
                            onChange={(e) => setNewId(e.target.value)}
                            className="border p-2 rounded mr-2"
                        />
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="border p-2 rounded mr-2"
                    />
                    <button
                        type="button"
                        onClick={() => schoolDoc && handleSubmit()}
                    >
                        Submit
                    </button>
                </form>
                <h2>ID-Password Pairs</h2>
                <ul>
                    {Array.from(idPasswordPairs.entries()).map(
                        ([id, password]) => (
                            <li key={id}>
                                <strong>{id}:</strong> {password}
                            </li>
                        )
                    )}
                </ul>
            </div>
        </>
    );
}
