import styles from './StudentsTable.module.css';

interface Quiz {
    name: string;
    score: number;
}

interface Student {
    student_id: string;
    email: string;
    school_name: string;
    nameplate: string;
    fish_count: number;
    course_completion: {
        opioidCourse: {
            courseScore: number;
            courseProgress: number;
        };
        careerCourse: {
            courseScore: number;
            courseProgress: number;
        };
    };
    quizzes: Quiz[];
    badges: string[];
    certificates: string[];
}

const StudentsTable = ({ students }: { students: Student[] }) => {
    // Helper function to get status circle class
    const getStatusCircleClass = (score: number) => {
        if (score >= 70) return `${styles.statusCircle} ${styles.statusPass}`;
        if (score > 0) return `${styles.statusCircle} ${styles.statusFail}`;
        return `${styles.statusCircle} ${styles.statusInProgress}`;
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
                                            opioidCourse.courseScore
                                        )}
                                    ></span>
                                    {opioidCourse.courseScore > 0
                                        ? `${opioidCourse.courseScore}%`
                                        : '-'}
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
