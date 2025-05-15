'use client';
import Link from 'next/link';
import styles from './signup.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from 'firebase/auth';
import { getSchoolNames } from '@/app/api2/generalData/actions';

type Inputs = {
    role: string;
    email: string;
    password: string;
    school: string;
    termsAgreed: boolean;
    newsletter: boolean;
};

export default function SignUpPage() {
    const router = useRouter();
    const { register, handleSubmit } = useForm<Inputs>();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState<boolean>(false);
    const [schools, setSchools] = useState<string[]>([]);

    // Fetch schools using the server action
    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const schoolList = await getSchoolNames();
                setSchools(schoolList);
            } catch (error) {
                console.error('Error fetching schools:', error);
                setError('Failed to load schools. Please try again later.');
            }
        };

        fetchSchools();
    }, []);

    // Create school options from fetched data
    const schoolValues = schools.map((school) => (
        <option key={school} value={school}>
            {school}
        </option>
    ));

    const onSubmit: SubmitHandler<Inputs> = async ({
        email,
        password,
        role,
        school,
        termsAgreed,
        newsletter,
    }) => {
        //1. Check if valid
        if (!termsAgreed || !newsletter) {
            return;
        }
        setError('');

        try {
            const auth = getAuth();
            // 1) Create the user in Firebase Auth with email & password
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            // 2) Build your Admin object

            // 3) Write it into your “admins” collection keyed by uid

            // 4) Send email‑verification instead of a magic link:
            //await sendEmailVerification(user);
            //console.log('Verification email sent');

            // 5) Redirect to login or dashboard
            setTimeout(() => {
                router.push('/login');
            }, 1000);
        } catch (err) {
            console.error(err);
            setError('Something went wrong.');
        }
    };

    useEffect(() => {
        const auth = getAuth();
        auth.signOut();
    }, []);

    return (
        <div className={styles.splitContainer}>
            <div className={styles.loginHalf}>
                <div className={styles.contentContainer}>
                    <div className={styles.bodyContainer}>
                        <div className={styles.titleTextContainer}>
                            <h1 className={styles.h1}>CREATE AN ACCOUNT</h1>
                            <h2 className={styles.h2}>
                                We&apos;re so glad you could join us!
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
                                        className={`${styles.input} ${styles.formControl}`}
                                        id="role"
                                        {...register('role', {
                                            required: true,
                                        })}
                                    >
                                        <option value="">Choose a Role</option>
                                        <option value="eo_admin">EO Admin</option>
                                        <option value="admin">School Admin</option>
                                    </select>
                                </div>

                                <div className={styles.subForm}>
                                    <label
                                        className={styles.h2}
                                        htmlFor="school"
                                    >
                                        School Name
                                    </label>
                                    <select
                                        className={`${styles.input} ${styles.formControl}`}
                                        id="school"
                                        name="school"
                                        required
                                    >
                                        <option value="">
                                            Choose a School
                                        </option>
                                        {schoolValues}
                                    </select>
                                </div>

                                <div className={styles.subForm}>
                                    <label
                                        className={styles.h2}
                                        htmlFor="email"
                                    >
                                        Email address:
                                    </label>
                                    <input
                                        className={`${styles.input} ${styles.formControl}`}
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
                                        className={`${styles.input} ${styles.formControl}`}
                                        type="password"
                                        id="password"
                                        {...register('password', {
                                            required: true,
                                        })}
                                    />
                                </div>

                                <div className={styles.checkboxContainer}>
                                    <div className={styles.checkboxGroup}>
                                        <input
                                            type="checkbox"
                                            id="termsAgreed"
                                            className={styles.checkbox}
                                            {...register('termsAgreed', {
                                                required: true,
                                            })}
                                        />
                                        <label
                                            htmlFor="termsAgreed"
                                            className={styles.checkboxLabel}
                                        >
                                            Agree to our{' '}
                                            <Link
                                                href="/terms"
                                                className={styles.link}
                                            >
                                                Terms of use
                                            </Link>{' '}
                                            and{' '}
                                            <Link
                                                href="/privacy"
                                                className={styles.link}
                                            >
                                                Privacy Policy
                                            </Link>
                                        </label>
                                    </div>

                                    <div className={styles.checkboxGroup}>
                                        <input
                                            type="checkbox"
                                            id="newsletter"
                                            className={styles.checkbox}
                                            {...register('newsletter', {
                                                required: true,
                                            })}
                                        />
                                        <label
                                            htmlFor="newsletter"
                                            className={styles.checkboxLabel}
                                        >
                                            Subscribe to our monthly newsletter
                                        </label>
                                    </div>
                                </div>

                                <div className={styles.buttonContainer}>
                                    <button
                                        className={styles.loginButton}
                                        type="submit"
                                    >
                                        SIGN UP
                                    </button>
                                    <div className={styles.navigationContainer}>
                                        <h2 className={styles.h2}>
                                            {`Already have an account?   `}
                                            <Link
                                                className={styles.link}
                                                href="/signin"
                                            >
                                                SIGN IN
                                            </Link>
                                        </h2>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.placeHolderHalf}>
                <div className={styles.narcat}></div>
            </div>
        </div>
    );
};