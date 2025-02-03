'use client';
import Link from 'next/link';
import styles from './login.module.css';
import { useUserStore } from '@/store/userStore';
import { signIn } from '@/firebase/auth';
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
                {/* <Link className={styles.link}> */}
                <button
                    className={styles.button}
                    onClick={async () => {
                        const response = await signIn(
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
                    Automatic Login
                </button>
                {/* </Link> */}
            </div>
        </div>
    );
};

export default LoginPage;
