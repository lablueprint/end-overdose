import styles from './StudentTable.module.css';

export default function StudentTable({ students }) {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead className={styles.tableHead}>
                    <tr>
                        <th className={styles.tableHeaderCell}>ID</th>
                        <th className={styles.tableHeaderCell}>Student Name</th>
                        <th className={styles.tableHeaderCell}>
                            Student Email
                        </th>
                        <th className={styles.tableHeaderCell}>Avg Score</th>
                        <th className={styles.tableHeaderCell}>View Stats</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={students.id} className={styles.tableRow}>
                            <td className={styles.tableCell}>{student.id}</td>
                            <td className={styles.tableCell}>{student.name}</td>
                            <td className={styles.tableCell}>
                                {student.email}
                            </td>
                            <td className={styles.tableCell}>
                                {student.avgScore}
                            </td>
                            <td className={styles.tableCell}>
                                <button className={styles.viewButton}>
                                    View More Stats
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
