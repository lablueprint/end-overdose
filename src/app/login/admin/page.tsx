'use client';
import Link from 'next/link';
import styles from '../login.module.css';
import { useState } from 'react';
import { useUserStore } from '@/store/userStore';
import { signIn } from '@/firebase/auth';
import { useRouter } from 'next/navigation';
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';

const AdminLogin = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState<boolean>(false);
    const setUser = useUserStore((state) => state.setUser);
    const setUID = useUserStore((state) => state.setUID);
    const setRole = useUserStore((state) => state.setRole);

    const auth = getAuth();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // sign in the admin
        const response = await signIn(email, password);
        if (response.result) {
            setSuccess(true);
            setError('');
            // update global user state
            setUser(response.result.admin);
            setUID(response.result.id);
            setRole(response.result.admin.role);
            //sendSignInLinkToEmail();
            // wait before redirecting to admin dashboard
            setTimeout(() => {
                router.push('/admin');
            }, 1000);
        } else {
            if (response.error) setError(response.error);
            setSuccess(false);
        }
    };

    // console.log(user);
    return (
        <div className={styles.splitContainer}>
            <div className={styles.placeHolderHalf}></div>
            <div className={styles.loginHalf}>
                <div className={styles.contentContainer}>
                    <div className={styles.bodyContainer}>
                        <div className={styles.titleTextContainer}>
                            <h1 className={styles.h1}>Admin Login</h1>
                            <h2 className={styles.h2}>
                                Login to your account using your email and
                                password
                            </h2>
                        </div>
                        <div className={styles.formContainer}>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            {success && (
                                <p style={{ color: 'green' }}>
                                    Admin Login successful!
                                </p>
                            )}
                            <form
                                className={styles.form}
                                onSubmit={handleSubmit}
                            >
                                <div className={styles.subForm}>
                                    <label
                                        className={styles.h2}
                                        htmlFor="email"
                                    >
                                        Email:
                                    </label>
                                    <input
                                        className={styles.input}
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className={styles.subForm}>
                                    <label
                                        className={styles.h2}
                                        htmlFor="password"
                                    >
                                        Password:
                                    </label>
                                    <input
                                        className={styles.input}
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <button
                                    className={styles.loginButton}
                                    type="submit"
                                >
                                    Log In
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className={styles.navigationContainer}>
                        <h2 className={styles.h2}>
                            {`Don't have an account?   `}
                            <Link className={styles.link} href="/signup">
                                Sign-up
                            </Link>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
