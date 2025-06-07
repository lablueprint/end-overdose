import styles from './StudentsTable.module.css';
import { NewStudent } from '@/types/newStudent';

const StudentsTable = ({ students }: { students: NewStudent[] }) => {
    // Helper function to get status circle class
    const getStatusCircleClass = (score: number) => {
        if (score == 0) return `${styles.statusCircle} ${styles.statusFail}`;
        if (score == 100) return `${styles.statusCircle} ${styles.statusPass}`;
        return `${styles.statusCircle} ${styles.statusInProgress}`;
    };

    const getStatusString = (score: number) => {
        if (score == 0) return `Not Started`;
        if (score == 100) return `Completed`;
        return `In Progress`;
    };

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.rankColumn}></th>
                        <th className={styles.studentColumn}>Student</th>
                        <th className={styles.gradeColumn}>Avg. Grade</th>
                        <th className={styles.courseColumn}>Opioid Course</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => {
                        // Get the course data
                        const opioidCourse = student.courses.opioidCourse;

                        // Calculate average grade from both courses
                        const scores = [];
                        if (opioidCourse.courseScore > 0)
                            scores.push(opioidCourse.courseScore);

                        const avgGrade =
                            scores.length > 0
                                ? Math.round(
                                      scores.reduce(
                                          (sum, score) => sum + score,
                                          0
                                      ) / scores.length
                                  )
                                : 0;

                        return (
                            <tr key={student.student_id}>
                                <td className={styles.rankColumn}>
                                    {index + 1}
                                </td>
                                <td className={styles.studentColumn}>
                                    {student.student_id}
                                </td>
                                <td className={styles.gradeColumn}>
                                    {avgGrade > 0 ? `${avgGrade}%` : '-'}
                                </td>
                                <td className={styles.courseColumn}>
                                    <span
                                        className={getStatusCircleClass(
                                            student.courses.opioidCourse
                                                .courseProgress
                                        )}
                                    />
                                    {getStatusString(
                                        student.courses.opioidCourse
                                            .courseProgress
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default StudentsTable;
