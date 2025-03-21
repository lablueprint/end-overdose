'use client';
import Link from 'next/link';
import styles from './signup.module.css';
import { useState } from 'react';
import { signUp } from '@/firebase/auth';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
    role: string;
    email: string;
    password: string;
    school_name: string;
};

const SignUpPage = () => {
    const router = useRouter();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState<boolean>(false);

    const roles = ['Student', 'School Admin', 'End Overdose Admin'];
    const roleValues = roles.map((role) => (
        <option key={role} value={role}>
            {role}
        </option>
    ));

    const schools = ['UCLA', 'USC', 'UCSD', 'UCI', 'UCB'];
    const schoolValues = schools.map((school) => (
        <option key={school} value={school}>
            {school}
        </option>
    ));

    const { register, handleSubmit } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const response = await signUp(data);

        if (response.error) {
            setError(response.error);
            setSuccess(false);
        } else {
            setSuccess(true);
            setError('');
            setTimeout(() => {
                router.push('/login');
            }, 1000);
        }
    };

    return (
        <div className={styles.splitContainer}>
            <div className={styles.placeHolderHalf}></div>
            <div className={styles.loginHalf}>
                <div className={styles.contentContainer}>
                    <div className={styles.bodyContainer}>
                        <div className={styles.titleTextContainer}>
                            <h1 className={styles.h1}>Create an Account</h1>
                            <h2 className={styles.h2}>
                                We're so glad you could join us!
                            </h2>
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && (
                            <p style={{ color: 'green' }}>Signup successful!</p>
                        )}
                        <div className={styles.formContainer}>
                            <form
                                className={styles.form}
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className={styles.subForm}>
                                    <label className={styles.h2} htmlFor="role">
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
                                        className={styles.h2}
                                        htmlFor="school_name"
                                    >
                                        School Name
                                    </label>
                                    <select
                                        className={styles.input}
                                        id="school_name"
                                        {...register('school_name', {
                                            required: true,
                                        })}
                                    >
                                        {schoolValues}
                                    </select>
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
                                        {...register('email', {
                                            required: true,
                                        })}
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
                                        {...register('password', {
                                            required: true,
                                        })}
                                    />
                                </div>
                                <button
                                    className={styles.loginButton}
                                    type="submit"
                                >
                                    Submit
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
