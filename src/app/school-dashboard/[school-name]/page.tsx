'use client';

import { useParams } from 'next/navigation';
import styles from './Dashboard.module.css';
import { useUserStore } from '@/store/userStore';
import { useEffect, useState } from 'react';
import StudentsTable from './components/StudentsTable';

//NOTE: Interfaces here
interface Course {
    id: number;
    name: string;
}

interface StudentCourse {
    courseId: number;
    score: number;
}

interface Student {
    id: string;
    name: string;
    avatar: string;
    averageGrade: number;
    courses: StudentCourse[];
}

export default function SchoolDashboard() {
    const { user } = useUserStore();
    const params = useParams();
    const schoolName = params['school-name'] as string;

    // Use these interfaces when initializing state
    const [students, setStudents] = useState<Student[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call to get students and courses for this school
        const fetchData = async () => {
            setLoading(true);

            // Example data - replace with your actual API call
            const exampleCourses = [
                { id: 1, name: 'Stimulant Emergency' },
                { id: 2, name: 'Prevention Jobs' },
                { id: 3, name: 'Recognizing Signs' },
                // Add more courses as needed
            ];

            const exampleStudents = [
                {
                    id: '015627358',
                    name: 'Arya Nasikkar',
                    avatar: '/avatars/arya.jpg',
                    averageGrade: 89,
                    courses: [
                        { courseId: 1, score: 70 },
                        { courseId: 2, score: 99 },
                        { courseId: 3, score: 68 },
                    ],
                },
                {
                    id: '325627350',
                    name: 'Joanna Bui',
                    avatar: '/avatars/joanna.jpg',
                    averageGrade: 70,
                    courses: [
                        { courseId: 1, score: 100 },
                        { courseId: 2, score: 68 },
                        { courseId: 3, score: 68 },
                    ],
                },
                {
                    id: '006627321',
                    name: 'Mackenzie Smith',
                    avatar: '/avatars/mackenzie.jpg',
                    averageGrade: 61,
                    courses: [
                        { courseId: 1, score: 68 },
                        { courseId: 2, score: 55 },
                        { courseId: 3, score: 78 },
                    ],
                },
            ];

            setCourses(exampleCourses);
            setStudents(exampleStudents);
            setLoading(false);
        };

        fetchData();
    }, [schoolName, user]);

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.dashboardHeader}>
                <h1 className={styles.schoolTitle}>{schoolName} Dashboard</h1>
            </div>

            <div className={styles.studentsSection}>
                <h2 className={styles.sectionTitle}>Students</h2>

                {loading ? (
                    <div className={styles.loading}>
                        Loading student data...
                    </div>
                ) : (
                    <StudentsTable students={students} courses={courses} />
                )}
            </div>
        </div>
    );
}
