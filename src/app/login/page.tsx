'use client';
import Link from 'next/link';
import styles from './login.module.css';

const LoginPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2>
                    Don&apos;t have an account?{' '}
                    <Link className={styles.link} href="/signup">
                        Sign up
                    </Link>
                </h2>
                <Link className={styles.link} href="/login/admin">
                    <button className={styles.button}>Admin Login</button>
                </Link>
                <Link className={styles.link} href="/login/students">
                    <button className={styles.button}>Student Login</button>
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;
