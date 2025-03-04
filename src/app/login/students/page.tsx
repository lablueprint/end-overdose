'use client';
import Link from 'next/link';
import styles from '../login.module.css';
import { useState } from 'react';
import { WolfPackAlphaUniversity, UCLA, School } from '@/types/School';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { signInStudent } from '@/firebase/auth';

const StudentLogin = () => {
    const router = useRouter();
    const setUser = useUserStore((state) => state.setUser);
    const setUID = useUserStore((state) => state.setUID);
    const setRole = useUserStore((state) => state.setRole);

    const schools = [WolfPackAlphaUniversity, UCLA];

    const [schoolId, setSchoolId] = useState('');
    const [schoolName, setSchoolName] = useState(schools[0].name);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

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

    //Check authentication on form submit
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // console.log('Logging in as Student:', { schoolId, schoolName });
        //call the firebase sign-in function here
        const { result, error } = await signInStudent(
            schoolName,
            schoolId,
            password
        );
        // console.log('student ; ', student);
        if (result && !error) {
            setUID(result.student.id); // Set zustand state to hold user if authentication is successful
            setRole('student');
            setUser(result.student);
            setSuccess(true);
            setError('');
            setTimeout(() => {
                router.push('/');
            }, 300);
        } else {
            console.log('Error: ', error);
            setError(error);
        }
    };

    return (
        <div className={styles.splitContainer}>
            <div className={styles.placeHolderHalf}></div>
            <div className={styles.loginHalf}>
                <div className={styles.contentContainer}>
                    <div className={styles.bodyContainer}>
                        <div className={styles.titleTextContainer}>
                            <h1 className={styles.h1}>Student Login</h1>
                            <h2 className={styles.h2}>
                                Login to your account using your school-given
                                credentials
                            </h2>
                        </div>
                        <div className={styles.formContainer}>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            {success && (
                                <p style={{ color: 'green' }}>
                                    Student Login successful!
                                </p>
                            )}
                            <form
                                className={styles.form}
                                onSubmit={handleSubmit}
                            >
                                <div className={styles.subForm}>
                                    <label
                                        className={styles.h2}
                                        htmlFor="schoolId"
                                    >
                                        School ID
                                    </label>
                                    <input
                                        className={styles.input}
                                        type="text"
                                        id="schoolId"
                                        value={schoolId}
                                        onChange={(e) =>
                                            setSchoolId(e.target.value)
                                        }
                                        required
                                    />
                                </div>
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

export default StudentLogin;
