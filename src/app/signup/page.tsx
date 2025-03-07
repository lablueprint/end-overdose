'use client';
import Link from 'next/link';
import styles from './signup.module.css';
import { useState } from 'react';
import { Admin } from '@/types/Admin';
import { signUpAdmin, signupStudent } from '@/firebase/auth';
import { useRouter } from 'next/navigation';
import { WolfPackAlphaUniversity, UCLA } from '@/types/School';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
    name: {
        first: string;
        last: string;
    };
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

    const schools = [WolfPackAlphaUniversity, UCLA];
    const schoolValues = schools.map((school) => (
        <option key={school.name} value={school.name}>
            {school.name}
        </option>
    ));

    const { register, handleSubmit } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        if (data.role === 'Student') {
            const response = await signupStudent(data);
        }
        const response = await signUpAdmin(data);

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
                                Enter the following information to setup your
                                account
                            </h2>
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && (
                            <p style={{ color: 'green' }}>
                                Admin Signup successful!
                            </p>
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
