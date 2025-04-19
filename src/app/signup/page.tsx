'use client';
import Link from 'next/link';
import styles from './signup.module.css';
import { useState, useEffect } from 'react';
import { Admin } from '@/types/Admin';
import { signUp } from '@/firebase/auth';
import { useRouter } from 'next/navigation';
import { School } from '@/types/School';
import { WolfPackAlphaUniversity, UCLA } from '@/types/School';
import {
    getAuth,
    sendSignInLinkToEmail,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    setPersistence,
    browserSessionPersistence,
} from 'firebase/auth';
import { addAdmin } from '@/app/api/admins/actions';

const SignUpPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [schoolName, setSchoolName] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState<boolean>(false);

    const schools = [WolfPackAlphaUniversity, UCLA];

    const schoolValues = schools.map((school: School) => (
        <option key={school.name} value={school.name}>
            {school.name}
        </option>
    ));

    const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: `${window.location.origin}/login`,
        // This must be true.
        handleCodeInApp: true,
        //links specificlaly for IOS or android
        //iOS: {
        //bundleId: 'com.example.ios',
        //},
        //android: {
        //packageName: 'com.example.android',
        //installApp: true,
        //minimumVersion: '12',
        //},
        // The domain must be configured in Firebase Hosting and owned by the project.
        linkDomain: 'end-overdose-bcbd0.firebaseapp.com',
    };

    //Change selected school from dropdown selection
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSchoolName = e.target.value;
        if (selectedSchoolName) {
            setSchoolName(selectedSchoolName);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Check if passwords match
        // if (password !== confirmPassword) {
        //     setError('Passwords do not match.');
        //     return;
        // }
        const auth = getAuth();

        try {
            // 1) Create the user in Firebase Auth with email & password
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            // 2) Build your Admin object
            const newAdmin: Admin = {
                name: {
                    first: 'Test',
                    last: 'Test',
                },
                email,
                role: 'school_admin',
                school_name: schoolName,
                approved: false,
            };

            // 3) Write it into your “admins” collection keyed by uid
            await addAdmin(newAdmin, user.uid);

            // 4) Send email‑verification instead of a magic link:
            await sendEmailVerification(user);
            console.log('Verification email sent');

            setSuccess(true);

            // 5) Redirect to login or dashboard
            setTimeout(() => {
                router.push('/login');
            }, 1000);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Something went wrong.');
        }

        /*const response = await signUp(newAdmin, password);

        if (response.error) {
            setError(response.error);
            setSuccess(false);
        } else {
            setSuccess(true);
            setError('');
            setTimeout(() => {
                router.push('/login');
            }, 1000);
        }*/
    };

    useEffect(() => {
        const auth = getAuth();
        auth.signOut();
    }, []);

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
                                onSubmit={handleSubmit}
                            >
                                <div className={styles.subForm}>
                                    <label
                                        className={styles.h2}
                                        htmlFor="schoolName"
                                    >
                                        School Name
                                    </label>
                                    <select
                                        className={styles.input}
                                        id="schoolName"
                                        name="schoolName"
                                        onChange={(e) => handleSelectChange(e)}
                                        required
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
