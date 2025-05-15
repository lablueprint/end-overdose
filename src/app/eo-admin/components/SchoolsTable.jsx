import styles from './SchoolsTable.module.css';
import { useRouter } from 'next/navigation';

export default function SchoolsTable({ schools }) {
    const router = useRouter();

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead className={styles.tableHead}>
                    <tr>
                        <th className={styles.tableHeaderCell}>ID</th>
                        <th className={styles.tableHeaderCell}>School Name</th>
                        <th className={styles.tableHeaderCell}>School Email</th>
                        <th className={styles.tableHeaderCell}>Student #</th>
                        <th className={styles.tableHeaderCell}>Avg Score</th>
                        <th className={styles.tableHeaderCell}>View Stats</th>
                    </tr>
                </thead>
                <tbody>
                    {schools.map((school) => (
                        <tr key={school.school_id} className={styles.tableRow}>
                            <td className={styles.tableCell}>
                                {school.school_id}
                            </td>
                            <td className={styles.tableCell}>
                                {school.school_name}
                            </td>
                            <td className={styles.tableCell}>
                                {school.school_email}
                            </td>
                            <td className={styles.tableCell}>
                                {school.student_count}
                            </td>
                            <td className={styles.tableCell}>
                                {school.average_score}
                            </td>
                            <td className={styles.tableCell}>
                                <button
                                    className={styles.viewButton}
                                    onClick={() =>
                                        router.push(
                                            `eo-admin/${school.school_id}`
                                        )
                                    }
                                >
                                    View Stats
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
