import React from 'react';
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
    kibble_count: number;
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
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.rankColumn}></th>
                        <th className={styles.studentColumn}>Student</th>
                        <th className={styles.gradeColumn}>Avg. Grade</th>
                        <th className={styles.courseColumn}>Opioid Course</th>
                        <th className={styles.courseColumn}>Career Course</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => {
                        // Get the course data
                        const opioidCourse =
                            student.course_completion.opioidCourse;
                        const careerCourse =
                            student.course_completion.careerCourse;

                        // Calculate average grade from both courses
                        const scores = [];
                        if (opioidCourse.courseScore > 0)
                            scores.push(opioidCourse.courseScore);
                        if (careerCourse.courseScore > 0)
                            scores.push(careerCourse.courseScore);

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
                                <td>{index + 1}</td>
                                <td>{student.student_id}</td>
                                <td>{avgGrade}%</td>
                                <td className={styles.inProgress}>
                                    <div>In Progress</div>
                                    <div>{opioidCourse.courseScore}%</div>
                                </td>
                                <td className={styles.inProgress}>
                                    <div>In Progress</div>
                                    <div>{careerCourse.courseScore}%</div>
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
