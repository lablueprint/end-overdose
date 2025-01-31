'use client';
import Link from 'next/link';
import styles from './login.module.css';

const LoginPage = () => {
    return (
        <div className={styles.navigationContainer}>
            <h2 className={styles.h2}>
                {`Don't have an account?   `}
                <Link className={styles.link} href="/signup">
                    Sign-up
                </Link>
            </h2>
            <Link className={styles.link} href="/login/admin">
                <button>Admin Login </button>
            </Link>
            <Link className={styles.link} href="/login/students">
                <button>Student Login</button>
            </Link>
        </div>
    );
};

export default LoginPage;
