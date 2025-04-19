'use client';

import { useParams } from 'next/navigation';
import styles from './Dashboard.module.css';
import { useUserStore } from '@/store/userStore';
import { useEffect, useState } from 'react';
import { getSchoolStudents } from '@/app/api/students/actions'; // Adjust the import path as needed
import StudentsTable from './components/StudentsTable'; // Import the StudentsTable component

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
            courseScore: number; // % of final score >=80 then we do ++passed
            courseProgress: number; // % of lessons completed == 100
            //attempts on final
        };
        careerCourse: {
            courseScore: number; // % of final score
            courseProgress: number; // % of lessons completed
        };
    };
    quizzes: Quiz[];
    badges: string[];
    certificates: string[];
}

export default function SchoolDashboard() {
    const { user } = useUserStore();
    const params = useParams();
    const schoolName = params['school-name'] as string;

    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const schoolStudents = await getSchoolStudents(schoolName);
                setStudents(schoolStudents);
            } catch (error) {
                console.error('Error fetching school data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (schoolName) {
            fetchData();
        }
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
                    <StudentsTable students={students} />
                )}
            </div>
        </div>
    );
}
