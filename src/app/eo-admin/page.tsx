'use client';
import StatCard from './components/StatCard';
import FeatureCard from './components/FeatureCard';
import SchoolsTable from './components/SchoolsTable';
import styles from './Dashboard.module.css';
import { useUserStore } from '@/store/userStore';
import { useEffect, useState } from 'react';

//Server Actions
import { getCourseCount } from '../api/admins/actions';
import { getSchoolAdmins } from '../api/admins/actions';
import {
    getSchool,
    toggleCourseInclusion,
    getSchoolCount,
} from '../api/schools/actions';
import { getStudentCount } from '../api/students/actions';

export default function AdminDashboard() {
    const adminsBySchool = getSchoolAdmins();
    const { user } = useUserStore(); // Current User

    // Mock data (replace with actual data from your API)
    const stats = {
        enrolledStudents: 988,
        enrolledSchools: 100,
        currentCourses: 15,
    };

    const schoolsData = [
        {
            id: '001315',
            name: 'Fairfax High School',
            email: 'fairfaxhs@gmail.com',
            studentCount: 500,
            avgScore: '98%',
        },
        {
            id: '203418',
            name: 'Hamilton High School',
            email: 'hamihs@gmail.com',
            studentCount: 900,
            avgScore: '89%',
        },
    ];

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

    return (
        <div className={styles.container}>
            {/* Welcome Section */}
            <div className={styles.welcomeSection}>
                <p className={styles.welcomeText}>Welcome Back,</p>
                <h1 className={styles.welcomeName}>Mackenzie Smith</h1>
            </div>

            <h2 className={styles.dashboardTitle}>Dashboard</h2>

            {/* Stats Cards Row */}
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
                    title="Enrolled Students"
                    value={studentCount !== null ? studentCount : 'Loading...'}
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
                    title="Enrolled Schools"
                    value={schoolCount !== null ? schoolCount : 'Loading...'}
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
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                        </svg>
                    }
                    title="Current Courses"
                    value={courseCount !== null ? courseCount : 'Loading...'}
                />
            </div>

            {/* Feature Cards */}
            <div className={styles.featureCardsRow}>
                <FeatureCard
                    title="Current Courses"
                    description="Manage your released courses and create new ones"
                    buttonText="View Courses"
                />
                <FeatureCard
                    title="Analyze Scores"
                    description="Track student performance and course scores"
                    buttonText="View Courses"
                />
            </div>

            {/* School List Section */}
            <div className={styles.schoolsSection}>
                <h2 className={styles.schoolsSectionTitle}>Schools</h2>
                <SchoolsTable schools={schoolsData} />
            </div>
        </div>
    );
}
