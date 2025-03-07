import styles from './StatCard.module.css';

export default function StatCard({ icon, title, value }) {
    return (
        <div className={styles.card}>
            <div className={styles.iconContainer}>
                <div className={styles.icon}>
                    <div className={styles.iconSvg}>{icon}</div>
                </div>
            </div>
            <div className={styles.contentContainer}>
                <span className={styles.title}>{title}</span>
                <span className={styles.value}>{value}</span>
            </div>
        </div>
    );
}
