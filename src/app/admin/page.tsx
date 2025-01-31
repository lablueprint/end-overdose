'use client';
import { useUserStore } from '@/store/userStore';
import Switch from '@mui/material/Switch';
import { getSchool } from '../api/schools/actions';
import { useState, useEffect } from 'react';
import { SchoolDocument } from '@/types/School';

export default function Dashboard() {
    const { user } = useUserStore(); // Current User
    const [schoolDoc, setSchoolDoc] = useState<SchoolDocument | null>(null);
    const [included_courses, setIncludedCourses] = useState<Array<string>>([]); // List of courses that are included at user's school

    useEffect(() => {
        // Fetch the school data and included courses for the current user
        async function fetchSchool() {
            if (user) {
                const schoolData = await getSchool(user.school_name);
                setSchoolDoc(schoolData);
                setIncludedCourses(schoolData.school.course_ids);
            }
        }
        fetchSchool();
    }, [user]);

    // List of all courses available globally
    const list_of_all_courses = [
        '12345',
        '67890',
        '54321',
        '09876',
        '13579',
        '24680',
    ];

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {/* Below displays the list of all globally available courses and toggle switches to include/exclude them */}
            {list_of_all_courses.map((course_id) => (
                <ul key={course_id} className="mb-1">
                    {course_id}
                    <Switch checked={included_courses.includes(course_id)} />
                </ul>
            ))}
        </div>
    );
}
