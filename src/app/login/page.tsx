'use client';
import Link from 'next/link';
import styles from './login.module.css';
import { useState } from 'react';
import { useUserStore } from '@/store/userStore';
import { signIn } from '@/firebase/auth';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';

type Inputs = {
    role: string;
    email: string;
    password: string;
};

const AdminLogin = () => {
    const router = useRouter();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState<boolean>(false);
    const setUser = useUserStore((state) => state.setUser);
    const setUID = useUserStore((state) => state.setUID);
    const setRole = useUserStore((state) => state.setRole);

    const roles = ['Student', 'School Admin', 'End Overdose Admin'];
    const roleValues = roles.map((role) => (
        <option key={role} value={role}>
            {role}
        </option>
    ));

    const { register, handleSubmit } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const response = await signIn(data);
        if (response.result) {
            setSuccess(true);
            setError('');
            // update global user state
            setUser(response.result.user);
            setUID(response.result.id);
            if (data.role === 'End Overdose Admin') {
                setRole('eo_admin');
            } else if (data.role === 'School Admin') {
                setRole('school_admin');
            } else {
                setRole('student');
            }
            // wait before redirecting to admin dashboard
            setTimeout(() => {
                router.push('/');
            }, 300);
        } else {
            if (response.error) setError(response.error);
            setSuccess(false);
        }
    };

    return (
        <div className={styles.splitContainer}>
            <div className={styles.placeHolderHalf}>
                <Image
                    className={styles.catImage}
                    src="/space-cat-login.png"
                    fill
                    alt=""
                ></Image>
            </div>
            <div className={styles.loginHalf}>
                <div className={styles.contentContainer}>
                    <div className={styles.bodyContainer}>
                        <div className={styles.titleTextContainer}>
                            <h1 className={styles.h1}>Login</h1>
                            <h2 className={styles.h2}>
                                Login to your account using your email and
                                password
                            </h2>
                        </div>
                        <div className={styles.formContainer}>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            {success && (
                                <p style={{ color: 'green' }}>
                                    Login successful!
                                </p>
                            )}
                            <form
                                className={styles.form}
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className={styles.subForm}>
                                    <label
                                        className={styles.whiteh2}
                                        htmlFor="role"
                                    >
                                        Role
                                    </label>
                                    <select
                                        className={styles.input}
                                        id="role"
                                        {...register('role', {
                                            required: true,
                                        })}
                                    >
                                        {roleValues}
                                    </select>
                                </div>
                                <div className={styles.subForm}>
                                    <label
                                        className={styles.whiteh2}
                                        htmlFor="email"
                                    >
                                        Email:
                                    </label>
                                    <input
                                        className={styles.input}
                                        type="email"
                                        id="email"
                                        {...register('email', {
                                            required: true,
                                        })}
                                    />
                                </div>
                                <div className={styles.subForm}>
                                    <label
                                        className={styles.whiteh2}
                                        htmlFor="password"
                                    >
                                        Password:
                                    </label>
                                    <input
                                        className={styles.input}
                                        type="password"
                                        id="password"
                                        {...register('password', {
                                            required: true,
                                        })}
                                    />
                                </div>
                                <button
                                    className={styles.loginButton}
                                    type="submit"
                                >
                                    Sign in
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
                <button
                    className={styles.button}
                    onClick={async () => {
                        router.push('/');
                        const response = await signIn({
                            role: 'School Admin',
                            email: 'asdf@asdf.com',
                            password: 'asdfasdf',
                        });
                        if (response.result) {
                            // update global user state
                            setUser(response.result.user);
                            setUID(response.result.id);
                            setRole('school_admin');
                        }
                    }}
                >
                    Automatic School Admin Login
                </button>
                <button
                    className={styles.button}
                    onClick={async () => {
                        router.push('/');
                        const response = await signIn({
                            role: 'End Overdose Admin',
                            email: 'asdf@asdf.com',
                            password: 'asdfasdf',
                        });
                        if (response.result) {
                            // update global user state
                            setUser(response.result.user);
                            setUID(response.result.id);
                            setRole('eo_admin');
                        }
                    }}
                >
                    Automatic EO Admin Login
                </button>
                <button
                    className={styles.button}
                    onClick={async () => {
                        const response = await signIn({
                            role: 'Student',
                            email: 'hi@test.com',
                            password: 'asdfasdf',
                        });
                        router.push('/');
                        if (response.result) {
                            // update global user state
                            setUser(response.result.user);
                            setUID(response.result.id);
                            setRole('student');
                        }
                    }}
                >
                    Automatic Student Login
                </button>
            </div>
        </div>
    );
};

export default AdminLogin;
