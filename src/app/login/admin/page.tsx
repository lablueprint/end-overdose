'use client';
import Link from 'next/link';
import styles from '../login.module.css';
import { useState } from 'react';
import { loginAdmin, getAdminFromEmail } from '@/app/api/admins/actions';
import { useUserStore } from '@/store/userStore';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState<boolean>(false);
    const setUser = useUserStore((state) => state.setUser);
    const setUID = useUserStore((state) => state.setUID);
    const setRole = useUserStore((state) => state.setRole);
    const user = useUserStore((state) => state.user);
    const uid = useUserStore((state) => state.uid);
    const role = useUserStore((state) => state.role);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const response = await loginAdmin(email, password);
        if (response.error) {
            setError(response.error);
            setSuccess(false);
        } else {
            setSuccess(true);
            setError('');
            // fetch admin from firestore
            const admin = await getAdminFromEmail(email);
            if (admin) {
                setUID(admin.id);
                setRole(admin.role);
                setUser(admin);
            } else {
                setError('Unable to find admin with that email');
                setSuccess(false);
            }
        }
    };

    console.log(user);
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
                        <div className={styles.navButtons}>
                            <Link className={styles.link} href="/login/admin">
                                <button>Admin Login </button>
                            </Link>
                            <Link
                                className={styles.link}
                                href="/login/students"
                            >
                                <button>Student Login</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
