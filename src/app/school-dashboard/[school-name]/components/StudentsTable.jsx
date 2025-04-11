// StudentsTable.js
import styles from './StudentsTable.module.css';
import Image from 'next/image';

export default function StudentsTable({ students, courses }) {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.rankHeader}></th>
                        <th className={styles.studentHeader}>
                            Student <span className={styles.sortIcon}>↓</span>
                        </th>
                        <th className={styles.gradeHeader}>
                            Avg. Grade{' '}
                            <span className={styles.sortIcon}>↓</span>
                        </th>
                        {courses.map((course, index) => (
                            <th key={index} className={styles.courseHeader}>
                                {course.name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.id} className={styles.tableRow}>
                            <td className={styles.rankCell}>{index + 1}</td>
                            <td className={styles.studentCell}>
                                <div className={styles.studentInfo}>
                                    <div className={styles.avatarContainer}>
                                        <Image
                                            src={
                                                student.avatar ||
                                                '/placeholder-avatar.png'
                                            }
                                            alt={student.name}
                                            width={40}
                                            height={40}
                                            className={styles.avatar}
                                        />
                                    </div>
                                    <div className={styles.studentDetails}>
                                        <div className={styles.studentName}>
                                            {student.name}
                                        </div>
                                        <div className={styles.studentId}>
                                            {student.id}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className={styles.gradeCell}>
                                {student.averageGrade}%
                            </td>
                            {courses.map((course, courseIndex) => {
                                const courseResult =
                                    student.courses.find(
                                        (c) => c.courseId === course.id
                                    ) || {};
                                const isPassing = courseResult.score >= 70;

                                return (
                                    <td
                                        key={courseIndex}
                                        className={styles.courseCell}
                                    >
                                        <div
                                            className={`${styles.courseResult} ${isPassing ? styles.pass : styles.fail}`}
                                        >
                                            {isPassing ? 'Pass' : 'Fail'}
                                        </div>
                                        <div className={styles.courseScore}>
                                            {courseResult.score || 'N/A'}%
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
