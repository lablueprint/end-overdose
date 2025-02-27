'use client';
import Link from 'next/link';
import styles from './login.module.css';
import { useUserStore } from '@/store/userStore';
import { signInAdmin, signInStudent } from '@/firebase/auth';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const router = useRouter();
    const setUser = useUserStore((state) => state.setUser);
    const setUID = useUserStore((state) => state.setUID);
    const setRole = useUserStore((state) => state.setRole);

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
                <br />
                <button
                    className={styles.button}
                    onClick={async () => {
                        const response = await signInAdmin(
                            'asdf@asdf.com',
                            'asdfasdf'
                        );
                        if (response.result) {
                            // update global user state
                            setUser(response.result.admin);
                            setUID(response.result.id);
                            setRole(response.result.admin.role);
                            router.push('/');
                        }
                    }}
                >
                    Automatic Admin Login
                </button>
                <button
                    className={styles.button}
                    onClick={async () => {
                        const response = await signInStudent(
                            'UCLA',
                            'Gene Block',
                            'rip'
                        );
                        if (response.result) {
                            // update global user state
                            setUser(response.result.student);
                            setUID(response.result.student.id);
                            setRole('student');
                            router.push('/');
                        }
                    }}
                >
                    Automatic Student Login
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
