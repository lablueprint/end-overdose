'use client';
import { useUserStore } from '@/store/userStore';
import Switch from '@mui/material/Switch';
import { getSchool, toggleCourseInclusion } from '../api/schools/actions';
import { useState, useEffect } from 'react';
import { SchoolDocument } from '@/types/School';

// List of all courses available globally, TODO: Fetch this from the database
const list_of_all_courses = [
    'COURSE#12345',
    'COURSE#67890',
    'COURSE#54321',
    'COURSE#09876',
    'COURSE#13579',
    'COURSE#24680',
];

// Admin Dashboard Component, currently displays all courses and toggle switches to include/exclude them
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
                setIncludedCourses(schoolData?.school.course_ids);
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

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {/* Below displays the list of all globally available courses and toggle switches to include/exclude them */}
            {included_courses &&
                list_of_all_courses.map((course_id) => (
                    <ul key={course_id} className="mb-1">
                        {course_id}
                        <Switch
                            checked={included_courses.includes(course_id)}
                            onChange={() =>
                                schoolDoc &&
                                updateCourseInclusion(schoolDoc.id, course_id)
                            }
                        />
                    </ul>
                ))}
        </div>
    );
}
