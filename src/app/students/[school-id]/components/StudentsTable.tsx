'use client';

import { useState } from 'react';
import styles from './StudentsTable.module.css';
import { NewStudent } from '@/types/newStudent';
import { NewSchoolAdmin } from '@/types/newSchoolAdmin';
import { getSchoolStudentIds } from '@/app/api/schools/actions';
import { deleteStudentFromSchool } from '@/app/api/schools/actions';
import { useEffect } from 'react';
import { get } from 'axios';

type StudentEntry = {
    student_password: string;
    student_firebase_id: string;
};

const StudentsTable = ({
    students,
    user,
}: {
    students: NewStudent[];
    user: NewSchoolAdmin | null;
}) => {
    const [studentList, setStudentList] = useState<NewStudent[]>(students);
    const [studentIDs, setStudentIDs] = useState<Record<string, string>>({});

    const handleDelete = async (studentId: string, schoolId: string) => {
        await deleteStudentFromSchool(schoolId, studentId);

        // Remove the deleted student from the list
        setStudentList((prev) =>
            prev.filter((student) => student.student_id !== studentId)
        );
    };

    useEffect(() => {
        const fetchStudentIds = async () => {
            const result = await getSchoolStudentIds(user?.school_id || '');
            if (result) {
                setStudentIDs(result);
            }
        };
        fetchStudentIds();
    }, [user?.school_id]);

    console.log('Student IDs:', studentIDs);

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.rankColumn}></th>
                        <th className={styles.studentColumn}>Student</th>
                        <th className={styles.gradeColumn}>Password</th>
                        <th className={styles.courseColumn}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {studentList.map((student, index) => (
                        <tr key={student.student_id}>
                            <td className={styles.rankColumn}>{index + 1}</td>
                            <td className={styles.studentColumn}>
                                {student.student_id}
                            </td>
                            <td className={styles.gradeColumn}>
                                {studentIDs[student.student_id]}
                            </td>
                            <td className={styles.courseColumn}>
                                <button
                                    onClick={() =>
                                        handleDelete(
                                            student.student_id,
                                            user?.school_id || ''
                                        )
                                    }
                                    className="bg-white text-black border border-black px-6 py-1 text-sm rounded-xl hover:bg-gray-100 transition-colors"
                                >
                                    DELETE
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentsTable;
