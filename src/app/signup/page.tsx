'use client';
import Link from 'next/link';
import styles from './signup.module.css';
import { useState } from 'react';
import { Admin } from '@/types/Admin';
import { signUp } from '@/firebase/auth';
import { useRouter } from 'next/navigation';
import { School } from '@/types/School';
import { WolfPackAlphaUniversity, UCLA } from '@/types/School';

const SignUpPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [schoolName, setSchoolName] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState<boolean>(false);
    // DELETE LATER TEMPORARY TOGGLE FOR STUDENT OR ADMIN
    const [student, setStudent] = useState(false);

    const schools = [WolfPackAlphaUniversity, UCLA];

    const schoolValues = schools.map((school: School) => (
        <option key={school.name} value={school.name}>
            {school.name}
        </option>
    ));

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

        const response = await signUp(newAdmin, password);

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
            <div className={styles.loginHalf}>
                <div className={styles.contentContainer}>
                    <div className={styles.bodyContainer}>
                        <div className={styles.titleTextContainer}>
                            <h1 className={styles.h1}>CREATE AN ACCOUNT</h1>
                            <h2 className={styles.h2}>
                                We're so glad you could join us!
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
                                        className={`${styles.input} ${styles.formControl}`}
                                        id="schoolName"
                                        name="schoolName"
                                        defaultValue=""
                                        onChange={(e) => handleSelectChange(e)}
                                        required
                                    >
                                        <option value="" disabled hidden>
                                            Select your school…
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
                                        className={`${styles.input} ${styles.formControl}`}
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className={styles.buttonContainer}>
                                    <div
                                        className={styles.robotVerPlaceholder}
                                    ></div>
                                    <button
                                        className={styles.loginButton}
                                        type="submit"
                                    >
                                        SIGN UP
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={styles.navigationContainer}>
                        <h2 className={styles.h2}>
                            {`Already have an account?   `}
                            <Link className={styles.link} href="/login">
                                Sign In
                            </Link>
                        </h2>
                    </div>
                </div>
            </div>
            <div className={styles.placeHolderHalf}>
                <div className={styles.narcat}></div>
            </div>
        </div>
    );
};

export default SignUpPage;
