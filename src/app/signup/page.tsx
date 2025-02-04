'use client';
import Link from 'next/link';
import styles from './signup.module.css';
import { useState } from 'react';
import { loginAdmin } from '@/app/api/admins/actions';

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [schoolName, setSchoolname] = useState('');

    const handleSubmit = () =>
    {
        console.log('signup submitted')
    }

    return (
        <div className={styles.splitContainer}>
            <div className={styles.placeHolderHalf}></div>
            <div className={styles.loginHalf}>
                <div className={styles.contentContainer}>
                    <div className={styles.bodyContainer}>
                        <div className={styles.titleTextContainer}>
                            <h1 className={styles.h1}>Create an Account</h1>
                            <h2 className={styles.h2}>
                                Enter the following information to setup your account
                            </h2>
                        </div>
                        <div className={styles.formContainer}>
                            <form
                                className={styles.form}
                                onSubmit={handleSubmit}
                            >
                                <div className={styles.subForm}>
                                    <label
                                        className={styles.h2}
                                        htmlFor="schoolName"
                                    >
                                        School Name:
                                    </label>
                                    <input
                                        className={styles.input}
                                        type="text"
                                        id="schoolname"
                                        value={schoolName}
                                        onChange={(e) =>
                                            setSchoolname(e.target.value)
                                        }
                                        required
                                    />
                                </div>
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
                            {`Already have an account?   `}
                            <Link className={styles.link} href="/login">
                                Login
                            </Link>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;

